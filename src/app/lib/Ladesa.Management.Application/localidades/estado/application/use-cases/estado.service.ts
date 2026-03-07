import { Inject, Injectable } from "@nestjs/common";
import { BaseReadOnlyService } from "@/Ladesa.Management.Application/@shared";
import {
  IEstadoRepository,
  type IEstadoUseCasePort,
} from "@/Ladesa.Management.Application/localidades/estado/application/ports";
import { type EstadoFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/EstadoFindOneInputDto";
import { type EstadoFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/EstadoFindOneOutputDto";
import { type EstadoListInputDto } from "@/Ladesa.Management.Domain/Dtos/EstadoListInputDto";
import { type EstadoListOutputDto } from "@/Ladesa.Management.Domain/Dtos/EstadoListOutputDto";

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
    @Inject(IEstadoRepository)
    protected readonly repository: IEstadoRepository,
  ) {
    super();
  }
}
