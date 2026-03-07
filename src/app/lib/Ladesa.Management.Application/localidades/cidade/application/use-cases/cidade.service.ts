import { Inject, Injectable } from "@nestjs/common";
import { BaseReadOnlyService } from "@/Ladesa.Management.Application/@shared";
import {
  ICidadeRepository,
  type ICidadeUseCasePort,
} from "@/Ladesa.Management.Application/localidades/cidade/application/ports";
import { type CidadeFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/CidadeFindOneInputDto";
import { type CidadeFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/CidadeFindOneOutputDto";
import { type CidadeListInputDto } from "@/Ladesa.Management.Domain/Dtos/CidadeListInputDto";
import { type CidadeListOutputDto } from "@/Ladesa.Management.Domain/Dtos/CidadeListOutputDto";

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
