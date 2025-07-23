import { QbEfficientLoad } from "@/application/standards/ladesa-spec/QbEfficientLoad";
import { LadesaPaginatedResultDto, LadesaSearch } from "@/application/standards/ladesa-spec/search/search-strategies";
import type { AccessContext } from "@/infrastructure/access-context";
import { paginateConfig } from "@/infrastructure/fixtures";
import { DatabaseContextService } from "@/infrastructure/integrations/database";
import type { DiaCalendarioEntity } from "@/infrastructure/integrations/database/typeorm/entities/05-calendario/dia-calendario.entity";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Injectable, NotFoundException } from "@nestjs/common";
import { has, map, pick } from "lodash";
import { FilterOperator } from "nestjs-paginate";
import { CalendarioLetivoService } from "../calendario-letivo/calendario-letivo.service";

// ============================================================================

const aliasDiaCalendario = "diaCalendario";

// ============================================================================

@Injectable()
export class DiaCalendarioService {
  constructor(
    private databaseContext: DatabaseContextService,
    private calendarioLetivoService: CalendarioLetivoService,
  ) {}

  get diaCalendarioRepository() {
    return this.databaseContext.diaCalendarioRepository;
  }

  //

  async diaCalendarioFindAll(
    accessContext: AccessContext,
    dto: LadesaTypings.DiaCalendarioListOperationInput | null = null,
    selection?: string[] | boolean,
  ): Promise<LadesaTypings.DiaCalendarioListOperationOutput["success"]> {
    // =========================================================

    const qb = this.diaCalendarioRepository.createQueryBuilder(aliasDiaCalendario);

    // =========================================================

    await accessContext.applyFilter("dia_calendario:find", qb, aliasDiaCalendario, null);

    // =========================================================

    const paginated = await LadesaSearch("#/", dto, qb, {
      ...paginateConfig,
      select: [
        //
        "id",
        //
        "data",
        "diaLetivo",
        "feriado",
        //
        "calendario.id",
        "calendario.nome",
        "calendario.ano",
      ],
      sortableColumns: [
        //
        "data",
        "diaLetivo",
        "feriado",
        //
        "calendario.id",
        "calendario.nome",
        "calendario.ano",
      ],
      searchableColumns: [
        //
        "id",
        //
        "data",
        "diaLetivo",
        "feriado",
        "calendario.nome",
      ],
      relations: {
        calendario: true,
      },
      defaultSortBy: [],
      filterableColumns: {
        "calendario.id": [FilterOperator.EQ],
        "calendario.nome": [FilterOperator.EQ],
        "calendario.ano": [FilterOperator.EQ],
      },
    });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(LadesaTypings.Tokens.DiaCalendarioFindOneResultView, qb, aliasDiaCalendario, selection);

    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();
    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);

    // =========================================================

    return LadesaPaginatedResultDto(paginated);
  }

  async diaCalendarioFindById(
    accessContext: AccessContext,
    dto: LadesaTypings.DiaCalendarioFindOneInputView,
    selection?: string[] | boolean,
  ): Promise<LadesaTypings.DiaCalendarioFindOneResultView | null> {
    // =========================================================

    const qb = this.diaCalendarioRepository.createQueryBuilder(aliasDiaCalendario);

    // =========================================================

    await accessContext.applyFilter("dia_calendario:find", qb, aliasDiaCalendario, null);

    // =========================================================

    qb.andWhere(`${aliasDiaCalendario}.id = :id`, { id: dto.id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(LadesaTypings.Tokens.DiaCalendarioFindOneResultView, qb, aliasDiaCalendario, selection);

    // =========================================================

    const diaCalendario = await qb.getOne();

    // =========================================================

    return diaCalendario;
  }

  async diaCalendarioFindByIdStrict(accessContext: AccessContext, dto: LadesaTypings.DiaCalendarioFindOneInputView, selection?: string[] | boolean) {
    const diaCalendario = await this.diaCalendarioFindById(accessContext, dto, selection);

    if (!diaCalendario) {
      throw new NotFoundException();
    }

    return diaCalendario;
  }

  async diaCalendarioFindByIdSimple(
    accessContext: AccessContext,
    id: LadesaTypings.DiaCalendarioFindOneInputView["id"],
    selection?: string[],
  ): Promise<LadesaTypings.DiaCalendarioFindOneResultView | null> {
    // =========================================================

    const qb = this.diaCalendarioRepository.createQueryBuilder(aliasDiaCalendario);

    // =========================================================

    await accessContext.applyFilter("dia_calendario:find", qb, aliasDiaCalendario, null);

    // =========================================================

    qb.andWhere(`${aliasDiaCalendario}.id = :id`, { id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(LadesaTypings.Tokens.DiaCalendarioFindOneResultView, qb, aliasDiaCalendario, selection);

    // =========================================================

    const diaCalendario = await qb.getOne();

    // =========================================================

    return diaCalendario;
  }

  async DiaCalendarioFindByIdSimpleStrict(accessContext: AccessContext, id: LadesaTypings.DiaCalendarioFindOneInputView["id"], selection?: string[]) {
    const diaCalendario = await this.diaCalendarioFindByIdSimple(accessContext, id, selection);

    if (!diaCalendario) {
      throw new NotFoundException();
    }

    return diaCalendario;
  }

  //

  async diaCalendarioCreate(accessContext: AccessContext, dto: LadesaTypings.DiaCalendarioCreateOperationInput) {
    // =========================================================

    await accessContext.ensurePermission("dia_calendario:create", { dto });

    // =========================================================

    const dtoDiaCalendario = pick(dto.body, ["data", "dia_letivo", "feriado"]) as Pick<typeof dto.body, "data" | "diaLetivo" | "feriado">;

    const diaCalendario = this.diaCalendarioRepository.create();

    this.diaCalendarioRepository.merge(diaCalendario, {
      ...dtoDiaCalendario,
    });

    // =========================================================

    if (dto.body.calendario) {
      const calendario = await this.calendarioLetivoService.calendarioLetivoFindByIdSimpleStrict(accessContext, dto.body.calendario.id);

      this.diaCalendarioRepository.merge(diaCalendario, {
        calendario: {
          id: calendario.id,
        },
      });
    }

    // =========================================================

    await this.diaCalendarioRepository.save(diaCalendario);

    // =========================================================

    return this.diaCalendarioFindByIdStrict(accessContext, {
      id: diaCalendario.id,
    });
  }

  async diaCalendarioUpdate(accessContext: AccessContext, dto: LadesaTypings.DiaCalendarioUpdateByIdOperationInput) {
    // =========================================================

    const currentDiaCalendario = await this.diaCalendarioFindByIdStrict(accessContext, {
      id: dto.params.id,
    });

    // =========================================================

    await accessContext.ensurePermission("dia_calendario:update", { dto }, dto.params.id, this.diaCalendarioRepository.createQueryBuilder(aliasDiaCalendario));

    const dtoDiaCalendario = pick(dto.body, ["data", "dia_letivo", "feriado"]) as Pick<typeof dto.body, "data" | "diaLetivo" | "feriado">;

    const diaCalendario = {
      id: currentDiaCalendario.id,
    } as DiaCalendarioEntity;

    this.diaCalendarioRepository.merge(diaCalendario, {
      ...dtoDiaCalendario,
    });

    // =========================================================

    if (has(dto.body, "calendario") && dto.body.calendario !== undefined) {
      const calendario = await this.calendarioLetivoService.calendarioLetivoFindByIdSimpleStrict(accessContext, dto.body.calendario!.id);

      this.diaCalendarioRepository.merge(diaCalendario, {
        calendario: {
          id: calendario.id,
        },
      });
    }

    // =========================================================

    await this.diaCalendarioRepository.save(diaCalendario);

    // =========================================================

    return this.diaCalendarioFindByIdStrict(accessContext, {
      id: diaCalendario.id,
    });
  }

  //

  async diaCalendarioDeleteOneById(accessContext: AccessContext, dto: LadesaTypings.DiaCalendarioFindOneInputView) {
    // =========================================================

    await accessContext.ensurePermission("dia_calendario:delete", { dto }, dto.id, this.diaCalendarioRepository.createQueryBuilder(aliasDiaCalendario));

    // =========================================================

    const diaCalendario = await this.diaCalendarioFindByIdStrict(accessContext, dto);

    // =========================================================

    if (diaCalendario) {
      await this.diaCalendarioRepository
        .createQueryBuilder(aliasDiaCalendario)
        .update()
        .set({
          dateDeleted: "NOW()",
        })
        .where("id = :diaCalendarioId", { diaCalendarioId: diaCalendario.id })
        .andWhere("dateDeleted IS NULL")
        .execute();
    }

    // =========================================================

    return true;
  }
}
