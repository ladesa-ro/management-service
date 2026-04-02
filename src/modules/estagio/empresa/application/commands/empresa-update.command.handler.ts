import { ensureActiveEntity, ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import type { EmpresaUpdateCommand } from "@/modules/estagio/empresa/domain/commands/empresa-update.command";
import { IEmpresaUpdateCommandHandler } from "@/modules/estagio/empresa/domain/commands/empresa-update.command.handler.interface";
import { Empresa } from "@/modules/estagio/empresa/domain/empresa";
import type { EmpresaFindOneQuery, EmpresaFindOneQueryResult } from "../../domain/queries";
import { IEmpresaRepository } from "../../domain/repositories";

@Impl()
export class EmpresaUpdateCommandHandlerImpl implements IEmpresaUpdateCommandHandler {
  constructor(
    @Dep(IEmpresaRepository)
    private readonly repository: IEmpresaRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    command: EmpresaFindOneQuery & EmpresaUpdateCommand,
  ): Promise<EmpresaFindOneQueryResult> {
    const { id, ...dto } = command;

    const domain = await this.repository.loadById(accessContext, id);
    ensureExists(domain, Empresa.entityName, id);
    ensureActiveEntity(domain, Empresa.entityName, id);

    domain.update(dto);

    await this.repository.save(domain);

    const result = await this.repository.getFindOneQueryResult(accessContext, { id });
    ensureExists(result, Empresa.entityName, id);

    return result;
  }
}
