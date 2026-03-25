import { has } from "lodash";
import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { Ambiente } from "@/modules/ambientes/ambiente/domain/ambiente";
import { IAmbienteFindOneQueryHandler } from "@/modules/ambientes/ambiente/domain/queries/ambiente-find-one.query.handler.interface";
import { Curso } from "@/modules/ensino/curso/domain/curso";
import { ICursoFindOneQueryHandler } from "@/modules/ensino/curso/domain/queries/curso-find-one.query.handler.interface";
import type { TurmaUpdateCommand } from "@/modules/ensino/turma/domain/commands/turma-update.command";
import { ITurmaUpdateCommandHandler } from "@/modules/ensino/turma/domain/commands/turma-update.command.handler.interface";
import type { TurmaFindOneQuery } from "@/modules/ensino/turma/domain/queries";
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
    const domain = await this.repository.loadById(accessContext, dto.id);

    ensureExists(domain, Turma.entityName, dto.id);

    await this.permissionChecker.ensureCanUpdate(accessContext, { dto }, dto.id);

    // Validar existência das referências antes de atualizar o domain
    if (has(dto, "ambientePadraoAula") && dto.ambientePadraoAula !== undefined) {
      if (dto.ambientePadraoAula !== null) {
        const ambientePadraoAula = await this.ambienteFindOneHandler.execute(accessContext, {
          id: dto.ambientePadraoAula.id,
        });
        ensureExists(ambientePadraoAula, Ambiente.entityName, dto.ambientePadraoAula.id);
      }
    }
    if (has(dto, "curso") && dto.curso !== undefined) {
      const curso = await this.cursoFindOneHandler.execute(accessContext, { id: dto.curso.id });
      ensureExists(curso, Curso.entityName, dto.curso.id);
    }

    domain.update({
      periodo: dto.periodo,
      curso: dto.curso,
      ambientePadraoAula: dto.ambientePadraoAula,
    });

    await this.repository.save(domain);

    const result = await this.repository.getFindOneQueryResult(accessContext, { id: dto.id });

    ensureExists(result, Turma.entityName, dto.id);

    return result;
  }
}
