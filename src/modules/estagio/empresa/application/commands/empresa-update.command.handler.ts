import { InternalError, ResourceNotFoundError } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import type { EmpresaUpdateCommand } from "@/modules/estagio/empresa/domain/commands/empresa-update.command";
import { IEmpresaUpdateCommandHandler } from "@/modules/estagio/empresa/domain/commands/empresa-update.command.handler.interface";
import type { EmpresaFindOneQuery } from "@/modules/estagio/empresa/domain/queries";
import type { EmpresaFindOneQueryResult } from "../../domain/queries";
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
    try {
      return await this.repository.update(accessContext, id, dto);
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        throw error;
      }
      throw new InternalError("Erro ao atualizar empresa");
    }
  }
}
