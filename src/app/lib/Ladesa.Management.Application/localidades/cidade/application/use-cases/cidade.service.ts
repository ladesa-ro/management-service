import { Inject, Injectable } from "@nestjs/common";
import { BaseReadOnlyService } from "@/Ladesa.Management.Application/@shared";
import type {
  CidadeFindOneInputDto,
  CidadeFindOneOutputDto,
  CidadeListInputDto,
  CidadeListOutputDto,
} from "@/Ladesa.Management.Application/localidades/cidade/application/dtos";
import {
  ICidadeRepository,
  type ICidadeUseCasePort,
} from "@/Ladesa.Management.Application/localidades/cidade/application/ports";

@Injectable()
export class CidadeService
  extends BaseReadOnlyService<
    CidadeListInputDto,
    CidadeListOutputDto,
    CidadeFindOneInputDto,
    CidadeFindOneOutputDto
  >
  implements ICidadeUseCasePort
{
  protected readonly resourceName = "Cidade";

  constructor(
    @Inject(ICidadeRepository)
    protected readonly repository: ICidadeRepository,
  ) {
    super();
  }
}
