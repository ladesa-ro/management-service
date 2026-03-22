import { InternalError, ResourceNotFoundError } from "@/application/errors";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import type { EmpresaCreateCommand } from "@/modules/estagio/empresa/domain/commands/empresa-create.command";
import { IEmpresaCreateCommandHandler } from "@/modules/estagio/empresa/domain/commands/empresa-create.command.handler.interface";
import type { AccessContext } from "@/server/access-context";
import type { EmpresaFindOneQueryResult } from "../../domain/queries";
import { IEmpresaRepository } from "../../domain/repositories";

@DeclareImplementation()
export class EmpresaCreateCommandHandlerImpl implements IEmpresaCreateCommandHandler {
  constructor(
    @DeclareDependency(IEmpresaRepository)
    private readonly repository: IEmpresaRepository,
  ) {}

  async execute(
    accessContext: AccessContext | null,
    dto: EmpresaCreateCommand,
  ): Promise<EmpresaFindOneQueryResult> {
    try {
      return await this.repository.create(accessContext, dto);
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        throw error;
      }
      throw new InternalError("Erro ao criar empresa");
    }
  }
}
