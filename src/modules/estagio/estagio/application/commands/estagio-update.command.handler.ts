import { InternalServerErrorException } from "@nestjs/common";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import { ResourceNotFoundError } from "@/modules/@shared";
import type { EstagioUpdateCommand } from "@/modules/estagio/estagio/domain/commands/estagio-update.command";
import { IEstagioUpdateCommandHandler } from "@/modules/estagio/estagio/domain/commands/estagio-update.command.handler.interface";
import type { EstagioFindOneQuery } from "@/modules/estagio/estagio/domain/queries";
import type { EstagioFindOneQueryResult } from "../../domain/queries";
import { IEstagioRepository } from "../../domain/repositories";

@DeclareImplementation()
export class EstagioUpdateCommandHandlerImpl implements IEstagioUpdateCommandHandler {
  constructor(
    @DeclareDependency(IEstagioRepository)
    private readonly repository: IEstagioRepository,
  ) {}

  async execute(
    accessContext: AccessContext | null,
    command: EstagioFindOneQuery & EstagioUpdateCommand,
  ): Promise<EstagioFindOneQueryResult> {
    const { id, ...dto } = command;
    try {
      return await this.repository.update(accessContext, id, dto);
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        throw error;
      }
      throw new InternalServerErrorException("Erro ao atualizar estágio");
    }
  }
}
