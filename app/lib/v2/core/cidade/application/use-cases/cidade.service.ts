import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import type { AccessContext } from "@/infrastructure/access-context";
import type {
  CidadeFindOneInputDto,
  CidadeFindOneOutputDto,
  CidadeListInputDto,
  CidadeListOutputDto,
} from "@/v2/adapters/in/http/cidade/dto";
import type { ICidadeRepositoryPort } from "../ports";

@Injectable()
export class CidadeService {
  constructor(
    @Inject("ICidadeRepositoryPort")
    private cidadeRepository: ICidadeRepositoryPort,
  ) {}

  async findAll(
    accessContext: AccessContext,
    dto: CidadeListInputDto | null = null,
    selection?: string[],
  ): Promise<CidadeListOutputDto> {
    return this.cidadeRepository.findAll(accessContext, dto, selection);
  }

  async findById(
    accessContext: AccessContext,
    dto: CidadeFindOneInputDto,
    selection?: string[],
  ): Promise<CidadeFindOneOutputDto | null> {
    return this.cidadeRepository.findById(accessContext, dto, selection);
  }

  async findByIdStrict(
    accessContext: AccessContext,
    dto: CidadeFindOneInputDto,
    selection?: string[],
  ): Promise<CidadeFindOneOutputDto> {
    const cidade = await this.cidadeRepository.findById(accessContext, dto, selection);

    if (!cidade) {
      throw new NotFoundException();
    }

    return cidade;
  }
}
