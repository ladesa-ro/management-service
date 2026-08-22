import { ensureActiveEntity, ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { ITurmaMatriculaDesvincularCommandHandler } from "../../domain/commands/turma-matricula-desvincular.command.handler.interface";
import type { TurmaMatriculaFindOneQuery } from "../../domain/queries/turma-matricula-find-one.query";
import { ITurmaMatriculaRepository } from "../../domain/repositories";
import { TurmaMatricula } from "../../domain/turma-matricula";

@Impl()
export class TurmaMatriculaDesvincularCommandHandlerImpl
  implements ITurmaMatriculaDesvincularCommandHandler
{
  constructor(
    @Dep(ITurmaMatriculaRepository)
    private readonly repository: ITurmaMatriculaRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: TurmaMatriculaFindOneQuery,
  ): Promise<boolean> {
    const aggregate = await this.repository.loadById(accessContext, dto.id);
    ensureExists(aggregate, TurmaMatricula.entityName, dto.id);
    ensureActiveEntity(aggregate, TurmaMatricula.entityName, dto.id);

    await this.repository.softDeleteById(aggregate.id);

    return true;
  }
}
