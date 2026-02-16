import { Injectable } from "@nestjs/common";
import { FilterOperator } from "nestjs-paginate";
import type { SelectQueryBuilder } from "typeorm";
import { DatabaseContextService } from "@/modules/@database-context";
import {
  BaseTypeOrmRepositoryAdapter,
  type ITypeOrmPaginationConfig,
  NestJsPaginateAdapter,
  paginateConfig,
} from "@/modules/@shared/infrastructure/persistence/typeorm";
import type {
  EventoFindOneInputDto,
  EventoFindOneOutputDto,
  EventoListInputDto,
  EventoListOutputDto,
} from "@/modules/horarios/evento";
import type { IEventoRepositoryPort } from "@/modules/horarios/evento/application/ports/out";
import type { EventoEntity } from "./evento.entity";

/**
 * Adapter TypeORM que implementa o port de repositório de Evento.
 * Estende BaseTypeOrmRepositoryAdapter para reutilizar operações CRUD comuns.
 */
@Injectable()
export class EventoTypeOrmRepositoryAdapter
  extends BaseTypeOrmRepositoryAdapter<
    EventoEntity,
    EventoListInputDto,
    EventoListOutputDto,
    EventoFindOneInputDto,
    EventoFindOneOutputDto
  >
  implements IEventoRepositoryPort
{
  protected readonly alias = "evento";
  protected readonly authzAction = "evento:find";
  protected readonly outputDtoName = "EventoFindOneOutputDto";

  constructor(
    protected readonly databaseContext: DatabaseContextService,
    protected readonly paginationAdapter: NestJsPaginateAdapter,
  ) {
    super();
  }

  protected get repository() {
    return this.databaseContext.eventoRepository;
  }

  /**
   * @deprecated Usado para verificações de permissão. Será removido em fases futuras.
   */
  createQueryBuilder(alias: string): SelectQueryBuilder<EventoEntity> {
    return this.repository.createQueryBuilder(alias);
  }

  protected getPaginateConfig(): ITypeOrmPaginationConfig<EventoEntity> {
    return {
      ...paginateConfig,
      relations: {
        calendario: true,
      },
      select: [
        "id",
        "nome",
        "cor",
        "rrule",
        "dataInicio",
        "dataFim",
        "calendario.id",
        "calendario.nome",
        "calendario.ano",
        "dateCreated",
      ],
      sortableColumns: [
        "nome",
        "cor",
        "dataInicio",
        "dataFim",
        "calendario.id",
        "calendario.nome",
        "calendario.ano",
        "dateCreated",
      ],
      searchableColumns: ["id", "nome", "cor"],
      defaultSortBy: [["dateCreated", "ASC"]],
      filterableColumns: {
        "calendario.id": [FilterOperator.EQ],
        "calendario.nome": [FilterOperator.EQ],
        "calendario.ano": [FilterOperator.EQ],
        dataInicio: [FilterOperator.GTE, FilterOperator.LTE],
        dataFim: [FilterOperator.GTE, FilterOperator.LTE],
      },
    };
  }
}
