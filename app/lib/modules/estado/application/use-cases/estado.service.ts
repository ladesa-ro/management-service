import { Inject, Injectable } from "@nestjs/common";
import { BaseReadOnlyService } from "@/modules/@shared";
import type {
  EstadoFindOneInput,
  EstadoFindOneOutput,
  EstadoListInput,
  EstadoListOutput,
} from "@/modules/estado/application/dtos";
import {
  ESTADO_REPOSITORY_PORT,
  type IEstadoRepositoryPort,
  type IEstadoUseCasePort,
} from "@/modules/estado/application/ports";

@Injectable()
export class EstadoService
  extends BaseReadOnlyService<
    EstadoListInput,
    EstadoListOutput,
    EstadoFindOneInput,
    EstadoFindOneOutput
  >
  implements IEstadoUseCasePort
{
  protected readonly resourceName = "Estado";

  constructor(
    @Inject(ESTADO_REPOSITORY_PORT)
    protected readonly repository: IEstadoRepositoryPort,
  ) {
    super();
  }
}
