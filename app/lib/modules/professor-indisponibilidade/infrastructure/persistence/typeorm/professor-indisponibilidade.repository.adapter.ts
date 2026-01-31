import { Injectable } from "@nestjs/common";
import { DatabaseContextService } from "@/modules/@database-context";
import type { ITypeOrmPaginationConfig } from "@/modules/@shared/infrastructure/persistence/typeorm";
import {
  BaseTypeOrmRepositoryAdapter,
  NestJsPaginateAdapter,
} from "@/modules/@shared/infrastructure/persistence/typeorm";
import type {
  ProfessorIndisponibilidadeFindOneInput,
  ProfessorIndisponibilidadeFindOneOutput,
  ProfessorIndisponibilidadeListInput,
  ProfessorIndisponibilidadeListOutput,
} from "@/modules/professor-indisponibilidade/application/dtos";
import type { IProfessorIndisponibilidadeRepositoryPort } from "@/modules/professor-indisponibilidade/application/ports";
import { paginateConfig } from "@/v2/old/infrastructure/fixtures";
import type { ProfessorIndisponibilidadeEntity } from "./professor-indisponibilidade.entity";

/**
 * Adapter TypeORM que implementa o port de repositório de ProfessorIndisponibilidade.
 * Estende BaseTypeOrmRepositoryAdapter para reutilizar operações de leitura.
 */
@Injectable()
export class ProfessorIndisponibilidadeTypeOrmRepositoryAdapter
  extends BaseTypeOrmRepositoryAdapter<
    ProfessorIndisponibilidadeEntity,
    ProfessorIndisponibilidadeListInput,
    ProfessorIndisponibilidadeListOutput,
    ProfessorIndisponibilidadeFindOneInput,
    ProfessorIndisponibilidadeFindOneOutput
  >
  implements IProfessorIndisponibilidadeRepositoryPort
{
  protected readonly alias = "professor_indisponibilidade";
  protected readonly authzAction = "vinculo:find";
  protected readonly outputDtoName = "ProfessorIndisponibilidadeFindOneOutput";

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
