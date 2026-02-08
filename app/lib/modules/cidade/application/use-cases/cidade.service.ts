import { Inject, Injectable } from "@nestjs/common";
import { BaseReadOnlyService } from "@/modules/@shared";
import type {
  CidadeFindOneInput,
  CidadeFindOneOutput,
  CidadeListInput,
  CidadeListOutput,
} from "@/modules/cidade/application/dtos";
import {
  CIDADE_REPOSITORY_PORT,
  type ICidadeRepositoryPort,
  type ICidadeUseCasePort,
} from "@/modules/cidade/application/ports";

@Injectable()
export class CidadeService
  extends BaseReadOnlyService<
    CidadeListInput,
    CidadeListOutput,
    CidadeFindOneInput,
    CidadeFindOneOutput
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
