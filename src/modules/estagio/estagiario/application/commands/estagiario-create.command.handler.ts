import { InternalServerErrorException } from "@nestjs/common";
import { ResourceNotFoundError } from "@/application/errors";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import type { EstagiarioCreateCommand } from "@/modules/estagio/estagiario/domain/commands/estagiario-create.command";
import { IEstagiarioCreateCommandHandler } from "@/modules/estagio/estagiario/domain/commands/estagiario-create.command.handler.interface";
import type { AccessContext } from "@/server/access-context";
import type { EstagiarioFindOneQueryResult } from "../../domain/queries";
import { IEstagiarioRepository } from "../../domain/repositories";

@DeclareImplementation()
export class EstagiarioCreateCommandHandlerImpl implements IEstagiarioCreateCommandHandler {
  constructor(
    @DeclareDependency(IEstagiarioRepository)
    private readonly repository: IEstagiarioRepository,
  ) {}

  async execute(
    accessContext: AccessContext | null,
    dto: EstagiarioCreateCommand,
  ): Promise<EstagiarioFindOneQueryResult> {
    try {
      return await this.repository.create(accessContext, dto);
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        throw error;
      }
      throw new InternalServerErrorException("Erro ao criar estagiário");
    }
  }
}
