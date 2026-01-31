import { Injectable } from "@nestjs/common";
import { FilterOperator } from "nestjs-paginate";
import type { ITypeOrmPaginationConfig } from "@/@shared/infrastructure/persistence/typeorm";
import {
  BaseTypeOrmRepositoryAdapter,
  NestJsPaginateAdapter,
} from "@/@shared/infrastructure/persistence/typeorm";
import { DatabaseContextService } from "@/database-context";
import type {
  DiarioFindOneInput,
  DiarioFindOneOutput,
  DiarioListInput,
  DiarioListOutput,
} from "@/modules/diario/application/dtos";
import type { IDiarioRepositoryPort } from "@/modules/diario/application/ports";
import { paginateConfig } from "@/v2/old/infrastructure/fixtures";
import type { DiarioEntity } from "./diario.entity";

@Injectable()
export class DiarioTypeOrmRepositoryAdapter
  extends BaseTypeOrmRepositoryAdapter<
    DiarioEntity,
    DiarioListInput,
    DiarioListOutput,
    DiarioFindOneInput,
    DiarioFindOneOutput
  >
  implements IDiarioRepositoryPort
{
  protected readonly alias = "diario";
  protected readonly authzAction = "diario:find";
  protected readonly outputDtoName = "DiarioFindOneOutput";

  constructor(
    protected readonly databaseContext: DatabaseContextService,
    protected readonly paginationAdapter: NestJsPaginateAdapter,
  ) {
    super();
  }

  protected get repository() {
    return this.databaseContext.diarioRepository;
  }

  protected getPaginateConfig(): ITypeOrmPaginationConfig<DiarioEntity> {
    return {
      ...paginateConfig,
      select: [
        "id",
        "ativo",
        "turma.id",
        "turma.periodo",
        "disciplina.id",
        "disciplina.nome",
        "ambientePadrao.id",
        "ambientePadrao.nome",
      ],
      sortableColumns: ["ativo", "disciplina.nome", "ambientePadrao.nome"],
      relations: {
        turma: true,
        disciplina: true,
        ambientePadrao: true,
      },
      searchableColumns: ["id", "ativo", "ano", "etapa", "turma.periodo", "disciplina.nome"],
      defaultSortBy: [],
      filterableColumns: {
        "turma.id": [FilterOperator.EQ],
        "disciplina.id": [FilterOperator.EQ],
        "ambientePadrao.id": [FilterOperator.EQ],
      },
    };
  }
}
