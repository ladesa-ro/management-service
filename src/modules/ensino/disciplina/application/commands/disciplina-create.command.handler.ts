import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import type { DisciplinaCreateCommand } from "@/modules/ensino/disciplina/domain/commands/disciplina-create.command";
import { IDisciplinaCreateCommandHandler } from "@/modules/ensino/disciplina/domain/commands/disciplina-create.command.handler.interface";
import { Disciplina } from "@/modules/ensino/disciplina/domain/disciplina";
import { IDisciplinaPermissionChecker } from "../../domain/authorization";
import type { DisciplinaFindOneQueryResult } from "../../domain/queries";
import { IDisciplinaRepository } from "../../domain/repositories";

@DeclareImplementation()
export class DisciplinaCreateCommandHandlerImpl implements IDisciplinaCreateCommandHandler {
  constructor(
    @DeclareDependency(IDisciplinaRepository)
    private readonly repository: IDisciplinaRepository,
    @DeclareDependency(IDisciplinaPermissionChecker)
    private readonly permissionChecker: IDisciplinaPermissionChecker,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: DisciplinaCreateCommand,
  ): Promise<DisciplinaFindOneQueryResult> {
    await this.permissionChecker.ensureCanCreate(accessContext, { dto });

    const domain = Disciplina.create({
      nome: dto.nome,
      nomeAbreviado: dto.nomeAbreviado,
      cargaHoraria: dto.cargaHoraria,
    });
    const { id } = await this.repository.create({ ...domain });

    const result = await this.repository.findById(accessContext, { id });

    ensureExists(result, Disciplina.entityName, id);

    return result;
  }
}
