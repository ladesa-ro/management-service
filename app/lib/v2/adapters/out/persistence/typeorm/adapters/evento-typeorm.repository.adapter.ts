import { Injectable } from "@nestjs/common";
import { FilterOperator } from "nestjs-paginate";
import type { SelectQueryBuilder } from "typeorm";
import type {
  EventoFindOneInput,
  EventoFindOneOutput,
  EventoListInput,
  EventoListOutput,
} from "@/core/evento";
import type { IEventoRepositoryPort } from "@/core/evento/application/ports/out";
import { paginateConfig } from "@/v2/old/infrastructure/fixtures";
import { NestJsPaginateAdapter } from "../../pagination/nestjs-paginate.adapter";
import { BaseTypeOrmRepositoryAdapter } from "../base";
import { DatabaseContextService } from "../context/database-context.service";
import type { EventoEntity } from "../typeorm/entities";
import type { ITypeOrmPaginationConfig } from "../types";

/**
 * Adapter TypeORM que implementa o port de repositório de Evento.
 * Estende BaseTypeOrmRepositoryAdapter para reutilizar operações CRUD comuns.
 */
@Injectable()
export class EventoTypeOrmRepositoryAdapter
  extends BaseTypeOrmRepositoryAdapter<
    EventoEntity,
    EventoListInput,
    EventoListOutput,
    EventoFindOneInput,
    EventoFindOneOutput
  >
  implements IEventoRepositoryPort
{
  protected readonly alias = "evento";
  protected readonly authzAction = "evento:find";
  protected readonly outputDtoName = "EventoFindOneOutput";

  constructor(
    protected readonly databaseContext: DatabaseContextService,
    protected readonly paginationAdapter: NestJsPaginateAdapter,
  ) {
    super();
  }

  protected get repository() {
    return this.databaseContext.eventoRepository;
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

  /**
   * @deprecated Usado para verificações de permissão. Será removido em fases futuras.
   */
  createQueryBuilder(alias: string): SelectQueryBuilder<EventoEntity> {
    return this.repository.createQueryBuilder(alias);
  }
}
