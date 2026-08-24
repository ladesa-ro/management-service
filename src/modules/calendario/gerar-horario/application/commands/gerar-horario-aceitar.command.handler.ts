import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7";
import type { TimetableGridSchedule } from "@/infrastructure.timetable-generator/proto/generated/core/timetable_grid_schedule";
import type { ServiceGenerateResponse } from "@/infrastructure.timetable-generator/proto/generated/service/service_generate_response";
import { CalendarioAgendamentoTipo } from "@/modules/calendario/agendamento/domain/calendario-agendamento.types";
import {
  HorarioEdicaoMudancaTipoOperacao,
  HorarioEdicaoSessaoStatus,
} from "@/modules/calendario/horario-edicao/domain/horario-edicao.types";
import { IHorarioEdicaoMudancaRepository } from "@/modules/calendario/horario-edicao/domain/repositories/horario-edicao-mudanca.repository.interface";
import { IHorarioEdicaoSessaoRepository } from "@/modules/calendario/horario-edicao/domain/repositories/horario-edicao-sessao.repository.interface";
import { getNowISO } from "@/utils/date";
import type {
  IGerarHorarioAceitarCommand,
  IGerarHorarioAceitarCommandHandler,
  IGerarHorarioAceitarResult,
} from "../../domain/commands/gerar-horario-aceitar.command.handler.interface";
import { GerarHorario } from "../../domain/gerar-horario";
import {
  IGerarHorarioRepository,
  type IGerarHorarioRepository as IGerarHorarioRepositoryType,
} from "../../domain/repositories/gerar-horario.repository.interface";

@Impl()
export class GerarHorarioAceitarCommandHandlerImpl implements IGerarHorarioAceitarCommandHandler {
  constructor(
    @Dep(IGerarHorarioRepository)
    private readonly gerarHorarioRepository: IGerarHorarioRepositoryType,
    @Dep(IHorarioEdicaoSessaoRepository)
    private readonly sessaoRepository: IHorarioEdicaoSessaoRepository,
    @Dep(IHorarioEdicaoMudancaRepository)
    private readonly mudancaRepository: IHorarioEdicaoMudancaRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    command: IGerarHorarioAceitarCommand,
  ): Promise<IGerarHorarioAceitarResult> {
    const domain = await this.gerarHorarioRepository.loadById(command.id);
    ensureExists(domain, GerarHorario.entityName, command.id);

    domain.aceitar();
    await this.gerarHorarioRepository.save(domain);

    const sessao = await this.sessaoRepository.save({
      id: generateUuidV7(),
      status: HorarioEdicaoSessaoStatus.ABERTA,
      usuario: { id: accessContext?.requestActor?.id ?? "" },
      dateCreated: getNowISO(),
      dateUpdated: getNowISO(),
    });

    const schedules = this.extrairSchedules(domain.respostaGerador);

    for (const schedule of schedules) {
      const dataOcorrencia = schedule.date.slice(0, 10);

      await this.mudancaRepository.save({
        id: generateUuidV7(),
        sessao: { id: sessao.id },
        calendarioAgendamento: null,
        tipoOperacao: HorarioEdicaoMudancaTipoOperacao.CRIAR,
        dados: {
          tipo: CalendarioAgendamentoTipo.AULA,
          dataInicio: dataOcorrencia,
          dataFim: dataOcorrencia,
          diaInteiro: false,
          horarioInicio: schedule.timeSlot?.start ?? "00:00:00",
          horarioFim: schedule.timeSlot?.end ?? "23:59:59",
          repeticao: null,
          turmas: [{ id: schedule.groupId }],
          diarios: [{ id: schedule.diaryId }],
          perfis: [{ id: schedule.teacherId }],
          ambientes: schedule.roomId ? [{ id: schedule.roomId }] : [],
        },
        dadosAnteriores: null,
        dateCreated: getNowISO(),
      });
    }

    return { gerarHorario: domain, sessaoEdicaoId: sessao.id };
  }

  private extrairSchedules(
    respostaGerador: Record<string, unknown> | null,
  ): TimetableGridSchedule[] {
    if (!respostaGerador) return [];

    const resposta = respostaGerador as unknown as ServiceGenerateResponse;
    const timetable = resposta.resultSuccess?.generatedTimetables?.[0]?.timetable;

    return timetable?.schedules ?? [];
  }
}
