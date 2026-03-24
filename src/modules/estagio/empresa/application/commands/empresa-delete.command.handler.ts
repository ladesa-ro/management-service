import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { IEmpresaDeleteCommandHandler } from "@/modules/estagio/empresa/domain/commands/empresa-delete.command.handler.interface";
import { Empresa } from "@/modules/estagio/empresa/domain/empresa";
import type { EmpresaFindOneQuery } from "@/modules/estagio/empresa/domain/queries";
import { IEmpresaRepository } from "../../domain/repositories";

@DeclareImplementation()
export class EmpresaDeleteCommandHandlerImpl implements IEmpresaDeleteCommandHandler {
  constructor(
    @DeclareDependency(IEmpresaRepository)
    private readonly repository: IEmpresaRepository,
  ) {}

  async execute(accessContext: IAccessContext | null, { id }: EmpresaFindOneQuery): Promise<void> {
    const current = await this.repository.findById(accessContext, { id });
    ensureExists(current, Empresa.entityName, id);

    await this.repository.softDeleteById(id);
  }
}
