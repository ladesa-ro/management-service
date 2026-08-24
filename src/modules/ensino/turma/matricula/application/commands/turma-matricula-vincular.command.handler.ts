import { ConflictError, ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { IPerfilRepository } from "@/modules/acesso/usuario/perfil/domain/repositories/perfil.repository.interface";
import { ITurmaFindOneQueryHandler } from "@/modules/ensino/turma/domain/queries";
import type { TurmaMatriculaVincularCommand } from "../../domain/commands/turma-matricula-vincular.command";
import { ITurmaMatriculaVincularCommandHandler } from "../../domain/commands/turma-matricula-vincular.command.handler.interface";
import type { TurmaMatriculaFindOneQueryResult } from "../../domain/queries/turma-matricula-find-one.query.result";
import { ITurmaMatriculaRepository } from "../../domain/repositories";
import { TurmaMatricula } from "../../domain/turma-matricula";

@Impl()
export class TurmaMatriculaVincularCommandHandlerImpl
  implements ITurmaMatriculaVincularCommandHandler
{
  constructor(
    @Dep(ITurmaMatriculaRepository)
    private readonly repository: ITurmaMatriculaRepository,
    @Dep(ITurmaFindOneQueryHandler)
    private readonly turmaFindOneHandler: ITurmaFindOneQueryHandler,
    @Dep(IPerfilRepository)
    private readonly perfilRepository: IPerfilRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: TurmaMatriculaVincularCommand,
  ): Promise<TurmaMatriculaFindOneQueryResult> {
    const turma = await this.turmaFindOneHandler.execute(accessContext, { id: dto.turmaId });
    ensureExists(turma, "Turma", dto.turmaId);

    const perfil = await this.perfilRepository.getFindOneQueryResult(accessContext, {
      id: dto.perfilId,
    });
    ensureExists(perfil, "Perfil", dto.perfilId);

    const jaMatriculado = await this.repository.existsActiveByTurmaAndPerfil(
      dto.turmaId,
      dto.perfilId,
    );
    if (jaMatriculado) {
      throw new ConflictError(
        "Este perfil ja possui uma matricula ativa nesta turma.",
        TurmaMatricula.entityName,
      );
    }

    const domain = TurmaMatricula.create({
      turma: { id: dto.turmaId },
      perfil: { id: dto.perfilId },
    });

    await this.repository.save(domain);

    const result = await this.repository.getFindOneQueryResult(accessContext, { id: domain.id });
    ensureExists(result, TurmaMatricula.entityName, domain.id);

    return result;
  }
}
