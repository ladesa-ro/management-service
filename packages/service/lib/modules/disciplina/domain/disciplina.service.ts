import { Injectable, NotFoundException } from "@nestjs/common";
import { map, pick } from "lodash";
import { FilterOperator, FilterSuffix } from "nestjs-paginate";
import { QbEfficientLoad } from "@/contracts/qb-efficient-load";
import { SearchService } from "@/legacy/application/helpers/search.service";
import { type IDomain } from "@/legacy/domain/contracts/integration";
import { ArquivoService } from "@/modules/arquivo/arquivo.service";
import { ImagemService } from "@/modules/imagem/imagem.service";
import type { AccessContext } from "@/shared/infrastructure/access-context";
import { paginateConfig } from "@/shared/infrastructure/fixtures";
import { DatabaseContextService } from "@/shared/infrastructure/integrations/database";
import type { DisciplinaEntity } from "@/shared/infrastructure/integrations/database/typeorm/entities";

// ============================================================================

const aliasDisciplina = "disciplina";

// ============================================================================

@Injectable()
export class DisciplinaService {
  constructor(
    private databaseContext: DatabaseContextService,
    private imagemService: ImagemService,
    private arquivoService: ArquivoService,
    private searchService: SearchService,
  ) {}

  get disciplinaRepository() {
    return this.databaseContext.disciplinaRepository;
  }

  async disciplinaFindAll(accessContext: AccessContext, domain: IDomain.DisciplinaListInput | null = null, selection?: string[] | boolean): Promise<IDomain.DisciplinaListOutput["success"]> {
    // =========================================================

    const qb = this.disciplinaRepository.createQueryBuilder(aliasDisciplina);

    // =========================================================

    await accessContext.applyFilter("disciplina:find", qb, aliasDisciplina, null);

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
        ...paginateConfig,
        relations: { diarios: true },
        select: [
          "id",

          "nome",
          "nomeAbreviado",
          "cargaHoraria",
        ],
        sortableColumns: ["nome", "cargaHoraria"],
        searchableColumns: [
          "id",

          "nome",
          "nomeAbreviado",
          "cargaHoraria",
        ],
        defaultSortBy: [["nome", "ASC"]],
        filterableColumns: {
          "diarios.id": [FilterOperator.EQ, FilterOperator.NULL, FilterSuffix.NOT],
        },
      },
    );

    // =========================================================

    qb.select([]);
    await QbEfficientLoad("DisciplinaFindOneOutput", qb, aliasDisciplina, selection);

    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();
    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);

    // =========================================================

    return paginated;
  }

  async disciplinaFindById(accessContext: AccessContext | null, domain: IDomain.DisciplinaFindOneInput, selection?: string[] | boolean): Promise<IDomain.DisciplinaFindOneOutput | null> {
    // =========================================================

    const qb = this.disciplinaRepository.createQueryBuilder(aliasDisciplina);

    // =========================================================

    if (accessContext) {
      await accessContext.applyFilter("disciplina:find", qb, aliasDisciplina, null);
    }

    // =========================================================

    qb.andWhere(`${aliasDisciplina}.id = :id`, { id: domain.id });

    // =========================================================

    qb.select([]);
    await QbEfficientLoad("DisciplinaFindOneOutput", qb, aliasDisciplina, selection);

    // =========================================================

    const disciplina = await qb.getOne();

    // =========================================================

    return disciplina;
  }

  async disciplinaFindByIdStrict(accessContext: AccessContext | null, domain: IDomain.DisciplinaFindOneInput, selection?: string[] | boolean) {
    const disciplina = await this.disciplinaFindById(accessContext, domain, selection);

    if (!disciplina) {
      throw new NotFoundException();
    }

    return disciplina;
  }

  async disciplinaFindByIdSimple(accessContext: AccessContext, id: IDomain.DisciplinaFindOneInput["id"], selection?: string[] | boolean): Promise<IDomain.DisciplinaFindOneOutput | null> {
    // =========================================================

    const qb = this.disciplinaRepository.createQueryBuilder(aliasDisciplina);

    // =========================================================

    await accessContext.applyFilter("disciplina:find", qb, aliasDisciplina, null);

    // =========================================================

    qb.andWhere(`${aliasDisciplina}.id = :id`, { id });

    // =========================================================

    qb.select([]);
    await QbEfficientLoad("DisciplinaFindOneOutput", qb, aliasDisciplina, selection);

    // =========================================================

    const disciplina = await qb.getOne();

    // =========================================================

    return disciplina;
  }

  async disciplinaFindByIdSimpleStrict(accessContext: AccessContext, id: IDomain.DisciplinaFindOneInput["id"], selection?: string[]) {
    const disciplina = await this.disciplinaFindByIdSimple(accessContext, id, selection);

    if (!disciplina) {
      throw new NotFoundException();
    }

    return disciplina;
  }

  async disciplinaCreate(accessContext: AccessContext, domain: IDomain.DisciplinaCreateInput) {
    // =========================================================

    await accessContext.ensurePermission("disciplina:create", { dto: domain });

    // =========================================================

    const dtoDisciplina = pick(domain, ["nome", "nomeAbreviado", "cargaHoraria"]);

    const disciplina = this.disciplinaRepository.create();

    this.disciplinaRepository.merge(disciplina, {
      ...dtoDisciplina,
    });

    // =========================================================

    await this.disciplinaRepository.save(disciplina);

    // =========================================================

    return this.disciplinaFindByIdStrict(accessContext, { id: disciplina.id });
  }

  async disciplinaUpdate(accessContext: AccessContext, domain: IDomain.DisciplinaUpdateInput) {
    // =========================================================

    const currentDisciplina = await this.disciplinaFindByIdStrict(accessContext, { id: domain.id });

    // =========================================================

    await accessContext.ensurePermission("disciplina:update", { dto: domain }, domain.id, this.disciplinaRepository.createQueryBuilder(aliasDisciplina));

    const dtoDisciplina = pick(domain, ["nome", "nomeAbreviado", "cargaHoraria"]);

    const disciplina = {
      id: currentDisciplina.id,
    } as DisciplinaEntity;

    this.disciplinaRepository.merge(disciplina, {
      ...dtoDisciplina,
    });

    // =========================================================

    await this.disciplinaRepository.save(disciplina);

    // =========================================================

    return this.disciplinaFindByIdStrict(accessContext, { id: disciplina.id });
  }

  async disciplinaGetImagemCapa(accessContext: AccessContext | null, id: string) {
    const disciplina = await this.disciplinaFindByIdStrict(accessContext, {
      id: id,
    });

    if (disciplina.imagemCapa) {
      const [versao] = disciplina.imagemCapa.versoes;

      if (versao) {
        const { arquivo } = versao;
        return this.arquivoService.getStreamableFile(null, arquivo.id, null);
      }
    }

    throw new NotFoundException();
  }

  async disciplinaUpdateImagemCapa(accessContext: AccessContext, domain: IDomain.DisciplinaFindOneInput, file: Express.Multer.File) {
    // =========================================================

    const currentDisciplina = await this.disciplinaFindByIdStrict(accessContext, { id: domain.id });

    // =========================================================

    await accessContext.ensurePermission(
      "disciplina:update",
      {
        dto: {
          id: currentDisciplina.id,
        },
      },
      currentDisciplina.id,
    );

    // =========================================================

    const { imagem } = await this.imagemService.saveDisciplinaCapa(file);

    const disciplina = this.disciplinaRepository.merge(this.disciplinaRepository.create(), {
      id: currentDisciplina.id,
    });

    this.disciplinaRepository.merge(disciplina, {
      imagemCapa: {
        id: imagem.id,
      },
    });

    await this.disciplinaRepository.save(disciplina);

    // =========================================================

    return true;
  }

  async disciplinaDeleteOneById(accessContext: AccessContext, domain: IDomain.DisciplinaFindOneInput) {
    // =========================================================

    await accessContext.ensurePermission("disciplina:delete", { dto: domain }, domain.id, this.disciplinaRepository.createQueryBuilder(aliasDisciplina));

    // =========================================================

    const disciplina = await this.disciplinaFindByIdStrict(accessContext, domain);

    // =========================================================

    if (disciplina) {
      await this.disciplinaRepository
        .createQueryBuilder(aliasDisciplina)
        .update()
        .set({
          dateDeleted: "NOW()",
        })
        .where("id = :disciplinaId", { disciplinaId: disciplina.id })
        .andWhere("dateDeleted IS NULL")
        .execute();
    }

    // =========================================================

    return true;
  }
}
