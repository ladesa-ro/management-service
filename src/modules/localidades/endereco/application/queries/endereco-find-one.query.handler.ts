import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { IEnderecoFindOneQueryHandler } from "@/modules/localidades/endereco/domain/queries/endereco-find-one.query.handler.interface";
import type { EnderecoFindOneQuery, EnderecoFindOneQueryResult } from "../../domain/queries";
import { IEnderecoRepository } from "../../domain/repositories";

@DeclareImplementation()
export class EnderecoFindOneQueryHandlerImpl implements IEnderecoFindOneQueryHandler {
  constructor(
    @DeclareDependency(IEnderecoRepository)
    private readonly repository: IEnderecoRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: EnderecoFindOneQuery,
  ): Promise<EnderecoFindOneQueryResult | null> {
    return this.repository.findById(accessContext, dto, dto?.selection);
  }
}
