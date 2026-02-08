import { Inject, Injectable, type StreamableFile } from "@nestjs/common";
import type { AccessContext } from "@/modules/@core/access-context";
import {
  AUTHORIZATION_SERVICE_PORT,
  BaseCrudService,
  type IAuthorizationServicePort,
  ResourceNotFoundError,
} from "@/modules/@shared";
import { ArquivoService } from "@/modules/arquivo/application/use-cases/arquivo.service";
import type {
  BlocoCreateInput,
  BlocoFindOneInput,
  BlocoFindOneOutput,
  BlocoListInput,
  BlocoListOutput,
  BlocoUpdateInput,
} from "@/modules/bloco/application/dtos";
import {
  BLOCO_REPOSITORY_PORT,
  type IBlocoRepositoryPort,
  type IBlocoUseCasePort,
} from "@/modules/bloco/application/ports";
import type { BlocoEntity } from "@/modules/bloco/infrastructure/persistence/typeorm";
import { CampusService } from "@/modules/campus";
import { ImagemService } from "@/modules/imagem/application/use-cases/imagem.service";

/**
 * Service centralizado para o modulo Bloco.
 * Estende BaseCrudService para operacoes CRUD comuns.
 * Implementa IBlocoUseCasePort para compatibilidade com a interface existente.
 */
@Injectable()
export class BlocoService
  extends BaseCrudService<
    BlocoEntity,
    BlocoListInput,
    BlocoListOutput,
    BlocoFindOneInput,
    BlocoFindOneOutput,
    BlocoCreateInput,
    BlocoUpdateInput
  >
  implements IBlocoUseCasePort
{
  protected readonly resourceName = "Bloco";
  protected readonly createAction = "bloco:create";
  protected readonly updateAction = "bloco:update";
  protected readonly deleteAction = "bloco:delete";
  protected readonly createFields = ["nome", "codigo"] as const;
  protected readonly updateFields = ["nome", "codigo"] as const;

  constructor(
    @Inject(BLOCO_REPOSITORY_PORT)
    protected readonly repository: IBlocoRepositoryPort,
    @Inject(AUTHORIZATION_SERVICE_PORT)
    protected readonly authorizationService: IAuthorizationServicePort,
    private readonly campusService: CampusService,
    private readonly imagemService: ImagemService,
    private readonly arquivoService: ArquivoService,
  ) {
    super();
  }

  // Metodos que delegam para BaseCrudService com nomes de interface

  async getImagemCapa(accessContext: AccessContext | null, id: string): Promise<StreamableFile> {
    const bloco = await this.findByIdStrict(accessContext, { id });

    if (bloco.imagemCapa) {
      const arquivoId = await this.imagemService.getLatestArquivoIdForImagem(bloco.imagemCapa.id);

      if (arquivoId) {
        return this.arquivoService.getStreamableFile(null, { id: arquivoId });
      }
    }

    throw new ResourceNotFoundError("Imagem de capa do Bloco", id);
  }

  async updateImagemCapa(
    accessContext: AccessContext,
    dto: BlocoFindOneInput,
    file: Express.Multer.File,
  ): Promise<boolean> {
    const currentBloco = await this.findByIdStrict(accessContext, { id: dto.id });

    await this.ensurePermission(
      accessContext,
      "bloco:update",
      { dto: { id: currentBloco.id } },
      currentBloco.id,
    );

    const { imagem } = await this.imagemService.saveImagemCapa(file);

    const bloco = { id: currentBloco.id } as BlocoEntity;
    this.repository.merge(bloco, { imagemCapa: { id: imagem.id } });

    await this.repository.save(bloco);

    return true;
  }

  /**
   * Hook para adicionar relacionamento com Campus durante criacao
   */
  protected override async beforeCreate(
    accessContext: AccessContext,
    entity: BlocoEntity,
    dto: BlocoCreateInput,
  ): Promise<void> {
    const campus = await this.campusService.findByIdSimpleStrict(accessContext, dto.campus.id);
    this.repository.merge(entity, { campus: { id: campus.id } });
  }
}
