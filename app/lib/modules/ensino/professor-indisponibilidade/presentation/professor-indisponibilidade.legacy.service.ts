import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { map, pick } from "lodash";
import { DataSource } from "typeorm";
import type { AccessContext } from "@/modules/@core/contexto-acesso";
import {
  APP_DATA_SOURCE_TOKEN,
  paginateConfig,
  QbEfficientLoad,
  SearchService,
} from "@/modules/@shared/infrastructure/persistence/typeorm";
import { ProfessorIndisponibilidadeEntity } from "@/modules/ensino/professor-indisponibilidade/infrastructure/persistence/typeorm";
import { createProfessorIndisponibilidadeRepository } from "@/modules/ensino/professor-indisponibilidade/infrastructure/persistence/typeorm/professor-indisponibilidade.repository";
import type {
  ProfessorIndisponibilidadeCreateInputRestDto,
  ProfessorIndisponibilidadeFindOneInputRestDto,
  ProfessorIndisponibilidadeFindOneOutputRestDto,
  ProfessorIndisponibilidadeListInputRestDto,
  ProfessorIndisponibilidadeListOutputRestDto,
  ProfessorIndisponibilidadeRRuleOutputRestDto,
  ProfessorIndisponibilidadeUpdateInputRestDto,
} from "./rest/professor-indisponibilidade.rest.dto";

// ============================================================================

const aliasIndisponibilidade = "indisponibilidade";

// ============================================================================

@Injectable()
export class ProfessorIndisponibilidadeLegacyService {
  constructor(
    @Inject(APP_DATA_SOURCE_TOKEN) private readonly dataSource: DataSource,
    private searchService: SearchService,
  ) {}

  get indisponibilidadeRepository() {
    return createProfessorIndisponibilidadeRepository(this.dataSource);
  }

  // =========================================================

  async indisponibilidadeFindAll(
    accessContext: AccessContext,
    dto: ProfessorIndisponibilidadeListInputRestDto | null = null,
    selection?: string[] | boolean,
  ): Promise<ProfessorIndisponibilidadeListOutputRestDto> {
    // =========================================================

    const qb = this.indisponibilidadeRepository
      .createQueryBuilder(aliasIndisponibilidade)
      .leftJoinAndSelect(`${aliasIndisponibilidade}.perfil`, "perfil");

    // =========================================================

    await accessContext.applyFilter("vinculo:find", qb, aliasIndisponibilidade, null);
    // =========================================================

    const paginated = await this.searchService.search(
      qb,
      { ...dto },
      {
        ...paginateConfig,
        select: [
          "id",

          "indisponibilidadeInicio",
          "indisponibilidadeTermino",
          "motivo",
          "dateCreated",
        ],
        sortableColumns: [
          "indisponibilidadeInicio",
          "indisponibilidadeTermino",
          "motivo",
          "dateCreated",
        ],
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
    QbEfficientLoad(
      "ProfessorIndisponibilidadeFindOneOutputDto",
      qb,
      aliasIndisponibilidade,
      selection,
    );

    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();
    paginated.data = paginated.data.map(
      (paginated) => pageItemsView.find((i) => i.id === paginated.id)!,
    );

    // =========================================================

    return paginated as unknown as ProfessorIndisponibilidadeListOutputRestDto;
  }

  async indisponibilidadeFindByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<ProfessorIndisponibilidadeFindOneOutputRestDto> {
    // =========================================================

    const qb = this.indisponibilidadeRepository
      .createQueryBuilder(aliasIndisponibilidade)
      .leftJoinAndSelect(`${aliasIndisponibilidade}.perfil`, "perfil");

    // =========================================================

    await accessContext.applyFilter("vinculo:find", qb, aliasIndisponibilidade, null);

    // =========================================================

    qb.andWhere(`${aliasIndisponibilidade}.id = :id`, { id });

    // =========================================================

    qb.addSelect("perfil.id", "idPerfilFk");

    // =========================================================

    QbEfficientLoad(
      "ProfessorIndisponibilidadeFindOneOutputDto",
      qb,
      aliasIndisponibilidade,
      selection,
    );

    // =========================================================

    const indisponibilidade = await qb.getOne();

    // =========================================================

    return indisponibilidade as ProfessorIndisponibilidadeFindOneOutputRestDto;
  }

  async indisponibilidadeFindByIdSimpleStrict(
    accesContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<ProfessorIndisponibilidadeFindOneOutputRestDto> {
    const indisponibilidade = await this.indisponibilidadeFindByIdSimple(
      accesContext,
      id,
      selection,
    );

    if (!indisponibilidade) {
      throw new Error("Indisponibilidade nao encontrada");
    }

    return indisponibilidade;
  }

  // ok
  async ProfessorIndisponibilidadeListByPerfil(
    accessContext: AccessContext,
    idPerfil: string,
  ): Promise<ProfessorIndisponibilidadeListOutputRestDto> {
    const qb = this.indisponibilidadeRepository
      .createQueryBuilder(aliasIndisponibilidade)
      .leftJoinAndSelect(`${aliasIndisponibilidade}.perfil`, "perfil");

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
    } as unknown as ProfessorIndisponibilidadeListOutputRestDto;
  }

  async createIndisponibilidade(
    accessContext: AccessContext,
    dto: ProfessorIndisponibilidadeCreateInputRestDto,
  ): Promise<ProfessorIndisponibilidadeFindOneOutputRestDto> {
    if (!dto.idPerfilFk) throw new BadRequestException("id_perfil is required");

    const indisponibilidade = this.indisponibilidadeRepository.create({
      ...dto,
      perfil: { id: dto.idPerfilFk } as any,
      idPerfilFk: dto.idPerfilFk,
      horaInicio: dto.horaInicio.toString(),
      horaFim: dto.horaFim.toString(),
    });

    return this.indisponibilidadeRepository.save(
      indisponibilidade,
    ) as Promise<ProfessorIndisponibilidadeFindOneOutputRestDto>;
  }

  async indisponibilidadeDelete(
    accessContext: AccessContext,
    id: string,
  ): Promise<ProfessorIndisponibilidadeFindOneOutputRestDto> {
    // =========================================================

    const indisponibilidade = await this.indisponibilidadeFindByIdSimpleStrict(accessContext, id);

    // =========================================================

    await accessContext.applyFilter(
      "vinculo:find",
      this.indisponibilidadeRepository.createQueryBuilder(aliasIndisponibilidade),
      aliasIndisponibilidade,
      indisponibilidade as any,
    );

    // =========================================================

    return this.indisponibilidadeRepository.remove(
      indisponibilidade as any,
    ) as unknown as Promise<ProfessorIndisponibilidadeFindOneOutputRestDto>;
  }

  async indisponibilidadeUpdate(
    accessContext: AccessContext,
    dto: ProfessorIndisponibilidadeFindOneInputRestDto &
      ProfessorIndisponibilidadeUpdateInputRestDto,
  ): Promise<ProfessorIndisponibilidadeFindOneOutputRestDto> {
    // =========================================================

    const currentIndisponibilidade = await this.indisponibilidadeFindByIdSimpleStrict(
      accessContext,
      dto.id,
    );
    // =========================================================

    await accessContext.ensurePermission(
      "aula:update",
      { dto },
      dto.id,
      this.indisponibilidadeRepository.createQueryBuilder(aliasIndisponibilidade as any),
    );

    const dtoIndisponibilidade = pick(dto, [
      "indisponibilidadeInicio",
      "indisponibilidadeTermino",
      "horaInicio",
      "horaFim",
      "motivo",
    ]);

    const indisponibilidade = {
      id: currentIndisponibilidade.id,
    } as ProfessorIndisponibilidadeEntity;

    this.indisponibilidadeRepository.merge(indisponibilidade, dtoIndisponibilidade as any);

    return this.indisponibilidadeRepository.save(
      indisponibilidade,
    ) as Promise<ProfessorIndisponibilidadeFindOneOutputRestDto>;
    // =========================================================
  }

  async ProfessorIndisponibilidadeRRuleFindOneById(
    accessContext: AccessContext,
    id: string,
  ): Promise<ProfessorIndisponibilidadeRRuleOutputRestDto> {
    // =========================================================

    const qb = this.indisponibilidadeRepository.createQueryBuilder(aliasIndisponibilidade);

    // =========================================================

    await accessContext.applyFilter("vinculo:find", qb, aliasIndisponibilidade, null);

    // =========================================================
    qb.andWhere(`${aliasIndisponibilidade}.id = :id`, { id });

    // =========================================================

    const indisponibilidade = await qb.getOne();

    if (!indisponibilidade) {
      throw new BadRequestException("Indisponibilidade nao encontrada");
    }

    // =========================================================

    return {
      id: indisponibilidade.id,
      id_perfil_fk: indisponibilidade.idPerfilFk,
      rrule: `FREQ=WEEKLY;BYDAY=${["SU", "MO", "TU", "WE", "TH", "FR", "SA"][indisponibilidade.diaDaSemana]}`,
      data_hora_inicio: indisponibilidade.horaInicio ?? null,
      data_hora_fim: indisponibilidade.horaFim ?? null,
    } as unknown as ProfessorIndisponibilidadeRRuleOutputRestDto;
  }
}
