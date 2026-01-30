import { Inject, Injectable, NotFoundException, type StreamableFile } from "@nestjs/common";
import { ResourceNotFoundError } from "@/core/@shared";
import type { BlocoEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import { ArquivoService } from "@/core/arquivo/application/use-cases/arquivo.service";
import { CampusService } from "@/core/campus";
import { ImagemService } from "@/core/imagem/application/use-cases/imagem.service";
import { BaseCrudService } from "@/v2/core/shared";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";
import type {
  BlocoCreateInput,
  BlocoFindOneInput,
  BlocoFindOneOutput,
  BlocoListInput,
  BlocoListOutput,
  BlocoUpdateInput,
} from "@/core/bloco/application/dtos";
import {
  BLOCO_REPOSITORY_PORT,
  type IBlocoRepositoryPort,
  type IBlocoUseCasePort,
} from "@/core/bloco/application/ports";

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
      const [versao] = bloco.imagemCapa.versoes;

      if (versao) {
        const { arquivo } = versao;
        return this.arquivoService.getStreamableFile(null, { id: arquivo.id });
      }
    }

    throw new NotFoundException();
  }

  async updateImagemCapa(
    accessContext: AccessContext,
    dto: BlocoFindOneInput,
    file: Express.Multer.File,
  ): Promise<boolean> {
    const currentBloco = await this.findByIdStrict(accessContext, { id: dto.id });

    await accessContext.ensurePermission(
      "bloco:update",
      { dto: { id: currentBloco.id } },
      currentBloco.id,
    );

    const { imagem } = await this.imagemService.saveBlocoCapa(file);

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
    const campus = await this.campusService.campusFindByIdSimpleStrict(
      accessContext,
      dto.campus.id,
    );
    this.repository.merge(entity, { campus: { id: campus.id } });
  }

  /**
   * Override findByIdStrict to use ResourceNotFoundError
   */
  override async findByIdStrict(
    accessContext: AccessContext | null,
    dto: BlocoFindOneInput,
    selection?: string[] | boolean,
  ): Promise<BlocoFindOneOutput> {
    const result = await this.findById(accessContext, dto, selection);

    if (!result) {
      throw new ResourceNotFoundError("Bloco", dto.id);
    }

    return result;
  }

  /**
   * Override findByIdSimpleStrict to use ResourceNotFoundError
   */
  override async findByIdSimpleStrict(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<BlocoFindOneOutput> {
    const result = await this.findByIdSimple(accessContext, id, selection);

    if (!result) {
      throw new ResourceNotFoundError("Bloco", id);
    }

    return result;
  }
}
