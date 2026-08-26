import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import {
  IEmpresaAvaliacaoHistoricoListQueryHandler,
  IEmpresaAvaliacaoRepository,
} from "../../domain";
import type {
  EmpresaAvaliacaoHistoricoListQuery,
  EmpresaAvaliacaoHistoricoQueryResult,
} from "../../domain/queries";

@Impl()
export class EmpresaAvaliacaoHistoricoListQueryHandlerImpl
  implements IEmpresaAvaliacaoHistoricoListQueryHandler
{
  constructor(
    @Dep(IEmpresaAvaliacaoRepository)
    private readonly repository: IEmpresaAvaliacaoRepository,
  ) {}

  async execute(
    _accessContext: IAccessContext | null,
    dto: EmpresaAvaliacaoHistoricoListQuery,
  ): Promise<EmpresaAvaliacaoHistoricoQueryResult[]> {
    return this.repository.findHistoricoByAvaliacaoId(dto.avaliacaoId);
  }
}
