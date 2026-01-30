import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";
import type {
  CidadeFindOneInputDto,
  CidadeFindOneOutputDto,
  CidadeListInputDto,
  CidadeListOutputDto,
} from "@/v2/server/modules/cidade/http/dto";
import type { ICidadeRepositoryPort, ICidadeUseCasePort } from "../ports";

/**
 * Service centralizado para o módulo Cidade.
 * Implementa todos os use cases definidos em ICidadeUseCasePort.
 *
 * Por enquanto, toda a lógica fica aqui. Futuramente, pode ser
 * desmembrado em use cases individuais se necessário.
 */
@Injectable()
export class CidadeService implements ICidadeUseCasePort {
  constructor(
    @Inject("ICidadeRepositoryPort")
    private readonly cidadeRepository: ICidadeRepositoryPort,
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
