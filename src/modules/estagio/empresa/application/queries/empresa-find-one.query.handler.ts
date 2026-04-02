import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { IEmpresaFindOneQueryHandler } from "@/modules/estagio/empresa/domain/queries/empresa-find-one.query.handler.interface";
import type { EmpresaFindOneQuery, EmpresaFindOneQueryResult } from "../../domain/queries";
import { IEmpresaRepository } from "../../domain/repositories";

@Impl()
export class EmpresaFindOneQueryHandlerImpl implements IEmpresaFindOneQueryHandler {
  constructor(
    @Dep(IEmpresaRepository)
    private readonly repository: IEmpresaRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: EmpresaFindOneQuery,
  ): Promise<EmpresaFindOneQueryResult | null> {
    return this.repository.getFindOneQueryResult(accessContext, dto);
  }
}
