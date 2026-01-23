import { BadRequestException, Injectable } from "@nestjs/common";
import { map, pick } from "lodash";
import type { AccessContext } from "@/infrastructure/access-context";
import { paginateConfig } from "@/infrastructure/fixtures";
import { DatabaseContextService } from "@/v2/infrastructure.database";
import { ProfessorIndisponibilidadeEntity } from "@/v2/infrastructure.database/typeorm/entities";
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

  async indisponibilidadeFindByIdSimple(
    accessContext: AccessContext,
    id: IDomain.ProfessorIndisponibilidadeFindOneInput["id"],
    selection?: string[],
  ): Promise<IDomain.ProfessorIndisponibilidadeFindOneOutput["success"]> {
    // =========================================================

    const qb = this.indisponibilidadeRepository.createQueryBuilder(aliasIndisponibilidade).leftJoinAndSelect(`${aliasIndisponibilidade}.perfil`, "perfil");

    // =========================================================

    await accessContext.applyFilter("vinculo:find", qb, aliasIndisponibilidade, null);

    // =========================================================

    qb.andWhere(`${aliasIndisponibilidade}.id = :id`, { id });

    // =========================================================

    qb.addSelect("perfil.id", "idPerfilFk");

    // =========================================================

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
  // ok
  async ProfessorIndisponibilidadeListByPerfil(
    accessContext: AccessContext,
    idPerfil: IDomain.ProfessorIndisponibilidadeListInput["idPerfilFk"],
  ): Promise<IDomain.ProfessorIndisponibilidadeListOutput["success"]> {
    const qb = this.indisponibilidadeRepository.createQueryBuilder(aliasIndisponibilidade).leftJoinAndSelect(`${aliasIndisponibilidade}.perfil`, "perfil");

    // =========================================================

    await accessContext.applyFilter("vinculo:find", qb, aliasIndisponibilidade, null);

    // =========================================================

    qb.andWhere(`${aliasIndisponibilidade}.id_perfil_fk = :idPerfil`, {
      idPerfil,
    });

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

  async createIndisponibilidade(accessContext: AccessContext, domain: IDomain.ProfessorIndisponibilidadeCreateInput) {
    if (!domain.idPerfilFk) throw new BadRequestException("id_perfil is required");

    const indisponibilidade = this.indisponibilidadeRepository.create({
      ...domain,
      perfil: { id: domain.idPerfilFk } as any,
      idPerfilFk: domain.idPerfilFk,
      horaInicio: domain.horaInicio.toString(),
      horaFim: domain.horaFim.toString(),
    });

    return this.indisponibilidadeRepository.save(indisponibilidade);
  }

  async indisponibilidadeDelete(accessContext: AccessContext, id: IDomain.ProfessorIndisponibilidadeFindOneInput["id"]): Promise<IDomain.ProfessorIndisponibilidadeFindOneOutput["success"]> {
    // =========================================================

    const indisponibilidade = await this.indisponibilidadeFindByIdSimpleStrict(accessContext, id);

    // =========================================================

    await accessContext.applyFilter("vinculo:find", this.indisponibilidadeRepository.createQueryBuilder(aliasIndisponibilidade), aliasIndisponibilidade, indisponibilidade);

    // =========================================================

    return this.indisponibilidadeRepository.remove(indisponibilidade);
  }

  async indisponibilidadeUpdate(accessContext: AccessContext, domain: IDomain.ProfessorIndisponibilidadeFindOneInput & IDomain.ProfessorIndisponibilidadeUpdateInput) {
    // =========================================================

    const currentIndisponibilidade = await this.indisponibilidadeFindByIdSimpleStrict(accessContext, domain.id);
    // =========================================================

    await accessContext.ensurePermission("aula:update", { dto: domain }, domain.id, this.indisponibilidadeRepository.createQueryBuilder(aliasIndisponibilidade));

    const dtoIndisponibilidade = pick(domain, ["indisponibilidadeInicio", "indisponibilidadeTermino", "horaInicio", "horaFim", "motivo"]);

    const indisponibilidade = {
      id: currentIndisponibilidade.id,
    } as ProfessorIndisponibilidadeEntity;

    this.indisponibilidadeRepository.merge(indisponibilidade, ...dtoIndisponibilidade);

    return this.indisponibilidadeRepository.save(indisponibilidade);
    // =========================================================
  }

  
  async ProfessorIndisponibilidadeRRuleFindOneById(
    accessContext: AccessContext,
    id: IDomain.ProfessorIndisponibilidadeRRuleInput["id"],
  ): Promise<IDomain.ProfessorIndisponibilidadeRRuleOutput["success"]> {
    // =========================================================

    const qb = this.indisponibilidadeRepository.createQueryBuilder(aliasIndisponibilidade);

    // =========================================================

    await accessContext.applyFilter("vinculo:find", qb, aliasIndisponibilidade, null);
  
    // =========================================================
    qb.andWhere(`${aliasIndisponibilidade}.id = :id`, { id });

    // =========================================================

    const indisponibilidade = await qb.getOne();

    if (!indisponibilidade) {
      throw new BadRequestException("Indisponibilidade não encontrada");
    }

    // =========================================================

    return {
      id: indisponibilidade.id,
      id_perfil_fk: indisponibilidade.idPerfilFk,
      rrule: `FREQ=WEEKLY;BYDAY=${["SU","MO","TU","WE","TH","FR","SA"][indisponibilidade.diaDaSemana]}`,
      data_hora_inicio: indisponibilidade.horaInicio
      ? indisponibilidade.horaInicio.toISOString().replace(/Z$/, "")
       : null,
      data_hora_fim: indisponibilidade.horaFim
      ? indisponibilidade.horaFim.toISOString().replace(/Z$/, "")
      : null,
    }; 
  }
}
