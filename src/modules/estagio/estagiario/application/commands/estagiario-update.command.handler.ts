import { InternalError, ResourceNotFoundError } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import type { EstagiarioUpdateCommand } from "@/modules/estagio/estagiario/domain/commands/estagiario-update.command";
import { IEstagiarioUpdateCommandHandler } from "@/modules/estagio/estagiario/domain/commands/estagiario-update.command.handler.interface";
import type { EstagiarioFindOneQuery } from "@/modules/estagio/estagiario/domain/queries";
import type { EstagiarioFindOneQueryResult } from "../../domain/queries";
import { IEstagiarioRepository } from "../../domain/repositories";

@DeclareImplementation()
export class EstagiarioUpdateCommandHandlerImpl implements IEstagiarioUpdateCommandHandler {
  constructor(
    @DeclareDependency(IEstagiarioRepository)
    private readonly repository: IEstagiarioRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    command: EstagiarioFindOneQuery & EstagiarioUpdateCommand,
  ): Promise<EstagiarioFindOneQueryResult> {
    const { id, ...dto } = command;
    try {
      return await this.repository.update(accessContext, id, dto);
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        throw error;
      }
      throw new InternalError("Erro ao atualizar estagiário");
    }
  }
}
