import { EnderecoUpdateInputDto } from "@/features/endereco/application/dtos";
import { EnderecoForbiddenCreateError } from "@/features/endereco/application/errors";
import { EnderecoFindOneByIdQuery } from "@/features/endereco/application/queries";
import { EnderecoUpdateInputSchema } from "@/features/endereco/application/schemas";
import { validateDto } from "@/shared";
import { BaseUseCase } from "@/shared/base-entity/application/operations/use-cases";
import { EnderecoFindOneByIdOutputDto } from "../dtos/endereco-find-one-by-id.dto";
import type { IEnderecoAuthorizationPort, IEnderecoRepositoryPort } from "../ports";

export class EnderecoUpdateUseCase extends BaseUseCase {
  constructor(private readonly enderecoRepository: IEnderecoRepositoryPort) {
    super();
  }

  public async execute(authorization: IEnderecoAuthorizationPort, incomingDto: EnderecoUpdateInputDto): Promise<EnderecoFindOneByIdOutputDto> {
    const dto = (await validateDto(EnderecoUpdateInputSchema, incomingDto)) as EnderecoUpdateInputDto;

    const canUpdate = authorization.canUpdate(dto);

    if (!canUpdate) {
      throw new EnderecoForbiddenCreateError();
    }

    const {id} = await this.enderecoRepository.updateOneById(dto);

    const findOneByIdQuery = new EnderecoFindOneByIdQuery(this.enderecoRepository);
    return findOneByIdQuery.execute(authorization, {id});
  }
}
