import { Inject, Injectable, NotFoundException, type StreamableFile } from "@nestjs/common";
import type { BlocoEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import { ArquivoService } from "@/v2/core/arquivo/application/use-cases/arquivo.service";
import { CampusService } from "@/v2/core/campus/application/use-cases/campus.service";
import { ImagemService } from "@/v2/core/imagem/application/use-cases/imagem.service";
import { BaseCrudService } from "@/v2/core/shared";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";
import type {
  BlocoCreateInputDto,
  BlocoFindOneInputDto,
  BlocoFindOneOutputDto,
  BlocoListInputDto,
  BlocoListOutputDto,
  BlocoUpdateInputDto,
} from "@/v2/server/modules/bloco/http/dto";
import type { IBlocoRepositoryPort, IBlocoUseCasePort } from "../ports";

/**
 * Service centralizado para o módulo Bloco.
 * Estende BaseCrudService para operações CRUD comuns.
 * Implementa IBlocoUseCasePort para compatibilidade com a interface existente.
 */
@Injectable()
export class BlocoService
  extends BaseCrudService<
    BlocoEntity,
    BlocoListInputDto,
    BlocoListOutputDto,
    BlocoFindOneInputDto,
    BlocoFindOneOutputDto,
    BlocoCreateInputDto,
    BlocoUpdateInputDto
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
    @Inject("IBlocoRepositoryPort")
    protected readonly repository: IBlocoRepositoryPort,
    private readonly campusService: CampusService,
    private readonly imagemService: ImagemService,
    private readonly arquivoService: ArquivoService,
  ) {
    super();
  }

  async blocoFindAll(
    accessContext: AccessContext,
    dto: BlocoListInputDto,
    selection?: string[] | boolean,
  ): Promise<BlocoListOutputDto> {
    return this.findAll(accessContext, dto, selection);
  }

  // Métodos prefixados para compatibilidade com IBlocoUseCasePort

  async blocoFindById(
    accessContext: AccessContext | null,
    dto: BlocoFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<BlocoFindOneOutputDto | null> {
    return this.findById(accessContext, dto, selection);
  }

  async blocoFindByIdStrict(
    accessContext: AccessContext | null,
    dto: BlocoFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<BlocoFindOneOutputDto> {
    return this.findByIdStrict(accessContext, dto, selection);
  }

  async blocoFindByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<BlocoFindOneOutputDto | null> {
    return this.findByIdSimple(accessContext, id, selection);
  }

  async blocoFindByIdSimpleStrict(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<BlocoFindOneOutputDto> {
    return this.findByIdSimpleStrict(accessContext, id, selection);
  }

  async blocoCreate(
    accessContext: AccessContext,
    dto: BlocoCreateInputDto,
  ): Promise<BlocoFindOneOutputDto> {
    return this.create(accessContext, dto);
  }

  async blocoUpdate(
    accessContext: AccessContext,
    dto: BlocoFindOneInputDto & BlocoUpdateInputDto,
  ): Promise<BlocoFindOneOutputDto> {
    return this.update(accessContext, dto);
  }

  async blocoDeleteOneById(
    accessContext: AccessContext,
    dto: BlocoFindOneInputDto,
  ): Promise<boolean> {
    return this.deleteOneById(accessContext, dto);
  }

  async blocoGetImagemCapa(
    accessContext: AccessContext | null,
    id: string,
  ): Promise<StreamableFile> {
    const bloco = await this.blocoFindByIdStrict(accessContext, { id });

    if (bloco.imagemCapa) {
      const [versao] = bloco.imagemCapa.versoes;

      if (versao) {
        const { arquivo } = versao;
        return this.arquivoService.getStreamableFile(null, arquivo.id, null);
      }
    }

    throw new NotFoundException();
  }

  // Métodos específicos de Bloco (não cobertos pela BaseCrudService)

  async blocoUpdateImagemCapa(
    accessContext: AccessContext,
    dto: BlocoFindOneInputDto,
    file: Express.Multer.File,
  ): Promise<boolean> {
    const currentBloco = await this.blocoFindByIdStrict(accessContext, { id: dto.id });

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
   * Hook para adicionar relacionamento com Campus durante criação
   */
  protected override async beforeCreate(
    accessContext: AccessContext,
    entity: BlocoEntity,
    dto: BlocoCreateInputDto,
  ): Promise<void> {
    const campus = await this.campusService.campusFindByIdSimpleStrict(
      accessContext,
      dto.campus.id,
    );
    this.repository.merge(entity, { campus: { id: campus.id } });
  }
}
