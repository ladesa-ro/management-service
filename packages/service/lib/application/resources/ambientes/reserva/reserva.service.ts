import { Injectable, NotFoundException } from "@nestjs/common";
import { has, map, pick } from "lodash";
import { FilterOperator } from "nestjs-paginate";
import { QbEfficientLoad } from "@/application/contracts/qb-efficient-load";
import { SearchService } from "@/application/helpers/search.service";
import { type IDomain } from "@/domain/contracts/integration";
import type { AccessContext } from "@/infrastructure/access-context";
import { DatabaseContextService } from "@/infrastructure/integrations/database";
import type { ReservaEntity } from "@/infrastructure/integrations/database/typeorm/entities";
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
    private searchService: SearchService,
  ) {}

  get reservaRepository() {
    return this.databaseContext.reservaRepository;
  }

  async reservaFindAll(accessContext: AccessContext, domain: IDomain.ReservaListInput | null = null, selection?: string[] | boolean): Promise<IDomain.ReservaListOutput["success"]> {
    // =========================================================

    const qb = this.reservaRepository.createQueryBuilder(aliasReserva);

    // =========================================================

    await accessContext.applyFilter("reserva:find", qb, aliasReserva, null);

    const _dateOperations = [FilterOperator.EQ, FilterOperator.GT, FilterOperator.GTE, FilterOperator.LT, FilterOperator.LTE] as const;

    // =========================================================

    const paginated = await this.searchService.search(
      qb,
      { ...domain },
      {
        select: ["id"],
        sortableColumns: [
          "situacao",
          "motivo",
          "tipo",
          "rrule",

          "ambiente.id",
          "ambiente.nome",
          "ambiente.capacidade",
          "ambiente.bloco.codigo",
          "ambiente.bloco.nome",
        ],
        searchableColumns: [
          "id",

          "situacao",
          "motivo",
          "tipo",
          "rrule",

          "ambiente.nome",
          "ambiente.descricao",
          "ambiente.codigo",
          "ambiente.bloco.nome",
          "ambiente.bloco.codigo",
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
      },
    );

    // =========================================================

    qb.select([]);
    await QbEfficientLoad("ReservaFindOneOutput", qb, aliasReserva, selection);

    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();
    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);

    // =========================================================

    return paginated;
  }

  async reservaFindById(accessContext: AccessContext, domain: IDomain.ReservaFindOneInput, selection?: string[] | boolean): Promise<IDomain.ReservaFindOneOutput | null> {
    // =========================================================

    const qb = this.reservaRepository.createQueryBuilder(aliasReserva);

    // =========================================================

    await accessContext.applyFilter("reserva:find", qb, aliasReserva, null);

    // =========================================================

    qb.andWhere(`${aliasReserva}.id = :id`, { id: domain.id });

    // =========================================================

    qb.select([]);
    await QbEfficientLoad("ReservaFindOneOutput", qb, aliasReserva, selection);

    // =========================================================

    const reserva = await qb.getOne();

    // =========================================================

    return reserva;
  }

  async reservaFindByIdStrict(accessContext: AccessContext, domain: IDomain.ReservaFindOneInput, selection?: string[] | boolean) {
    const reserva = await this.reservaFindById(accessContext, domain, selection);

    if (!reserva) {
      throw new NotFoundException();
    }

    return reserva;
  }

  async reservaFindByIdSimple(accessContext: AccessContext, id: IDomain.ReservaFindOneInput["id"], selection?: string[]): Promise<IDomain.ReservaFindOneOutput | null> {
    // =========================================================

    const qb = this.reservaRepository.createQueryBuilder(aliasReserva);

    // =========================================================

    await accessContext.applyFilter("reserva:find", qb, aliasReserva, null);

    // =========================================================

    qb.andWhere(`${aliasReserva}.id = :id`, { id });

    // =========================================================

    qb.select([]);
    await QbEfficientLoad("ReservaFindOneOutput", qb, aliasReserva, selection);

    // =========================================================

    const reserva = await qb.getOne();

    // =========================================================

    return reserva;
  }

  async reservaFindByIdSimpleStrict(accessContext: AccessContext, id: IDomain.ReservaFindOneInput["id"], selection?: string[]) {
    const reserva = await this.reservaFindByIdSimple(accessContext, id, selection);

    if (!reserva) {
      throw new NotFoundException();
    }

    return reserva;
  }

  async reservaCreate(accessContext: AccessContext, domain: IDomain.ReservaCreateInput) {
    // =========================================================

    await accessContext.ensurePermission("reserva:create", { dto: domain });

    // =========================================================

    const dtoReserva = pick(domain, ["situacao", "motivo", "tipo", "rrule"]);

    const reserva = this.reservaRepository.create();

    this.reservaRepository.merge(reserva, {
      ...dtoReserva,
    });

    // =========================================================

    const ambiente = await this.ambienteService.ambienteFindByIdStrict(accessContext, { id: domain.ambiente.id });

    this.reservaRepository.merge(reserva, {
      ambiente: {
        id: ambiente.id,
      },
    });

    // =========================================================

    const usuario = await this.usuarioService.usuarioFindByIdStrict(accessContext, {
      id: domain.usuario.id,
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

  async reservaUpdate(accessContext: AccessContext, domain: IDomain.ReservaUpdateInput) {
    // =========================================================

    const currentReserva = await this.reservaFindByIdStrict(accessContext, domain);

    // =========================================================

    await accessContext.ensurePermission("reserva:update", { dto: domain }, domain.id, this.reservaRepository.createQueryBuilder(aliasReserva));

    const dtoReserva = pick(domain, ["situacao", "motivo", "tipo", "rrule"]);

    const reserva = {
      id: currentReserva.id,
    } as ReservaEntity;

    this.reservaRepository.merge(reserva, {
      ...dtoReserva,
    });

    // =========================================================

    if (has(domain, "ambiente") && domain.ambiente !== undefined) {
      const ambiente = await this.ambienteService.ambienteFindByIdStrict(accessContext, { id: domain.ambiente.id });

      this.reservaRepository.merge(reserva, {
        ambiente: {
          id: ambiente.id,
        },
      });
    }

    // =========================================================

    if (has(domain, "usuario") && domain.usuario !== undefined) {
      const usuario = await this.usuarioService.usuarioFindByIdSimpleStrict(accessContext, domain.body.usuario.id);

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

  async reservaDeleteOneById(accessContext: AccessContext, domain: IDomain.ReservaFindOneInput) {
    // =========================================================

    await accessContext.ensurePermission("reserva:delete", { dto: domain }, domain.id, this.reservaRepository.createQueryBuilder(aliasReserva));

    // =========================================================

    const reserva = await this.reservaFindByIdStrict(accessContext, domain);

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
