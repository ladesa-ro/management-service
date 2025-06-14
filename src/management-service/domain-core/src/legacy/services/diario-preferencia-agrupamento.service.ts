import { QbEfficientLoad } from "@/application/standards/ladesa-spec/QbEfficientLoad";
import {
  LadesaPaginatedResultDto,
  LadesaSearch,
} from "@/application/standards/ladesa-spec/search/search-strategies";
import type * as IDomainContracts from "@ladesa-ro/management-management-service.domain.contracts/typings";
import type { AccessContext } from "@ladesa-ro/management-management-service.infrastructure/access-context";
import { paginateConfig } from "@ladesa-ro/management-management-service.infrastructure/fixtures";
import { DatabaseContextService } from "@ladesa-ro/management-management-service.infrastructure/integrations/database";
import type { DiarioPreferenciaAgrupamentoEntity } from "@ladesa-ro/management-management-service.infrastructure/integrations/database/typeorm/entities";
import { Injectable, NotFoundException } from "@nestjs/common";
import { has, map, pick } from "lodash";
import { FilterOperator } from "nestjs-paginate";
import { DiarioService } from "./diario.service";
import { IntervaloDeTempoService } from "./intervalo-de-tempo.service";

// ============================================================================

const aliasDiarioPreferenciaAgrupamento = "diario_preferencia_agrupamento";

// ============================================================================

@Injectable()
export class DiarioPreferenciaAgrupamentoService {
  constructor(
    private databaseContext: DatabaseContextService,
    private DiarioService: DiarioService,
    private intervaloDeTempoService: IntervaloDeTempoService
  ) { }

  get diarioPreferenciaAgrupamentoRepository() {
    return this.databaseContext.diarioPreferenciaAgrupamentoRepository;
  }

  //

  async diarioPreferenciaAgrupamentoFindAll(
    accessContext: AccessContext,
    dto: IDomainContracts.DiarioPreferenciaAgrupamentoListInput | null = null,
    selection?: string[] | boolean
  ): Promise<
    IDomainContracts.DiarioPreferenciaAgrupamentoListOperationOutput["success"]
  > {
    // =========================================================

    const qb = this.diarioPreferenciaAgrupamentoRepository.createQueryBuilder(
      aliasDiarioPreferenciaAgrupamento
    );

    // =========================================================

    await accessContext.applyFilter(
      "diario_preferencia_agrupamento:find",
      qb,
      aliasDiarioPreferenciaAgrupamento,
      null
    );

    // =========================================================

    const paginated = await LadesaSearch("#/", dto, qb, {
      ...paginateConfig,
      select: [
        //
        "id",
        //
        "diaSemanaIso",
        "aulasSeguidas",
        "dataInicio",
        "dataFim",
        "diario",
        "intervaloDeTempo",
        //
        "diario.id",
        "diario.ativo",
        //
        "intervaloDeTempo.id",
        "intervaloDeTempo.periodoInicio",
        "intervaloDeTempo.periodoFim",
      ],
      sortableColumns: [
        //
        "diaSemanaIso",
        "aulasSeguidas",
        "dataInicio",
        "dataFim",
        "diario",
        //
        "diario.id",
        "intervaloDeTempo.id",
      ],
      searchableColumns: [
        //
        "id",
        //
        "diaSemanaIso",
        "aulasSeguidas",
        "dataInicio",
        "dataFim",
        "diario",
        "intervaloDeTempo",
      ],
      relations: {
        diario: true,
        intervaloDeTempo: true,
      },
      defaultSortBy: [],
      filterableColumns: {
        "diario.id": [FilterOperator.EQ],
      },
    });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(
      IDomainContracts.Tokens.DiarioPreferenciaAgrupamentoFindOneOutput,
      qb,
      aliasDiarioPreferenciaAgrupamento,
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

  async diarioPreferenciaAgrupamentoFindById(
    accessContext: AccessContext,
    dto: IDomainContracts.DiarioPreferenciaAgrupamentoFindOneInput,
    selection?: string[] | boolean
  ): Promise<IDomainContracts.DiarioPreferenciaAgrupamentoFindOneOutput | null> {
    // =========================================================

    const qb = this.diarioPreferenciaAgrupamentoRepository.createQueryBuilder(
      aliasDiarioPreferenciaAgrupamento
    );

    // =========================================================

    await accessContext.applyFilter(
      "diario_preferencia_agrupamento:find",
      qb,
      aliasDiarioPreferenciaAgrupamento,
      null
    );

    // =========================================================

    qb.andWhere(`${aliasDiarioPreferenciaAgrupamento}.id = :id`, {
      id: dto.id,
    });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(
      IDomainContracts.Tokens.DiarioPreferenciaAgrupamentoFindOneOutput,
      qb,
      aliasDiarioPreferenciaAgrupamento,
      selection
    );
    // =========================================================

    const diarioPreferenciaAgrupamento = await qb.getOne();

    // =========================================================

    return diarioPreferenciaAgrupamento;
  }

  async diarioPreferenciaAgrupamentoFindByIdStrict(
    accessContext: AccessContext,
    dto: IDomainContracts.DiarioPreferenciaAgrupamentoFindOneInput,
    selection?: string[] | boolean
  ) {
    const diarioPreferenciaAgrupamento =
      await this.diarioPreferenciaAgrupamentoFindById(
        accessContext,
        dto,
        selection
      );

    if (!diarioPreferenciaAgrupamento) {
      throw new NotFoundException();
    }

    return diarioPreferenciaAgrupamento;
  }

  async diarioPreferenciaAgrupamentoFindByIdSimple(
    accessContext: AccessContext,
    id: IDomainContracts.DiarioPreferenciaAgrupamentoFindOneInput["id"],
    selection?: string[]
  ): Promise<IDomainContracts.DiarioPreferenciaAgrupamentoFindOneOutput | null> {
    // =========================================================

    const qb = this.diarioPreferenciaAgrupamentoRepository.createQueryBuilder(
      aliasDiarioPreferenciaAgrupamento
    );

    // =========================================================

    await accessContext.applyFilter(
      "diario_preferencia_agrupamento:find",
      qb,
      aliasDiarioPreferenciaAgrupamento,
      null
    );

    // =========================================================

    qb.andWhere(`${aliasDiarioPreferenciaAgrupamento}.id = :id`, { id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(
      IDomainContracts.Tokens.DiarioPreferenciaAgrupamentoFindOneOutput,
      qb,
      aliasDiarioPreferenciaAgrupamento,
      selection
    );

    // =========================================================

    const diarioPreferenciaAgrupamento = await qb.getOne();

    // =========================================================

    return diarioPreferenciaAgrupamento;
  }

  async diarioPreferenciaAgrupamentoFindByIdSimpleStrict(
    accessContext: AccessContext,
    id: IDomainContracts.DiarioPreferenciaAgrupamentoFindOneInput["id"],
    selection?: string[]
  ) {
    const diarioPreferenciaAgrupamento =
      await this.diarioPreferenciaAgrupamentoFindByIdSimple(
        accessContext,
        id,
        selection
      );

    if (!diarioPreferenciaAgrupamento) {
      throw new NotFoundException();
    }

    return diarioPreferenciaAgrupamento;
  }

  //

  async diarioPreferenciaAgrupamentoCreate(
    accessContext: AccessContext,
    dto: IDomainContracts.DiarioPreferenciaAgrupamentoCreateInput
  ) {
    // =========================================================

    await accessContext.ensurePermission(
      "diario_preferencia_agrupamento:create",
      { dto }
    );

    // =========================================================

    const dtoDiarioPreferenciaAgrupamento = pick(dto.body, [
      "diaSemanaIso",
      "aulasSeguidas",
      "dataInicio",
      "dataFim",
    ]);

    const diarioPreferenciaAgrupamento =
      this.diarioPreferenciaAgrupamentoRepository.create();

    this.diarioPreferenciaAgrupamentoRepository.merge(
      diarioPreferenciaAgrupamento,
      {
        ...dtoDiarioPreferenciaAgrupamento,
      }
    );

    // =========================================================

    if (dto.body.diario) {
      const diario = await this.DiarioService.diarioFindByIdStrict(
        accessContext,
        dto.body.diario
      );

      this.diarioPreferenciaAgrupamentoRepository.merge(
        diarioPreferenciaAgrupamento,
        {
          diario: {
            id: diario.id,
          },
        }
      );
    }

    if (dto.body.intervaloDeTempo) {
      const intervalo =
        await this.intervaloDeTempoService.intervaloCreateOrUpdate(
          accessContext,
          dto.body.intervaloDeTempo
        );

      this.diarioPreferenciaAgrupamentoRepository.merge(
        diarioPreferenciaAgrupamento,
        {
          intervaloDeTempo: {
            id: intervalo!.id,
          },
        }
      );
    }

    // =========================================================

    await this.diarioPreferenciaAgrupamentoRepository.save(
      diarioPreferenciaAgrupamento
    );

    // =========================================================

    return this.diarioPreferenciaAgrupamentoFindByIdStrict(accessContext, {
      id: diarioPreferenciaAgrupamento.id,
    });
  }

  async diarioPreferenciaAgrupamentoUpdate(
    accessContext: AccessContext,
    dto: IDomainContracts.DiarioPreferenciaAgrupamentoUpdateInput
  ) {
    // =========================================================

    const currentDiarioPreferenciaAgrupamento =
      await this.diarioPreferenciaAgrupamentoFindByIdStrict(accessContext, {
        id: dto.params.id,
      });

    // =========================================================

    await accessContext.ensurePermission(
      "diario_preferencia_agrupamento:update",
      { dto },
      dto.params.id,
      this.diarioPreferenciaAgrupamentoRepository.createQueryBuilder(
        aliasDiarioPreferenciaAgrupamento
      )
    );

    const dtoDiarioPreferenciaAgrupamento = pick(dto.body, [
      "diaSemanaIso",
      "aulasSeguidas",
      "dataInicio",
      "dataFim",
    ]);

    const diarioPreferenciaAgrupamento = {
      id: currentDiarioPreferenciaAgrupamento.id,
    } as DiarioPreferenciaAgrupamentoEntity;

    this.diarioPreferenciaAgrupamentoRepository.merge(
      diarioPreferenciaAgrupamento,
      {
        ...dtoDiarioPreferenciaAgrupamento,
      }
    );

    // =========================================================

    if (has(dto.body, "diario") && dto.body.diario !== undefined) {
      const diario = await this.DiarioService.diarioFindByIdStrict(
        accessContext,
        dto.body.diario
      );

      this.diarioPreferenciaAgrupamentoRepository.merge(
        diarioPreferenciaAgrupamento,
        {
          diario: {
            id: diario.id,
          },
        }
      );
    }

    if (
      has(dto.body, "intervaloDeTempo") &&
      dto.body.intervaloDeTempo !== undefined
    ) {
      const intervaloDeTempo =
        await this.intervaloDeTempoService.intervaloCreateOrUpdate(
          accessContext,
          dto.body.intervaloDeTempo!
        );

      this.diarioPreferenciaAgrupamentoRepository.merge(
        diarioPreferenciaAgrupamento,
        {
          intervaloDeTempo: {
            id: intervaloDeTempo!.id,
          },
        }
      );
    }

    // =========================================================

    await this.diarioPreferenciaAgrupamentoRepository.save(
      diarioPreferenciaAgrupamento
    );

    // =========================================================

    return this.diarioPreferenciaAgrupamentoFindByIdStrict(accessContext, {
      id: diarioPreferenciaAgrupamento.id,
    });
  }

  //

  async diarioPreferenciaAgrupamentoDeleteOneById(
    accessContext: AccessContext,
    dto: IDomainContracts.DiarioPreferenciaAgrupamentoFindOneInput
  ) {
    // =========================================================

    await accessContext.ensurePermission(
      "diario_preferencia_agrupamento:delete",
      { dto },
      dto.id,
      this.diarioPreferenciaAgrupamentoRepository.createQueryBuilder(
        aliasDiarioPreferenciaAgrupamento
      )
    );

    // =========================================================

    const diarioPreferenciaAgrupamento =
      await this.diarioPreferenciaAgrupamentoFindByIdStrict(accessContext, dto);

    // =========================================================

    if (diarioPreferenciaAgrupamento) {
      await this.diarioPreferenciaAgrupamentoRepository
        .createQueryBuilder(aliasDiarioPreferenciaAgrupamento)
        .update()
        .set({
          dateDeleted: "NOW()",
        })
        .where("id = :diarioPreferenciaAgrupamentoId", {
          diarioPreferenciaAgrupamentoId: diarioPreferenciaAgrupamento.id,
        })
        .andWhere("dateDeleted IS NULL")
        .execute();
    }

    // =========================================================

    return true;
  }
}
