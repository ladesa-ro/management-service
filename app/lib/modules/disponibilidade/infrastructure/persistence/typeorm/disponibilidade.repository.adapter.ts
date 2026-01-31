import { Injectable } from "@nestjs/common";
import { DatabaseContextService } from "@/modules/@database-context";
import {
  BaseTypeOrmRepositoryAdapter,
  type ITypeOrmPaginationConfig,
  NestJsPaginateAdapter,
  paginateConfig,
} from "@/modules/@shared/infrastructure/persistence/typeorm";
import type {
  DisponibilidadeFindOneInput,
  DisponibilidadeFindOneOutput,
  DisponibilidadeListInput,
  DisponibilidadeListOutput,
  IDisponibilidadeRepositoryPort,
} from "@/modules/disponibilidade";
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
