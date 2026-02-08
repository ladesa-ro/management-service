import { Inject, Injectable } from "@nestjs/common";
import type { AccessContext } from "@/modules/@core/access-context";
import { BaseCrudService } from "@/modules/@shared";
import type {
  DisponibilidadeCreateInput,
  DisponibilidadeFindOneInput,
  DisponibilidadeFindOneOutput,
  DisponibilidadeListInput,
  DisponibilidadeListOutput,
  DisponibilidadeUpdateInput,
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
    DisponibilidadeListInput,
    DisponibilidadeListOutput,
    DisponibilidadeFindOneInput,
    DisponibilidadeFindOneOutput,
    DisponibilidadeCreateInput,
    DisponibilidadeUpdateInput
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

  async findByIdSimpleStrict(
    accessContext: AccessContext,
    id: string,
  ): Promise<DisponibilidadeFindOneOutput> {
    return this.findByIdStrict(accessContext, { id });
  }
}
