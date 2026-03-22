import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { IEmpresaFindOneQueryHandler } from "@/modules/estagio/empresa/domain/queries/empresa-find-one.query.handler.interface";
import type { EmpresaFindOneQuery, EmpresaFindOneQueryResult } from "../../domain/queries";
import { IEmpresaRepository } from "../../domain/repositories";

@DeclareImplementation()
export class EmpresaFindOneQueryHandlerImpl implements IEmpresaFindOneQueryHandler {
  constructor(
    @DeclareDependency(IEmpresaRepository)
    private readonly repository: IEmpresaRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: EmpresaFindOneQuery,
  ): Promise<EmpresaFindOneQueryResult | null> {
    return this.repository.findById(accessContext, dto, dto?.selection);
  }
}
