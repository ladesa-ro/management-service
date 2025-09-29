import { Inject, Injectable } from "@nestjs/common";
import {
  EnderecoCreateInputDto,
  EnderecoCreateOrUpdateInputDto,
  EnderecoFindOneByIdInputDto,
  EnderecoUpdateInputDto
} from "@/features/endereco/application/dtos";
import {
  ENDERECO_REPOSITORY,
  IEnderecoAuthorizationPort,
  type IEnderecoRepositoryPort
} from "@/features/endereco/application/ports";
import { EnderecoFindOneByIdQuery } from "@/features/endereco/application/queries";
import { EnderecoCreateUseCase, EnderecoUpdateUseCase } from "@/features/endereco/application/use-cases";
import {
  EnderecoCreateOrUpdateUseCase
} from "@/features/endereco/application/use-cases/endereco-create-or-update.use-case";

@Injectable()
export class EnderecoApplicationService {
  constructor(
    @Inject(ENDERECO_REPOSITORY)
    readonly enderecoRepository: IEnderecoRepositoryPort,
  ) {
  }

  async findOneById(authorization: IEnderecoAuthorizationPort, inputDto: EnderecoFindOneByIdInputDto) {
    const query = new EnderecoFindOneByIdQuery(this.enderecoRepository);
    return query.execute(authorization, inputDto);
  }

  async create(authorization: IEnderecoAuthorizationPort, inputDto: EnderecoCreateInputDto) {
    const useCase = new EnderecoCreateUseCase(this.enderecoRepository);
    return useCase.execute(authorization, inputDto);
  }

  async update(authorization: IEnderecoAuthorizationPort, inputDto: EnderecoUpdateInputDto) {
    const useCase = new EnderecoUpdateUseCase(this.enderecoRepository);
    return useCase.execute(authorization, inputDto);
  }

  async createOrUpdate(authorization: IEnderecoAuthorizationPort, inputDto: EnderecoCreateOrUpdateInputDto) {
    const useCase = new EnderecoCreateOrUpdateUseCase(this.enderecoRepository);
    return useCase.execute(authorization, inputDto);
  }
}
