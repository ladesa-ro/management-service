import { EnderecoCreateOrUpdateInputDto } from "@/features/endereco/application/dtos";
import { EnderecoFindOneByIdQuery } from "@/features/endereco/application/queries";
import { EnderecoCreateOrUpdateInputSchema } from "@/features/endereco/application/schemas";
import { EnderecoCreateUseCase } from "@/features/endereco/application/use-cases/endereco-create.use-case";
import { EnderecoUpdateUseCase } from "@/features/endereco/application/use-cases/endereco-update.use-case";
import { validateDto } from "@/shared";
import { BaseUseCase } from "@/shared/base-entity/application/operations/use-cases";
import { EnderecoFindOneByIdOutputDto } from "../dtos/endereco-find-one-by-id.dto";
import type { IEnderecoAuthorizationPort, IEnderecoRepositoryPort } from "../ports";

export class EnderecoCreateOrUpdateUseCase extends BaseUseCase {
  constructor(private readonly enderecoRepository: IEnderecoRepositoryPort) {
    super();
  }

  public async execute(authorization: IEnderecoAuthorizationPort, incomingDto: EnderecoCreateOrUpdateInputDto): Promise<EnderecoFindOneByIdOutputDto> {
    const dto = (await validateDto(EnderecoCreateOrUpdateInputSchema, incomingDto)) as EnderecoCreateOrUpdateInputDto;

    const findOneByIdQuery = new EnderecoFindOneByIdQuery(this.enderecoRepository);

    if (dto.targetEntity) {
      await findOneByIdQuery.execute(authorization, dto.targetEntity);

      const updateUseCase = new EnderecoUpdateUseCase(this.enderecoRepository);

      return updateUseCase.execute(authorization, {
        targetEntity: dto.targetEntity,
        data: dto.data,
      });
    } else {
      const createUseCase = new EnderecoCreateUseCase(this.enderecoRepository);
      return createUseCase.execute(authorization, dto.data);
    }
  }
}
