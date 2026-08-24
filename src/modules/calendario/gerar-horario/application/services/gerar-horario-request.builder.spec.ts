import { describe, expect, it } from "bun:test";
import { GerarHorarioRequestBuilder } from "./gerar-horario-request.builder";

type Registro = Record<string, unknown>;

function conexaoFalsa(dados: Map<string, Registro[]>) {
  return {
    getRepository: (entidade: { name: string }) => ({
      find: async () => dados.get(entidade.name) ?? [],
    }),
  } as never;
}

const escopo = {
  dataInicio: "2026-03-02",
  dataTermino: "2026-03-15",
  calendarioLetivoIds: [],
  ofertaFormacaoIds: [],
};

describe("GerarHorarioRequestBuilder", () => {
  it("devolve pedido vazio quando não há turma", async () => {
    const builder = new GerarHorarioRequestBuilder(conexaoFalsa(new Map()));

    const pedido = await builder.build(escopo);

    expect(pedido.groups).toEqual([]);
    expect(pedido.diarys).toEqual([]);
    expect(pedido.teachers).toEqual([]);
    expect(pedido.previous_timetable_grid).toBeNull();
  });

  it("expande um diário por professor vinculado", async () => {
    const dados = new Map<string, Registro[]>([
      ["TurmaEntity", [{ id: "turma-1" }]],
      [
        "DiarioEntity",
        [{ id: "diario-1", turma: { id: "turma-1" }, disciplina: { id: "mat", cargaHoraria: 40 } }],
      ],
      [
        "DiarioProfessorEntity",
        [
          { diario: { id: "diario-1" }, perfil: { id: "prof-a" } },
          { diario: { id: "diario-1" }, perfil: { id: "prof-b" } },
        ],
      ],
    ]);

    const pedido = await new GerarHorarioRequestBuilder(conexaoFalsa(dados)).build(escopo);

    expect(pedido.diarys).toHaveLength(2);
    expect(pedido.teachers.map((t) => t.id).sort()).toEqual(["prof-a", "prof-b"]);
  });

  it("descarta diário sem professor vinculado", async () => {
    const dados = new Map<string, Registro[]>([
      ["TurmaEntity", [{ id: "turma-1" }]],
      [
        "DiarioEntity",
        [{ id: "diario-1", turma: { id: "turma-1" }, disciplina: { id: "mat", cargaHoraria: 40 } }],
      ],
    ]);

    const pedido = await new GerarHorarioRequestBuilder(conexaoFalsa(dados)).build(escopo);

    expect(pedido.diarys).toEqual([]);
  });

  it("deriva o limite semanal a partir da carga horária e do período", async () => {
    const dados = new Map<string, Registro[]>([
      ["TurmaEntity", [{ id: "turma-1" }]],
      [
        "DiarioEntity",
        [{ id: "diario-1", turma: { id: "turma-1" }, disciplina: { id: "mat", cargaHoraria: 40 } }],
      ],
      ["DiarioProfessorEntity", [{ diario: { id: "diario-1" }, perfil: { id: "prof-a" } }]],
    ]);

    const pedido = await new GerarHorarioRequestBuilder(conexaoFalsa(dados)).build(escopo);

    expect(pedido.diarys[0]?.remaining).toBe(40);
    expect(pedido.diarys[0]?.week_limit).toBe(20);
  });

  it("fixa aula existente quando diário, turma e professor são únicos", async () => {
    const dados = new Map<string, Registro[]>([
      ["TurmaEntity", [{ id: "turma-1" }]],
      [
        "DiarioEntity",
        [{ id: "diario-1", turma: { id: "turma-1" }, disciplina: { id: "mat", cargaHoraria: 40 } }],
      ],
      ["DiarioProfessorEntity", [{ diario: { id: "diario-1" }, perfil: { id: "prof-a" } }]],
      ["GradeHorariaEntity", [{ id: "grade-1", dataInicio: "2026-01-01", dataFim: null }]],
      ["GradeHorariaIntervaloEntity", [{ inicio: "07:00:00", fim: "07:50:00" }]],
      [
        "CalendarioAgendamentoEntity",
        [
          {
            id: "ag-1",
            tipo: "AULA",
            dataInicio: "2026-03-03",
            dataFim: null,
            diaInteiro: false,
            horarioInicio: "07:00:00",
            horarioFim: "07:50:00",
            repeticao: null,
          },
        ],
      ],
      [
        "CalendarioAgendamentoDiarioEntity",
        [{ calendarioAgendamento: { id: "ag-1" }, diario: { id: "diario-1" } }],
      ],
      [
        "CalendarioAgendamentoTurmaEntity",
        [{ calendarioAgendamento: { id: "ag-1" }, turma: { id: "turma-1" } }],
      ],
      [
        "CalendarioAgendamentoProfessorEntity",
        [{ calendarioAgendamento: { id: "ag-1" }, perfil: { id: "prof-a" } }],
      ],
    ]);

    const pedido = await new GerarHorarioRequestBuilder(conexaoFalsa(dados)).build(escopo);

    expect(pedido.fixed_schedules).toHaveLength(1);
    expect(pedido.fixed_schedules[0]?.diary_id).toBe("diario-1");
    expect(pedido.fixed_schedules[0]?.date).toBe("2026-03-03");
  });

  it("trata evento como indisponibilidade, não como aula fixa", async () => {
    const dados = new Map<string, Registro[]>([
      ["TurmaEntity", [{ id: "turma-1" }]],
      ["GradeHorariaEntity", [{ id: "grade-1", dataInicio: "2026-01-01", dataFim: null }]],
      ["GradeHorariaIntervaloEntity", [{ inicio: "07:00:00", fim: "07:50:00" }]],
      [
        "CalendarioAgendamentoEntity",
        [
          {
            id: "ag-2",
            tipo: "EVENTO",
            dataInicio: "2026-03-04",
            dataFim: null,
            diaInteiro: false,
            horarioInicio: "07:00:00",
            horarioFim: "07:50:00",
            repeticao: null,
          },
        ],
      ],
      [
        "CalendarioAgendamentoTurmaEntity",
        [{ calendarioAgendamento: { id: "ag-2" }, turma: { id: "turma-1" } }],
      ],
    ]);

    const pedido = await new GerarHorarioRequestBuilder(conexaoFalsa(dados)).build(escopo);

    expect(pedido.fixed_schedules).toEqual([]);
    expect(pedido.groups[0]?.availability.rules_unavailability).toHaveLength(1);
  });

  it("usa a preferência de agrupamento como limite semanal quando existe", async () => {
    const dados = new Map<string, Registro[]>([
      ["TurmaEntity", [{ id: "turma-1" }]],
      [
        "DiarioEntity",
        [{ id: "diario-1", turma: { id: "turma-1" }, disciplina: { id: "mat", cargaHoraria: 40 } }],
      ],
      ["DiarioProfessorEntity", [{ diario: { id: "diario-1" }, perfil: { id: "prof-a" } }]],
      [
        "DiarioPreferenciaAgrupamentoEntity",
        [
          { diario: { id: "diario-1" }, aulasSeguidas: 2 },
          { diario: { id: "diario-1" }, aulasSeguidas: 3 },
        ],
      ],
    ]);

    const pedido = await new GerarHorarioRequestBuilder(conexaoFalsa(dados)).build(escopo);

    expect(pedido.diarys[0]?.week_limit).toBe(5);
  });

  it("propaga a sala do diário, com a da turma como reserva", async () => {
    const dados = new Map<string, Registro[]>([
      ["TurmaEntity", [{ id: "turma-1" }]],
      [
        "DiarioEntity",
        [
          {
            id: "diario-1",
            turma: { id: "turma-1", ambientePadraoAula: { id: "sala-turma" } },
            disciplina: { id: "mat", cargaHoraria: 40 },
            ambientePadrao: { id: "lab-1" },
          },
          {
            id: "diario-2",
            turma: { id: "turma-1", ambientePadraoAula: { id: "sala-turma" } },
            disciplina: { id: "port", cargaHoraria: 40 },
            ambientePadrao: null,
          },
        ],
      ],
      [
        "DiarioProfessorEntity",
        [
          { diario: { id: "diario-1" }, perfil: { id: "prof-a" } },
          { diario: { id: "diario-2" }, perfil: { id: "prof-b" } },
        ],
      ],
    ]);

    const pedido = await new GerarHorarioRequestBuilder(conexaoFalsa(dados)).build(escopo);

    expect(pedido.diarys.find((d) => d.id === "diario-1")?.room_id).toBe("lab-1");
    expect(pedido.diarys.find((d) => d.id === "diario-2")?.room_id).toBe("sala-turma");
  });

  it("marca fim de semana como dia não letivo quando não há calendário", async () => {
    const dados = new Map<string, Registro[]>([["TurmaEntity", [{ id: "turma-1" }]]]);

    const pedido = await new GerarHorarioRequestBuilder(conexaoFalsa(dados)).build(escopo);

    expect(pedido.non_school_dates).toContain("2026-03-07");
    expect(pedido.non_school_dates).toContain("2026-03-08");
    expect(pedido.non_school_dates).not.toContain("2026-03-02");
  });

  it("transforma disponibilidade da turma em regras de indisponibilidade", async () => {
    const dados = new Map<string, Registro[]>([
      ["TurmaEntity", [{ id: "turma-1" }]],
      ["GradeHorariaEntity", [{ id: "grade-1", dataInicio: "2026-01-01", dataFim: null }]],
      [
        "GradeHorariaIntervaloEntity",
        [
          { inicio: "07:00:00", fim: "07:50:00" },
          { inicio: "07:50:00", fim: "08:40:00" },
        ],
      ],
      [
        "TurmaDisponibilidadeConfiguracaoEntity",
        [{ id: "cfg-1", turma: { id: "turma-1" }, dataInicio: "2026-03-02" }],
      ],
      [
        "TurmaDisponibilidadeConfiguracaoItemEntity",
        [
          {
            turmaDisponibilidadeConfiguracao: { id: "cfg-1" },
            diaSemana: 1,
            inicio: "07:00:00",
            fim: "07:50:00",
          },
        ],
      ],
    ]);

    const pedido = await new GerarHorarioRequestBuilder(conexaoFalsa(dados)).build(escopo);
    const regras = pedido.groups[0]?.availability.rules_unavailability ?? [];

    expect(regras).toHaveLength(13);
    expect(
      regras.some((r) => r.r_rule === "FREQ=WEEKLY;BYDAY=MO" && r.date_start.endsWith("07:00:00")),
    ).toBe(false);
    expect(
      regras.some((r) => r.r_rule === "FREQ=WEEKLY;BYDAY=MO" && r.date_start.endsWith("07:50:00")),
    ).toBe(true);
  });
});
