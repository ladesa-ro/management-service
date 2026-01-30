import { Injectable } from "@nestjs/common";
import { FilterOperator } from "nestjs-paginate";
import type {
  DiaCalendarioFindOneInput as DiaCalendarioFindOneInputDto,
  DiaCalendarioFindOneOutput as DiaCalendarioFindOneOutputDto,
  DiaCalendarioListInput as DiaCalendarioListInputDto,
  DiaCalendarioListOutput as DiaCalendarioListOutputDto,
} from "@/core/dia-calendario";
import type { IDiaCalendarioRepositoryPort } from "@/core/dia-calendario/application/ports";
import type { IPaginationConfig } from "@/v2/application/ports/pagination";
import { paginateConfig } from "@/v2/old/infrastructure/fixtures";
import { NestJsPaginateAdapter } from "../../pagination/nestjs-paginate.adapter";
import { BaseTypeOrmRepositoryAdapter } from "../base";
import { DatabaseContextService } from "../context/database-context.service";
import type { DiaCalendarioEntity } from "../typeorm/entities";

@Injectable()
export class DiaCalendarioTypeOrmRepositoryAdapter
  extends BaseTypeOrmRepositoryAdapter<
    DiaCalendarioEntity,
    DiaCalendarioListInputDto,
    DiaCalendarioListOutputDto,
    DiaCalendarioFindOneInputDto,
    DiaCalendarioFindOneOutputDto
  >
  implements IDiaCalendarioRepositoryPort
{
  protected readonly alias = "diaCalendario";
  protected readonly authzAction = "dia_calendario:find";
  protected readonly outputDtoName = "DiaCalendarioFindOneOutput";

  constructor(
    protected readonly databaseContext: DatabaseContextService,
    protected readonly paginationAdapter: NestJsPaginateAdapter,
  ) {
    super();
  }

  protected get repository() {
    return this.databaseContext.diaCalendarioRepository;
  }

  protected getPaginateConfig(): IPaginationConfig<DiaCalendarioEntity> {
    return {
      ...paginateConfig,
      select: [
        "id",
        "data",
        "diaLetivo",
        "feriado",
        "calendario.id",
        "calendario.nome",
        "calendario.ano",
        "diaPresencial",
        "tipo",
        "extraCurricular",
      ],
      sortableColumns: [
        "data",
        "diaLetivo",
        "feriado",
        "calendario.id",
        "calendario.nome",
        "calendario.ano",
      ],
      searchableColumns: ["id", "data", "diaLetivo", "feriado", "calendario.nome"],
      relations: {
        calendario: true,
      },
      defaultSortBy: [],
      filterableColumns: {
        "calendario.id": [FilterOperator.EQ],
        "calendario.nome": [FilterOperator.EQ],
        "calendario.ano": [FilterOperator.EQ],
      },
    };
  }
}
