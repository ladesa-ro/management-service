import { QbEfficientLoad } from "@/application/standards/ladesa-spec/QbEfficientLoad";
import {
  LadesaPaginatedResultDto,
  LadesaSearch,
} from "@/application/standards/ladesa-spec/search/search-strategies";
import type * as IDomainContracts from "@ladesa-ro/management-management-service.domain.contracts/typings";
import type { AccessContext } from "@ladesa-ro/management-management-service.infrastructure/access-context";
import { paginateConfig } from "@ladesa-ro/management-management-service.infrastructure/fixtures";
import { DatabaseContextService } from "@ladesa-ro/management-management-service.infrastructure/integrations/database";
import type { HorarioGeradoEntity } from "@ladesa-ro/management-management-service.infrastructure/integrations/database/typeorm/entities";
import { Injectable, NotFoundException } from "@nestjs/common";
import { has, map, pick } from "lodash";
import { FilterOperator } from "nestjs-paginate";
import { CalendarioLetivoService } from "./calendario-letivo.service";

// ============================================================================

const aliasHorarioGerado = "horario_gerado";

// ============================================================================

@Injectable()
export class HorarioGeradoService {
  constructor(
    private databaseContext: DatabaseContextService,
    private calendarioLetivoService: CalendarioLetivoService
  ) { }

  get horarioGeradoRepository() {
    return this.databaseContext.horarioGeradoRepository;
  }

  //

  async horarioGeradoFindAll(
    accessContext: AccessContext,
    dto: IDomainContracts.HorarioGeradoListInput | null = null,
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
      IDomainContracts.Tokens.HorarioGeradoFindOneOutput,
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
    dto: IDomainContracts.HorarioGeradoFindOneInput,
    selection?: string[] | boolean
  ): Promise<IDomainContracts.HorarioGeradoFindOneOutput | null> {
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
      IDomainContracts.Tokens.HorarioGeradoFindOneOutput,
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
    dto: IDomainContracts.HorarioGeradoFindOneInput,
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
    id: IDomainContracts.HorarioGeradoFindOneInput["id"],
    selection?: string[]
  ): Promise<IDomainContracts.HorarioGeradoFindOneOutput | null> {
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
      IDomainContracts.Tokens.HorarioGeradoFindOneOutput,
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
    id: IDomainContracts.HorarioGeradoFindOneInput["id"],
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
    dto: IDomainContracts.HorarioGeradoCreateInput
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
    dto: IDomainContracts.HorarioGeradoUpdateInput
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
    dto: IDomainContracts.HorarioGeradoFindOneInput
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
