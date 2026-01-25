import { Inject, Injectable, NotFoundException, type StreamableFile } from "@nestjs/common";
import type { AccessContext } from "@/infrastructure/access-context";
import type {
  AmbienteCreateInputDto,
  AmbienteFindOneInputDto,
  AmbienteFindOneOutputDto,
  AmbienteListInputDto,
  AmbienteListOutputDto,
  AmbienteUpdateInputDto,
} from "@/v2/adapters/in/http/ambiente/dto";
import type { AmbienteEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import { ArquivoService } from "@/v2/core/arquivo/application/use-cases/arquivo.service";
import { BlocoService } from "@/v2/core/bloco/application/use-cases/bloco.service";
import { ImagemService } from "@/v2/core/imagem/application/use-cases/imagem.service";
import { BaseCrudService } from "@/v2/core/shared";
import type { IAmbienteRepositoryPort, IAmbienteUseCasePort } from "../ports";

/**
 * Service centralizado para o módulo Ambiente.
 * Estende BaseCrudService para operações CRUD comuns.
 * Implementa IAmbienteUseCasePort para compatibilidade com a interface existente.
 */
@Injectable()
export class AmbienteService
  extends BaseCrudService<
    AmbienteEntity,
    AmbienteListInputDto,
    AmbienteListOutputDto,
    AmbienteFindOneInputDto,
    AmbienteFindOneOutputDto,
    AmbienteCreateInputDto,
    AmbienteUpdateInputDto
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
    @Inject("IAmbienteRepositoryPort")
    protected readonly repository: IAmbienteRepositoryPort,
    private readonly blocoService: BlocoService,
    private readonly imagemService: ImagemService,
    private readonly arquivoService: ArquivoService,
  ) {
    super();
  }

  /**
   * Hook para adicionar relacionamento com Bloco durante criação
   */
  protected override async beforeCreate(
    accessContext: AccessContext,
    entity: AmbienteEntity,
    dto: AmbienteCreateInputDto,
  ): Promise<void> {
    const bloco = await this.blocoService.blocoFindByIdSimpleStrict(accessContext, dto.bloco.id);
    this.repository.merge(entity, { bloco: { id: bloco.id } });
  }

  // Métodos prefixados para compatibilidade com IAmbienteUseCasePort

  async ambienteFindAll(
    accessContext: AccessContext,
    dto: AmbienteListInputDto | null = null,
    selection?: string[] | boolean,
  ): Promise<AmbienteListOutputDto> {
    return this.findAll(accessContext, dto, selection);
  }

  async ambienteFindById(
    accessContext: AccessContext | null,
    dto: AmbienteFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<AmbienteFindOneOutputDto | null> {
    return this.findById(accessContext, dto, selection);
  }

  async ambienteFindByIdStrict(
    accessContext: AccessContext | null,
    dto: AmbienteFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<AmbienteFindOneOutputDto> {
    return this.findByIdStrict(accessContext, dto, selection);
  }

  async ambienteCreate(
    accessContext: AccessContext,
    dto: AmbienteCreateInputDto,
  ): Promise<AmbienteFindOneOutputDto> {
    return this.create(accessContext, dto);
  }

  async ambienteUpdate(
    accessContext: AccessContext,
    dto: AmbienteFindOneInputDto & AmbienteUpdateInputDto,
  ): Promise<AmbienteFindOneOutputDto> {
    return this.update(accessContext, dto);
  }

  async ambienteDeleteOneById(
    accessContext: AccessContext,
    dto: AmbienteFindOneInputDto,
  ): Promise<boolean> {
    return this.deleteOneById(accessContext, dto);
  }

  // Métodos específicos de Ambiente (não cobertos pela BaseCrudService)

  async ambienteGetImagemCapa(
    accessContext: AccessContext | null,
    id: string,
  ): Promise<StreamableFile> {
    const ambiente = await this.ambienteFindByIdStrict(accessContext, { id });

    if (ambiente.imagemCapa) {
      const [versao] = ambiente.imagemCapa.versoes;

      if (versao) {
        const { arquivo } = versao;
        return this.arquivoService.getStreamableFile(null, arquivo.id, null);
      }
    }

    throw new NotFoundException();
  }

  async ambienteUpdateImagemCapa(
    accessContext: AccessContext,
    dto: AmbienteFindOneInputDto,
    file: Express.Multer.File,
  ): Promise<boolean> {
    const currentAmbiente = await this.ambienteFindByIdStrict(accessContext, { id: dto.id });

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
}
