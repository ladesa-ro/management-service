import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { IEmpresaAvaliacaoListQueryHandler, IEmpresaAvaliacaoRepository } from "../../domain";
import type {
  EmpresaAvaliacaoListQuery,
  EmpresaAvaliacaoListQueryResult,
} from "../../domain/queries";

@Impl()
export class EmpresaAvaliacaoListQueryHandlerImpl implements IEmpresaAvaliacaoListQueryHandler {
  constructor(
    @Dep(IEmpresaAvaliacaoRepository)
    private readonly repository: IEmpresaAvaliacaoRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: EmpresaAvaliacaoListQuery,
  ): Promise<EmpresaAvaliacaoListQueryResult> {
    return this.repository.getFindAllQueryResult(accessContext, dto);
  }
}
