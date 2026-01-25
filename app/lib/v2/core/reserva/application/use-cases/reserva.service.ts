import { Injectable, NotFoundException } from "@nestjs/common";
import { has, map, pick } from "lodash";
import { FilterOperator } from "nestjs-paginate";
import { AmbienteService } from "@/v2/core/ambiente/application/use-cases/ambiente.service";
import { UsuarioService } from "@/v2/core/usuario/application/use-cases/usuario.service";
import type { AccessContext } from "@/infrastructure/access-context";
import { DatabaseContextService } from "@/v2/adapters/out/persistence/typeorm";
import type { ReservaEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import { QbEfficientLoad, SearchService } from "@/shared";
import type {
  ReservaCreateInputDto,
  ReservaFindOneInputDto,
  ReservaFindOneOutputDto,
  ReservaListInputDto,
  ReservaListOutputDto,
  ReservaUpdateInputDto,
} from "@/v2/adapters/in/http/reserva/dto";

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

  async reservaFindAll(accessContext: AccessContext, dto: ReservaListInputDto | null = null, selection?: string[] | boolean): Promise<ReservaListOutputDto> {
    // =========================================================

    const qb = this.reservaRepository.createQueryBuilder(aliasReserva);

    // =========================================================

    await accessContext.applyFilter("reserva:find", qb, aliasReserva, null);

    const _dateOperations = [FilterOperator.EQ, FilterOperator.GT, FilterOperator.GTE, FilterOperator.LT, FilterOperator.LTE] as const;

    // =========================================================

    const paginated = await this.searchService.search(qb, dto, {
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
    });

    // =========================================================

    qb.select([]);
    QbEfficientLoad("ReservaFindOneOutput", qb, aliasReserva, selection);

    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();
    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);

    // =========================================================

    return paginated as ReservaListOutputDto;
  }

  async reservaFindById(accessContext: AccessContext, dto: ReservaFindOneInputDto, selection?: string[] | boolean): Promise<ReservaFindOneOutputDto | null> {
    // =========================================================

    const qb = this.reservaRepository.createQueryBuilder(aliasReserva);

    // =========================================================

    await accessContext.applyFilter("reserva:find", qb, aliasReserva, null);

    // =========================================================

    qb.andWhere(`${aliasReserva}.id = :id`, { id: dto.id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad("ReservaFindOneOutput", qb, aliasReserva, selection);

    // =========================================================

    const reserva = await qb.getOne();

    // =========================================================

    return reserva as ReservaFindOneOutputDto | null;
  }

  async reservaFindByIdStrict(accessContext: AccessContext, dto: ReservaFindOneInputDto, selection?: string[] | boolean): Promise<ReservaFindOneOutputDto> {
    const reserva = await this.reservaFindById(accessContext, dto, selection);

    if (!reserva) {
      throw new NotFoundException();
    }

    return reserva;
  }

  async reservaFindByIdSimple(accessContext: AccessContext, id: ReservaFindOneInputDto["id"], selection?: string[]): Promise<ReservaFindOneOutputDto | null> {
    // =========================================================

    const qb = this.reservaRepository.createQueryBuilder(aliasReserva);

    // =========================================================

    await accessContext.applyFilter("reserva:find", qb, aliasReserva, null);

    // =========================================================

    qb.andWhere(`${aliasReserva}.id = :id`, { id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad("ReservaFindOneOutput", qb, aliasReserva, selection);

    // =========================================================

    const reserva = await qb.getOne();

    // =========================================================

    return reserva as ReservaFindOneOutputDto | null;
  }

  async reservaFindByIdSimpleStrict(accessContext: AccessContext, id: ReservaFindOneInputDto["id"], selection?: string[]): Promise<ReservaFindOneOutputDto> {
    const reserva = await this.reservaFindByIdSimple(accessContext, id, selection);

    if (!reserva) {
      throw new NotFoundException();
    }

    return reserva;
  }

  async reservaCreate(accessContext: AccessContext, dto: ReservaCreateInputDto): Promise<ReservaFindOneOutputDto> {
    // =========================================================

    await accessContext.ensurePermission("reserva:create", { dto });

    // =========================================================

    const dtoReserva = pick(dto, ["situacao", "motivo", "tipo", "rrule"]);

    const reserva = this.reservaRepository.create();

    this.reservaRepository.merge(reserva, {
      ...dtoReserva,
    });

    // =========================================================

    const ambiente = await this.ambienteService.ambienteFindByIdStrict(accessContext, { id: dto.ambiente.id });

    this.reservaRepository.merge(reserva, {
      ambiente: {
        id: ambiente.id,
      },
    });

    // =========================================================

    const usuario = await this.usuarioService.usuarioFindByIdStrict(accessContext, {
      id: dto.usuario.id,
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

  async reservaUpdate(accessContext: AccessContext, dto: ReservaFindOneInputDto & ReservaUpdateInputDto): Promise<ReservaFindOneOutputDto> {
    // =========================================================

    const currentReserva = await this.reservaFindByIdStrict(accessContext, { id: dto.id });

    // =========================================================

    await accessContext.ensurePermission("reserva:update", { dto }, dto.id, this.reservaRepository.createQueryBuilder(aliasReserva));

    const dtoReserva = pick(dto, ["situacao", "motivo", "tipo", "rrule"]);

    const reserva = {
      id: currentReserva.id,
    } as ReservaEntity;

    this.reservaRepository.merge(reserva, {
      ...dtoReserva,
    });

    // =========================================================

    if (has(dto, "ambiente") && dto.ambiente !== undefined) {
      const ambiente = await this.ambienteService.ambienteFindByIdStrict(accessContext, { id: dto.ambiente.id });

      this.reservaRepository.merge(reserva, {
        ambiente: {
          id: ambiente.id,
        },
      });
    }

    // =========================================================

    if (has(dto, "usuario") && dto.usuario !== undefined) {
      const usuario = await this.usuarioService.usuarioFindByIdSimpleStrict(accessContext, dto.usuario.id);

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

  async reservaDeleteOneById(accessContext: AccessContext, dto: ReservaFindOneInputDto): Promise<boolean> {
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
