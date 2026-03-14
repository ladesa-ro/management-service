import { has } from "lodash";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { ensureExists, type PersistInput } from "@/modules/@shared";
import { Ambiente } from "@/modules/ambientes/ambiente/domain/ambiente.domain";
import { IAmbienteFindOneQueryHandler } from "@/modules/ambientes/ambiente/domain/queries/ambiente-find-one.query.handler.interface";
import { Curso } from "@/modules/ensino/curso/domain/curso.domain";
import { ICursoFindOneQueryHandler } from "@/modules/ensino/curso/domain/queries/curso-find-one.query.handler.interface";
import {
  type ITurmaUpdateCommand,
  ITurmaUpdateCommandHandler,
} from "@/modules/ensino/turma/domain/commands/turma-update.command.handler.interface";
import { Turma } from "@/modules/ensino/turma/domain/turma.domain";
import type { ITurma } from "@/modules/ensino/turma/domain/turma.types";
import { ITurmaPermissionChecker } from "../../domain/authorization";
import { ITurmaRepository } from "../../domain/repositories";
import type { TurmaFindOneOutputDto } from "../dtos";

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

  async execute({ accessContext, dto }: ITurmaUpdateCommand): Promise<TurmaFindOneOutputDto> {
    const current = await this.repository.findById(accessContext, { id: dto.id });

    ensureExists(current, Turma.entityName, dto.id);

    await this.permissionChecker.ensureCanUpdate(accessContext, { dto }, dto.id);

    const domain = Turma.fromData(current);
    domain.atualizar({ periodo: dto.periodo });
    const updateData: Partial<PersistInput<ITurma>> = { periodo: domain.periodo };
    if (has(dto, "ambientePadraoAula") && dto.ambientePadraoAula !== undefined) {
      if (dto.ambientePadraoAula !== null) {
        const ambientePadraoAula = await this.ambienteFindOneHandler.execute({
          accessContext,
          dto: { id: dto.ambientePadraoAula.id },
        });
        ensureExists(ambientePadraoAula, Ambiente.entityName, dto.ambientePadraoAula.id);
        updateData.ambientePadraoAula = { id: ambientePadraoAula.id };
      } else {
        updateData.ambientePadraoAula = null;
      }
    }
    if (has(dto, "curso") && dto.curso !== undefined) {
      const curso = await this.cursoFindOneHandler.execute({
        accessContext,
        dto: { id: dto.curso.id },
      });
      ensureExists(curso, Curso.entityName, dto.curso.id);
      updateData.curso = { id: curso.id };
    }
    await this.repository.updateFromDomain(current.id, updateData);

    const result = await this.repository.findById(accessContext, { id: dto.id });

    ensureExists(result, Turma.entityName, dto.id);

    return result;
  }
}
