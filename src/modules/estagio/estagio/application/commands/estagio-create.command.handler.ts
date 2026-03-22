import { InternalError, ResourceNotFoundError } from "@/application/errors";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import type { EstagioCreateCommand } from "@/modules/estagio/estagio/domain/commands/estagio-create.command";
import { IEstagioCreateCommandHandler } from "@/modules/estagio/estagio/domain/commands/estagio-create.command.handler.interface";
import type { AccessContext } from "@/server/access-context";
import type { EstagioFindOneQueryResult } from "../../domain/queries";
import { IEstagioRepository } from "../../domain/repositories";

@DeclareImplementation()
export class EstagioCreateCommandHandlerImpl implements IEstagioCreateCommandHandler {
  constructor(
    @DeclareDependency(IEstagioRepository)
    private readonly repository: IEstagioRepository,
  ) {}

  async execute(
    accessContext: AccessContext | null,
    dto: EstagioCreateCommand,
  ): Promise<EstagioFindOneQueryResult> {
    try {
      return await this.repository.create(accessContext, dto);
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        throw error;
      }
      throw new InternalError("Erro ao criar estágio");
    }
  }
}
