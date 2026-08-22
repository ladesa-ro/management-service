import { In, IsNull } from "typeorm";
import { Dep, Impl } from "@/domain/dependency-injection";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";
import { CursoEntity } from "@/modules/ensino/curso/infrastructure.database/typeorm/curso.typeorm.entity";
import { DiarioEntity } from "@/modules/ensino/diario/infrastructure.database/typeorm/diario.typeorm.entity";
import { DiarioPreferenciaAgrupamentoEntity } from "@/modules/ensino/diario/infrastructure.database/typeorm/diario-preferencia-agrupamento.typeorm.entity";
import { DiarioProfessorEntity } from "@/modules/ensino/diario/infrastructure.database/typeorm/diario-professor.typeorm.entity";
import { TurmaEntity } from "@/modules/ensino/turma/infrastructure.database/typeorm/turma.typeorm.entity";
import { CalendarioAgendamentoEntity } from "../../../agendamento/infrastructure.database/typeorm/calendario-agendamento.typeorm.entity";
import { CalendarioAgendamentoDiarioEntity } from "../../../agendamento/infrastructure.database/typeorm/calendario-agendamento-diario.typeorm.entity";
import { CalendarioAgendamentoProfessorEntity } from "../../../agendamento/infrastructure.database/typeorm/calendario-agendamento-professor.typeorm.entity";
import { CalendarioAgendamentoTurmaEntity } from "../../../agendamento/infrastructure.database/typeorm/calendario-agendamento-turma.typeorm.entity";
import { GradeHorariaEntity } from "../../../grade-horaria/infrastructure.database/typeorm/grade-horaria.typeorm.entity";
import { GradeHorariaIntervaloEntity } from "../../../grade-horaria/infrastructure.database/typeorm/grade-horaria-intervalo.typeorm.entity";
import { CalendarioLetivoDiaEntity } from "../../../letivo/infrastructure.database/typeorm/calendario-letivo-dia.typeorm.entity";
import { TurmaDisponibilidadeConfiguracaoEntity } from "../../../turmas/disponibilidade/infrastructure.database/typeorm/turma-disponibilidade-configuracao.typeorm.entity";
import { TurmaDisponibilidadeConfiguracaoItemEntity } from "../../../turmas/disponibilidade/infrastructure.database/typeorm/turma-disponibilidade-configuracao-item.typeorm.entity";
import { GerarHorarioStatus } from "../../domain/gerar-horario.types";
import { GerarHorarioEntity } from "../../infrastructure.database/typeorm/gerar-horario.typeorm.entity";

export interface IGerarHorarioRequestEscopo {
  dataInicio: string;
  dataTermino: string;
  calendarioLetivoIds: string[];
  ofertaFormacaoIds: string[];
}

export interface IIntervaloHorario {
  start: string;
  end: string;
}

interface IRegraIndisponibilidade {
  r_rule: string;
  date_start: string;
  date_end: string | null;
}

interface IDisponibilidade {
  rules_unavailability: IRegraIndisponibilidade[];
}

export interface IAulaFixa {
  group_id: string;
  diary_id: string;
  teacher_id: string;
  date: string;
  time_slot: IIntervaloHorario;
}

export interface IGerarHorarioRequestPayload {
  date_start: string;
  date_end: string;
  time_slots: IIntervaloHorario[];
  groups: { id: string; availability: IDisponibilidade }[];
  teachers: { id: string; availability: IDisponibilidade }[];
  diarys: {
    id: string;
    group_id: string;
    teacher_id: string;
    subject_id: string;
    week_limit: number;
    remaining: number;
    room_id?: string;
  }[];
  previous_timetable_grid: unknown;
  fixed_schedules: IAulaFixa[];
  non_school_dates: string[];
}

const DIAS_ISO_PARA_ICAL = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"] as const;

@Impl()
export class GerarHorarioRequestBuilder {
  constructor(
    @Dep(IAppTypeormConnection)
    private readonly conexao: IAppTypeormConnection,
  ) {}

  async build(escopo: IGerarHorarioRequestEscopo): Promise<IGerarHorarioRequestPayload> {
    const turmas = await this.#carregarTurmas(escopo.ofertaFormacaoIds);
    const turmaIds = turmas.map((turma) => turma.id);

    const diarios = await this.#carregarDiarios(turmaIds, escopo.calendarioLetivoIds);
    const professoresPorDiario = await this.#carregarProfessores(diarios.map((d) => d.id));

    const horarios = await this.#carregarHorarios(escopo.dataInicio);
    const disponibilidadePorTurma = await this.#carregarDisponibilidades(turmaIds, horarios);

    const semanas = this.#contarSemanas(escopo.dataInicio, escopo.dataTermino);

    const ocupacao = await this.#carregarOcupacao(escopo, turmaIds, horarios);
    const diasNaoLetivos = await this.#carregarDiasNaoLetivos(escopo);
    const gradeAnterior = await this.#carregarGradeAnterior();

    const agrupamentoPorDiario = await this.#carregarAgrupamentos(diarios.map((d) => d.id));

    const diarysExpandidos = diarios.flatMap((diario) => {
      const professores = professoresPorDiario.get(diario.id) ?? [];

      if (professores.length === 0) {
        return [];
      }

      const totalAulas = diario.disciplina?.cargaHoraria ?? 0;
      const porPreferencia = agrupamentoPorDiario.get(diario.id);
      const sala = diario.ambientePadrao?.id ?? diario.turma?.ambientePadraoAula?.id;

      return professores.map((professorId) => ({
        id: diario.id,
        group_id: diario.turma.id,
        teacher_id: professorId,
        subject_id: diario.disciplina.id,
        week_limit: porPreferencia ?? Math.max(1, Math.ceil(totalAulas / semanas)),
        remaining: totalAulas,
        ...(sala ? { room_id: sala } : {}),
      }));
    });

    const professoresUsados = [...new Set(diarysExpandidos.map((d) => d.teacher_id))];

    return {
      date_start: escopo.dataInicio,
      date_end: escopo.dataTermino,
      time_slots: horarios,
      groups: turmas.map((turma) => ({
        id: turma.id,
        availability: {
          rules_unavailability: [
            ...(disponibilidadePorTurma.get(turma.id)?.rules_unavailability ?? []),
            ...(ocupacao.porTurma.get(turma.id) ?? []),
          ],
        },
      })),
      teachers: professoresUsados.map((id) => ({
        id,
        availability: { rules_unavailability: ocupacao.porProfessor.get(id) ?? [] },
      })),
      diarys: diarysExpandidos,
      previous_timetable_grid: gradeAnterior,
      non_school_dates: diasNaoLetivos,
      fixed_schedules: ocupacao.aulasFixas.filter((aula) =>
        diarysExpandidos.some(
          (diario) => diario.id === aula.diary_id && diario.teacher_id === aula.teacher_id,
        ),
      ),
    };
  }

  async #carregarTurmas(ofertaFormacaoIds: string[]): Promise<TurmaEntity[]> {
    const repo = this.conexao.getRepository(TurmaEntity);

    if (ofertaFormacaoIds.length === 0) {
      return repo.find({ where: { dateDeleted: IsNull() } });
    }

    const cursos = await this.conexao.getRepository(CursoEntity).find({
      where: { ofertaFormacao: { id: In(ofertaFormacaoIds) }, dateDeleted: IsNull() },
      relations: { ofertaFormacao: true },
    });

    if (cursos.length === 0) {
      return [];
    }

    return repo.find({
      where: { curso: { id: In(cursos.map((curso) => curso.id)) }, dateDeleted: IsNull() },
      relations: { curso: true },
    });
  }

  async #carregarDiarios(
    turmaIds: string[],
    calendarioLetivoIds: string[],
  ): Promise<DiarioEntity[]> {
    if (turmaIds.length === 0) {
      return [];
    }

    const repo = this.conexao.getRepository(DiarioEntity);

    const where: Record<string, unknown> = {
      turma: { id: In(turmaIds) },
      ativo: true,
      dateDeleted: IsNull(),
    };

    if (calendarioLetivoIds.length > 0) {
      where.calendarioLetivo = { id: In(calendarioLetivoIds) };
    }

    return repo.find({
      where,
      relations: { turma: { ambientePadraoAula: true }, disciplina: true, ambientePadrao: true },
    });
  }

  async #carregarProfessores(diarioIds: string[]): Promise<Map<string, string[]>> {
    const porDiario = new Map<string, string[]>();

    if (diarioIds.length === 0) {
      return porDiario;
    }

    const vinculos = await this.conexao.getRepository(DiarioProfessorEntity).find({
      where: { diario: { id: In(diarioIds) }, situacao: true, dateDeleted: IsNull() },
      relations: { diario: true, perfil: true },
    });

    for (const vinculo of vinculos) {
      const atuais = porDiario.get(vinculo.diario.id) ?? [];
      atuais.push(vinculo.perfil.id);
      porDiario.set(vinculo.diario.id, atuais);
    }

    return porDiario;
  }

  async #carregarAgrupamentos(diarioIds: string[]): Promise<Map<string, number>> {
    const porDiario = new Map<string, number>();

    if (diarioIds.length === 0) {
      return porDiario;
    }

    const preferencias = await this.conexao.getRepository(DiarioPreferenciaAgrupamentoEntity).find({
      where: { diario: { id: In(diarioIds) } },
      relations: { diario: true },
    });

    for (const preferencia of preferencias) {
      const atual = porDiario.get(preferencia.diario.id) ?? 0;
      porDiario.set(preferencia.diario.id, atual + preferencia.aulasSeguidas);
    }

    return porDiario;
  }

  async #carregarHorarios(dataInicio: string): Promise<IIntervaloHorario[]> {
    const grades = await this.conexao.getRepository(GradeHorariaEntity).find({
      where: { ativo: true, dateDeleted: IsNull() },
      order: { dataInicio: "DESC" },
    });

    const vigente =
      grades.find(
        (grade) =>
          grade.dataInicio <= dataInicio && (grade.dataFim === null || grade.dataFim >= dataInicio),
      ) ?? grades[0];

    if (!vigente) {
      return [];
    }

    const intervalos = await this.conexao.getRepository(GradeHorariaIntervaloEntity).find({
      where: { gradeHoraria: { id: vigente.id } },
      relations: { gradeHoraria: true },
    });

    return intervalos
      .map((intervalo) => ({ start: intervalo.inicio, end: intervalo.fim }))
      .sort((a, b) => a.start.localeCompare(b.start));
  }

  async #carregarDisponibilidades(
    turmaIds: string[],
    horarios: IIntervaloHorario[],
  ): Promise<Map<string, IDisponibilidade>> {
    const porTurma = new Map<string, IDisponibilidade>();

    if (turmaIds.length === 0 || horarios.length === 0) {
      return porTurma;
    }

    const configuracoes = await this.conexao
      .getRepository(TurmaDisponibilidadeConfiguracaoEntity)
      .find({
        where: { turma: { id: In(turmaIds) }, ativo: true, dateDeleted: IsNull() },
        relations: { turma: true },
      });

    if (configuracoes.length === 0) {
      return porTurma;
    }

    const itens = await this.conexao
      .getRepository(TurmaDisponibilidadeConfiguracaoItemEntity)
      .find({
        where: {
          turmaDisponibilidadeConfiguracao: { id: In(configuracoes.map((c) => c.id)) },
        },
        relations: { turmaDisponibilidadeConfiguracao: true },
      });

    for (const configuracao of configuracoes) {
      const disponiveis = itens.filter(
        (item) => item.turmaDisponibilidadeConfiguracao.id === configuracao.id,
      );

      porTurma.set(configuracao.turma.id, {
        rules_unavailability: this.#complementar(disponiveis, horarios, configuracao.dataInicio),
      });
    }

    return porTurma;
  }

  #complementar(
    disponiveis: TurmaDisponibilidadeConfiguracaoItemEntity[],
    horarios: IIntervaloHorario[],
    dataInicio: string,
  ): IRegraIndisponibilidade[] {
    const regras: IRegraIndisponibilidade[] = [];

    for (let diaIso = 1; diaIso <= 7; diaIso++) {
      const janelas = disponiveis.filter((item) => item.diaSemana === diaIso);

      for (const horario of horarios) {
        const coberto = janelas.some(
          (janela) => janela.inicio <= horario.start && janela.fim >= horario.end,
        );

        if (coberto) {
          continue;
        }

        regras.push({
          r_rule: `FREQ=WEEKLY;BYDAY=${DIAS_ISO_PARA_ICAL[diaIso - 1]}`,
          date_start: `${dataInicio.slice(0, 10)}T${horario.start}`,
          date_end: `${dataInicio.slice(0, 10)}T${horario.end}`,
        });
      }
    }

    return regras;
  }

  async #carregarOcupacao(
    escopo: IGerarHorarioRequestEscopo,
    turmaIds: string[],
    horarios: IIntervaloHorario[],
  ): Promise<{
    porTurma: Map<string, IRegraIndisponibilidade[]>;
    porProfessor: Map<string, IRegraIndisponibilidade[]>;
    aulasFixas: IAulaFixa[];
  }> {
    const porTurma = new Map<string, IRegraIndisponibilidade[]>();
    const porProfessor = new Map<string, IRegraIndisponibilidade[]>();
    const aulasFixas: IAulaFixa[] = [];

    const agendamentos = await this.conexao.getRepository(CalendarioAgendamentoEntity).find({
      where: { dateDeleted: IsNull() },
    });

    const vigentes = agendamentos.filter(
      (agendamento) =>
        agendamento.dataInicio <= escopo.dataTermino &&
        (agendamento.dataFim === null || agendamento.dataFim >= escopo.dataInicio),
    );

    if (vigentes.length === 0) {
      return { porTurma, porProfessor, aulasFixas };
    }

    const ids = vigentes.map((agendamento) => agendamento.id);
    const [porDiario, porProfessorVinculo, porTurmaVinculo] = await Promise.all([
      this.conexao.getRepository(CalendarioAgendamentoDiarioEntity).find({
        where: { calendarioAgendamento: { id: In(ids) } },
        relations: { calendarioAgendamento: true, diario: true },
      }),
      this.conexao.getRepository(CalendarioAgendamentoProfessorEntity).find({
        where: { calendarioAgendamento: { id: In(ids) } },
        relations: { calendarioAgendamento: true, perfil: true },
      }),
      this.conexao.getRepository(CalendarioAgendamentoTurmaEntity).find({
        where: { calendarioAgendamento: { id: In(ids) } },
        relations: { calendarioAgendamento: true, turma: true },
      }),
    ]);

    for (const agendamento of vigentes) {
      const intervalo = this.#encaixar(agendamento, horarios);

      if (!intervalo) {
        continue;
      }

      const turmasDo = porTurmaVinculo
        .filter((v) => v.calendarioAgendamento.id === agendamento.id)
        .map((v) => v.turma.id)
        .filter((id) => turmaIds.includes(id));

      const professoresDo = porProfessorVinculo
        .filter((v) => v.calendarioAgendamento.id === agendamento.id)
        .map((v) => v.perfil.id);

      const diariosDo = porDiario
        .filter((v) => v.calendarioAgendamento.id === agendamento.id)
        .map((v) => v.diario.id);

      const ehAula = agendamento.tipo === "AULA";
      const fixavel =
        ehAula && diariosDo.length === 1 && turmasDo.length === 1 && professoresDo.length === 1;

      if (fixavel) {
        aulasFixas.push({
          group_id: turmasDo[0] as string,
          diary_id: diariosDo[0] as string,
          teacher_id: professoresDo[0] as string,
          date: agendamento.dataInicio.slice(0, 10),
          time_slot: intervalo,
        });
        continue;
      }

      const regra = this.#regraDe(agendamento, intervalo);

      for (const turmaId of turmasDo) {
        porTurma.set(turmaId, [...(porTurma.get(turmaId) ?? []), regra]);
      }

      for (const professorId of professoresDo) {
        porProfessor.set(professorId, [...(porProfessor.get(professorId) ?? []), regra]);
      }
    }

    return { porTurma, porProfessor, aulasFixas };
  }

  #encaixar(
    agendamento: CalendarioAgendamentoEntity,
    horarios: IIntervaloHorario[],
  ): IIntervaloHorario | null {
    if (agendamento.diaInteiro) {
      return horarios[0] ?? null;
    }

    return (
      horarios.find(
        (horario) =>
          horario.start >= agendamento.horarioInicio && horario.end <= agendamento.horarioFim,
      ) ?? null
    );
  }

  #regraDe(
    agendamento: CalendarioAgendamentoEntity,
    intervalo: IIntervaloHorario,
  ): IRegraIndisponibilidade {
    const data = agendamento.dataInicio.slice(0, 10);

    return {
      r_rule: agendamento.repeticao ?? "",
      date_start: `${data}T${agendamento.diaInteiro ? "00:00:00" : intervalo.start}`,
      date_end: `${data}T${agendamento.diaInteiro ? "23:59:59" : intervalo.end}`,
    };
  }

  async #carregarDiasNaoLetivos(escopo: IGerarHorarioRequestEscopo): Promise<string[]> {
    const dias = await this.conexao.getRepository(CalendarioLetivoDiaEntity).find({
      where:
        escopo.calendarioLetivoIds.length > 0
          ? { calendario: { id: In(escopo.calendarioLetivoIds) } }
          : {},
      relations: { calendario: true },
    });

    const cadastrados = new Map<string, boolean>();

    for (const dia of dias) {
      const data = dia.data.slice(0, 10);

      if (data < escopo.dataInicio.slice(0, 10) || data > escopo.dataTermino.slice(0, 10)) {
        continue;
      }

      cadastrados.set(data, dia.diaLetivo && cadastrados.get(data) !== false);
    }

    const naoLetivos: string[] = [];
    const inicio = new Date(`${escopo.dataInicio.slice(0, 10)}T00:00:00Z`);
    const fim = new Date(`${escopo.dataTermino.slice(0, 10)}T00:00:00Z`);

    for (let dia = new Date(inicio); dia <= fim; dia.setUTCDate(dia.getUTCDate() + 1)) {
      const data = dia.toISOString().slice(0, 10);
      const registrado = cadastrados.get(data);
      const fimDeSemana = dia.getUTCDay() === 0 || dia.getUTCDay() === 6;

      if (registrado === false || (registrado === undefined && fimDeSemana)) {
        naoLetivos.push(data);
      }
    }

    return naoLetivos;
  }

  async #carregarGradeAnterior(): Promise<unknown> {
    const aceitas = await this.conexao.getRepository(GerarHorarioEntity).find({
      where: { status: GerarHorarioStatus.ACEITO },
      order: { dateCreated: "DESC" },
      take: 1,
    });

    const resposta = aceitas[0]?.respostaGerador as Record<string, unknown> | null | undefined;

    if (!resposta) {
      return null;
    }

    const sucesso = resposta.resultSuccess as Record<string, unknown> | undefined;
    const grades = sucesso?.generatedTimetables as { timetable?: unknown }[] | undefined;

    return grades?.[0]?.timetable ?? null;
  }

  #contarSemanas(dataInicio: string, dataTermino: string): number {
    const inicio = new Date(`${dataInicio.slice(0, 10)}T00:00:00Z`).getTime();
    const termino = new Date(`${dataTermino.slice(0, 10)}T00:00:00Z`).getTime();
    const dias = Math.max(1, Math.ceil((termino - inicio) / 86400000) + 1);

    return Math.max(1, Math.ceil(dias / 7));
  }
}
