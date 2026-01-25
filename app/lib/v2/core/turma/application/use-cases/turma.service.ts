import { Injectable, NotFoundException } from "@nestjs/common";
import { has, map, pick } from "lodash";
import { FilterOperator } from "nestjs-paginate";
import { AmbienteService } from "@/v2/core/ambiente/application/use-cases/ambiente.service";
import { ArquivoService } from "@/v2/core/arquivo/application/use-cases/arquivo.service";
import { CursoService } from "@/v2/core/curso/application/use-cases/curso.service";
import { ImagemService } from "@/v2/core/imagem/application/use-cases/imagem.service";
import type { AccessContext } from "@/infrastructure/access-context";
import { paginateConfig } from "@/infrastructure/fixtures";
import { DatabaseContextService } from "@/v2/adapters/out/persistence/typeorm";
import type { TurmaEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import { QbEfficientLoad, SearchService } from "@/shared";
import type {
  TurmaCreateInputDto,
  TurmaFindOneInputDto,
  TurmaFindOneOutputDto,
  TurmaListInputDto,
  TurmaListOutputDto,
  TurmaUpdateInputDto,
} from "@/v2/adapters/in/http/turma/dto";

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

  async turmaFindAll(accessContext: AccessContext, dto: TurmaListInputDto | null = null, selection?: string[] | boolean): Promise<TurmaListOutputDto> {
    // =========================================================

    const qb = this.turmaRepository.createQueryBuilder(aliasTurma);

    // =========================================================

    await accessContext.applyFilter("turma:find", qb, aliasTurma, null);

    // =========================================================

    const paginated = await this.searchService.search(
      qb,
      {
        ...dto,
        sortBy: dto?.sortBy ? (dto.sortBy as any[]).map(String) : undefined,
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

          "curso.ofertaFormacao.id": [FilterOperator.EQ],
          "curso.ofertaFormacao.nome": [FilterOperator.EQ],
          "curso.ofertaFormacao.slug": [FilterOperator.EQ],
        },
      },
    );

    // =========================================================

    qb.select([]);
    QbEfficientLoad("TurmaFindOneOutput", qb, aliasTurma, selection);

    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();
    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);

    // =========================================================

    return paginated as TurmaListOutputDto;
  }

  async turmaFindById(accessContext: AccessContext | null, dto: TurmaFindOneInputDto, selection?: string[] | boolean): Promise<TurmaFindOneOutputDto | null> {
    // =========================================================

    const qb = this.turmaRepository.createQueryBuilder(aliasTurma);

    // =========================================================

    if (accessContext) {
      await accessContext.applyFilter("turma:find", qb, aliasTurma, null);
    }

    // =========================================================

    qb.andWhere(`${aliasTurma}.id = :id`, { id: dto.id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad("TurmaFindOneOutput", qb, aliasTurma, selection);

    // =========================================================

    const turma = await qb.getOne();

    // =========================================================

    return turma as TurmaFindOneOutputDto | null;
  }

  async turmaFindByIdStrict(accessContext: AccessContext | null, dto: TurmaFindOneInputDto, selection?: string[] | boolean): Promise<TurmaFindOneOutputDto> {
    const turma = await this.turmaFindById(accessContext, dto, selection);

    if (!turma) {
      throw new NotFoundException();
    }

    return turma;
  }

  async turmaFindByIdSimple(accessContext: AccessContext, id: TurmaFindOneInputDto["id"], selection?: string[]): Promise<TurmaFindOneOutputDto | null> {
    // =========================================================

    const qb = this.turmaRepository.createQueryBuilder(aliasTurma);

    // =========================================================

    await accessContext.applyFilter("turma:find", qb, aliasTurma, null);

    // =========================================================

    qb.andWhere(`${aliasTurma}.id = :id`, { id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad("TurmaFindOneOutput", qb, aliasTurma, selection);

    // =========================================================

    const turma = await qb.getOne();

    // =========================================================

    return turma as TurmaFindOneOutputDto | null;
  }

  async turmaFindByIdSimpleStrict(accessContext: AccessContext, id: TurmaFindOneInputDto["id"], selection?: string[]): Promise<TurmaFindOneOutputDto> {
    const turma = await this.turmaFindByIdSimple(accessContext, id, selection);

    if (!turma) {
      throw new NotFoundException();
    }

    return turma;
  }

  async turmaCreate(accessContext: AccessContext, dto: TurmaCreateInputDto): Promise<TurmaFindOneOutputDto> {
    // =========================================================

    await accessContext.ensurePermission("turma:create", { dto });

    // =========================================================

    const dtoTurma = pick(dto, ["periodo"]);

    const turma = this.turmaRepository.create();

    this.turmaRepository.merge(turma, {
      ...dtoTurma,
    });

    // =========================================================

    if (dto.ambientePadraoAula) {
      const ambientePadraoAula = await this.ambienteService.ambienteFindByIdStrict(accessContext, {
        id: dto.ambientePadraoAula.id,
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

    const curso = await this.cursoService.cursoFindByIdSimpleStrict(accessContext, dto.curso.id);

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

  async turmaUpdate(accessContext: AccessContext, dto: TurmaFindOneInputDto & TurmaUpdateInputDto): Promise<TurmaFindOneOutputDto> {
    // =========================================================

    const currentTurma = await this.turmaFindByIdStrict(accessContext, { id: dto.id });

    // =========================================================

    await accessContext.ensurePermission("turma:update", { dto }, dto.id, this.turmaRepository.createQueryBuilder(aliasTurma));

    const dtoTurma = pick(dto, ["periodo"]);

    const turma = {
      id: currentTurma.id,
    } as TurmaEntity;

    this.turmaRepository.merge(turma, {
      ...dtoTurma,
    });

    // =========================================================

    if (has(dto, "ambientePadraoAula") && dto.ambientePadraoAula !== undefined) {
      if (dto.ambientePadraoAula !== null) {
        const ambientePadraoAula = await this.ambienteService.ambienteFindByIdStrict(accessContext, {
          id: dto.ambientePadraoAula.id,
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

    if (has(dto, "curso") && dto.curso !== undefined) {
      const curso = await this.cursoService.cursoFindByIdSimpleStrict(accessContext, dto.curso.id);

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

  async turmaUpdateImagemCapa(accessContext: AccessContext, dto: TurmaFindOneInputDto, file: Express.Multer.File): Promise<boolean> {
    // =========================================================

    const currentTurma = await this.turmaFindByIdStrict(accessContext, {
      id: dto.id,
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

  async turmaDeleteOneById(accessContext: AccessContext, dto: TurmaFindOneInputDto): Promise<boolean> {
    // =========================================================

    await accessContext.ensurePermission("turma:delete", { dto }, dto.id, this.turmaRepository.createQueryBuilder(aliasTurma));

    // =========================================================

    const turma = await this.turmaFindByIdStrict(accessContext, dto);

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
