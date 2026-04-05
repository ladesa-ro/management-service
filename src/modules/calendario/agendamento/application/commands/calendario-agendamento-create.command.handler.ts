import { BadRequestException } from "@nestjs/common";
import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { ICalendarioAgendamentoPermissionChecker } from "../../domain/authorization";
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
    @Dep(ICalendarioAgendamentoPermissionChecker)
    private readonly permissionChecker: ICalendarioAgendamentoPermissionChecker,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: CalendarioAgendamentoCreateCommand,
  ): Promise<CalendarioAgendamentoFindOneQueryResult> {
    await this.permissionChecker.ensureCanCreate(accessContext, { dto });

    // Verificar conflitos de horario se ha dados suficientes
    const turmaIds = (dto.turmas ?? []).map((t) => t.id);
    const perfilIds = (dto.perfis ?? []).map((p) => p.id);
    const ambienteIds = (dto.ambientes ?? []).map((a) => a.id);

    // Quando dia inteiro, forçar horários para cobrir o dia completo
    let effectiveHorarioInicio = dto.horarioInicio;
    let effectiveHorarioFim = dto.horarioFim;

    if (dto.diaInteiro) {
      effectiveHorarioInicio = "00:00:00";
      effectiveHorarioFim = "23:59:59";
    }

    if (
      effectiveHorarioInicio &&
      effectiveHorarioFim &&
      (turmaIds.length > 0 || perfilIds.length > 0 || ambienteIds.length > 0)
    ) {
      const conflicts = await this.repository.findConflicting({
        dataInicio: dto.dataInicio,
        dataFim: dto.dataFim ?? null,
        horarioInicio: effectiveHorarioInicio,
        horarioFim: effectiveHorarioFim,
        turmaIds,
        perfilIds,
        ambienteIds,
      });

      if (conflicts.length > 0) {
        const descricoes = conflicts.map(
          (c) => `${c.recurso} (${c.recursoId}) no agendamento ${c.identificadorExterno}`,
        );
        throw new BadRequestException(
          `Conflito de horário detectado. Os seguintes recursos já possuem agendamento no mesmo período: ${descricoes.join("; ")}.`,
        );
      }
    }

    const { nome, cor, ...domainData } = dto;
    const domain = CalendarioAgendamento.create(domainData);

    // Criar metadata (nome/cor) na tabela separada
    const metadata = CalendarioAgendamentoMetadata.create({
      identificadorExternoCalendarioAgendamento: domain.identificadorExterno,
      nome,
      cor,
    });

    await this.repository.save(domain);
    await this.repository.saveMetadata(metadata);

    const result = await this.repository.getFindOneQueryResult(accessContext, domain.id);
    ensureExists(result, CalendarioAgendamento.entityName, domain.id);

    return result;
  }
}
