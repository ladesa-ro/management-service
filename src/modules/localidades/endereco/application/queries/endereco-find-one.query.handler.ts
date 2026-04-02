import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { IEnderecoFindOneQueryHandler } from "@/modules/localidades/endereco/domain/queries/endereco-find-one.query.handler.interface";
import type { EnderecoFindOneQuery, EnderecoFindOneQueryResult } from "../../domain/queries";
import { IEnderecoRepository } from "../../domain/repositories";

@Impl()
export class EnderecoFindOneQueryHandlerImpl implements IEnderecoFindOneQueryHandler {
  constructor(
    @Dep(IEnderecoRepository)
    private readonly repository: IEnderecoRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: EnderecoFindOneQuery,
  ): Promise<EnderecoFindOneQueryResult | null> {
    return this.repository.getFindOneQueryResult(accessContext, dto);
  }
}
