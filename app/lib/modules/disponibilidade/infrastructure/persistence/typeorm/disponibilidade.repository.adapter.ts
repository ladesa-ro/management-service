import { Injectable } from "@nestjs/common";
import type { ITypeOrmPaginationConfig } from "@/@shared/infrastructure/persistence/typeorm";
import {
  BaseTypeOrmRepositoryAdapter,
  NestJsPaginateAdapter,
} from "@/@shared/infrastructure/persistence/typeorm";
import { DatabaseContextService } from "@/database-context";
import type {
  DisponibilidadeFindOneInput,
  DisponibilidadeFindOneOutput,
  DisponibilidadeListInput,
  DisponibilidadeListOutput,
  IDisponibilidadeRepositoryPort,
} from "@/modules/disponibilidade";
import { paginateConfig } from "@/v2/old/infrastructure/fixtures";
import type { DisponibilidadeEntity } from "./disponibilidade.entity";

@Injectable()
export class DisponibilidadeTypeOrmRepositoryAdapter
  extends BaseTypeOrmRepositoryAdapter<
    DisponibilidadeEntity,
    DisponibilidadeListInput,
    DisponibilidadeListOutput,
    DisponibilidadeFindOneInput,
    DisponibilidadeFindOneOutput
  >
  implements IDisponibilidadeRepositoryPort
{
  protected readonly alias = "disponibilidade";
  protected readonly authzAction = "disponibilidade:find";
  protected readonly outputDtoName = "DisponibilidadeFindOneOutput";

  constructor(
    protected readonly databaseContext: DatabaseContextService,
    protected readonly paginationAdapter: NestJsPaginateAdapter,
  ) {
    super();
  }

  protected get repository() {
    return this.databaseContext.disponibilidadeRepository;
  }

  protected getPaginateConfig(): ITypeOrmPaginationConfig<DisponibilidadeEntity> {
    return {
      ...paginateConfig,
      select: ["id", "dataInicio", "dataFim", "dateCreated"],
      sortableColumns: ["dataInicio", "dataFim", "dateCreated"],
      searchableColumns: ["id", "dataInicio", "dataFim"],
      defaultSortBy: [
        ["dataInicio", "ASC"],
        ["dataFim", "ASC"],
      ],
      filterableColumns: {},
    };
  }
}
