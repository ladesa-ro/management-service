import { Inject, Injectable } from "@nestjs/common";
import { BaseCrudService } from "@/modules/@shared";
import type {
  ModalidadeCreateInput,
  ModalidadeFindOneInput,
  ModalidadeFindOneOutput,
  ModalidadeListInput,
  ModalidadeListOutput,
  ModalidadeUpdateInput,
} from "@/modules/modalidade/application/dtos";
import {
  type IModalidadeRepositoryPort,
  type IModalidadeUseCasePort,
  MODALIDADE_REPOSITORY_PORT,
} from "@/modules/modalidade/application/ports";
import type { ModalidadeEntity } from "@/modules/modalidade/infrastructure/persistence/typeorm";

@Injectable()
export class ModalidadeService
  extends BaseCrudService<
    ModalidadeEntity,
    ModalidadeListInput,
    ModalidadeListOutput,
    ModalidadeFindOneInput,
    ModalidadeFindOneOutput,
    ModalidadeCreateInput,
    ModalidadeUpdateInput
  >
  implements IModalidadeUseCasePort
{
  protected readonly resourceName = "Modalidade";
  protected readonly createAction = "modalidade:create";
  protected readonly updateAction = "modalidade:update";
  protected readonly deleteAction = "modalidade:delete";
  protected readonly createFields = ["nome", "slug"] as const;
  protected readonly updateFields = ["nome", "slug"] as const;

  constructor(
    @Inject(MODALIDADE_REPOSITORY_PORT)
    protected readonly repository: IModalidadeRepositoryPort,
  ) {
    super();
  }
}
