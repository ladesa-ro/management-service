import { Injectable } from "@nestjs/common";
import { DatabaseContextService } from "@/modules/@database-context";
import {
  BaseTypeOrmRepositoryAdapter,
  type ITypeOrmPaginationConfig,
  NestJsPaginateAdapter,
  paginateConfig,
} from "@/modules/@shared/infrastructure/persistence/typeorm";
import type {
  ProfessorIndisponibilidadeFindOneInputDto,
  ProfessorIndisponibilidadeFindOneOutputDto,
  ProfessorIndisponibilidadeListInputDto,
  ProfessorIndisponibilidadeListOutputDto,
} from "@/modules/professor-indisponibilidade/application/dtos";
import type { IProfessorIndisponibilidadeRepositoryPort } from "@/modules/professor-indisponibilidade/application/ports";
import type { ProfessorIndisponibilidadeEntity } from "./professor-indisponibilidade.entity";

/**
 * Adapter TypeORM que implementa o port de repositório de ProfessorIndisponibilidade.
 * Estende BaseTypeOrmRepositoryAdapter para reutilizar operações de leitura.
 */
@Injectable()
export class ProfessorIndisponibilidadeTypeOrmRepositoryAdapter
  extends BaseTypeOrmRepositoryAdapter<
    ProfessorIndisponibilidadeEntity,
    ProfessorIndisponibilidadeListInputDto,
    ProfessorIndisponibilidadeListOutputDto,
    ProfessorIndisponibilidadeFindOneInputDto,
    ProfessorIndisponibilidadeFindOneOutputDto
  >
  implements IProfessorIndisponibilidadeRepositoryPort
{
  protected readonly alias = "professor_indisponibilidade";
  protected readonly authzAction = "vinculo:find";
  protected readonly outputDtoName = "ProfessorIndisponibilidadeFindOneOutputDto";

  constructor(
    protected readonly databaseContext: DatabaseContextService,
    protected readonly paginationAdapter: NestJsPaginateAdapter,
  ) {
    super();
  }

  protected get repository() {
    return this.databaseContext.professorIndisponibilidadeRepository;
  }

  protected getPaginateConfig(): ITypeOrmPaginationConfig<ProfessorIndisponibilidadeEntity> {
    return {
      ...paginateConfig,
      select: ["id"],
      searchableColumns: ["motivo"],
      sortableColumns: ["id", "diaDaSemana", "horaInicio", "horaFim", "dateCreated"],
      defaultSortBy: [
        ["diaDaSemana", "ASC"],
        ["horaInicio", "ASC"],
      ],
      filterableColumns: {
        id: true,
        "perfil.id": true,
      },
    };
  }
}
