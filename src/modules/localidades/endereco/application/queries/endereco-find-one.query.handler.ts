import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import {
  type IEnderecoFindOneQuery,
  IEnderecoFindOneQueryHandler,
} from "@/modules/localidades/endereco/domain/queries/endereco-find-one.query.handler.interface";
import { IEnderecoRepository } from "../../domain/repositories";
import type { EnderecoFindOneOutputDto } from "../dtos";

@DeclareImplementation()
export class EnderecoFindOneQueryHandlerImpl implements IEnderecoFindOneQueryHandler {
  constructor(
    @DeclareDependency(IEnderecoRepository)
    private readonly repository: IEnderecoRepository,
  ) {}

  async execute({
    accessContext,
    dto,
    selection,
  }: IEnderecoFindOneQuery): Promise<EnderecoFindOneOutputDto | null> {
    return this.repository.findById(accessContext, dto, selection);
  }
}
