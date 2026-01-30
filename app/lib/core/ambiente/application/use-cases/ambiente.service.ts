import { Inject, Injectable, NotFoundException, type StreamableFile } from "@nestjs/common";
import type { AmbienteEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import { DatabaseContextService } from "@/v2/adapters/out/persistence/typeorm";
import { ArquivoService } from "@/core/arquivo/application/use-cases/arquivo.service";
import { BlocoService } from "@/core/bloco/application/use-cases/bloco.service";
import { ImagemService } from "@/core/imagem/application/use-cases/imagem.service";
import { BaseCrudService } from "@/v2/core/shared";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";
import type {
  AmbienteCreateInput,
  AmbienteFindOneInput,
  AmbienteFindOneOutput,
  AmbienteListInput,
  AmbienteListOutput,
  AmbienteUpdateInput,
} from "../dtos";
import { AMBIENTE_REPOSITORY_PORT, type IAmbienteRepositoryPort, type IAmbienteUseCasePort } from "../ports";

/**
 * Service centralizado para o módulo Ambiente.
 * Estende BaseCrudService para operações CRUD comuns.
 * Implementa IAmbienteUseCasePort para compatibilidade com a interface existente.
 */
@Injectable()
export class AmbienteService
  extends BaseCrudService<
    AmbienteEntity,
    AmbienteListInput,
    AmbienteListOutput,
    AmbienteFindOneInput,
    AmbienteFindOneOutput,
    AmbienteCreateInput,
    AmbienteUpdateInput
  >
  implements IAmbienteUseCasePort
{
  protected readonly resourceName = "Ambiente";
  protected readonly createAction = "ambiente:create";
  protected readonly updateAction = "ambiente:update";
  protected readonly deleteAction = "ambiente:delete";
  protected readonly createFields = ["nome", "descricao", "codigo", "capacidade", "tipo"] as const;
  protected readonly updateFields = ["nome", "descricao", "codigo", "capacidade", "tipo"] as const;

  constructor(
    @Inject(AMBIENTE_REPOSITORY_PORT)
    protected readonly repository: IAmbienteRepositoryPort,
    private readonly blocoService: BlocoService,
    private readonly imagemService: ImagemService,
    private readonly arquivoService: ArquivoService,
    private readonly databaseContext: DatabaseContextService,
  ) {
    super();
  }

  // ========================================
  // Backwards-compatible prefixed methods
  // ========================================

  async ambienteFindAll(
    accessContext: AccessContext,
    dto: AmbienteListInput | null = null,
    selection?: string[] | boolean,
  ): Promise<AmbienteListOutput> {
    return this.findAll(accessContext, dto, selection);
  }

  async ambienteFindById(
    accessContext: AccessContext | null,
    dto: AmbienteFindOneInput,
    selection?: string[] | boolean,
  ): Promise<AmbienteFindOneOutput | null> {
    return this.findById(accessContext, dto, selection);
  }

  async ambienteFindByIdStrict(
    accessContext: AccessContext | null,
    dto: AmbienteFindOneInput,
    selection?: string[] | boolean,
  ): Promise<AmbienteFindOneOutput> {
    return this.findByIdStrict(accessContext, dto, selection);
  }

  async ambienteCreate(
    accessContext: AccessContext,
    dto: AmbienteCreateInput,
  ): Promise<AmbienteFindOneOutput> {
    return this.create(accessContext, dto);
  }

  async ambienteUpdate(
    accessContext: AccessContext,
    dto: AmbienteFindOneInput & AmbienteUpdateInput,
  ): Promise<AmbienteFindOneOutput> {
    return this.update(accessContext, dto);
  }

  async ambienteDeleteOneById(
    accessContext: AccessContext,
    dto: AmbienteFindOneInput,
  ): Promise<boolean> {
    return this.deleteOneById(accessContext, dto);
  }

  // ========================================
  // Image methods
  // ========================================

  async getImagemCapa(
    accessContext: AccessContext | null,
    id: string,
  ): Promise<StreamableFile> {
    const ambiente = await this.findByIdStrict(accessContext, { id });

    if (ambiente.imagemCapa) {
      // Load versoes separately since it's a OneToMany relation not loaded via QbEfficientLoad
      const versao = await this.databaseContext.imagemArquivoRepository.findOne({
        where: { imagem: { id: ambiente.imagemCapa.id } },
        relations: { arquivo: true },
        order: { dateCreated: "DESC" },
      });

      if (versao) {
        const { arquivo } = versao;
        return this.arquivoService.getStreamableFile(null, { id: arquivo.id });
      }
    }

    throw new NotFoundException();
  }

  async updateImagemCapa(
    accessContext: AccessContext,
    dto: AmbienteFindOneInput,
    file: Express.Multer.File,
  ): Promise<boolean> {
    const currentAmbiente = await this.findByIdStrict(accessContext, { id: dto.id });

    await accessContext.ensurePermission(
      "ambiente:update",
      { dto: { id: currentAmbiente.id } },
      currentAmbiente.id,
    );

    const { imagem } = await this.imagemService.saveAmbienteCapa(file);

    const ambiente = this.repository.create();
    this.repository.merge(ambiente, { id: currentAmbiente.id });
    this.repository.merge(ambiente, { imagemCapa: { id: imagem.id } });

    await this.repository.save(ambiente);

    return true;
  }

  /**
   * Hook para adicionar relacionamento com Bloco durante criação
   */
  protected override async beforeCreate(
    accessContext: AccessContext,
    entity: AmbienteEntity,
    dto: AmbienteCreateInput,
  ): Promise<void> {
    const bloco = await this.blocoService.findByIdSimpleStrict(accessContext, dto.bloco.id);
    this.repository.merge(entity, { bloco: { id: bloco.id } });
  }
}
