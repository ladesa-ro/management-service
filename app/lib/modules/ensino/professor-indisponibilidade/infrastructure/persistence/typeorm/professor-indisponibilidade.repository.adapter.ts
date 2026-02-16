import { Inject, Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import {
  APP_DATA_SOURCE_TOKEN,
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
} from "@/modules/ensino/professor-indisponibilidade/application/dtos";
import type { IProfessorIndisponibilidadeRepositoryPort } from "@/modules/ensino/professor-indisponibilidade/application/ports";
import type { ProfessorIndisponibilidadeEntity } from "./professor-indisponibilidade.entity";
import { createProfessorIndisponibilidadeRepository } from "./professor-indisponibilidade.repository";

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
    @Inject(APP_DATA_SOURCE_TOKEN) protected readonly dataSource: DataSource,
    protected readonly paginationAdapter: NestJsPaginateAdapter,
  ) {
    super();
  }

  protected get repository() {
    return createProfessorIndisponibilidadeRepository(this.dataSource);
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
