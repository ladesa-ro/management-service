import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import type { TurmaDisponibilidadeDeactivateCommand } from "../../domain/commands/turma-disponibilidade-deactivate.command";
import { ITurmaDisponibilidadeDeactivateCommandHandler } from "../../domain/commands/turma-disponibilidade-deactivate.command-handler.interface";
import { ITurmaDisponibilidadeRepository } from "../../domain/repositories";

@Impl()
export class TurmaDisponibilidadeDeactivateCommandHandlerImpl
  implements ITurmaDisponibilidadeDeactivateCommandHandler
{
  constructor(
    @Dep(ITurmaDisponibilidadeRepository)
    private readonly repository: ITurmaDisponibilidadeRepository,
  ) {}

  async execute(
    _accessContext: IAccessContext | null,
    command: TurmaDisponibilidadeDeactivateCommand,
  ): Promise<void> {
    await this.repository.deactivateById(command.configId);
  }
}
