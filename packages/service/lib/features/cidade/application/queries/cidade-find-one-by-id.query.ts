import { CidadeFindOneByIdInputDto, CidadeFindOneByIdOutputDto } from "../dtos/cidade-find-one-by-id.dto";
import { CidadeForbiddenReadError, CidadeNaoEncontradoError } from "../errors/cidade.errors";
import type { ICidadeAuthorizationPort, ICidadeRepositoryPort } from "../ports";
import { BaseQuery, getAllowedSelectionFromSchema } from "@/shared";
import { CidadeFindOneByIdOutputSchema } from "@/features/cidade/application/schemas";

export class CidadeFindOneByIdQuery extends BaseQuery {
  constructor(private readonly cidadeRepository: ICidadeRepositoryPort) {
    super();
  }

  public async execute(authorization: ICidadeAuthorizationPort, inputDto: CidadeFindOneByIdInputDto): Promise<CidadeFindOneByIdOutputDto> {
    const selection = getAllowedSelectionFromSchema(CidadeFindOneByIdOutputSchema, inputDto.selection);

    const cidade = await this.cidadeRepository.findById(inputDto.id, selection);

    if (!cidade) {
      throw new CidadeNaoEncontradoError(`Cidade não encontrada (id = ${inputDto.id}).`);
    }

    const canRead = await authorization.canRead(cidade.id);

    if (!canRead) {
      throw new CidadeForbiddenReadError();
    }

    return cidade;
  }
}
