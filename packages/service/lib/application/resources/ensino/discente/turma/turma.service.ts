import { Injectable, NotFoundException } from "@nestjs/common";
import { has, map, pick } from "lodash";
import { FilterOperator } from "nestjs-paginate";
import { QbEfficientLoad } from "@/application/contracts/qb-efficient-load";
import { SearchService } from "@/application/helpers/search.service";
import { CursoService } from "@/application/resources/ensino/institucional/curso/curso.service";
import { type IDomain } from "@/domain/contracts/integration";
import type { AccessContext } from "@/infrastructure/access-context";
import { paginateConfig } from "@/infrastructure/fixtures";
import { DatabaseContextService } from "@/infrastructure/integrations/database";
import type { TurmaEntity } from "@/infrastructure/integrations/database/typeorm/entities";
import { AmbienteService } from "../../../ambientes/ambiente/ambiente.service";
import { ArquivoService } from "../../../base/arquivo/arquivo.service";
import { ImagemService } from "../../../base/imagem/imagem.service";

// ============================================================================

const aliasTurma = "turma";

// ============================================================================

@Injectable()
export class TurmaService {
  constructor(
    private databaseContext: DatabaseContextService,
    private ambienteService: AmbienteService,
    private cursoService: CursoService,
    private imagemService: ImagemService,
    private arquivoService: ArquivoService,
    private searchService: SearchService,
  ) {}

  get turmaRepository() {
    return this.databaseContext.turmaRepository;
  }

  async turmaFindAll(accessContext: AccessContext, domain: IDomain.TurmaListInput | null = null, selection?: string[] | boolean): Promise<IDomain.TurmaListOutput["success"]> {
    // =========================================================

    const qb = this.turmaRepository.createQueryBuilder(aliasTurma);

    // =========================================================

    await accessContext.applyFilter("turma:find", qb, aliasTurma, null);

    // =========================================================

    const paginated = await this.searchService.search(
      qb,
      {
        ...domain,
        sortBy: domain?.sortBy ? (domain.sortBy as any[]).map(String) : undefined,
      },
      {
        ...paginateConfig,
        select: [
          "id",

          "periodo",
        ],
        sortableColumns: [
          "periodo",

          "ambientePadraoAula.nome",
          "ambientePadraoAula.descricao",
          "ambientePadraoAula.codigo",
          "ambientePadraoAula.capacidade",
          "ambientePadraoAula.tipo",

          "curso.nome",
          "curso.nomeAbreviado",
          "curso.campus.id",
          "curso.modalidade.id",
          "curso.modalidade.nome",
        ],
        relations: {
          curso: {
            campus: true,
          },
          ambientePadraoAula: true,
        },
        searchableColumns: [
          "id",

          "periodo",
        ],
        defaultSortBy: [["periodo", "ASC"]],
        filterableColumns: {
          "ambientePadraoAula.nome": [FilterOperator.EQ],
          "ambientePadraoAula.codigo": [FilterOperator.EQ],
          "ambientePadraoAula.capacidade": [FilterOperator.EQ, FilterOperator.GT, FilterOperator.GTE, FilterOperator.LT, FilterOperator.LTE],
          "ambientePadraoAula.tipo": [FilterOperator.EQ],

          "curso.id": [FilterOperator.EQ],
          "curso.nome": [FilterOperator.EQ],
          "curso.nomeAbreviado": [FilterOperator.EQ],
          "curso.campus.id": [FilterOperator.EQ],
          "curso.modalidade.id": [FilterOperator.EQ],
          "curso.modalidade.nome": [FilterOperator.EQ],
          "curso.modalidade.slug": [FilterOperator.EQ],
        },
      },
    );

    // =========================================================

    qb.select([]);
    await QbEfficientLoad("TurmaFindOneOutput", qb, aliasTurma, selection);

    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();
    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);

    // =========================================================

    return paginated;
  }

  async turmaFindById(accessContext: AccessContext | null, domain: IDomain.TurmaFindOneInput, selection?: string[] | boolean): Promise<IDomain.TurmaFindOneOutput | null> {
    // =========================================================

    const qb = this.turmaRepository.createQueryBuilder(aliasTurma);

    // =========================================================

    if (accessContext) {
      await accessContext.applyFilter("turma:find", qb, aliasTurma, null);
    }

    // =========================================================

    qb.andWhere(`${aliasTurma}.id = :id`, { id: domain.id });

    // =========================================================

    qb.select([]);
    await QbEfficientLoad("TurmaFindOneOutput", qb, aliasTurma, selection);

    // =========================================================

    const turma = await qb.getOne();

    // =========================================================

    return turma;
  }

  async turmaFindByIdStrict(accessContext: AccessContext | null, domain: IDomain.TurmaFindOneInput, selection?: string[] | boolean) {
    const turma = await this.turmaFindById(accessContext, domain, selection);

    if (!turma) {
      throw new NotFoundException();
    }

    return turma;
  }

  async turmaFindByIdSimple(accessContext: AccessContext, id: IDomain.TurmaFindOneInput["id"], selection?: string[]): Promise<IDomain.TurmaFindOneOutput | null> {
    // =========================================================

    const qb = this.turmaRepository.createQueryBuilder(aliasTurma);

    // =========================================================

    await accessContext.applyFilter("turma:find", qb, aliasTurma, null);

    // =========================================================

    qb.andWhere(`${aliasTurma}.id = :id`, { id });

    // =========================================================

    qb.select([]);
    await QbEfficientLoad("TurmaFindOneOutput", qb, aliasTurma, selection);

    // =========================================================

    const turma = await qb.getOne();

    // =========================================================

    return turma;
  }

  async turmaFindByIdSimpleStrict(accessContext: AccessContext, id: IDomain.TurmaFindOneInput["id"], selection?: string[]) {
    const turma = await this.turmaFindByIdSimple(accessContext, id, selection);

    if (!turma) {
      throw new NotFoundException();
    }

    return turma;
  }

  async turmaCreate(accessContext: AccessContext, domain: IDomain.TurmaCreateInput) {
    // =========================================================

    await accessContext.ensurePermission("turma:create", { dto: domain });

    // =========================================================

    const dtoTurma = pick(domain, ["periodo"]);

    const turma = this.turmaRepository.create();

    this.turmaRepository.merge(turma, {
      ...dtoTurma,
    });

    // =========================================================

    if (domain.ambientePadraoAula) {
      const ambientePadraoAula = await this.ambienteService.ambienteFindByIdStrict(accessContext, {
        id: domain.ambientePadraoAula.id,
      });

      this.turmaRepository.merge(turma, {
        ambientePadraoAula: {
          id: ambientePadraoAula.id,
        },
      });
    } else {
      this.turmaRepository.merge(turma, {
        ambientePadraoAula: null,
      });
    }

    // =========================================================

    const curso = await this.cursoService.cursoFindByIdSimpleStrict(accessContext, domain.body.curso.id);

    this.turmaRepository.merge(turma, {
      curso: {
        id: curso.id,
      },
    });

    // =========================================================

    await this.turmaRepository.save(turma);

    // =========================================================

    return this.turmaFindByIdStrict(accessContext, { id: turma.id });
  }

  async turmaUpdate(accessContext: AccessContext, domain: IDomain.TurmaUpdateInput) {
    // =========================================================

    const currentTurma = await this.turmaFindByIdStrict(accessContext, { id: domain.id });

    // =========================================================

    await accessContext.ensurePermission("turma:update", { dto: domain }, domain.id, this.turmaRepository.createQueryBuilder(aliasTurma));

    const dtoTurma = pick(domain, ["periodo"]);

    const turma = {
      id: currentTurma.id,
    } as TurmaEntity;

    this.turmaRepository.merge(turma, {
      ...dtoTurma,
    });

    // =========================================================

    if (has(domain, "ambientePadraoAula") && domain.ambientePadraoAula !== undefined) {
      if (domain.ambientePadraoAula !== null) {
        const ambientePadraoAula = await this.ambienteService.ambienteFindByIdStrict(accessContext, {
          id: domain.ambientePadraoAula.id,
        });

        this.turmaRepository.merge(turma, {
          ambientePadraoAula: {
            id: ambientePadraoAula.id,
          },
        });
      } else {
        this.turmaRepository.merge(turma, {
          ambientePadraoAula: null,
        });
      }
    }

    // =========================================================

    if (has(domain, "curso") && domain.curso !== undefined) {
      const curso = await this.cursoService.cursoFindByIdSimpleStrict(accessContext, domain.body.curso.id);

      this.turmaRepository.merge(turma, {
        curso: {
          id: curso.id,
        },
      });
    }

    // =========================================================

    await this.turmaRepository.save(turma);

    // =========================================================

    return this.turmaFindByIdStrict(accessContext, { id: turma.id });
  }

  async turmaGetImagemCapa(accessContext: AccessContext | null, id: string) {
    const turma = await this.turmaFindByIdStrict(accessContext, { id: id });

    if (turma.imagemCapa) {
      const [versao] = turma.imagemCapa.versoes;

      if (versao) {
        const { arquivo } = versao;
        return this.arquivoService.getStreamableFile(null, arquivo.id, null);
      }
    }

    throw new NotFoundException();
  }

  async turmaUpdateImagemCapa(accessContext: AccessContext, domain: IDomain.TurmaFindOneInput, file: Express.Multer.File) {
    // =========================================================

    const currentTurma = await this.turmaFindByIdStrict(accessContext, {
      id: domain.id,
    });

    // =========================================================

    await accessContext.ensurePermission(
      "turma:update",
      {
        dto: {
          id: currentTurma.id,
        },
      },
      currentTurma.id,
    );

    // =========================================================

    const { imagem } = await this.imagemService.saveTurmaCapa(file);

    const turma = this.turmaRepository.merge(this.turmaRepository.create(), {
      id: currentTurma.id,
    });

    this.turmaRepository.merge(turma, {
      imagemCapa: {
        id: imagem.id,
      },
    });

    await this.turmaRepository.save(turma);

    // =========================================================

    return true;
  }

  async turmaDeleteOneById(accessContext: AccessContext, domain: IDomain.TurmaFindOneInput) {
    // =========================================================

    await accessContext.ensurePermission("turma:delete", { dto: domain }, domain.id, this.turmaRepository.createQueryBuilder(aliasTurma));

    // =========================================================

    const turma = await this.turmaFindByIdStrict(accessContext, domain);

    // =========================================================

    if (turma) {
      await this.turmaRepository
        .createQueryBuilder(aliasTurma)
        .update()
        .set({
          dateDeleted: "NOW()",
        })
        .where("id = :turmaId", { turmaId: turma.id })
        .andWhere("dateDeleted IS NULL")
        .execute();
    }

    // =========================================================

    return true;
  }
}
