import { Injectable, NotFoundException } from "@nestjs/common";
import { map, pick } from "lodash";
import { FilterOperator } from "nestjs-paginate";
import { QbEfficientLoad } from "@/application/contracts/qb-efficient-load";
import { SearchService } from "@/application/helpers/search.service";
import { type IDomain } from "@/domain/contracts/integration";
import type { AccessContext } from "@/infrastructure/access-context";
import { DatabaseContextService } from "@/infrastructure/integrations/database";
import type { BlocoEntity } from "@/infrastructure/integrations/database/typeorm/entities";
import { ArquivoService } from "../../base/arquivo/arquivo.service";
import { ImagemService } from "../../base/imagem/imagem.service";
import { CampusService } from "../campus/campus.service";

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

  async blocoFindAll(accessContext: AccessContext, domain: IDomain.BlocoListInput | null = null, selection?: string[] | boolean): Promise<IDomain.BlocoListOutput["success"]> {
    // =========================================================

    const qb = this.blocoRepository.createQueryBuilder(aliasBloco);

    // =========================================================

    await accessContext.applyFilter("bloco:find", qb, aliasBloco, null);

    // =========================================================

    const paginated = await this.searchService.search(
      qb,
      domain
        ? {
            ...domain,
            sortBy: domain.sortBy ? (domain.sortBy as any[]).map((s) => (typeof s === "string" ? s : Array.isArray(s) ? s.join(":") : `${s.column}:${s.direction ?? "ASC"}`)) : undefined,
          }
        : {},
      {
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
        searchableColumns: [
          "id",

          "nome",
          "codigo",
        ],
        defaultSortBy: [
          ["nome", "ASC"],
          ["dateCreated", "ASC"],
        ],
        filterableColumns: {
          "campus.id": [FilterOperator.EQ],
        },
      },
    );

    // =========================================================

    qb.select([]);
    await QbEfficientLoad("BlocoFindOneOutput", qb, aliasBloco, selection);

    // =========================================================
    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();
    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);
    // =========================================================

    return paginated;
  }

  async blocoFindById(accessContext: AccessContext | null, domain: IDomain.BlocoFindOneInput, selection?: string[] | boolean): Promise<IDomain.BlocoFindOneOutput | null> {
    // =========================================================

    const qb = this.blocoRepository.createQueryBuilder(aliasBloco);

    // =========================================================

    if (accessContext) {
      await accessContext.applyFilter("bloco:find", qb, aliasBloco, null);
    }

    // =========================================================

    qb.andWhere(`${aliasBloco}.id = :id`, { id: domain.id });

    // =========================================================

    qb.select([]);
    await QbEfficientLoad("BlocoFindOneOutput", qb, aliasBloco, selection);

    // =========================================================

    const bloco = await qb.getOne();

    // =========================================================

    return bloco;
  }

  async blocoFindByIdStrict(accessContext: AccessContext | null, domain: IDomain.BlocoFindOneInput, selection?: string[] | boolean) {
    const bloco = await this.blocoFindById(accessContext, domain, selection);

    if (!bloco) {
      throw new NotFoundException();
    }

    return bloco;
  }

  async blocoFindByIdSimple(accessContext: AccessContext, id: IDomain.BlocoFindOneInput["id"], selection?: string[]): Promise<IDomain.BlocoFindOneOutput | null> {
    // =========================================================

    const qb = this.blocoRepository.createQueryBuilder(aliasBloco);

    // =========================================================

    await accessContext.applyFilter("bloco:find", qb, aliasBloco, null);

    // =========================================================

    qb.andWhere(`${aliasBloco}.id = :id`, { id });

    // =========================================================

    qb.select([]);
    await QbEfficientLoad("BlocoFindOneOutput", qb, aliasBloco, selection);

    // =========================================================

    const bloco = await qb.getOne();

    // =========================================================

    return bloco;
  }

  async blocoFindByIdSimpleStrict(accessContext: AccessContext, id: IDomain.BlocoFindOneInput["id"], selection?: string[]) {
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

  async blocoUpdateImagemCapa(accessContext: AccessContext, domain: IDomain.BlocoFindOneInput, file: Express.Multer.File) {
    // =========================================================

    const currentBloco = await this.blocoFindByIdStrict(accessContext, {
      id: domain.id,
    });

    // =========================================================

    await accessContext.ensurePermission("bloco:update", { dto: { id: currentBloco.id } }, currentBloco.id, this.blocoRepository.createQueryBuilder(aliasBloco));

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

  async blocoCreate(accessContext: AccessContext, domain: IDomain.BlocoCreateInput) {
    // =========================================================

    await accessContext.ensurePermission("bloco:create", { dto: domain });

    // =========================================================

    const dtoBloco = pick(domain, ["nome", "codigo"]);

    const bloco = this.blocoRepository.create();

    this.blocoRepository.merge(bloco, {
      ...dtoBloco,
    });

    // =========================================================

    const campus = await this.campusService.campusFindByIdSimpleStrict(accessContext, domain.body.campus.id);

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

  async blocoUpdate(accessContext: AccessContext, domain: IDomain.BlocoUpdateInput) {
    // =========================================================

    const currentBloco = await this.blocoFindByIdStrict(accessContext, { id: domain.id });

    // =========================================================

    await accessContext.ensurePermission("bloco:update", { dto: domain }, domain.id, this.blocoRepository.createQueryBuilder(aliasBloco));

    // =========================================================

    const dtoBloco = pick(domain, ["nome", "codigo"]);

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

  async blocoDeleteOneById(accessContext: AccessContext, domain: IDomain.BlocoFindOneInput) {
    // =========================================================

    await accessContext.ensurePermission("bloco:delete", { dto: domain }, domain.id, this.blocoRepository.createQueryBuilder(aliasBloco));

    // =========================================================

    const bloco = await this.blocoFindByIdStrict(accessContext, domain);

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
