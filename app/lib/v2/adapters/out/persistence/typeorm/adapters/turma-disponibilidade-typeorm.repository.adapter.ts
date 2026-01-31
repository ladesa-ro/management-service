import { Injectable } from "@nestjs/common";
import { FilterOperator } from "nestjs-paginate";
import type { SelectQueryBuilder } from "typeorm";
import type {
  TurmaDisponibilidadeFindOneInput,
  TurmaDisponibilidadeFindOneOutput,
  TurmaDisponibilidadeListInput,
  TurmaDisponibilidadeListOutput,
} from "@/core/turma-disponibilidade";
import type { ITurmaDisponibilidadeRepositoryPort } from "@/core/turma-disponibilidade/application/ports/out";
import type { ITypeOrmPaginationConfig } from "../types";
import { paginateConfig } from "@/v2/old/infrastructure/fixtures";
import { NestJsPaginateAdapter } from "../../pagination/nestjs-paginate.adapter";
import { BaseTypeOrmRepositoryAdapter } from "../base";
import { DatabaseContextService } from "../context/database-context.service";
import type { TurmaDisponibilidadeEntity } from "../typeorm/entities";

/**
 * Adapter TypeORM que implementa o port de repositório de TurmaDisponibilidade.
 * Estende BaseTypeOrmRepositoryAdapter para reutilizar operações CRUD comuns.
 */
@Injectable()
export class TurmaDisponibilidadeTypeOrmRepositoryAdapter
  extends BaseTypeOrmRepositoryAdapter<
    TurmaDisponibilidadeEntity,
    TurmaDisponibilidadeListInput,
    TurmaDisponibilidadeListOutput,
    TurmaDisponibilidadeFindOneInput,
    TurmaDisponibilidadeFindOneOutput
  >
  implements ITurmaDisponibilidadeRepositoryPort
{
  protected readonly alias = "turma_disponibilidade";
  protected readonly authzAction = "turma_disponibilidade:find";
  protected readonly outputDtoName = "TurmaDisponibilidadeFindOneOutput";

  constructor(
    protected readonly databaseContext: DatabaseContextService,
    protected readonly paginationAdapter: NestJsPaginateAdapter,
  ) {
    super();
  }

  protected get repository() {
    return this.databaseContext.turmaDisponibilidadeRepository;
  }

  protected getPaginateConfig(): ITypeOrmPaginationConfig<TurmaDisponibilidadeEntity> {
    return {
      ...paginateConfig,
      relations: {
        turma: true,
        disponibilidade: true,
      },
      select: ["id", "dateCreated"],
      sortableColumns: ["dateCreated"],
      searchableColumns: ["id"],
      defaultSortBy: [["dateCreated", "ASC"]],
      filterableColumns: {
        "turma.id": [FilterOperator.EQ],
        "disponibilidade.id": [FilterOperator.EQ],
      },
    };
  }

  /**
   * @deprecated Usado para verificações de permissão. Será removido em fases futuras.
   */
  createQueryBuilder(alias: string): SelectQueryBuilder<TurmaDisponibilidadeEntity> {
    return this.repository.createQueryBuilder(alias);
  }
}
