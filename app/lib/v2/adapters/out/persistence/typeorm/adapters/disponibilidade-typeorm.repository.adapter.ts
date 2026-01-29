import { Injectable } from "@nestjs/common";
import { paginateConfig } from "@/old/infrastructure/fixtures";
import type {
  DisponibilidadeFindOneInputDto,
  DisponibilidadeFindOneOutputDto,
  DisponibilidadeListInputDto,
  DisponibilidadeListOutputDto,
} from "@/v2/server/modules/disponibilidade/http/dto";
import type { IPaginationConfig } from "@/v2/application/ports/pagination";
import type { IDisponibilidadeRepositoryPort } from "@/v2/core/disponibilidade/application/ports";
import { NestJsPaginateAdapter } from "../../pagination/nestjs-paginate.adapter";
import { BaseTypeOrmRepositoryAdapter } from "../base";
import { DatabaseContextService } from "../context/database-context.service";
import type { DisponibilidadeEntity } from "../typeorm/entities";

@Injectable()
export class DisponibilidadeTypeOrmRepositoryAdapter
  extends BaseTypeOrmRepositoryAdapter<
    DisponibilidadeEntity,
    DisponibilidadeListInputDto,
    DisponibilidadeListOutputDto,
    DisponibilidadeFindOneInputDto,
    DisponibilidadeFindOneOutputDto
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

  protected getPaginateConfig(): IPaginationConfig<DisponibilidadeEntity> {
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
