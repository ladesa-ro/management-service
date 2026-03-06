import { Inject, Injectable } from "@nestjs/common";
import { BaseReadOnlyService } from "@/Ladesa.Management.Application/@shared";
import type {
  CidadeFindOneInputDto,
  CidadeFindOneOutputDto,
  CidadeListInputDto,
  CidadeListOutputDto,
} from "@/Ladesa.Management.Application/localidades/cidade/application/dtos";
import {
  CIDADE_REPOSITORY_PORT,
  type ICidadeRepositoryPort,
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
    @Inject(CIDADE_REPOSITORY_PORT)
    protected readonly repository: ICidadeRepositoryPort,
  ) {
    super();
  }
}
