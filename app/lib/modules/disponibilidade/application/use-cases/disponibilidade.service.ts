import { Inject, Injectable } from "@nestjs/common";
import { BaseCrudService } from "@/modules/@shared";
import type {
  DisponibilidadeCreateInputDto,
  DisponibilidadeFindOneInputDto,
  DisponibilidadeFindOneOutputDto,
  DisponibilidadeListInputDto,
  DisponibilidadeListOutputDto,
  DisponibilidadeUpdateInputDto,
} from "@/modules/disponibilidade/application/dtos";
import {
  DISPONIBILIDADE_REPOSITORY_PORT,
  type IDisponibilidadeRepositoryPort,
  type IDisponibilidadeUseCasePort,
} from "@/modules/disponibilidade/application/ports";
import type { DisponibilidadeEntity } from "@/modules/disponibilidade/infrastructure/persistence/typeorm";

@Injectable()
export class DisponibilidadeService
  extends BaseCrudService<
    DisponibilidadeEntity,
    DisponibilidadeListInputDto,
    DisponibilidadeListOutputDto,
    DisponibilidadeFindOneInputDto,
    DisponibilidadeFindOneOutputDto,
    DisponibilidadeCreateInputDto,
    DisponibilidadeUpdateInputDto
  >
  implements IDisponibilidadeUseCasePort
{
  protected readonly resourceName = "Disponibilidade";
  protected readonly createAction = "disponibilidade:create";
  protected readonly updateAction = "disponibilidade:update";
  protected readonly deleteAction = "disponibilidade:delete";
  protected readonly createFields = ["dataInicio", "dataFim"] as const;
  protected readonly updateFields = ["dataInicio", "dataFim"] as const;

  constructor(
    @Inject(DISPONIBILIDADE_REPOSITORY_PORT)
    protected readonly repository: IDisponibilidadeRepositoryPort,
  ) {
    super();
  }
}
