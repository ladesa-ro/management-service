import { Inject, Injectable } from "@nestjs/common";
import { BaseReadOnlyService } from "@/modules/@shared";
import type {
  CidadeFindOneInputDto,
  CidadeFindOneOutputDto,
  CidadeListInputDto,
  CidadeListOutputDto,
} from "@/modules/base/localidades/cidade/application/dtos";
import {
  CIDADE_REPOSITORY_PORT,
  type ICidadeRepositoryPort,
  type ICidadeUseCasePort,
} from "@/modules/base/localidades/cidade/application/ports";

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
