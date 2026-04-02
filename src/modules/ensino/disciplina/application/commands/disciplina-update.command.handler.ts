import { ensureActiveEntity, ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import type { DisciplinaUpdateCommand } from "@/modules/ensino/disciplina/domain/commands/disciplina-update.command";
import { IDisciplinaUpdateCommandHandler } from "@/modules/ensino/disciplina/domain/commands/disciplina-update.command.handler.interface";
import { Disciplina } from "@/modules/ensino/disciplina/domain/disciplina";
import type { DisciplinaFindOneQuery } from "@/modules/ensino/disciplina/domain/queries";
import { IDisciplinaPermissionChecker } from "../../domain/authorization";
import type { DisciplinaFindOneQueryResult } from "../../domain/queries";
import { IDisciplinaRepository } from "../../domain/repositories";

@Impl()
export class DisciplinaUpdateCommandHandlerImpl implements IDisciplinaUpdateCommandHandler {
  constructor(
    @Dep(IDisciplinaRepository)
    private readonly repository: IDisciplinaRepository,
    @Dep(IDisciplinaPermissionChecker)
    private readonly permissionChecker: IDisciplinaPermissionChecker,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: DisciplinaFindOneQuery & DisciplinaUpdateCommand,
  ): Promise<DisciplinaFindOneQueryResult> {
    const domain = await this.repository.loadById(accessContext, dto.id);
    ensureExists(domain, Disciplina.entityName, dto.id);
    ensureActiveEntity(domain, Disciplina.entityName, dto.id);

    await this.permissionChecker.ensureCanUpdate(accessContext, { dto }, dto.id);

    domain.update({
      nome: dto.nome,
      nomeAbreviado: dto.nomeAbreviado,
      cargaHoraria: dto.cargaHoraria,
    });
    await this.repository.save(domain);

    const result = await this.repository.getFindOneQueryResult(accessContext, { id: dto.id });
    ensureExists(result, Disciplina.entityName, dto.id);

    return result;
  }
}
