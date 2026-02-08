import { Inject, Injectable, type StreamableFile } from "@nestjs/common";
import type { AccessContext } from "@/modules/@core/access-context";
import {
  AUTHORIZATION_SERVICE_PORT,
  BaseCrudService,
  type IAuthorizationServicePort,
  ResourceNotFoundError,
} from "@/modules/@shared";
import type { AmbienteEntity } from "@/modules/ambiente/infrastructure/persistence/typeorm";
import { ArquivoService } from "@/modules/arquivo/application/use-cases/arquivo.service";
import { BlocoService } from "@/modules/bloco/application/use-cases/bloco.service";
import { ImagemService } from "@/modules/imagem/application/use-cases/imagem.service";
import type {
  AmbienteCreateInput,
  AmbienteFindOneInput,
  AmbienteFindOneOutput,
  AmbienteListInput,
  AmbienteListOutput,
  AmbienteUpdateInput,
} from "../dtos";
import {
  AMBIENTE_REPOSITORY_PORT,
  type IAmbienteRepositoryPort,
  type IAmbienteUseCasePort,
} from "../ports";

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
    @Inject(AUTHORIZATION_SERVICE_PORT)
    protected readonly authorizationService: IAuthorizationServicePort,
    private readonly blocoService: BlocoService,
    private readonly imagemService: ImagemService,
    private readonly arquivoService: ArquivoService,
  ) {
    super();
  }

  async getImagemCapa(accessContext: AccessContext | null, id: string): Promise<StreamableFile> {
    const ambiente = await this.findByIdStrict(accessContext, { id });

    if (ambiente.imagemCapa) {
      const arquivoId = await this.imagemService.getLatestArquivoIdForImagem(
        ambiente.imagemCapa.id,
      );

      if (arquivoId) {
        return this.arquivoService.getStreamableFile(null, { id: arquivoId });
      }
    }

    throw new ResourceNotFoundError("Imagem de capa do Ambiente", id);
  }

  async updateImagemCapa(
    accessContext: AccessContext,
    dto: AmbienteFindOneInput,
    file: Express.Multer.File,
  ): Promise<boolean> {
    const currentAmbiente = await this.findByIdStrict(accessContext, { id: dto.id });

    await this.ensurePermission(
      accessContext,
      "ambiente:update",
      { dto: { id: currentAmbiente.id } },
      currentAmbiente.id,
    );

    const { imagem } = await this.imagemService.saveImagemCapa(file);

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
