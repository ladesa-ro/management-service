import { InternalServerErrorException } from "@nestjs/common";
import { ResourceNotFoundError } from "@/application/errors";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import { IEstagioDeleteCommandHandler } from "@/modules/estagio/estagio/domain/commands/estagio-delete.command.handler.interface";
import type { EstagioFindOneQuery } from "@/modules/estagio/estagio/domain/queries";
import { IEstagioRepository } from "../../domain/repositories";

@DeclareImplementation()
export class EstagioDeleteCommandHandlerImpl implements IEstagioDeleteCommandHandler {
  constructor(
    @DeclareDependency(IEstagioRepository)
    private readonly repository: IEstagioRepository,
  ) {}

  async execute(accessContext: AccessContext | null, { id }: EstagioFindOneQuery): Promise<void> {
    try {
      await this.repository.delete(accessContext, id);
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        throw error;
      }
      throw new InternalServerErrorException("Erro ao deletar estágio");
    }
  }
}
