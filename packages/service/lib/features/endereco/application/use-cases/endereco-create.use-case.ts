import { EnderecoCreateInputDto } from "@/features/endereco/application/dtos";
import { EnderecoForbiddenCreateError } from "@/features/endereco/application/errors";
import { EnderecoFindOneByIdQuery } from "@/features/endereco/application/queries";
import { EnderecoCreateInputSchema } from "@/features/endereco/application/schemas";
import { validateDto } from "@/shared";
import { BaseUseCase } from "@/shared/base-entity/application/operations/use-cases";
import { EnderecoFindOneByIdOutputDto } from "../dtos/endereco-find-one-by-id.dto";
import type { IEnderecoAuthorizationPort, IEnderecoRepositoryPort } from "../ports";

export class EnderecoCreateUseCase extends BaseUseCase {
  constructor(private readonly enderecoRepository: IEnderecoRepositoryPort) {
    super();
  }

  public async execute(authorization: IEnderecoAuthorizationPort, incomingDto: EnderecoCreateInputDto): Promise<EnderecoFindOneByIdOutputDto> {
    const dto = (await validateDto(EnderecoCreateInputSchema, incomingDto)) as EnderecoCreateInputDto;

    const canCreate = authorization.canCreate(dto);

    if (!canCreate) {
      throw new EnderecoForbiddenCreateError();
    }

    const {id} = await this.enderecoRepository.create(dto);

    const findOneByIdQuery = new EnderecoFindOneByIdQuery(this.enderecoRepository);
    return findOneByIdQuery.execute(authorization, {id});
  }
}
