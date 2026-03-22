import { InternalError, ResourceNotFoundError } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { IEmpresaDeleteCommandHandler } from "@/modules/estagio/empresa/domain/commands/empresa-delete.command.handler.interface";
import type { EmpresaFindOneQuery } from "@/modules/estagio/empresa/domain/queries";
import { IEmpresaRepository } from "../../domain/repositories";

@DeclareImplementation()
export class EmpresaDeleteCommandHandlerImpl implements IEmpresaDeleteCommandHandler {
  constructor(
    @DeclareDependency(IEmpresaRepository)
    private readonly repository: IEmpresaRepository,
  ) {}

  async execute(accessContext: IAccessContext | null, { id }: EmpresaFindOneQuery): Promise<void> {
    try {
      await this.repository.delete(accessContext, id);
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        throw error;
      }
      throw new InternalError("Erro ao deletar empresa");
    }
  }
}
