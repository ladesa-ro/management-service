import { UnauthorizedError } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import {
  type EmpresaAvaliavelListQuery,
  type EmpresaAvaliavelQueryResult,
  IEmpresaAvaliavelListQueryHandler,
} from "../../domain/queries";
import { IEmpresaAvaliacaoRepository } from "../../domain/repositories";

@Impl()
export class EmpresaAvaliavelListQueryHandlerImpl implements IEmpresaAvaliavelListQueryHandler {
  constructor(
    @Dep(IEmpresaAvaliacaoRepository)
    private readonly repository: IEmpresaAvaliacaoRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    _dto: EmpresaAvaliavelListQuery,
  ): Promise<EmpresaAvaliavelQueryResult[]> {
    const userId = accessContext?.requestActor?.id;
    if (!userId) {
      throw new UnauthorizedError("Usuário deve estar autenticado.");
    }

    return this.repository.findEmpresasAvaliaveisByUserId(userId);
  }
}
