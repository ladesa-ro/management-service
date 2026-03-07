import { Inject, Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import type { IProfessorIndisponibilidadeRepository } from "@/Ladesa.Management.Application/ensino/professor-indisponibilidade/application/ports";
import { type ProfessorIndisponibilidadeFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/ProfessorIndisponibilidadeFindOneInputDto";
import { type ProfessorIndisponibilidadeFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/ProfessorIndisponibilidadeFindOneOutputDto";
import { type ProfessorIndisponibilidadeListInputDto } from "@/Ladesa.Management.Domain/Dtos/ProfessorIndisponibilidadeListInputDto";
import { type ProfessorIndisponibilidadeListOutputDto } from "@/Ladesa.Management.Domain/Dtos/ProfessorIndisponibilidadeListOutputDto";
import type { ProfessorIndisponibilidadeEntity } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Entities/ProfessorIndisponibilidadeEntity";
import { createProfessorIndisponibilidadeRepository } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Repositories/ProfessorIndisponibilidadeRepository";
import {
  APP_DATA_SOURCE_TOKEN,
  BaseTypeOrmRepositoryAdapter,
  type ITypeOrmPaginationConfig,
  NestJsPaginateAdapter,
  paginateConfig,
} from "@/Ladesa.Management.Infrastructure.Database/typeorm";

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
  implements IProfessorIndisponibilidadeRepository
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
