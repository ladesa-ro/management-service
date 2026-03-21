import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import {
  type HorarioAulaItem,
  type HorarioMescladoQuery,
  type HorarioSemanalDia,
  type HorarioSemanalQueryResult,
  IHorarioConsultaQueryHandler,
  type TurmaHorarioSemanalQuery,
  type UsuarioHorarioSemanalQuery,
} from "../../domain/queries";

@DeclareImplementation()
export class HorarioConsultaQueryHandlerImpl implements IHorarioConsultaQueryHandler {
  constructor(
    @DeclareDependency(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
  ) {}

  async findTurmaHorarioSemanal(
    _accessContext: AccessContext | null,
    query: TurmaHorarioSemanalQuery,
  ): Promise<HorarioSemanalQueryResult> {
    const { weekStart, weekEnd } = this.getWeekRange(query.semana);

    const rows = await this.appTypeormConnection.query(
      `
      SELECT
        ca.id,
        ca.data_inicio,
        ca.data_fim,
        ca.horario_inicio,
        ca.horario_fim,
        ca.nome,
        ca.cor,
        d.id AS diario_id,
        disc.id AS disciplina_id,
        disc.nome AS disciplina_nome,
        disc.nome_abreviado AS disciplina_nome_abreviado,
        t.id AS turma_id,
        t.periodo AS turma_periodo,
        amb.id AS ambiente_id,
        amb.nome AS ambiente_nome,
        amb.codigo AS ambiente_codigo
      FROM calendario_agendamento ca
      INNER JOIN calendario_agendamento_turma cat ON cat.id_calendario_agendamento_fk = ca.id
      LEFT JOIN calendario_agendamento_diario cad ON cad.id_calendario_agendamento_fk = ca.id
      LEFT JOIN diario d ON d.id = cad.id_diario_fk AND d.date_deleted IS NULL
      LEFT JOIN disciplina disc ON disc.id = d.id_disciplina_fk AND disc.date_deleted IS NULL
      LEFT JOIN turma t ON t.id = d.id_turma_fk AND t.date_deleted IS NULL
      LEFT JOIN calendario_agendamento_ambiente caa ON caa.id_calendario_agendamento_fk = ca.id
      LEFT JOIN ambiente amb ON amb.id = caa.id_ambiente_fk AND amb.date_deleted IS NULL
      WHERE cat.id_turma_fk = $1
        AND ca.tipo = 'AULA'
        AND ca.data_inicio <= $3
        AND (ca.data_fim IS NULL OR ca.data_fim >= $2)
        AND ca.status = 'ATIVO'
      ORDER BY ca.data_inicio, ca.horario_inicio
      `,
      [query.turmaId, weekStart, weekEnd],
    );

    const agendamentoIds = rows.map((r: Record<string, unknown>) => r.id).filter(Boolean);
    const professoresMap =
      agendamentoIds.length > 0
        ? await this.loadProfessores(agendamentoIds)
        : new Map<string, HorarioAulaItem["professores"]>();

    return this.buildResult(weekStart, weekEnd, rows, professoresMap);
  }

  async findUsuarioHorarioSemanal(
    _accessContext: AccessContext | null,
    query: UsuarioHorarioSemanalQuery,
  ): Promise<HorarioSemanalQueryResult> {
    const { weekStart, weekEnd } = this.getWeekRange(query.semana);

    const rows = await this.appTypeormConnection.query(
      `
      SELECT
        ca.id,
        ca.data_inicio,
        ca.data_fim,
        ca.horario_inicio,
        ca.horario_fim,
        ca.nome,
        ca.cor,
        d.id AS diario_id,
        disc.id AS disciplina_id,
        disc.nome AS disciplina_nome,
        disc.nome_abreviado AS disciplina_nome_abreviado,
        t.id AS turma_id,
        t.periodo AS turma_periodo,
        amb.id AS ambiente_id,
        amb.nome AS ambiente_nome,
        amb.codigo AS ambiente_codigo
      FROM calendario_agendamento ca
      INNER JOIN calendario_agendamento_professor cap ON cap.id_calendario_agendamento_fk = ca.id
      INNER JOIN perfil p ON p.id = cap.id_perfil_fk AND p.date_deleted IS NULL
      LEFT JOIN calendario_agendamento_diario cad ON cad.id_calendario_agendamento_fk = ca.id
      LEFT JOIN diario d ON d.id = cad.id_diario_fk AND d.date_deleted IS NULL
      LEFT JOIN disciplina disc ON disc.id = d.id_disciplina_fk AND disc.date_deleted IS NULL
      LEFT JOIN turma t ON t.id = d.id_turma_fk AND t.date_deleted IS NULL
      LEFT JOIN calendario_agendamento_ambiente caa ON caa.id_calendario_agendamento_fk = ca.id
      LEFT JOIN ambiente amb ON amb.id = caa.id_ambiente_fk AND amb.date_deleted IS NULL
      WHERE p.id_usuario_fk = $1
        AND ca.tipo = 'AULA'
        AND ca.data_inicio <= $3
        AND (ca.data_fim IS NULL OR ca.data_fim >= $2)
        AND ca.status = 'ATIVO'
      ORDER BY ca.data_inicio, ca.horario_inicio
      `,
      [query.usuarioId, weekStart, weekEnd],
    );

    const agendamentoIds = rows.map((r: Record<string, unknown>) => r.id).filter(Boolean);
    const professoresMap =
      agendamentoIds.length > 0
        ? await this.loadProfessores(agendamentoIds)
        : new Map<string, HorarioAulaItem["professores"]>();

    return this.buildResult(weekStart, weekEnd, rows, professoresMap);
  }

  async findHorarioMesclado(
    _accessContext: AccessContext | null,
    query: HorarioMescladoQuery,
  ): Promise<HorarioSemanalQueryResult> {
    const { weekStart, weekEnd } = this.getWeekRange(query.semana);

    if (query.turmaIds.length === 0) {
      return this.buildResult(weekStart, weekEnd, [], new Map());
    }

    const placeholders = query.turmaIds.map((_, i) => `$${i + 1}`).join(",");
    const params = [...query.turmaIds, weekStart, weekEnd];

    const rows = await this.appTypeormConnection.query(
      `
      SELECT DISTINCT ON (ca.id)
        ca.id,
        ca.data_inicio,
        ca.data_fim,
        ca.horario_inicio,
        ca.horario_fim,
        ca.nome,
        ca.cor,
        d.id AS diario_id,
        disc.id AS disciplina_id,
        disc.nome AS disciplina_nome,
        disc.nome_abreviado AS disciplina_nome_abreviado,
        t.id AS turma_id,
        t.periodo AS turma_periodo,
        amb.id AS ambiente_id,
        amb.nome AS ambiente_nome,
        amb.codigo AS ambiente_codigo
      FROM calendario_agendamento ca
      INNER JOIN calendario_agendamento_turma cat ON cat.id_calendario_agendamento_fk = ca.id
      LEFT JOIN calendario_agendamento_diario cad ON cad.id_calendario_agendamento_fk = ca.id
      LEFT JOIN diario d ON d.id = cad.id_diario_fk AND d.date_deleted IS NULL
      LEFT JOIN disciplina disc ON disc.id = d.id_disciplina_fk AND disc.date_deleted IS NULL
      LEFT JOIN turma t ON t.id = d.id_turma_fk AND t.date_deleted IS NULL
      LEFT JOIN calendario_agendamento_ambiente caa ON caa.id_calendario_agendamento_fk = ca.id
      LEFT JOIN ambiente amb ON amb.id = caa.id_ambiente_fk AND amb.date_deleted IS NULL
      WHERE cat.id_turma_fk IN (${placeholders})
        AND ca.tipo = 'AULA'
        AND ca.data_inicio <= $${params.length}
        AND (ca.data_fim IS NULL OR ca.data_fim >= $${params.length - 1})
        AND ca.status = 'ATIVO'
      ORDER BY ca.id, ca.data_inicio, ca.horario_inicio
      `,
      params,
    );

    const agendamentoIds = rows.map((r: Record<string, unknown>) => r.id).filter(Boolean);
    const professoresMap =
      agendamentoIds.length > 0
        ? await this.loadProfessores(agendamentoIds)
        : new Map<string, HorarioAulaItem["professores"]>();

    return this.buildResult(weekStart, weekEnd, rows, professoresMap);
  }

  private async loadProfessores(
    agendamentoIds: string[],
  ): Promise<Map<string, HorarioAulaItem["professores"]>> {
    const placeholders = agendamentoIds.map((_, i) => `$${i + 1}`).join(",");

    const profRows: Array<Record<string, unknown>> = await this.appTypeormConnection.query(
      `
      SELECT
        cap.id_calendario_agendamento_fk AS agendamento_id,
        dp.id AS diario_professor_id,
        p.id AS perfil_id,
        p.cargo AS perfil_cargo,
        u.id AS usuario_id,
        u.nome AS usuario_nome
      FROM calendario_agendamento_professor cap
      INNER JOIN perfil p ON p.id = cap.id_perfil_fk AND p.date_deleted IS NULL
      INNER JOIN usuario u ON u.id = p.id_usuario_fk AND u.date_deleted IS NULL
      LEFT JOIN calendario_agendamento_diario cad ON cad.id_calendario_agendamento_fk = cap.id_calendario_agendamento_fk
      LEFT JOIN diario_professor dp ON dp.id_diario_fk = cad.id_diario_fk AND dp.id_perfil_fk = p.id AND dp.date_deleted IS NULL
      WHERE cap.id_calendario_agendamento_fk IN (${placeholders})
      `,
      agendamentoIds,
    );

    const map = new Map<string, HorarioAulaItem["professores"]>();
    for (const row of profRows) {
      const agId = row.agendamento_id as string;
      if (!map.has(agId)) map.set(agId, []);
      map.get(agId)!.push({
        id: (row.diario_professor_id ?? row.perfil_id) as string,
        perfil: { id: row.perfil_id as string, cargo: row.perfil_cargo as string },
        usuario: { id: row.usuario_id as string, nome: row.usuario_nome as string | null },
      });
    }
    return map;
  }

  private getWeekRange(semana: string): { weekStart: string; weekEnd: string } {
    const date = new Date(semana);
    const day = date.getDay();
    const diff = day === 0 ? -6 : 1 - day;
    const monday = new Date(date);
    monday.setDate(date.getDate() + diff);
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);

    return {
      weekStart: monday.toISOString().split("T")[0],
      weekEnd: sunday.toISOString().split("T")[0],
    };
  }

  private buildResult(
    weekStart: string,
    weekEnd: string,
    rows: Array<Record<string, unknown>>,
    professoresMap: Map<string, HorarioAulaItem["professores"]>,
  ): HorarioSemanalQueryResult {
    const diasMap = new Map<string, HorarioSemanalDia>();

    // Initialize 7 days
    const start = new Date(weekStart);
    for (let i = 0; i < 7; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      const dateStr = d.toISOString().split("T")[0];
      diasMap.set(dateStr, {
        data: dateStr,
        diaSemana: d.getDay(),
        aulas: [],
      });
    }

    for (const row of rows) {
      const dataInicio = String(row.data_inicio).split("T")[0];

      const item: HorarioAulaItem = {
        id: row.id as string,
        dataInicio: dataInicio,
        dataFim: row.data_fim ? String(row.data_fim).split("T")[0] : null,
        horarioInicio: row.horario_inicio as string,
        horarioFim: row.horario_fim as string,
        nome: row.nome as string | null,
        cor: row.cor as string | null,
        diario: row.diario_id
          ? {
              id: row.diario_id as string,
              disciplina: {
                id: row.disciplina_id as string,
                nome: row.disciplina_nome as string,
                nomeAbreviado: row.disciplina_nome_abreviado as string,
              },
              turma: {
                id: row.turma_id as string,
                periodo: row.turma_periodo as number,
              },
            }
          : null,
        professores: professoresMap.get(row.id as string) ?? [],
        ambiente: row.ambiente_id
          ? {
              id: row.ambiente_id as string,
              nome: row.ambiente_nome as string,
              codigo: row.ambiente_codigo as string,
            }
          : null,
      };

      // For recurring events, add to each day in the week
      const dia = diasMap.get(dataInicio);
      if (dia) {
        dia.aulas.push(item);
      }
    }

    return {
      semanaInicio: weekStart,
      semanaFim: weekEnd,
      dias: Array.from(diasMap.values()),
    };
  }
}
