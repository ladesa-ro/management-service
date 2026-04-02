import { ensureActiveEntity, ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { IEmpresaDeleteCommandHandler } from "@/modules/estagio/empresa/domain/commands/empresa-delete.command.handler.interface";
import { Empresa } from "@/modules/estagio/empresa/domain/empresa";
import type { EmpresaFindOneQuery } from "@/modules/estagio/empresa/domain/queries";
import { IEmpresaRepository } from "../../domain/repositories";

@Impl()
export class EmpresaDeleteCommandHandlerImpl implements IEmpresaDeleteCommandHandler {
  constructor(
    @Dep(IEmpresaRepository)
    private readonly repository: IEmpresaRepository,
  ) {}

  async execute(accessContext: IAccessContext | null, { id }: EmpresaFindOneQuery): Promise<void> {
    const domain = await this.repository.loadById(accessContext, id);
    ensureExists(domain, Empresa.entityName, id);
    ensureActiveEntity(domain, Empresa.entityName, id);

    await this.repository.softDeleteById(id);
  }
}
