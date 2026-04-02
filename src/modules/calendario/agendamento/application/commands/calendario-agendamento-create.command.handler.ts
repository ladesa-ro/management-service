import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { CalendarioAgendamento } from "../../domain/calendario-agendamento";
import { CalendarioAgendamentoMetadata } from "../../domain/calendario-agendamento-metadata";
import type { CalendarioAgendamentoCreateCommand } from "../../domain/commands/calendario-agendamento-create.command";
import { ICalendarioAgendamentoCreateCommandHandler } from "../../domain/commands/calendario-agendamento-create.command.handler.interface";
import type { CalendarioAgendamentoFindOneQueryResult } from "../../domain/queries/calendario-agendamento-find-one.query.result";
import { ICalendarioAgendamentoRepository } from "../../domain/repositories/calendario-agendamento.repository.interface";

@Impl()
export class CalendarioAgendamentoCreateCommandHandlerImpl
  implements ICalendarioAgendamentoCreateCommandHandler
{
  constructor(
    @Dep(ICalendarioAgendamentoRepository)
    private readonly repository: ICalendarioAgendamentoRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: CalendarioAgendamentoCreateCommand,
  ): Promise<CalendarioAgendamentoFindOneQueryResult> {
    const domain = CalendarioAgendamento.create(dto);

    // Criar metadata (nome/cor) na tabela separada
    const metadata = CalendarioAgendamentoMetadata.create({
      identificadorExternoCalendarioAgendamento: domain.identificadorExterno,
      nome: dto.nome,
      cor: dto.cor,
    });

    await this.repository.save(domain);
    await this.repository.saveMetadata(metadata);

    const result = await this.repository.getFindOneQueryResult(accessContext, domain.id);
    ensureExists(result, CalendarioAgendamento.entityName, domain.id);

    return result;
  }
}
