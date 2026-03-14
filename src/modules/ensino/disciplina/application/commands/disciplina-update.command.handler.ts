import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { ensureExists } from "@/modules/@shared";
import {
  type IDisciplinaUpdateCommand,
  IDisciplinaUpdateCommandHandler,
} from "@/modules/ensino/disciplina/domain/commands/disciplina-update.command.handler.interface";
import { Disciplina } from "@/modules/ensino/disciplina/domain/disciplina.domain";
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

  async execute({
    accessContext,
    dto,
  }: IDisciplinaUpdateCommand): Promise<DisciplinaFindOneQueryResult> {
    const current = await this.repository.findById(accessContext, { id: dto.id });

    ensureExists(current, Disciplina.entityName, dto.id);

    await this.permissionChecker.ensureCanUpdate(accessContext, { dto }, dto.id);

    const domain = Disciplina.fromData(current);
    domain.atualizar({
      nome: dto.nome,
      nomeAbreviado: dto.nomeAbreviado,
      cargaHoraria: dto.cargaHoraria,
    });
    await this.repository.updateFromDomain(current.id, {
      nome: domain.nome,
      nomeAbreviado: domain.nomeAbreviado,
      cargaHoraria: domain.cargaHoraria,
    });

    const result = await this.repository.findById(accessContext, { id: dto.id });

    ensureExists(result, Disciplina.entityName, dto.id);

    return result;
  }
}
