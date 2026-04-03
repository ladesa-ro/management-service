import { ConflictException } from "@nestjs/common";
import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { CalendarioLetivo } from "@/modules/calendario/letivo/domain/calendario-letivo";
import { ICalendarioLetivoFindOneQueryHandler } from "@/modules/calendario/letivo/domain/queries/calendario-letivo-find-one.query.handler.interface";
import { Diario } from "@/modules/ensino/diario/domain/diario";
import { Disciplina } from "@/modules/ensino/disciplina/domain/disciplina";
import { IDisciplinaFindOneQueryHandler } from "@/modules/ensino/disciplina/domain/queries/disciplina-find-one.query.handler.interface";
import { ITurmaFindOneQueryHandler } from "@/modules/ensino/turma/domain/queries/turma-find-one.query.handler.interface";
import { Turma } from "@/modules/ensino/turma/domain/turma";
import { IDiarioPermissionChecker } from "../../domain/authorization";
import type { DiarioBatchCreateCommand } from "../../domain/commands/diario-batch-create.command";
import { IDiarioBatchCreateCommandHandler } from "../../domain/commands/diario-batch-create.command.handler.interface";
import type { DiarioFindOneQueryResult } from "../../domain/queries";
import {
  IDiarioPreferenciaAgrupamentoRepository,
  IDiarioProfessorRepository,
  IDiarioRepository,
} from "../../domain/repositories";

@Impl()
export class DiarioBatchCreateCommandHandlerImpl implements IDiarioBatchCreateCommandHandler {
  constructor(
    @Dep(IDiarioRepository)
    private readonly diarioRepository: IDiarioRepository,
    @Dep(IDiarioProfessorRepository)
    private readonly diarioProfessorRepository: IDiarioProfessorRepository,
    @Dep(IDiarioPreferenciaAgrupamentoRepository)
    private readonly diarioPreferenciaAgrupamentoRepository: IDiarioPreferenciaAgrupamentoRepository,
    @Dep(IDiarioPermissionChecker) readonly _permissionChecker: IDiarioPermissionChecker,
    @Dep(ICalendarioLetivoFindOneQueryHandler)
    private readonly calendarioLetivoFindOneHandler: ICalendarioLetivoFindOneQueryHandler,
    @Dep(ITurmaFindOneQueryHandler)
    private readonly turmaFindOneHandler: ITurmaFindOneQueryHandler,
    @Dep(IDisciplinaFindOneQueryHandler)
    private readonly disciplinaFindOneHandler: IDisciplinaFindOneQueryHandler,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: DiarioBatchCreateCommand,
  ): Promise<DiarioFindOneQueryResult[]> {
    // Validar turma
    const turma = await this.turmaFindOneHandler.execute(accessContext, { id: dto.turma.id });
    ensureExists(turma, Turma.entityName, dto.turma.id);

    // Validar calendario letivo
    const calendarioLetivo = await this.calendarioLetivoFindOneHandler.execute(accessContext, {
      id: dto.calendarioLetivo.id,
    });
    ensureExists(calendarioLetivo, CalendarioLetivo.entityName, dto.calendarioLetivo.id);

    // Validar todas as disciplinas e checar unicidade antes de criar qualquer diario
    for (const item of dto.diarios) {
      const disciplina = await this.disciplinaFindOneHandler.execute(accessContext, {
        id: item.disciplina.id,
      });
      ensureExists(disciplina, Disciplina.entityName, item.disciplina.id);

      // Checar unicidade
      const existing = await this.diarioRepository.getFindAllQueryResult(accessContext, {
        "filter.turma.id": [turma.id],
        "filter.disciplina.id": [disciplina.id],
        "filter.calendarioLetivo.id": [calendarioLetivo.id],
        limit: 1,
      });

      if (existing.data.length > 0) {
        throw new ConflictException(
          `Já existe um diário para a disciplina "${disciplina.nome}" com a turma e calendário letivo informados.`,
        );
      }
    }

    // Criar todos os diarios
    const results: DiarioFindOneQueryResult[] = [];

    for (const item of dto.diarios) {
      // Criar diario base
      const domain = Diario.create({
        ativo: item.ativo,
        calendarioLetivo: { id: calendarioLetivo.id },
        turma: { id: turma.id },
        disciplina: { id: item.disciplina.id },
        ambientePadrao: null,
      });

      await this.diarioRepository.save(domain);

      // Criar professores
      if (item.professores.length > 0) {
        await this.diarioProfessorRepository.bulkCreate(
          item.professores.map((p) => ({
            diarioId: domain.id,
            perfilId: p.perfilId,
            situacao: p.situacao,
          })),
        );
      }

      // Criar preferencias de agrupamento
      if (item.preferenciasAgrupamento.length > 0) {
        await this.diarioPreferenciaAgrupamentoRepository.bulkCreate(
          item.preferenciasAgrupamento.map((p) => ({
            diarioId: domain.id,
            modo: p.modo,
            ordem: p.ordem,
            dataInicio: p.dataInicio,
            dataFim: p.dataFim,
            diaSemanaIso: p.diaSemanaIso,
            aulasSeguidas: p.aulasSeguidas,
          })),
        );
      }

      // Buscar resultado completo com relacoes
      const result = await this.diarioRepository.getFindOneQueryResult(accessContext, {
        id: domain.id,
      });
      ensureExists(result, Diario.entityName, domain.id);
      results.push(result);
    }

    return results;
  }
}
