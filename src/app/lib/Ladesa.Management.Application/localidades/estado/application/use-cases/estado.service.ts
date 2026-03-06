import { Inject, Injectable } from "@nestjs/common";
import { BaseReadOnlyService } from "@/Ladesa.Management.Application/@shared";
import type {
  EstadoFindOneInputDto,
  EstadoFindOneOutputDto,
  EstadoListInputDto,
  EstadoListOutputDto,
} from "@/Ladesa.Management.Application/localidades/estado/application/dtos";
import {
  ESTADO_REPOSITORY_PORT,
  type IEstadoRepositoryPort,
  type IEstadoUseCasePort,
} from "@/Ladesa.Management.Application/localidades/estado/application/ports";

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
