import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { IHorariosDeAulaReplaceCommandHandler } from "@/modules/horarios/horarios-de-aula/domain/commands/horarios-de-aula-replace.command.handler.interface";
import { getNowISO } from "@/utils/date";
import { IHorariosDeAulaPermissionChecker } from "../../domain/authorization";
import type { HorariosDeAulaReplaceCommand } from "../../domain/commands";
import { HorarioAulaConfiguracao } from "../../domain/horario-aula-configuracao";
import type { HorariosDeAulaFindAtualQueryResult } from "../../domain/queries";
import { IHorarioAulaConfiguracaoRepository } from "../../domain/repositories";

@DeclareImplementation()
export class HorariosDeAulaReplaceCommandHandlerImpl
  implements IHorariosDeAulaReplaceCommandHandler
{
  constructor(
    @DeclareDependency(IHorarioAulaConfiguracaoRepository)
    private readonly repository: IHorarioAulaConfiguracaoRepository,
    @DeclareDependency(IHorariosDeAulaPermissionChecker)
    private readonly permissionChecker: IHorariosDeAulaPermissionChecker,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    command: HorariosDeAulaReplaceCommand,
  ): Promise<HorariosDeAulaFindAtualQueryResult> {
    await this.permissionChecker.ensureCanUpdate(accessContext, { dto: command }, command.campusId);

    let config = await this.repository.findActiveByCampusId(command.campusId);

    if (!config) {
      config = HorarioAulaConfiguracao.create({
        dataInicio: getNowISO().split("T")[0],
        ativo: true,
        campus: { id: command.campusId },
        horarios: [],
      });
    }

    config.replaceHorarios(command.horarios);
    await this.repository.save(config);

    return this.repository.getFindAtualQueryResult(accessContext, {
      campusId: command.campusId,
    });
  }
}
