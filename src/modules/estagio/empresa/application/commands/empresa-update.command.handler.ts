import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import type { EmpresaUpdateCommand } from "@/modules/estagio/empresa/domain/commands/empresa-update.command";
import { IEmpresaUpdateCommandHandler } from "@/modules/estagio/empresa/domain/commands/empresa-update.command.handler.interface";
import { Empresa } from "@/modules/estagio/empresa/domain/empresa";
import type { EmpresaFindOneQuery, EmpresaFindOneQueryResult } from "../../domain/queries";
import { IEmpresaRepository } from "../../domain/repositories";

@DeclareImplementation()
export class EmpresaUpdateCommandHandlerImpl implements IEmpresaUpdateCommandHandler {
  constructor(
    @DeclareDependency(IEmpresaRepository)
    private readonly repository: IEmpresaRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    command: EmpresaFindOneQuery & EmpresaUpdateCommand,
  ): Promise<EmpresaFindOneQueryResult> {
    const { id, ...dto } = command;

    const current = await this.repository.findById(accessContext, { id });
    ensureExists(current, Empresa.entityName, id);

    await this.repository.update(id, dto);

    const result = await this.repository.findById(accessContext, { id });
    ensureExists(result, Empresa.entityName, id);

    return result;
  }
}
