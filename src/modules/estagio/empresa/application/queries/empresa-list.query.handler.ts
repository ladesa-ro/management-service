import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { IEmpresaListQueryHandler } from "@/modules/estagio/empresa/domain/queries/empresa-list.query.handler.interface";
import type { EmpresaListQuery, EmpresaListQueryResult } from "../../domain/queries";
import { IEmpresaRepository } from "../../domain/repositories";

@Impl()
export class EmpresaListQueryHandlerImpl implements IEmpresaListQueryHandler {
  constructor(
    @Dep(IEmpresaRepository)
    private readonly repository: IEmpresaRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: EmpresaListQuery | null,
  ): Promise<EmpresaListQueryResult> {
    return this.repository.getFindAllQueryResult(accessContext, dto);
  }
}
