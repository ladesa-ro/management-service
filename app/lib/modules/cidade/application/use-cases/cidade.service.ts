import { Inject, Injectable } from "@nestjs/common";
import type { AccessContext } from "@/modules/@core/access-context";
import { ResourceNotFoundError } from "@/modules/@shared";
import {
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
export class CidadeService implements ICidadeUseCasePort {
  constructor(
    @Inject(CIDADE_REPOSITORY_PORT)
    private readonly cidadeRepository: ICidadeRepositoryPort,
  ) {}

  async findAll(
    accessContext: AccessContext,
    dto: CidadeListInput | null = null,
  ): Promise<CidadeListOutput> {
    return this.cidadeRepository.findAll(accessContext, dto);
  }

  async findById(
    accessContext: AccessContext,
    dto: CidadeFindOneInput,
  ): Promise<CidadeFindOneOutput | null> {
    return this.cidadeRepository.findById(accessContext, dto);
  }

  async findByIdStrict(
    accessContext: AccessContext,
    dto: CidadeFindOneInput,
  ): Promise<CidadeFindOneOutput> {
    const cidade = await this.cidadeRepository.findById(accessContext, dto);

    if (!cidade) {
      throw new ResourceNotFoundError("Cidade", dto.id);
    }

    return cidade;
  }
}
