import { Injectable } from "@nestjs/common";
import { FilterOperator } from "nestjs-paginate";
import { paginateConfig } from "@/old/infrastructure/fixtures";
import type {
  DiarioFindOneInputDto,
  DiarioFindOneOutputDto,
  DiarioListInputDto,
  DiarioListOutputDto,
} from "@/v2/server/modules/diario/http/dto";
import type { IPaginationConfig } from "@/v2/application/ports/pagination";
import type { IDiarioRepositoryPort } from "@/v2/core/diario/application/ports";
import { NestJsPaginateAdapter } from "../../pagination/nestjs-paginate.adapter";
import { BaseTypeOrmRepositoryAdapter } from "../base";
import { DatabaseContextService } from "../context/database-context.service";
import type { DiarioEntity } from "../typeorm/entities";

@Injectable()
export class DiarioTypeOrmRepositoryAdapter
  extends BaseTypeOrmRepositoryAdapter<
    DiarioEntity,
    DiarioListInputDto,
    DiarioListOutputDto,
    DiarioFindOneInputDto,
    DiarioFindOneOutputDto
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

  protected getPaginateConfig(): IPaginationConfig<DiarioEntity> {
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
