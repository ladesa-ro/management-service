import { has } from "lodash";
import { ensureExists } from "@/application/errors";
import type { IAccessContext, PersistInput } from "@/domain/abstractions";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { Ambiente } from "@/modules/ambientes/ambiente/domain/ambiente";
import { IAmbienteFindOneQueryHandler } from "@/modules/ambientes/ambiente/domain/queries/ambiente-find-one.query.handler.interface";
import { Curso } from "@/modules/ensino/curso/domain/curso";
import { ICursoFindOneQueryHandler } from "@/modules/ensino/curso/domain/queries/curso-find-one.query.handler.interface";
import type { TurmaUpdateCommand } from "@/modules/ensino/turma/domain/commands/turma-update.command";
import { ITurmaUpdateCommandHandler } from "@/modules/ensino/turma/domain/commands/turma-update.command.handler.interface";
import type { TurmaFindOneQuery } from "@/modules/ensino/turma/domain/queries";
import type { ITurma } from "@/modules/ensino/turma/domain/turma";
import { Turma } from "@/modules/ensino/turma/domain/turma";
import { ITurmaPermissionChecker } from "../../domain/authorization";
import type { TurmaFindOneQueryResult } from "../../domain/queries";
import { ITurmaRepository } from "../../domain/repositories";

@DeclareImplementation()
export class TurmaUpdateCommandHandlerImpl implements ITurmaUpdateCommandHandler {
  constructor(
    @DeclareDependency(ITurmaRepository)
    private readonly repository: ITurmaRepository,
    @DeclareDependency(ITurmaPermissionChecker)
    private readonly permissionChecker: ITurmaPermissionChecker,
    @DeclareDependency(IAmbienteFindOneQueryHandler)
    private readonly ambienteFindOneHandler: IAmbienteFindOneQueryHandler,
    @DeclareDependency(ICursoFindOneQueryHandler)
    private readonly cursoFindOneHandler: ICursoFindOneQueryHandler,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: TurmaFindOneQuery & TurmaUpdateCommand,
  ): Promise<TurmaFindOneQueryResult> {
    const current = await this.repository.findById(accessContext, { id: dto.id });

    ensureExists(current, Turma.entityName, dto.id);

    await this.permissionChecker.ensureCanUpdate(accessContext, { dto }, dto.id);

    const domain = Turma.load(current);
    domain.update({ periodo: dto.periodo });
    const updateData: Partial<PersistInput<ITurma>> = { ...domain };
    if (has(dto, "ambientePadraoAula") && dto.ambientePadraoAula !== undefined) {
      if (dto.ambientePadraoAula !== null) {
        const ambientePadraoAula = await this.ambienteFindOneHandler.execute(accessContext, {
          id: dto.ambientePadraoAula.id,
        });
        ensureExists(ambientePadraoAula, Ambiente.entityName, dto.ambientePadraoAula.id);
        updateData.ambientePadraoAula = { id: ambientePadraoAula.id };
      } else {
        updateData.ambientePadraoAula = null;
      }
    }
    if (has(dto, "curso") && dto.curso !== undefined) {
      const curso = await this.cursoFindOneHandler.execute(accessContext, { id: dto.curso.id });
      ensureExists(curso, Curso.entityName, dto.curso.id);
      updateData.curso = { id: curso.id };
    }
    await this.repository.update(current.id, updateData);

    const result = await this.repository.findById(accessContext, { id: dto.id });

    ensureExists(result, Turma.entityName, dto.id);

    return result;
  }
}
