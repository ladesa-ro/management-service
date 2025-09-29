import { EnderecoFindOneByIdOutputSchema } from "@/features/endereco/application/schemas";
import { BaseQuery, getAllowedSelectionFromSchema } from "@/shared";
import { EnderecoFindOneByIdInputDto, EnderecoFindOneByIdOutputDto } from "../dtos/endereco-find-one-by-id.dto";
import { EnderecoForbiddenReadError, EnderecoNotFoundError } from "../errors/endereco.errors";
import type { IEnderecoAuthorizationPort, IEnderecoRepositoryPort } from "../ports";

export class EnderecoFindOneByIdQuery extends BaseQuery {
  constructor(private readonly enderecoRepository: IEnderecoRepositoryPort) {
    super();
  }

  public async execute(authorization: IEnderecoAuthorizationPort, inputDto: EnderecoFindOneByIdInputDto): Promise<EnderecoFindOneByIdOutputDto> {
    const selection = getAllowedSelectionFromSchema(EnderecoFindOneByIdOutputSchema, inputDto.selection);

    const endereco = await this.enderecoRepository.findById(inputDto.id, selection);

    if (!endereco) {
      throw new EnderecoNotFoundError();
    }

    const canRead = await authorization.canRead(endereco.id);

    if (!canRead) {
      throw new EnderecoForbiddenReadError();
    }

    return endereco;
  }
}
