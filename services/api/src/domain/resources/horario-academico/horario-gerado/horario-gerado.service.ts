import { QbEfficientLoad } from "@/application/standards/ladesa-spec/QbEfficientLoad";
import {
    LadesaPaginatedResultDto,
    LadesaSearch,
} from "@/application/standards/ladesa-spec/search/search-strategies";
import { CalendarioLetivoService } from "@/domain/resources/calendario/calendario-letivo/calendario-letivo.service";
import type { AccessContext } from "@/infrastructure/access-context";
import { paginateConfig } from "@/infrastructure/fixtures";
import { DatabaseContextService } from "@/infrastructure/integrations/database";
import type { HorarioGeradoEntity } from "@/infrastructure/integrations/database/typeorm/entities";
import { Injectable, NotFoundException } from "@nestjs/common";
import { has, map, pick } from "lodash";
import { FilterOperator } from "nestjs-paginate";
import type * as IDomainContracts from "~domain.contracts";

// ============================================================================

const aliasHorarioGerado = "horario_gerado";

// ============================================================================

@Injectable()
export class HorarioGeradoService {
  constructor(
    private databaseContext: DatabaseContextService,
    private calendarioLetivoService: CalendarioLetivoService
  ) {}

  get horarioGeradoRepository() {
    return this.databaseContext.horarioGeradoRepository;
  }

  //

  async horarioGeradoFindAll(
    accessContext: AccessContext,
    dto: IDomainContracts.HorarioGeradoListOperationInput | null = null,
    selection?: string[] | boolean
  ): Promise<IDomainContracts.HorarioGeradoListOperationOutput["success"]> {
    // =========================================================

    const qb =
      this.horarioGeradoRepository.createQueryBuilder(aliasHorarioGerado);

    // =========================================================

    await accessContext.applyFilter(
      "horario_gerado:find",
      qb,
      aliasHorarioGerado,
      null
    );

    // =========================================================

    const paginated = await LadesaSearch("#/", dto, qb, {
      ...paginateConfig,
      select: [
        //
        "id",
        //
        "status",
        "tipo",
        "dataGeracao",
        "vigenciaInicio",
        "vigenciaFim",
        "calendario",
        //
        "calendario.id",
        "calendario.nome",
        "calendario.ano",
      ],
      sortableColumns: [
        //
        "status",
        "tipo",
        "dataGeracao",
        "vigenciaInicio",
        "vigenciaFim",
        //
        "calendario.id",
        "calendario.nome",
        "calendario.ano",
      ],
      searchableColumns: [
        //
        "id",
        //
        "status",
        "tipo",
        "dataGeracao",
        "vigenciaInicio",
        "vigenciaFim",
        "calendario",
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

    QbEfficientLoad(
      IDomainContracts.Tokens.HorarioGeradoFindOneResultView,
      qb,
      aliasHorarioGerado,
      selection
    );

    // =========================================================

    const pageItemsView = await qb
      .andWhereInIds(map(paginated.data, "id"))
      .getMany();
    paginated.data = paginated.data.map(
      (paginated) => pageItemsView.find((i) => i.id === paginated.id)!
    );

    // =========================================================

    return LadesaPaginatedResultDto(paginated);
  }

  async horarioGeradoFindById(
    accessContext: AccessContext,
    dto: IDomainContracts.HorarioGeradoFindOneInputView,
    selection?: string[] | boolean
  ): Promise<IDomainContracts.HorarioGeradoFindOneResultView | null> {
    // =========================================================

    const qb =
      this.horarioGeradoRepository.createQueryBuilder(aliasHorarioGerado);

    // =========================================================

    await accessContext.applyFilter(
      "horario_gerado:find",
      qb,
      aliasHorarioGerado,
      null
    );

    // =========================================================

    qb.andWhere(`${aliasHorarioGerado}.id = :id`, { id: dto.id });

    // =========================================================

    qb.select([]);

    QbEfficientLoad(
      IDomainContracts.Tokens.HorarioGeradoFindOneResultView,
      qb,
      aliasHorarioGerado,
      selection
    );

    // =========================================================

    const horario = await qb.getOne();

    // =========================================================

    return horario;
  }

  async horarioGeradoFindByIdStrict(
    accessContext: AccessContext,
    dto: IDomainContracts.HorarioGeradoFindOneInputView,
    selection?: string[] | boolean
  ) {
    const horario = await this.horarioGeradoFindById(
      accessContext,
      dto,
      selection
    );

    if (!horario) {
      throw new NotFoundException();
    }

    return horario;
  }

  async horarioGeradoFindByIdSimple(
    accessContext: AccessContext,
    id: IDomainContracts.HorarioGeradoFindOneInputView["id"],
    selection?: string[]
  ): Promise<IDomainContracts.HorarioGeradoFindOneResultView | null> {
    // =========================================================

    const qb =
      this.horarioGeradoRepository.createQueryBuilder(aliasHorarioGerado);

    // =========================================================

    await accessContext.applyFilter(
      "horario_gerado:find",
      qb,
      aliasHorarioGerado,
      null
    );

    // =========================================================

    qb.andWhere(`${aliasHorarioGerado}.id = :id`, { id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(
      IDomainContracts.Tokens.HorarioGeradoFindOneResultView,
      qb,
      aliasHorarioGerado,
      selection
    );

    // =========================================================

    const horario = await qb.getOne();

    // =========================================================

    return horario;
  }

  async horarioGeradoFindByIdSimpleStrict(
    accessContext: AccessContext,
    id: IDomainContracts.HorarioGeradoFindOneInputView["id"],
    selection?: string[]
  ) {
    const horarioGerado = await this.horarioGeradoFindByIdSimple(
      accessContext,
      id,
      selection
    );

    if (!horarioGerado) {
      throw new NotFoundException();
    }

    return horarioGerado;
  }

  //

  async horarioGeradoCreate(
    accessContext: AccessContext,
    dto: IDomainContracts.HorarioGeradoCreateOperationInput
  ) {
    // =========================================================

    await accessContext.ensurePermission("horario_gerado:create", { dto });

    // =========================================================

    const dtoHorarioGerado = pick(dto.body, [
      "status",
      "tipo",
      "dataGeracao",
      "vigenciaInicio",
      "vigenciaFim",
    ]);

    const horarioGerado = this.horarioGeradoRepository.create();

    this.horarioGeradoRepository.merge(horarioGerado, {
      ...dtoHorarioGerado,
    });

    // =========================================================

    if (dto.body.calendario) {
      const calendario =
        await this.calendarioLetivoService.calendarioLetivoFindByIdSimpleStrict(
          accessContext,
          dto.body.calendario.id
        );

      this.horarioGeradoRepository.merge(horarioGerado, {
        calendario: {
          id: calendario.id,
        },
      });
    }

    // =========================================================

    await this.horarioGeradoRepository.save(horarioGerado);

    // =========================================================

    return this.horarioGeradoFindByIdStrict(accessContext, {
      id: horarioGerado.id,
    });
  }

  async horarioGeradoUpdate(
    accessContext: AccessContext,
    dto: IDomainContracts.HorarioGeradoUpdateByIdOperationInput
  ) {
    // =========================================================

    const currentHorarioGerado = await this.horarioGeradoFindByIdStrict(
      accessContext,
      {
        id: dto.params.id,
      }
    );

    // =========================================================

    await accessContext.ensurePermission(
      "horario_gerado:update",
      { dto },
      dto.params.id,
      this.horarioGeradoRepository.createQueryBuilder(aliasHorarioGerado)
    );

    const dtoHorarioGerado = pick(dto.body, [
      "status",
      "tipo",
      "dataGeracao",
      "vigenciaInicio",
      "vigenciaFim",
    ]);

    const horarioGerado = {
      id: currentHorarioGerado.id,
    } as HorarioGeradoEntity;

    this.horarioGeradoRepository.merge(horarioGerado, {
      ...dtoHorarioGerado,
    });

    // =========================================================

    if (has(dto.body, "calendario") && dto.body.calendario !== undefined) {
      const calendario =
        await this.calendarioLetivoService.calendarioLetivoFindByIdSimpleStrict(
          accessContext,
          dto.body.calendario!.id
        );

      this.horarioGeradoRepository.merge(horarioGerado, {
        calendario: {
          id: calendario.id,
        },
      });
    }

    // =========================================================

    await this.horarioGeradoRepository.save(horarioGerado);

    // =========================================================

    return this.horarioGeradoFindByIdStrict(accessContext, {
      id: horarioGerado.id,
    });
  }

  //

  async horarioGeradoDeleteOneById(
    accessContext: AccessContext,
    dto: IDomainContracts.HorarioGeradoFindOneInputView
  ) {
    // =========================================================

    await accessContext.ensurePermission(
      "horario_gerado:delete",
      { dto },
      dto.id,
      this.horarioGeradoRepository.createQueryBuilder(aliasHorarioGerado)
    );

    // =========================================================

    const horarioGerado = await this.horarioGeradoFindByIdStrict(
      accessContext,
      dto
    );

    // =========================================================

    if (horarioGerado) {
      await this.horarioGeradoRepository
        .createQueryBuilder(aliasHorarioGerado)
        .update()
        .set({
          dateDeleted: "NOW()",
        })
        .where("id = :horarioGeradoId", { horarioGeradoId: horarioGerado.id })
        .andWhere("dateDeleted IS NULL")
        .execute();
    }

    // =========================================================

    return true;
  }
}
