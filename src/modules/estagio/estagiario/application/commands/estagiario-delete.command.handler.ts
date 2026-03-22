import { InternalError, ResourceNotFoundError } from "@/application/errors";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { IEstagiarioDeleteCommandHandler } from "@/modules/estagio/estagiario/domain/commands/estagiario-delete.command.handler.interface";
import type { EstagiarioFindOneQuery } from "@/modules/estagio/estagiario/domain/queries";
import type { AccessContext } from "@/server/access-context";
import { IEstagiarioRepository } from "../../domain/repositories";

@DeclareImplementation()
export class EstagiarioDeleteCommandHandlerImpl implements IEstagiarioDeleteCommandHandler {
  constructor(
    @DeclareDependency(IEstagiarioRepository)
    private readonly repository: IEstagiarioRepository,
  ) {}

  async execute(
    accessContext: AccessContext | null,
    { id }: EstagiarioFindOneQuery,
  ): Promise<void> {
    try {
      await this.repository.delete(accessContext, id);
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        throw error;
      }
      throw new InternalError("Erro ao deletar estagiário");
    }
  }
}
