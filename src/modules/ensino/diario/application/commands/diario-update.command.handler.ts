import { has } from "lodash";
import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { Ambiente } from "@/modules/ambientes/ambiente/domain/ambiente";
import { IAmbienteFindOneQueryHandler } from "@/modules/ambientes/ambiente/domain/queries/ambiente-find-one.query.handler.interface";
import { CalendarioLetivo } from "@/modules/calendario/letivo/domain/calendario-letivo";
import { ICalendarioLetivoFindOneQueryHandler } from "@/modules/calendario/letivo/domain/queries/calendario-letivo-find-one.query.handler.interface";
import type { DiarioUpdateCommand } from "@/modules/ensino/diario/domain/commands/diario-update.command";
import { IDiarioUpdateCommandHandler } from "@/modules/ensino/diario/domain/commands/diario-update.command.handler.interface";
import { Diario } from "@/modules/ensino/diario/domain/diario";
import type { DiarioFindOneQuery } from "@/modules/ensino/diario/domain/queries";
import { Disciplina } from "@/modules/ensino/disciplina/domain/disciplina";
import { IDisciplinaFindOneQueryHandler } from "@/modules/ensino/disciplina/domain/queries/disciplina-find-one.query.handler.interface";
import { ITurmaFindOneQueryHandler } from "@/modules/ensino/turma/domain/queries/turma-find-one.query.handler.interface";
import { Turma } from "@/modules/ensino/turma/domain/turma";
import { IDiarioPermissionChecker } from "../../domain/authorization";
import type { DiarioFindOneQueryResult } from "../../domain/queries";
import { IDiarioRepository } from "../../domain/repositories";

@Impl()
export class DiarioUpdateCommandHandlerImpl implements IDiarioUpdateCommandHandler {
  constructor(
    @Dep(IDiarioRepository)
    private readonly repository: IDiarioRepository,
    @Dep(IDiarioPermissionChecker)
    private readonly permissionChecker: IDiarioPermissionChecker,
    @Dep(ICalendarioLetivoFindOneQueryHandler)
    private readonly calendarioLetivoFindOneHandler: ICalendarioLetivoFindOneQueryHandler,
    @Dep(ITurmaFindOneQueryHandler)
    private readonly turmaFindOneHandler: ITurmaFindOneQueryHandler,
    @Dep(IDisciplinaFindOneQueryHandler)
    private readonly disciplinaFindOneHandler: IDisciplinaFindOneQueryHandler,
    @Dep(IAmbienteFindOneQueryHandler)
    private readonly ambienteFindOneHandler: IAmbienteFindOneQueryHandler,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: DiarioFindOneQuery & DiarioUpdateCommand,
  ): Promise<DiarioFindOneQueryResult> {
    const domain = await this.repository.loadById(accessContext, dto.id);

    ensureExists(domain, Diario.entityName, dto.id);

    await this.permissionChecker.ensureCanUpdate(accessContext, { dto }, dto.id);

    // Validar existência das referências antes de atualizar o domain
    if (has(dto, "ambientePadrao") && dto.ambientePadrao !== undefined) {
      if (dto.ambientePadrao !== null) {
        const ambientePadrao = await this.ambienteFindOneHandler.execute(accessContext, {
          id: dto.ambientePadrao.id,
        });
        ensureExists(ambientePadrao, Ambiente.entityName, dto.ambientePadrao.id);
        domain.ambientePadrao = { id: ambientePadrao.id };
      } else {
        domain.ambientePadrao = null;
      }
    }
    if (has(dto, "disciplina") && dto.disciplina !== undefined) {
      const disciplina = await this.disciplinaFindOneHandler.execute(accessContext, {
        id: dto.disciplina.id,
      });
      ensureExists(disciplina, Disciplina.entityName, dto.disciplina.id);
      domain.disciplina = { id: disciplina.id };
    }
    if (has(dto, "turma") && dto.turma !== undefined) {
      const turma = await this.turmaFindOneHandler.execute(accessContext, { id: dto.turma.id });
      ensureExists(turma, Turma.entityName, dto.turma.id);
      domain.turma = { id: turma.id };
    }
    if (has(dto, "calendarioLetivo") && dto.calendarioLetivo !== undefined) {
      const calendarioLetivo = await this.calendarioLetivoFindOneHandler.execute(accessContext, {
        id: dto.calendarioLetivo.id,
      });
      ensureExists(calendarioLetivo, CalendarioLetivo.entityName, dto.calendarioLetivo.id);
      domain.calendarioLetivo = { id: calendarioLetivo.id };
    }

    domain.update({ ativo: dto.ativo });

    await this.repository.save(domain);

    const result = await this.repository.getFindOneQueryResult(accessContext, { id: dto.id });

    ensureExists(result, Diario.entityName, dto.id);

    return result;
  }
}
