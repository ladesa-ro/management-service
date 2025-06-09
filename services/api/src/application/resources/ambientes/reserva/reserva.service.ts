import { QbEfficientLoad } from "@/application/standards/ladesa-spec/QbEfficientLoad";
import { LadesaPaginatedResultDto, LadesaSearch } from "@/application/standards/ladesa-spec/search/search-strategies";
import type { AccessContext } from "@/infrastructure/access-context";
import { paginateConfig } from "@/infrastructure/fixtures";
import { DatabaseContextService } from "@/infrastructure/integrations/database";
import type { ReservaEntity } from "@/infrastructure/integrations/database/typeorm/entities";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Injectable, NotFoundException } from "@nestjs/common";
import { has, map, pick } from "lodash";
import { FilterOperator } from "nestjs-paginate";
import { UsuarioService } from "../../autenticacao/usuario/usuario.service";
import { AmbienteService } from "../ambiente/ambiente.service";

// ============================================================================

const aliasReserva = "reserva";

// ============================================================================

@Injectable()
export class ReservaService {
  constructor(
    private databaseContext: DatabaseContextService,
    private usuarioService: UsuarioService,
    private ambienteService: AmbienteService,
  ) {}

  get reservaRepository() {
    return this.databaseContext.reservaRepository;
  }

  //

  async reservaFindAll(
    accessContext: AccessContext,
    dto: LadesaTypings.ReservaListOperationInput | null = null,
    selection?: string[] | boolean,
  ): Promise<LadesaTypings.ReservaListOperationOutput["success"]> {
    // =========================================================

    const qb = this.reservaRepository.createQueryBuilder(aliasReserva);

    // =========================================================

    await accessContext.applyFilter("reserva:find", qb, aliasReserva, null);

    const dateOperations = [FilterOperator.EQ, FilterOperator.GT, FilterOperator.GTE, FilterOperator.LT, FilterOperator.LTE] as const;

    // =========================================================

    const paginated = await LadesaSearch("#/", dto, qb, {
      ...paginateConfig,
      select: [
        //
        "id",
        //
      ],
      sortableColumns: [
        //
        "situacao",
        "motivo",
        "tipo",
        "rrule",
        //
        "ambiente.id",
        "ambiente.nome",
        "ambiente.capacidade",
        "ambiente.bloco.codigo",
        "ambiente.bloco.nome",
      ],
      searchableColumns: [
        //
        "id",
        //
        "situacao",
        "motivo",
        "tipo",
        "rrule",
        //
        "ambiente.nome",
        "ambiente.descricao",
        "ambiente.codigo",
        "ambiente.bloco.nome",
        "ambiente.bloco.codigo",
        //
      ],
      relations: {
        ambiente: {
          bloco: {
            campus: true,
          },
        },
        usuario: true,
        // intervaloDeTempo: true,
      },

      defaultSortBy: [],

      filterableColumns: {
        situacao: [FilterOperator.EQ],
        tipo: [FilterOperator.EQ],

        "ambiente.id": [FilterOperator.EQ],
        "ambiente.bloco.id": [FilterOperator.EQ],
        "ambiente.bloco.campus.id": [FilterOperator.EQ],
      },
    });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(LadesaTypings.Tokens.ReservaFindOneResultView, qb, aliasReserva, selection);

    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();
    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);

    // =========================================================

    return LadesaPaginatedResultDto(paginated);
  }

  async reservaFindById(accessContext: AccessContext, dto: LadesaTypings.ReservaFindOneInputView, selection?: string[] | boolean): Promise<LadesaTypings.ReservaFindOneResultView | null> {
    // =========================================================

    const qb = this.reservaRepository.createQueryBuilder(aliasReserva);

    // =========================================================

    await accessContext.applyFilter("reserva:find", qb, aliasReserva, null);

    // =========================================================

    qb.andWhere(`${aliasReserva}.id = :id`, { id: dto.id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(LadesaTypings.Tokens.ReservaFindOneResultView, qb, aliasReserva, selection);

    // =========================================================

    const reserva = await qb.getOne();

    // =========================================================

    return reserva;
  }

  async reservaFindByIdStrict(accessContext: AccessContext, dto: LadesaTypings.ReservaFindOneInputView, selection?: string[] | boolean) {
    const reserva = await this.reservaFindById(accessContext, dto, selection);

    if (!reserva) {
      throw new NotFoundException();
    }

    return reserva;
  }

  async reservaFindByIdSimple(accessContext: AccessContext, id: LadesaTypings.ReservaFindOneInputView["id"], selection?: string[]): Promise<LadesaTypings.ReservaFindOneResultView | null> {
    // =========================================================

    const qb = this.reservaRepository.createQueryBuilder(aliasReserva);

    // =========================================================

    await accessContext.applyFilter("reserva:find", qb, aliasReserva, null);

    // =========================================================

    qb.andWhere(`${aliasReserva}.id = :id`, { id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(LadesaTypings.Tokens.ReservaFindOneResultView, qb, aliasReserva, selection);

    // =========================================================

    const reserva = await qb.getOne();

    // =========================================================

    return reserva;
  }

  async reservaFindByIdSimpleStrict(accessContext: AccessContext, id: LadesaTypings.ReservaFindOneInputView["id"], selection?: string[]) {
    const reserva = await this.reservaFindByIdSimple(accessContext, id, selection);

    if (!reserva) {
      throw new NotFoundException();
    }

    return reserva;
  }

  //

  async reservaCreate(accessContext: AccessContext, dto: LadesaTypings.ReservaCreateOperationInput) {
    // =========================================================

    await accessContext.ensurePermission("reserva:create", { dto });

    // =========================================================

    const dtoReserva = pick(dto.body, ["situacao", "motivo", "tipo", "rrule"]);

    const reserva = this.reservaRepository.create();

    this.reservaRepository.merge(reserva, {
      ...dtoReserva,
    });

    // =========================================================

    const ambiente = await this.ambienteService.ambienteFindByIdStrict(accessContext, { id: dto.body.ambiente.id });

    this.reservaRepository.merge(reserva, {
      ambiente: {
        id: ambiente.id,
      },
    });

    // =========================================================

    const usuario = await this.usuarioService.usuarioFindByIdStrict(accessContext, {
      id: dto.body.usuario.id,
    });

    this.reservaRepository.merge(reserva, {
      usuario: {
        id: usuario.id,
      },
    });

    // =========================================================

    await this.reservaRepository.save(reserva);

    // =========================================================

    return this.reservaFindByIdStrict(accessContext, { id: reserva.id });
  }

  async reservaUpdate(accessContext: AccessContext, dto: LadesaTypings.ReservaUpdateByIdOperationInput) {
    // =========================================================

    const currentReserva = await this.reservaFindByIdStrict(accessContext, {
      id: dto.params.id,
    });

    // =========================================================

    await accessContext.ensurePermission("reserva:update", { dto }, dto.params.id, this.reservaRepository.createQueryBuilder(aliasReserva));

    const dtoReserva = pick(dto.body, ["situacao", "motivo", "tipo", "rrule"]);

    const reserva = {
      id: currentReserva.id,
    } as ReservaEntity;

    this.reservaRepository.merge(reserva, {
      ...dtoReserva,
    });

    // =========================================================

    if (has(dto.body, "ambiente") && dto.body.ambiente !== undefined) {
      const ambiente = await this.ambienteService.ambienteFindByIdStrict(accessContext, { id: dto.body.ambiente.id });

      this.reservaRepository.merge(reserva, {
        ambiente: {
          id: ambiente.id,
        },
      });
    }

    // =========================================================

    if (has(dto.body, "usuario") && dto.body.usuario !== undefined) {
      const usuario = await this.usuarioService.usuarioFindByIdSimpleStrict(accessContext, dto.body.usuario.id);

      this.reservaRepository.merge(reserva, {
        usuario: {
          id: usuario.id,
        },
      });
    }

    // =========================================================

    await this.reservaRepository.save(reserva);

    // =========================================================

    return this.reservaFindByIdStrict(accessContext, { id: reserva.id });
  }

  //

  async reservaDeleteOneById(accessContext: AccessContext, dto: LadesaTypings.ReservaFindOneInputView) {
    // =========================================================

    await accessContext.ensurePermission("reserva:delete", { dto }, dto.id, this.reservaRepository.createQueryBuilder(aliasReserva));

    // =========================================================

    const reserva = await this.reservaFindByIdStrict(accessContext, dto);

    // =========================================================

    if (reserva) {
      await this.reservaRepository
        .createQueryBuilder(aliasReserva)
        .update()
        .set({
          dateDeleted: "NOW()",
        })
        .where("id = :reservaId", { reservaId: reserva.id })
        .andWhere("dateDeleted IS NULL")
        .execute();
    }

    // =========================================================

    return true;
  }
}
