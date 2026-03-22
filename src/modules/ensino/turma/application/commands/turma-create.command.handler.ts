import { ensureExists } from "@/application/errors";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { Ambiente } from "@/modules/ambientes/ambiente/domain/ambiente";
import { IAmbienteFindOneQueryHandler } from "@/modules/ambientes/ambiente/domain/queries/ambiente-find-one.query.handler.interface";
import { Curso } from "@/modules/ensino/curso/domain/curso";
import { ICursoFindOneQueryHandler } from "@/modules/ensino/curso/domain/queries/curso-find-one.query.handler.interface";
import type { TurmaCreateCommand } from "@/modules/ensino/turma/domain/commands/turma-create.command";
import { ITurmaCreateCommandHandler } from "@/modules/ensino/turma/domain/commands/turma-create.command.handler.interface";
import { Turma } from "@/modules/ensino/turma/domain/turma";
import type { AccessContext } from "@/server/access-context";
import { ITurmaPermissionChecker } from "../../domain/authorization";
import type { TurmaFindOneQueryResult } from "../../domain/queries";
import { ITurmaRepository } from "../../domain/repositories";

@DeclareImplementation()
export class TurmaCreateCommandHandlerImpl implements ITurmaCreateCommandHandler {
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
    accessContext: AccessContext | null,
    dto: TurmaCreateCommand,
  ): Promise<TurmaFindOneQueryResult> {
    await this.permissionChecker.ensureCanCreate(accessContext, { dto });

    const curso = await this.cursoFindOneHandler.execute(accessContext, { id: dto.curso.id });
    ensureExists(curso, Curso.entityName, dto.curso.id);
    let ambientePadraoAulaRef: { id: string } | null = null;
    if (dto.ambientePadraoAula) {
      const ambientePadraoAula = await this.ambienteFindOneHandler.execute(accessContext, {
        id: dto.ambientePadraoAula.id,
      });
      ensureExists(ambientePadraoAula, Ambiente.entityName, dto.ambientePadraoAula.id);
      ambientePadraoAulaRef = { id: ambientePadraoAula.id };
    }
    const domain = Turma.create({
      periodo: dto.periodo,
      curso: { id: curso.id },
      ambientePadraoAula: ambientePadraoAulaRef,
    });
    const { id } = await this.repository.create({
      ...domain,
      curso: { id: curso.id },
      ambientePadraoAula: ambientePadraoAulaRef,
    });

    const result = await this.repository.findById(accessContext, { id });

    ensureExists(result, Turma.entityName, id);

    return result;
  }
}
