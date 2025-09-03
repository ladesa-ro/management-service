import { Injectable } from "@nestjs/common";
import { map } from "lodash";
import type { AccessContext } from "@/infrastructure/access-context";
import { paginateConfig } from "@/infrastructure/fixtures";
import { DatabaseContextService } from "@/infrastructure/integrations/database";
import { QbEfficientLoad, SearchService } from "@/shared";
import type { IDomain } from "@/shared/tsp/schema/typings";

// ============================================================================

const aliasIndisponibilidade = "indisponibilidade";

// ============================================================================

@Injectable()
export class ProfessorIndisponibilidadeService {
  constructor(
    private databaseContext: DatabaseContextService,
    private searchService: SearchService,
  ) {}

  get indisponibilidadeRepository() {
    return this.databaseContext.professorIndisponibilidadeRepository;
  }
  // =========================================================

  async indisponibilidadeFindAll(
    accessContext: AccessContext,
    domain: IDomain.ProfessorIndisponibilidadeListInput | null = null,
    selection?: string[] | boolean,
  ): Promise<IDomain.ProfessorIndisponibilidadeListOutput["success"]> {
    // =========================================================

    const qb = this.indisponibilidadeRepository.createQueryBuilder(aliasIndisponibilidade).leftJoinAndSelect(`${aliasIndisponibilidade}.perfil`, "perfil");

    // =========================================================

    // TODO: conferrir o filtro
    await accessContext.applyFilter("vinculo:find", qb, aliasIndisponibilidade, null);
    // =========================================================

    const paginated = await this.searchService.search(
      qb,
      { ...domain },
      {
        ...paginateConfig,
        select: [
          "id",

          "indisponibilidadeInicio",
          "indisponibilidadeTermino",
          "motivo",
          "dateCreated",
        ],
        sortableColumns: ["indisponibilidadeInicio", "indisponibilidadeTermino", "motivo", "dateCreated"],
        searchableColumns: [
          "id",

          "indisponibilidadeInicio",
          "indisponibilidadeTermino",
          "motivo",

          "dateCreated",
        ],
        defaultSortBy: [
          ["dateCreated", "ASC"],
          ["indisponibilidadeInicio", "ASC"],
          ["indisponibilidadeTermino", "ASC"],
        ],
        filterableColumns: {},
      },
    );

    // =========================================================

    qb.select([]);
    await QbEfficientLoad("ProfessorIndisponibilidadeFindOneOutput", qb, aliasIndisponibilidade, selection);

    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();
    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);

    // =========================================================

    return paginated;
  }

  async indisponibilidadeFindByIdStrict(accessContext: AccessContext | null, domain: IDomain.ProfessorIndisponibilidadeFindOneInput, selection?: string[] | boolean) {
    // =========================================================

    const _qb = this.indisponibilidadeRepository
      .createQueryBuilder(
        // =========================================================

        aliasIndisponibilidade,
      )
      .leftJoinAndSelect(`${aliasIndisponibilidade}.perfil`, "perfil");

    // =========================================================

    // const indisponibilidade = await this.
  }

  async indisponibilidadeFindByIdSimple(
    accessContext: AccessContext,
    id: IDomain.ProfessorIndisponibilidadeFindOneInput["idPerfilFk"],
    selection?: string[],
  ): Promise<IDomain.ProfessorIndisponibilidadeFindOneOutput["success"]> {
    // =========================================================

    const qb = this.indisponibilidadeRepository.createQueryBuilder(aliasIndisponibilidade).leftJoinAndSelect(`${aliasIndisponibilidade}.perfil`, "perfil");

    // =========================================================

    await accessContext.applyFilter("vinculo:find", qb, aliasIndisponibilidade, null);

    // =========================================================

    qb.andWhere(`${aliasIndisponibilidade}.id = :id`, { id });

    // Realiza busca pelo id de perfil
    // qb.andWhere(`${aliasIndisponibilidade}.id_perfil_fk = :idPerfil`, { idPerfil: id });
    // =========================================================

    qb.select([]);
    await QbEfficientLoad("ProfessorIndisponibilidadeFindOneOutput", qb, aliasIndisponibilidade, selection);

    // =========================================================

    const indisponibilidade = await qb.getOne();

    // =========================================================

    return indisponibilidade!;
  }

  async indisponibilidadeFindByIdSimpleStrict(accesContext: AccessContext, id: IDomain.ProfessorIndisponibilidadeFindOneInput["idPerfilFk"], selection?: string[]) {
    const indisponibilidade = await this.indisponibilidadeFindByIdSimple(accesContext, id, selection);

    if (!indisponibilidade) {
      throw new Error("Indisponibilidade não encontrada");
    }

    return indisponibilidade;
  }

  async ProfessorIndisponibilidadeListByPerfil(
    accessContext: AccessContext,
    idPerfil: IDomain.ProfessorIndisponibilidadeListInput["idPerfilFk"],
  ): Promise<IDomain.ProfessorIndisponibilidadeListOutput["success"]> {
    const qb = this.indisponibilidadeRepository.createQueryBuilder(aliasIndisponibilidade).leftJoinAndSelect(`${aliasIndisponibilidade}.perfil`, "perfil");

    // =========================================================

    await accessContext.applyFilter("vinculo:find", qb, aliasIndisponibilidade, null);

    // =========================================================

    qb.andWhere(`${aliasIndisponibilidade}.id_perfil_fk = :idPerfil`, { idPerfil });

    // =========================================================

    const indisponibilidades = await qb.getMany();

    return {
      data: indisponibilidades,
      meta: {
        totalItems: indisponibilidades.length,
        itemCount: indisponibilidades.length,
        itemsPerPage: indisponibilidades.length,
        totalPages: 1,
        currentPage: 1,
      },
    };
  }

  async createForProfessor(
    accessContext: AccessContext,
    idPerfil: IDomain.ProfessorIndisponibilidadeCreateInput["idPerfilFk"],
    domain: IDomain.ProfessorIndisponibilidadeCreateInput,
  ): Promise<IDomain.ProfessorIndisponibilidadeCreateOutput["success"]> {
    // =========================================================

    const indisponibilidade = this.indisponibilidadeRepository.create({
      ...domain,
      idPerfilFk: idPerfil,
    });

    // =========================================================

    await accessContext.applyFilter("????", this.indisponibilidadeRepository.createQueryBuilder(aliasIndisponibilidade), aliasIndisponibilidade, indisponibilidade);

    // =========================================================

    return this.indisponibilidadeRepository.save(indisponibilidade);
  }

  async indisponibilidadeUpdate(
    accessContext: AccessContext,
    id: IDomain.ProfessorIndisponibilidadeUpdateInput["id"],
    domain: IDomain.ProfessorIndisponibilidadeUpdateInput,
  ): Promise<IDomain.ProfessorIndisponibilidadeFindOneOutput["success"]> {
    // =========================================================

    const indisponibilidade = await this.indisponibilidadeFindByIdSimpleStrict(accessContext, id);

    // =========================================================

    Object.assign(indisponibilidade, domain);

    // =========================================================

    await accessContext.applyFilter("????", this.indisponibilidadeRepository.createQueryBuilder(aliasIndisponibilidade), aliasIndisponibilidade, indisponibilidade);

    // =========================================================

    return this.indisponibilidadeRepository.save(indisponibilidade);
  }

  async indisponibilidadeDelete(
    accessContext: AccessContext,
    id: IDomain.ProfessorIndisponibilidadeFindOneInput["id"],
  ): Promise<IDomain.ProfessorIndisponibilidadeFindOneOutput["success"]> {
    // =========================================================

    const indisponibilidade = await this.indisponibilidadeFindByIdSimpleStrict(accessContext, id);

    // =========================================================

    await accessContext.applyFilter("vinculo:find", this.indisponibilidadeRepository.createQueryBuilder(aliasIndisponibilidade), aliasIndisponibilidade, indisponibilidade);

    // =========================================================

    return this.indisponibilidadeRepository.remove(indisponibilidade);
  }
}
