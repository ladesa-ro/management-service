import { QbEfficientLoad } from "@/application/standards/ladesa-spec/QbEfficientLoad";
import { LadesaPaginatedResultDto, LadesaSearch } from "@/application/standards/ladesa-spec/search/search-strategies";
import type { AccessContext } from "@/infrastructure/access-context";
import { paginateConfig } from "@/infrastructure/fixtures";
import { DatabaseContextService } from "@/infrastructure/integrations/database";
import type { CursoEntity } from "@/infrastructure/integrations/database/typeorm/entities";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Injectable, NotFoundException } from "@nestjs/common";
import { has, map, pick } from "lodash";
import { FilterOperator } from "nestjs-paginate";
import { CampusService } from "../../../ambientes/campus/campus.service";
import { ArquivoService } from "../../../base/arquivo/arquivo.service";
import { ImagemService } from "../../../base/imagem/imagem.service";
import { OfertaFormacaoService } from "../oferta-formacao/oferta-formacao.service";

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
  ) {}

  get cursoRepository() {
    return this.databaseContext.cursoRepository;
  }

  //

  async cursoFindAll(
    accessContext: AccessContext,
    dto: LadesaTypings.CursoListOperationInput | null = null,
    selection?: string[] | boolean,
  ): Promise<LadesaTypings.CursoListOperationOutput["success"]> {
    // =========================================================

    const qb = this.cursoRepository.createQueryBuilder(aliasCurso);

    // =========================================================

    await accessContext.applyFilter("curso:find", qb, aliasCurso, null);

    // =========================================================

    const paginated = await LadesaSearch("#/", dto, qb, {
      ...paginateConfig,
      select: [
        //
        "id",
        //
        "nome",
        "nomeAbreviado",
        "campus",
        "ofertaFormacao",
        //
      ],
      sortableColumns: [
        //
        "nome",
        "nomeAbreviado",
        //
        "campus.id",
        "campus.cnpj",
        "campus.razaoSocial",
        "campus.nomeFantasia",
        //
        "ofertaFormacao.id",
        "ofertaFormacao.nome",
        "ofertaFormacao.slug",
      ],
      searchableColumns: [
        //
        "id",
        //
        "nome",
        "nomeAbreviado",
        "campus",
        "ofertaFormacao",
        //
      ],
      relations: {
        campus: true,
        ofertaFormacao: true,
      },
      defaultSortBy: [
        //
        ["nome", "ASC"],
      ],
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
    QbEfficientLoad(LadesaTypings.Tokens.CursoFindOneResultView, qb, aliasCurso, selection);

    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();
    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);

    // =========================================================

    return LadesaPaginatedResultDto(paginated);
  }

  async cursoFindById(accessContext: AccessContext | null, dto: LadesaTypings.CursoFindOneInputView, selection?: string[] | boolean): Promise<LadesaTypings.CursoFindOneResultView | null> {
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
    QbEfficientLoad(LadesaTypings.Tokens.CursoFindOneResultView, qb, aliasCurso, selection);

    // =========================================================

    const curso = await qb.getOne();

    // =========================================================

    return curso;
  }

  async cursoFindByIdStrict(accessContext: AccessContext | null, dto: LadesaTypings.CursoFindOneInputView, selection?: string[] | boolean) {
    const curso = await this.cursoFindById(accessContext, dto, selection);

    if (!curso) {
      throw new NotFoundException();
    }

    return curso;
  }

  async cursoFindByIdSimple(accessContext: AccessContext, id: LadesaTypings.CursoFindOneInputView["id"], selection?: string[]): Promise<LadesaTypings.CursoFindOneResultView | null> {
    // =========================================================

    const qb = this.cursoRepository.createQueryBuilder(aliasCurso);

    // =========================================================

    await accessContext.applyFilter("curso:find", qb, aliasCurso, null);

    // =========================================================

    qb.andWhere(`${aliasCurso}.id = :id`, { id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(LadesaTypings.Tokens.CursoFindOneResultView, qb, aliasCurso, selection);

    // =========================================================

    const curso = await qb.getOne();

    // =========================================================

    return curso;
  }

  async cursoFindByIdSimpleStrict(accessContext: AccessContext, id: LadesaTypings.CursoFindOneInputView["id"], selection?: string[]) {
    const curso = await this.cursoFindByIdSimple(accessContext, id, selection);

    if (!curso) {
      throw new NotFoundException();
    }

    return curso;
  }

  //

  async cursoCreate(accessContext: AccessContext, dto: LadesaTypings.CursoCreateOperationInput) {
    // =========================================================

    await accessContext.ensurePermission("curso:create", { dto });

    // =========================================================

    const dtoCurso = pick(dto.body, ["nome", "nomeAbreviado"]);

    const curso = this.cursoRepository.create();

    this.cursoRepository.merge(curso, {
      ...dtoCurso,
    });

    // =========================================================

    const campus = await this.campusService.campusFindByIdSimpleStrict(accessContext, dto.body.campus.id);

    this.cursoRepository.merge(curso, {
      campus: {
        id: campus.id,
      },
    });

    // =========================================================

    const ofertaFormacao = await this.ofertaFormacaoService.ofertaFormacaoFindByIdSimpleStrict(accessContext, dto.body.ofertaFormacao.id);

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

  async cursoUpdate(accessContext: AccessContext, dto: LadesaTypings.CursoUpdateByIdOperationInput) {
    // =========================================================

    const currentCurso = await this.cursoFindByIdStrict(accessContext, {
      id: dto.params.id,
    });

    // =========================================================

    await accessContext.ensurePermission("curso:update", { dto }, dto.params.id, this.cursoRepository.createQueryBuilder(aliasCurso));

    const dtoCurso = pick(dto.body, ["nome", "nomeAbreviado"]);

    const curso = {
      id: currentCurso.id,
    } as CursoEntity;

    this.cursoRepository.merge(curso, {
      ...dtoCurso,
    });

    // =========================================================

    if (has(dto.body, "campus") && dto.body.campus !== undefined) {
      const campus = await this.campusService.campusFindByIdSimpleStrict(accessContext, dto.body.campus.id);

      this.cursoRepository.merge(curso, {
        campus: {
          id: campus.id,
        },
      });
    }

    // =========================================================

    if (has(dto.body, "ofertaFormacao") && dto.body.ofertaFormacao !== undefined) {
      const ofertaFormacao = await this.ofertaFormacaoService.ofertaFormacaoFindByIdSimpleStrict(accessContext, dto.body.ofertaFormacao.id);

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

  //

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

  async cursoUpdateImagemCapa(accessContext: AccessContext, dto: LadesaTypings.CursoFindOneInputView, file: Express.Multer.File) {
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

  //

  async cursoDeleteOneById(accessContext: AccessContext, dto: LadesaTypings.CursoFindOneInputView) {
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
