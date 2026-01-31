import { Injectable } from "@nestjs/common";
import type {
  ProfessorIndisponibilidadeFindOneInput,
  ProfessorIndisponibilidadeFindOneOutput,
  ProfessorIndisponibilidadeListInput,
  ProfessorIndisponibilidadeListOutput,
} from "@/core/professor-indisponibilidade/application/dtos";
import type { IProfessorIndisponibilidadeRepositoryPort } from "@/core/professor-indisponibilidade/application/ports";
import type { ITypeOrmPaginationConfig } from "../types";
import { paginateConfig } from "@/v2/old/infrastructure/fixtures";
import { NestJsPaginateAdapter } from "../../pagination/nestjs-paginate.adapter";
import { BaseTypeOrmRepositoryAdapter } from "../base";
import { DatabaseContextService } from "../context/database-context.service";
import type { ProfessorIndisponibilidadeEntity } from "../typeorm/entities";

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
