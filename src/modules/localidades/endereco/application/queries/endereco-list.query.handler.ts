import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import {
  type EnderecoListQuery,
  type EnderecoListQueryResult,
  IEnderecoListQueryHandler,
} from "@/modules/localidades/endereco/domain/queries";
import { IEnderecoRepository } from "@/modules/localidades/endereco/domain/repositories";

@Impl()
export class EnderecoListQueryHandlerImpl implements IEnderecoListQueryHandler {
  constructor(
    @Dep(IEnderecoRepository)
    private readonly repository: IEnderecoRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    query: EnderecoListQuery,
  ): Promise<EnderecoListQueryResult> {
    return this.repository.getFindAllQueryResult(accessContext, query);
  }
}
