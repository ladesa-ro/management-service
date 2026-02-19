import { Inject, Injectable } from "@nestjs/common";
import type {
  EstadoFindOneInputDto,
  EstadoFindOneOutputDto,
  EstadoListInputDto,
  EstadoListOutputDto,
} from "@/modules/localidades/estado/application/dtos";
import {
  ESTADO_REPOSITORY_PORT,
  type IEstadoRepositoryPort,
  type IEstadoUseCasePort,
} from "@/modules/localidades/estado/application/ports";
import { BaseReadOnlyService } from "@/modules/@shared";

@Injectable()
export class EstadoService
  extends BaseReadOnlyService<
    EstadoListInputDto,
    EstadoListOutputDto,
    EstadoFindOneInputDto,
    EstadoFindOneOutputDto
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
