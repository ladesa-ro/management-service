import { Injectable } from "@nestjs/common";
import { FilterOperator } from "nestjs-paginate";
import type { ITypeOrmPaginationConfig } from "@/@shared/infrastructure/persistence/typeorm";
import {
  BaseTypeOrmRepositoryAdapter,
  NestJsPaginateAdapter,
} from "@/@shared/infrastructure/persistence/typeorm";
import { DatabaseContextService } from "@/database-context";
import type {
  DiaCalendarioFindOneInput as DiaCalendarioFindOneInputDto,
  DiaCalendarioFindOneOutput as DiaCalendarioFindOneOutputDto,
  DiaCalendarioListInput as DiaCalendarioListInputDto,
  DiaCalendarioListOutput as DiaCalendarioListOutputDto,
} from "@/modules/dia-calendario";
import type { IDiaCalendarioRepositoryPort } from "@/modules/dia-calendario/application/ports";
import { paginateConfig } from "@/v2/old/infrastructure/fixtures";
import type { DiaCalendarioEntity } from "./dia-calendario.entity";

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

  protected getPaginateConfig(): ITypeOrmPaginationConfig<DiaCalendarioEntity> {
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
