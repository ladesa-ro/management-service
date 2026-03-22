import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import type { DisciplinaUpdateCommand } from "@/modules/ensino/disciplina/domain/commands/disciplina-update.command";
import { IDisciplinaUpdateCommandHandler } from "@/modules/ensino/disciplina/domain/commands/disciplina-update.command.handler.interface";
import { Disciplina } from "@/modules/ensino/disciplina/domain/disciplina";
import type { DisciplinaFindOneQuery } from "@/modules/ensino/disciplina/domain/queries";
import { IDisciplinaPermissionChecker } from "../../domain/authorization";
import type { DisciplinaFindOneQueryResult } from "../../domain/queries";
import { IDisciplinaRepository } from "../../domain/repositories";

@DeclareImplementation()
export class DisciplinaUpdateCommandHandlerImpl implements IDisciplinaUpdateCommandHandler {
  constructor(
    @DeclareDependency(IDisciplinaRepository)
    private readonly repository: IDisciplinaRepository,
    @DeclareDependency(IDisciplinaPermissionChecker)
    private readonly permissionChecker: IDisciplinaPermissionChecker,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: DisciplinaFindOneQuery & DisciplinaUpdateCommand,
  ): Promise<DisciplinaFindOneQueryResult> {
    const current = await this.repository.findById(accessContext, { id: dto.id });

    ensureExists(current, Disciplina.entityName, dto.id);

    await this.permissionChecker.ensureCanUpdate(accessContext, { dto }, dto.id);

    const domain = Disciplina.load(current);
    domain.update({
      nome: dto.nome,
      nomeAbreviado: dto.nomeAbreviado,
      cargaHoraria: dto.cargaHoraria,
    });
    await this.repository.update(current.id, domain);

    const result = await this.repository.findById(accessContext, { id: dto.id });

    ensureExists(result, Disciplina.entityName, dto.id);

    return result;
  }
}
