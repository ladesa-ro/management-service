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
  TurmaDisponibilidadeFindOneInputDto,
  TurmaDisponibilidadeFindOneOutputDto,
  TurmaDisponibilidadeListInputDto,
  TurmaDisponibilidadeListOutputDto,
} from "@/modules/ensino/turma-disponibilidade";
import type { ITurmaDisponibilidadeRepositoryPort } from "@/modules/ensino/turma-disponibilidade/application/ports/out";
import type { TurmaDisponibilidadeEntity } from "./turma-disponibilidade.entity";

/**
 * Adapter TypeORM que implementa o port de repositório de TurmaDisponibilidade.
 * Estende BaseTypeOrmRepositoryAdapter para reutilizar operações CRUD comuns.
 */
@Injectable()
export class TurmaDisponibilidadeTypeOrmRepositoryAdapter
  extends BaseTypeOrmRepositoryAdapter<
    TurmaDisponibilidadeEntity,
    TurmaDisponibilidadeListInputDto,
    TurmaDisponibilidadeListOutputDto,
    TurmaDisponibilidadeFindOneInputDto,
    TurmaDisponibilidadeFindOneOutputDto
  >
  implements ITurmaDisponibilidadeRepositoryPort
{
  protected readonly alias = "turma_disponibilidade";
  protected readonly authzAction = "turma_disponibilidade:find";
  protected readonly outputDtoName = "TurmaDisponibilidadeFindOneOutputDto";

  constructor(
    protected readonly databaseContext: DatabaseContextService,
    protected readonly paginationAdapter: NestJsPaginateAdapter,
  ) {
    super();
  }

  protected get repository() {
    return this.databaseContext.turmaDisponibilidadeRepository;
  }

  /**
   * @deprecated Usado para verificações de permissão. Será removido em fases futuras.
   */
  createQueryBuilder(alias: string): SelectQueryBuilder<TurmaDisponibilidadeEntity> {
    return this.repository.createQueryBuilder(alias);
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
}
