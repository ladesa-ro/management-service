import { InternalError, ResourceNotFoundError } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import type { EstagiarioCreateCommand } from "@/modules/estagio/estagiario/domain/commands/estagiario-create.command";
import { IEstagiarioCreateCommandHandler } from "@/modules/estagio/estagiario/domain/commands/estagiario-create.command.handler.interface";
import type { EstagiarioFindOneQueryResult } from "../../domain/queries";
import { IEstagiarioRepository } from "../../domain/repositories";

@DeclareImplementation()
export class EstagiarioCreateCommandHandlerImpl implements IEstagiarioCreateCommandHandler {
  constructor(
    @DeclareDependency(IEstagiarioRepository)
    private readonly repository: IEstagiarioRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: EstagiarioCreateCommand,
  ): Promise<EstagiarioFindOneQueryResult> {
    try {
      return await this.repository.create(accessContext, dto);
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        throw error;
      }
      throw new InternalError("Erro ao criar estagiário");
    }
  }
}
