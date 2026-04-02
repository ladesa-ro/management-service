import { ensureActiveEntity, ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { CalendarioAgendamento } from "../../domain/calendario-agendamento";
import type { CalendarioAgendamentoUpdateCommand } from "../../domain/commands/calendario-agendamento-update.command";
import { ICalendarioAgendamentoUpdateCommandHandler } from "../../domain/commands/calendario-agendamento-update.command.handler.interface";
import type { CalendarioAgendamentoFindOneQuery } from "../../domain/queries/calendario-agendamento-find-one.query";
import type { CalendarioAgendamentoFindOneQueryResult } from "../../domain/queries/calendario-agendamento-find-one.query.result";
import { ICalendarioAgendamentoRepository } from "../../domain/repositories/calendario-agendamento.repository.interface";

@Impl()
export class CalendarioAgendamentoUpdateCommandHandlerImpl
  implements ICalendarioAgendamentoUpdateCommandHandler
{
  constructor(
    @Dep(ICalendarioAgendamentoRepository)
    private readonly repository: ICalendarioAgendamentoRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: CalendarioAgendamentoFindOneQuery & CalendarioAgendamentoUpdateCommand,
  ): Promise<CalendarioAgendamentoFindOneQueryResult> {
    const domain = await this.repository.loadById(accessContext, dto.id);
    ensureExists(domain, CalendarioAgendamento.entityName, dto.id);
    ensureActiveEntity(domain, CalendarioAgendamento.entityName, dto.id);

    // Detectar se ha campos de metadata (nome/cor)
    const hasMetadataChanges = dto.nome !== undefined || dto.cor !== undefined;

    // Detectar se ha campos versionados
    const hasVersionedChanges =
      dto.dataInicio !== undefined ||
      dto.dataFim !== undefined ||
      dto.diaInteiro !== undefined ||
      dto.horarioInicio !== undefined ||
      dto.horarioFim !== undefined ||
      dto.repeticao !== undefined ||
      dto.turmas !== undefined ||
      dto.perfis !== undefined ||
      dto.calendariosLetivos !== undefined ||
      dto.ofertasFormacao !== undefined ||
      dto.modalidades !== undefined ||
      dto.ambientes !== undefined ||
      dto.diarios !== undefined;

    // Atualizar metadata (nome/cor) sem gerar nova versao
    if (hasMetadataChanges) {
      await this.repository.updateMetadata(domain.identificadorExterno, {
        nome: dto.nome,
        cor: dto.cor,
      });
    }

    // Criar nova versao se campos versionados foram alterados
    let resultId = dto.id;

    if (hasVersionedChanges) {
      domain.close();
      const newVersion = CalendarioAgendamento.createNewVersion(domain, {
        dataInicio: dto.dataInicio,
        dataFim: dto.dataFim,
        diaInteiro: dto.diaInteiro,
        horarioInicio: dto.horarioInicio,
        horarioFim: dto.horarioFim,
        repeticao: dto.repeticao,
        turmas: dto.turmas,
        perfis: dto.perfis,
        calendariosLetivos: dto.calendariosLetivos,
        ofertasFormacao: dto.ofertasFormacao,
        modalidades: dto.modalidades,
        ambientes: dto.ambientes,
        diarios: dto.diarios,
      });

      await this.repository.saveNewVersion(domain, newVersion);
      resultId = newVersion.id;
    }

    const result = await this.repository.getFindOneQueryResult(accessContext, resultId);
    ensureExists(result, CalendarioAgendamento.entityName, resultId);

    return result;
  }
}
