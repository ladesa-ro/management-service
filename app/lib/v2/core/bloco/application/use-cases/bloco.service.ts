import { Injectable, NotFoundException } from "@nestjs/common";
import { map, pick } from "lodash";
import { FilterOperator } from "nestjs-paginate";
import { ArquivoService } from "@/v2/core/arquivo/application/use-cases/arquivo.service";
import { CampusService } from "@/v2/core/campus/application/use-cases/campus.service";
import { ImagemService } from "@/v2/core/imagem/application/use-cases/imagem.service";
import type { AccessContext } from "@/infrastructure/access-context";
import { DatabaseContextService } from "@/v2/adapters/out/persistence/typeorm";
import type { BlocoEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import { QbEfficientLoad, SearchService } from "@/shared";
import type {
  BlocoCreateInputDto,
  BlocoFindOneInputDto,
  BlocoFindOneOutputDto,
  BlocoListInputDto,
  BlocoListOutputDto,
  BlocoUpdateInputDto,
} from "@/v2/adapters/in/http/bloco/dto";

// ============================================================================

const aliasBloco = "bloco";

// ============================================================================

@Injectable()
export class BlocoService {
  constructor(
    private campusService: CampusService,
    private databaseContext: DatabaseContextService,
    private imagemService: ImagemService,
    private arquivoService: ArquivoService,
    private searchService: SearchService,
  ) {}

  get blocoRepository() {
    return this.databaseContext.blocoRepository;
  }

  async blocoFindAll(accessContext: AccessContext, dto: BlocoListInputDto, selection?: string[] | boolean): Promise<BlocoListOutputDto> {
    // =========================================================

    const qb = this.blocoRepository.createQueryBuilder(aliasBloco);

    // =========================================================

    await accessContext.applyFilter("bloco:find", qb, aliasBloco, null);

    // =========================================================

    const paginated = await this.searchService.search(qb, dto, {
      select: [
        "id",

        "nome",
        "codigo",
        "dateCreated",

        "campus.id",
        "campus.razaoSocial",
        "campus.nomeFantasia",
      ],
      relations: {
        campus: true,
      },
      sortableColumns: [
        "nome",
        "codigo",
        "dateCreated",

        "campus.id",
        "campus.razaoSocial",
        "campus.nomeFantasia",
      ],
      searchableColumns: ["id", "nome", "codigo"],
      defaultSortBy: [
        ["nome", "ASC"],
        ["dateCreated", "ASC"],
      ],
      filterableColumns: {
        "campus.id": [FilterOperator.EQ],
      },
    });

    // =========================================================

    qb.select([]);
    QbEfficientLoad("BlocoFindOneOutput", qb, aliasBloco, selection);

    // =========================================================
    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();
    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);
    // =========================================================

    return paginated as unknown as BlocoListOutputDto;
  }

  async blocoFindById(accessContext: AccessContext | null, dto: BlocoFindOneInputDto, selection?: string[] | boolean): Promise<BlocoFindOneOutputDto | null> {
    // =========================================================

    const qb = this.blocoRepository.createQueryBuilder(aliasBloco);

    // =========================================================

    if (accessContext) {
      await accessContext.applyFilter("bloco:find", qb, aliasBloco, null);
    }

    // =========================================================

    qb.andWhere(`${aliasBloco}.id = :id`, { id: dto.id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad("BlocoFindOneOutput", qb, aliasBloco, selection);

    // =========================================================

    const bloco = await qb.getOne();

    // =========================================================

    return bloco as BlocoFindOneOutputDto | null;
  }

  async blocoFindByIdStrict(accessContext: AccessContext | null, dto: BlocoFindOneInputDto, selection?: string[] | boolean): Promise<BlocoFindOneOutputDto> {
    const bloco = await this.blocoFindById(accessContext, dto, selection);

    if (!bloco) {
      throw new NotFoundException();
    }

    return bloco;
  }

  async blocoFindByIdSimple(accessContext: AccessContext, id: string, selection?: string[]): Promise<BlocoFindOneOutputDto | null> {
    // =========================================================

    const qb = this.blocoRepository.createQueryBuilder(aliasBloco);

    // =========================================================

    await accessContext.applyFilter("bloco:find", qb, aliasBloco, null);

    // =========================================================

    qb.andWhere(`${aliasBloco}.id = :id`, { id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad("BlocoFindOneOutput", qb, aliasBloco, selection);

    // =========================================================

    const bloco = await qb.getOne();

    // =========================================================

    return bloco as BlocoFindOneOutputDto | null;
  }

  async blocoFindByIdSimpleStrict(accessContext: AccessContext, id: string, selection?: string[]): Promise<BlocoFindOneOutputDto> {
    const bloco = await this.blocoFindByIdSimple(accessContext, id, selection);

    if (!bloco) {
      throw new NotFoundException();
    }

    return bloco;
  }

  async blocoGetImagemCapa(accessContext: AccessContext | null, id: string) {
    const bloco = await this.blocoFindByIdStrict(accessContext, { id: id });

    if (bloco.imagemCapa) {
      const [versao] = bloco.imagemCapa.versoes;

      if (versao) {
        const { arquivo } = versao;
        return this.arquivoService.getStreamableFile(null, arquivo.id, null);
      }
    }

    throw new NotFoundException();
  }

  async blocoUpdateImagemCapa(accessContext: AccessContext, dto: BlocoFindOneInputDto, file: Express.Multer.File): Promise<boolean> {
    // =========================================================

    const currentBloco = await this.blocoFindByIdStrict(accessContext, {
      id: dto.id,
    });

    // =========================================================

    await accessContext.ensurePermission("bloco:update", { dto: { id: currentBloco.id } }, currentBloco.id, this.blocoRepository.createQueryBuilder(aliasBloco as any));

    // =========================================================

    const { imagem } = await this.imagemService.saveBlocoCapa(file);

    const bloco = {
      id: currentBloco.id,
    } as BlocoEntity;

    this.blocoRepository.merge(bloco, {
      imagemCapa: {
        id: imagem.id,
      },
    });

    await this.blocoRepository.save(bloco);

    // =========================================================

    return true;
  }

  async blocoCreate(accessContext: AccessContext, dto: BlocoCreateInputDto): Promise<BlocoFindOneOutputDto> {
    // =========================================================

    await accessContext.ensurePermission("bloco:create", { dto } as any);

    // =========================================================

    const dtoBloco = pick(dto, ["nome", "codigo"]);

    const bloco = this.blocoRepository.create();

    this.blocoRepository.merge(bloco, {
      ...dtoBloco,
    });

    // =========================================================

    const campus = await this.campusService.campusFindByIdSimpleStrict(accessContext, dto.campus.id);

    this.blocoRepository.merge(bloco, {
      campus: {
        id: campus.id,
      },
    });

    // =========================================================

    await this.blocoRepository.save(bloco);

    // =========================================================

    return this.blocoFindByIdStrict(accessContext, { id: bloco.id });
  }

  async blocoUpdate(accessContext: AccessContext, dto: BlocoFindOneInputDto & BlocoUpdateInputDto): Promise<BlocoFindOneOutputDto> {
    // =========================================================

    const currentBloco = await this.blocoFindByIdStrict(accessContext, { id: dto.id });

    // =========================================================

    await accessContext.ensurePermission("bloco:update", { dto }, dto.id, this.blocoRepository.createQueryBuilder(aliasBloco as any));

    // =========================================================

    const dtoBloco = pick(dto, ["nome", "codigo"]);

    const bloco = {
      id: currentBloco.id,
    } as BlocoEntity;

    this.blocoRepository.merge(bloco, {
      ...dtoBloco,
    });

    // =========================================================

    await this.blocoRepository.save(bloco);

    // =========================================================

    return this.blocoFindByIdStrict(accessContext, { id: bloco.id });
  }

  async blocoDeleteOneById(accessContext: AccessContext, dto: BlocoFindOneInputDto): Promise<boolean> {
    // =========================================================

    await accessContext.ensurePermission("bloco:delete", { dto }, dto.id, this.blocoRepository.createQueryBuilder(aliasBloco as any));

    // =========================================================

    const bloco = await this.blocoFindByIdStrict(accessContext, dto);

    // =========================================================

    if (bloco) {
      await this.blocoRepository
        .createQueryBuilder(aliasBloco)
        .update()
        .set({
          dateDeleted: "NOW()",
        })
        .where("id = :blocoId", { blocoId: bloco.id })
        .andWhere("dateDeleted IS NULL")
        .execute();
    }

    // =========================================================

    return true;
  }
}
