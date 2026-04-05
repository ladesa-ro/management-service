import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { CalendarioAgendamento } from "../../domain/calendario-agendamento";
import type { CalendarioAgendamentoDesvincularPerfilCommand } from "../../domain/commands/calendario-agendamento-desvincular-perfil.command";
import { ICalendarioAgendamentoDesvincularPerfilCommandHandler } from "../../domain/commands/calendario-agendamento-desvincular-perfil.command.handler.interface";
import { ICalendarioAgendamentoRepository } from "../../domain/repositories/calendario-agendamento.repository.interface";

@Impl()
export class CalendarioAgendamentoDesvincularPerfilCommandHandlerImpl
  implements ICalendarioAgendamentoDesvincularPerfilCommandHandler
{
  constructor(
    @Dep(ICalendarioAgendamentoRepository)
    private readonly repository: ICalendarioAgendamentoRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: CalendarioAgendamentoDesvincularPerfilCommand,
  ): Promise<boolean> {
    const domain = await this.repository.loadById(accessContext, dto.id);
    ensureExists(domain, CalendarioAgendamento.entityName, dto.id);

    await this.repository.deletePerfilJunction(dto.id, dto.perfilId);

    return true;
  }
}
