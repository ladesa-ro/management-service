import { UnauthorizedError } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { IEmpresaAvaliacaoFindMyQueryHandler, IEmpresaAvaliacaoRepository } from "../../domain";
import type {
  EmpresaAvaliacaoFindMyQuery,
  EmpresaAvaliacaoFindOneQueryResult,
} from "../../domain/queries";

@Impl()
export class EmpresaAvaliacaoFindMyQueryHandlerImpl implements IEmpresaAvaliacaoFindMyQueryHandler {
  constructor(
    @Dep(IEmpresaAvaliacaoRepository)
    private readonly repository: IEmpresaAvaliacaoRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: EmpresaAvaliacaoFindMyQuery,
  ): Promise<EmpresaAvaliacaoFindOneQueryResult | null> {
    const userId = accessContext?.requestActor?.id;
    if (!userId) {
      throw new UnauthorizedError("Usuário deve estar autenticado.");
    }

    return this.repository.getFindMyQueryResult(accessContext, dto.empresaId, userId);
  }
}
