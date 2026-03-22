import { has } from "lodash";
import { ensureExists } from "@/application/errors";
import type { IAccessContext, PersistInput } from "@/domain/abstractions";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { Ambiente } from "@/modules/ambientes/ambiente/domain/ambiente";
import { IAmbienteFindOneQueryHandler } from "@/modules/ambientes/ambiente/domain/queries/ambiente-find-one.query.handler.interface";
import type { DiarioUpdateCommand } from "@/modules/ensino/diario/domain/commands/diario-update.command";
import { IDiarioUpdateCommandHandler } from "@/modules/ensino/diario/domain/commands/diario-update.command.handler.interface";
import type { IDiario } from "@/modules/ensino/diario/domain/diario";
import { Diario } from "@/modules/ensino/diario/domain/diario";
import type { DiarioFindOneQuery } from "@/modules/ensino/diario/domain/queries";
import { Disciplina } from "@/modules/ensino/disciplina/domain/disciplina";
import { IDisciplinaFindOneQueryHandler } from "@/modules/ensino/disciplina/domain/queries/disciplina-find-one.query.handler.interface";
import { ITurmaFindOneQueryHandler } from "@/modules/ensino/turma/domain/queries/turma-find-one.query.handler.interface";
import { Turma } from "@/modules/ensino/turma/domain/turma";
import { CalendarioLetivo } from "@/modules/horarios/calendario-letivo/domain/calendario-letivo";
import { ICalendarioLetivoFindOneQueryHandler } from "@/modules/horarios/calendario-letivo/domain/queries/calendario-letivo-find-one.query.handler.interface";
import { IDiarioPermissionChecker } from "../../domain/authorization";
import type { DiarioFindOneQueryResult } from "../../domain/queries";
import { IDiarioRepository } from "../../domain/repositories";

@DeclareImplementation()
export class DiarioUpdateCommandHandlerImpl implements IDiarioUpdateCommandHandler {
  constructor(
    @DeclareDependency(IDiarioRepository)
    private readonly repository: IDiarioRepository,
    @DeclareDependency(IDiarioPermissionChecker)
    private readonly permissionChecker: IDiarioPermissionChecker,
    @DeclareDependency(ICalendarioLetivoFindOneQueryHandler)
    private readonly calendarioLetivoFindOneHandler: ICalendarioLetivoFindOneQueryHandler,
    @DeclareDependency(ITurmaFindOneQueryHandler)
    private readonly turmaFindOneHandler: ITurmaFindOneQueryHandler,
    @DeclareDependency(IDisciplinaFindOneQueryHandler)
    private readonly disciplinaFindOneHandler: IDisciplinaFindOneQueryHandler,
    @DeclareDependency(IAmbienteFindOneQueryHandler)
    private readonly ambienteFindOneHandler: IAmbienteFindOneQueryHandler,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: DiarioFindOneQuery & DiarioUpdateCommand,
  ): Promise<DiarioFindOneQueryResult> {
    const current = await this.repository.findById(accessContext, { id: dto.id });

    ensureExists(current, Diario.entityName, dto.id);

    await this.permissionChecker.ensureCanUpdate(accessContext, { dto }, dto.id);

    const domain = Diario.load(current);
    domain.update({ ativo: dto.ativo });
    const updateData: Partial<PersistInput<IDiario>> = { ...domain };
    if (has(dto, "ambientePadrao") && dto.ambientePadrao !== undefined) {
      if (dto.ambientePadrao !== null) {
        const ambientePadrao = await this.ambienteFindOneHandler.execute(accessContext, {
          id: dto.ambientePadrao.id,
        });
        ensureExists(ambientePadrao, Ambiente.entityName, dto.ambientePadrao.id);
        updateData.ambientePadrao = { id: ambientePadrao.id };
      } else {
        updateData.ambientePadrao = null;
      }
    }
    if (has(dto, "disciplina") && dto.disciplina !== undefined) {
      const disciplina = await this.disciplinaFindOneHandler.execute(accessContext, {
        id: dto.disciplina.id,
      });
      ensureExists(disciplina, Disciplina.entityName, dto.disciplina.id);
      updateData.disciplina = { id: disciplina.id };
    }
    if (has(dto, "turma") && dto.turma !== undefined) {
      const turma = await this.turmaFindOneHandler.execute(accessContext, { id: dto.turma.id });
      ensureExists(turma, Turma.entityName, dto.turma.id);
      updateData.turma = { id: turma.id };
    }
    if (has(dto, "calendarioLetivo") && dto.calendarioLetivo !== undefined) {
      const calendarioLetivo = await this.calendarioLetivoFindOneHandler.execute(accessContext, {
        id: dto.calendarioLetivo.id,
      });
      ensureExists(calendarioLetivo, CalendarioLetivo.entityName, dto.calendarioLetivo.id);
      updateData.calendarioLetivo = { id: calendarioLetivo.id };
    }
    await this.repository.update(current.id, updateData);

    const result = await this.repository.findById(accessContext, { id: dto.id });

    ensureExists(result, Diario.entityName, dto.id);

    return result;
  }
}
