import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { IEmpresaListQueryHandler } from "@/modules/estagio/empresa/domain/queries/empresa-list.query.handler.interface";
import type { AccessContext } from "@/server/access-context";
import type { EmpresaListQuery, EmpresaListQueryResult } from "../../domain/queries";
import { IEmpresaRepository } from "../../domain/repositories";

@DeclareImplementation()
export class EmpresaListQueryHandlerImpl implements IEmpresaListQueryHandler {
  constructor(
    @DeclareDependency(IEmpresaRepository)
    private readonly repository: IEmpresaRepository,
  ) {}

  async execute(
    accessContext: AccessContext | null,
    dto: EmpresaListQuery | null,
  ): Promise<EmpresaListQueryResult> {
    return this.repository.findAll(accessContext, dto, dto?.selection);
  }
}
