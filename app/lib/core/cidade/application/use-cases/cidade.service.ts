import { Inject, Injectable } from "@nestjs/common";
import { ResourceNotFoundError } from "@/core/@shared";
import {
  CidadeFindOneInput,
  CidadeFindOneOutput,
  CidadeListInput,
  CidadeListOutput,
} from "@/core/cidade/application/dtos";
import type { ICidadeRepositoryPort, ICidadeUseCasePort } from "@/core/cidade/application/ports";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";

@Injectable()
export class CidadeService implements ICidadeUseCasePort {
  constructor(
    @Inject("ICidadeRepositoryPort")
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
