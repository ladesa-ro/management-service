import { Injectable, NotFoundException } from "@nestjs/common";
import { has, map, pick } from "lodash";
import { FilterOperator } from "nestjs-paginate";
import { ArquivoService } from "@/v2/core/arquivo/application/use-cases/arquivo.service";
import { CampusService } from "@/v2/core/campus/application/use-cases/campus.service";
import { ImagemService } from "@/v2/core/imagem/application/use-cases/imagem.service";
import { OfertaFormacaoService } from "@/v2/core/oferta-formacao/application/use-cases/oferta-formacao.service";
import type { AccessContext } from "@/infrastructure/access-context";
import { paginateConfig } from "@/infrastructure/fixtures";
import { DatabaseContextService } from "@/v2/adapters/out/persistence/typeorm";
import { CursoEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import { QbEfficientLoad, SearchService } from "@/shared";
import type {
  CursoCreateInputDto,
  CursoFindOneInputDto,
  CursoFindOneOutputDto,
  CursoListInputDto,
  CursoListOutputDto,
  CursoUpdateInputDto,
} from "@/v2/adapters/in/http/curso/dto";

// ============================================================================

const aliasCurso = "curso";

// ============================================================================

@Injectable()
export class CursoService {
  constructor(
    private databaseContext: DatabaseContextService,
    private campusService: CampusService,
    private ofertaFormacaoService: OfertaFormacaoService,
    private imagemService: ImagemService,
    private arquivoService: ArquivoService,
    private searchService: SearchService,
  ) {}

  get cursoRepository() {
    return this.databaseContext.cursoRepository;
  }

  async cursoFindAll(accessContext: AccessContext, dto: CursoListInputDto | null = null, selection?: string[] | boolean): Promise<CursoListOutputDto> {
    // =========================================================

    const qb = this.cursoRepository.createQueryBuilder(aliasCurso);

    // =========================================================

    await accessContext.applyFilter("curso:find", qb, aliasCurso, null);

    // =========================================================

    const paginated = await this.searchService.search(qb, dto, {
      ...paginateConfig,
      select: [
        "id",

        "nome",
        "nomeAbreviado",
        "campus",
        "ofertaFormacao",
      ],
      sortableColumns: [
        "nome",
        "nomeAbreviado",

        "campus.id",
        "campus.cnpj",
        "campus.razaoSocial",
        "campus.nomeFantasia",

        "ofertaFormacao.id",
        "ofertaFormacao.nome",
        "ofertaFormacao.slug",
      ],
      searchableColumns: [
        "id",

        "nome",
        "nomeAbreviado",
        "campus",
        "ofertaFormacao",
      ],
      relations: {
        campus: true,
        ofertaFormacao: true,
      },
      defaultSortBy: [["nome", "ASC"]],
      filterableColumns: {
        "campus.id": [FilterOperator.EQ],
        "campus.cnpj": [FilterOperator.EQ],
        "campus.razaoSocial": [FilterOperator.EQ],
        "campus.nomeFantasia": [FilterOperator.EQ],
        "ofertaFormacao.id": [FilterOperator.EQ],
        "ofertaFormacao.nome": [FilterOperator.EQ],
        "ofertaFormacao.slug": [FilterOperator.EQ],
      },
    });

    // =========================================================

    qb.select([]);
    QbEfficientLoad("CursoFindOneOutput", qb, aliasCurso, selection);

    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();
    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);

    // =========================================================

    return paginated as CursoListOutputDto;
  }

  async cursoFindById(accessContext: AccessContext | null, dto: CursoFindOneInputDto, selection?: string[] | boolean): Promise<CursoFindOneOutputDto | null> {
    // =========================================================

    const qb = this.cursoRepository.createQueryBuilder(aliasCurso);

    // =========================================================

    if (accessContext) {
      await accessContext.applyFilter("curso:find", qb, aliasCurso, null);
    }

    // =========================================================

    qb.andWhere(`${aliasCurso}.id = :id`, { id: dto.id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad("CursoFindOneOutput", qb, aliasCurso, selection);

    // =========================================================

    const curso = await qb.getOne();

    // =========================================================

    return curso as CursoFindOneOutputDto | null;
  }

  async cursoFindByIdStrict(accessContext: AccessContext | null, dto: CursoFindOneInputDto, selection?: string[] | boolean): Promise<CursoFindOneOutputDto> {
    const curso = await this.cursoFindById(accessContext, dto, selection);

    if (!curso) {
      throw new NotFoundException();
    }

    return curso;
  }

  async cursoFindByIdSimple(accessContext: AccessContext, id: CursoFindOneInputDto["id"], selection?: string[]): Promise<CursoFindOneOutputDto | null> {
    // =========================================================

    const qb = this.cursoRepository.createQueryBuilder(aliasCurso);

    // =========================================================

    await accessContext.applyFilter("curso:find", qb, aliasCurso, null);

    // =========================================================

    qb.andWhere(`${aliasCurso}.id = :id`, { id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad("CursoFindOneOutput", qb, aliasCurso, selection);

    // =========================================================

    const curso = await qb.getOne();

    // =========================================================

    return curso as CursoFindOneOutputDto | null;
  }

  async cursoFindByIdSimpleStrict(accessContext: AccessContext, id: CursoFindOneInputDto["id"], selection?: string[]): Promise<CursoFindOneOutputDto> {
    const curso = await this.cursoFindByIdSimple(accessContext, id, selection);

    if (!curso) {
      throw new NotFoundException();
    }

    return curso;
  }

  async cursoCreate(accessContext: AccessContext, dto: CursoCreateInputDto): Promise<CursoFindOneOutputDto> {
    // =========================================================

    await accessContext.ensurePermission("curso:create", { dto });

    // =========================================================

    const dtoCurso = pick(dto, ["nome", "nomeAbreviado"]);

    const curso = this.cursoRepository.create();

    this.cursoRepository.merge(curso, {
      ...dtoCurso,
    });

    // =========================================================

    const campus = await this.campusService.campusFindByIdSimpleStrict(accessContext, dto.campus.id);

    this.cursoRepository.merge(curso, {
      campus: {
        id: campus.id,
      },
    });

    // =========================================================

    const ofertaFormacao = await this.ofertaFormacaoService.ofertaFormacaoFindByIdSimpleStrict(accessContext, dto.ofertaFormacao.id);

    this.cursoRepository.merge(curso, {
      ofertaFormacao: {
        id: ofertaFormacao.id,
      },
    });

    // =========================================================

    await this.cursoRepository.save(curso);

    // =========================================================

    return this.cursoFindByIdStrict(accessContext, { id: curso.id });
  }

  async cursoUpdate(accessContext: AccessContext, dto: CursoFindOneInputDto & CursoUpdateInputDto): Promise<CursoFindOneOutputDto> {
    // =========================================================

    const currentCurso = await this.cursoFindByIdStrict(accessContext, { id: dto.id });

    // =========================================================

    await accessContext.ensurePermission("curso:update", { dto }, dto.id, this.cursoRepository.createQueryBuilder(aliasCurso));

    const dtoCurso = pick(dto, ["nome", "nomeAbreviado"]);

    const curso = {
      id: currentCurso.id,
    } as CursoEntity;

    this.cursoRepository.merge(curso, {
      ...dtoCurso,
    });

    // =========================================================

    if (has(dto, "campus") && dto.campus !== undefined) {
      const campus = await this.campusService.campusFindByIdSimpleStrict(accessContext, dto.campus.id);

      this.cursoRepository.merge(curso, {
        campus: {
          id: campus.id,
        },
      });
    }

    // =========================================================

    if (has(dto, "ofertaFormacao") && dto.ofertaFormacao !== undefined) {
      const ofertaFormacao = await this.ofertaFormacaoService.ofertaFormacaoFindByIdSimpleStrict(accessContext, dto.ofertaFormacao.id);

      this.cursoRepository.merge(curso, {
        ofertaFormacao: {
          id: ofertaFormacao.id,
        },
      });
    }

    // =========================================================

    await this.cursoRepository.save(curso);

    // =========================================================

    return this.cursoFindByIdStrict(accessContext, { id: curso.id });
  }

  async cursoGetImagemCapa(accessContext: AccessContext | null, id: string) {
    const curso = await this.cursoFindByIdStrict(accessContext, { id: id });

    if (curso.imagemCapa) {
      const [versao] = curso.imagemCapa.versoes;

      if (versao) {
        const { arquivo } = versao;
        return this.arquivoService.getStreamableFile(null, arquivo.id, null);
      }
    }

    throw new NotFoundException();
  }

  async cursoUpdateImagemCapa(accessContext: AccessContext, dto: CursoFindOneInputDto, file: Express.Multer.File) {
    // =========================================================

    const currentCurso = await this.cursoFindByIdStrict(accessContext, {
      id: dto.id,
    });

    // =========================================================

    await accessContext.ensurePermission(
      "curso:update",
      {
        dto: {
          id: currentCurso.id,
        },
      },
      currentCurso.id,
    );

    // =========================================================

    const { imagem } = await this.imagemService.saveCursoCapa(file);

    const curso = this.cursoRepository.merge(this.cursoRepository.create(), {
      id: currentCurso.id,
    });

    this.cursoRepository.merge(curso, {
      imagemCapa: {
        id: imagem.id,
      },
    });

    await this.cursoRepository.save(curso);

    // =========================================================

    return true;
  }

  async cursoDeleteOneById(accessContext: AccessContext, dto: CursoFindOneInputDto): Promise<boolean> {
    // =========================================================

    await accessContext.ensurePermission("curso:delete", { dto }, dto.id, this.cursoRepository.createQueryBuilder(aliasCurso));

    // =========================================================

    const curso = await this.cursoFindByIdStrict(accessContext, dto);

    // =========================================================

    if (curso) {
      await this.cursoRepository
        .createQueryBuilder(aliasCurso)
        .update()
        .set({
          dateDeleted: "NOW()",
        })
        .where("id = :cursoId", { cursoId: curso.id })
        .andWhere("dateDeleted IS NULL")
        .execute();
    }

    // =========================================================

    return true;
  }
}
