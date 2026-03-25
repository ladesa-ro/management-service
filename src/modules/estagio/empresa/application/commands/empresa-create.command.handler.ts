import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import type { EmpresaCreateCommand } from "@/modules/estagio/empresa/domain/commands/empresa-create.command";
import { IEmpresaCreateCommandHandler } from "@/modules/estagio/empresa/domain/commands/empresa-create.command.handler.interface";
import { Empresa } from "@/modules/estagio/empresa/domain/empresa";
import type { EmpresaFindOneQueryResult } from "../../domain/queries";
import { IEmpresaRepository } from "../../domain/repositories";

@DeclareImplementation()
export class EmpresaCreateCommandHandlerImpl implements IEmpresaCreateCommandHandler {
  constructor(
    @DeclareDependency(IEmpresaRepository)
    private readonly repository: IEmpresaRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: EmpresaCreateCommand,
  ): Promise<EmpresaFindOneQueryResult> {
    const empresa = Empresa.create(dto);

    await this.repository.save(empresa);

    const result = await this.repository.getFindOneQueryResult(accessContext, { id: empresa.id });
    ensureExists(result, Empresa.entityName, empresa.id);

    return result;
  }
}
