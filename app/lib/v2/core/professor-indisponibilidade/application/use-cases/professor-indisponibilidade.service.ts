import { BadRequestException, Injectable } from "@nestjs/common";
import { map, pick } from "lodash";
import type { AccessContext } from "@/infrastructure/access-context";
import { paginateConfig } from "@/infrastructure/fixtures";
import { QbEfficientLoad, SearchService } from "@/shared";
import type {
  ProfessorIndisponibilidadeCreateInputDto,
  ProfessorIndisponibilidadeFindOneInputDto,
  ProfessorIndisponibilidadeFindOneOutputDto,
  ProfessorIndisponibilidadeListInputDto,
  ProfessorIndisponibilidadeListOutputDto,
  ProfessorIndisponibilidadeRRuleOutputDto,
  ProfessorIndisponibilidadeUpdateInputDto,
} from "@/v2/server/modules/professor-indisponibilidade/http/dto";
import { DatabaseContextService } from "@/v2/adapters/out/persistence/typeorm";
import { ProfessorIndisponibilidadeEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";

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
    dto: ProfessorIndisponibilidadeListInputDto | null = null,
    selection?: string[] | boolean,
  ): Promise<ProfessorIndisponibilidadeListOutputDto> {
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
      "ProfessorIndisponibilidadeFindOneOutput",
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

    return paginated as unknown as ProfessorIndisponibilidadeListOutputDto;
  }

  async indisponibilidadeFindByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<ProfessorIndisponibilidadeFindOneOutputDto> {
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
      "ProfessorIndisponibilidadeFindOneOutput",
      qb,
      aliasIndisponibilidade,
      selection,
    );

    // =========================================================

    const indisponibilidade = await qb.getOne();

    // =========================================================

    return indisponibilidade as ProfessorIndisponibilidadeFindOneOutputDto;
  }

  async indisponibilidadeFindByIdSimpleStrict(
    accesContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<ProfessorIndisponibilidadeFindOneOutputDto> {
    const indisponibilidade = await this.indisponibilidadeFindByIdSimple(
      accesContext,
      id,
      selection,
    );

    if (!indisponibilidade) {
      throw new Error("Indisponibilidade não encontrada");
    }

    return indisponibilidade;
  }

  // ok
  async ProfessorIndisponibilidadeListByPerfil(
    accessContext: AccessContext,
    idPerfil: string,
  ): Promise<ProfessorIndisponibilidadeListOutputDto> {
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
    } as unknown as ProfessorIndisponibilidadeListOutputDto;
  }

  async createIndisponibilidade(
    accessContext: AccessContext,
    dto: ProfessorIndisponibilidadeCreateInputDto,
  ): Promise<ProfessorIndisponibilidadeFindOneOutputDto> {
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
    ) as Promise<ProfessorIndisponibilidadeFindOneOutputDto>;
  }

  async indisponibilidadeDelete(
    accessContext: AccessContext,
    id: string,
  ): Promise<ProfessorIndisponibilidadeFindOneOutputDto> {
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
    ) as unknown as Promise<ProfessorIndisponibilidadeFindOneOutputDto>;
  }

  async indisponibilidadeUpdate(
    accessContext: AccessContext,
    dto: ProfessorIndisponibilidadeFindOneInputDto & ProfessorIndisponibilidadeUpdateInputDto,
  ): Promise<ProfessorIndisponibilidadeFindOneOutputDto> {
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
    ) as Promise<ProfessorIndisponibilidadeFindOneOutputDto>;
    // =========================================================
  }

  async ProfessorIndisponibilidadeRRuleFindOneById(
    accessContext: AccessContext,
    id: string,
  ): Promise<ProfessorIndisponibilidadeRRuleOutputDto> {
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
      rrule: `FREQ=WEEKLY;BYDAY=${["SU", "MO", "TU", "WE", "TH", "FR", "SA"][indisponibilidade.diaDaSemana]}`,
      data_hora_inicio: indisponibilidade.horaInicio ?? null,
      data_hora_fim: indisponibilidade.horaFim ?? null,
    } as unknown as ProfessorIndisponibilidadeRRuleOutputDto;
  }
}
