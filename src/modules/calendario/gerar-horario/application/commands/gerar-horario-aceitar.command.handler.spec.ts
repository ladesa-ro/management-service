import { describe, expect, it, vi } from "vitest";
import { createTestAccessContext, createTestId } from "@/test/helpers";
import { GerarHorario } from "../../domain/gerar-horario";
import { GerarHorarioAceitarCommandHandlerImpl } from "./gerar-horario-aceitar.command.handler";

function criarGerarHorarioComSucesso(respostaGerador: Record<string, unknown>): GerarHorario {
  const domain = GerarHorario.create({ dataInicio: "2026-03-01" });
  domain.markAsPendente({});
  domain.markAsSucesso(respostaGerador);
  return domain;
}

function respostaComSchedules(
  schedules: Array<{
    date: string;
    diaryId: string;
    teacherId: string;
    groupId: string;
    timeSlot: { start: string; end: string };
    roomId?: string;
  }>,
): Record<string, unknown> {
  return {
    requestId: createTestId(),
    isSuccessful: true,
    resultSuccess: {
      requestId: createTestId(),
      generatedTimetables: [
        {
          timetable: {
            dateStart: "2026-03-01",
            dateEnd: "2026-07-01",
            timeSlots: [],
            schedules,
          },
          score: 0,
        },
      ],
    },
  };
}

function createHandler() {
  const gerarHorarioRepository = {
    loadById: vi.fn(),
    save: vi.fn().mockResolvedValue(undefined),
  };
  const sessaoRepository = {
    findById: vi.fn(),
    save: vi.fn(async (entity: unknown) => entity),
  };
  const mudancaRepository = {
    save: vi.fn(async (entity: unknown) => entity),
    findById: vi.fn(),
    findBySessaoId: vi.fn(),
  };

  const handler = new GerarHorarioAceitarCommandHandlerImpl(
    gerarHorarioRepository as any,
    sessaoRepository as any,
    mudancaRepository as any,
  );

  return { handler, gerarHorarioRepository, sessaoRepository, mudancaRepository };
}

describe("GerarHorarioAceitarCommandHandlerImpl", () => {
  it("should accept the request, open an edit session, and create one CRIAR mudanca per schedule", async () => {
    const turmaId = createTestId();
    const diarioId = createTestId();
    const professorId = createTestId();
    const ambienteId = createTestId();

    const domain = criarGerarHorarioComSucesso(
      respostaComSchedules([
        {
          date: "2026-03-02T00:00:00Z",
          diaryId: diarioId,
          teacherId: professorId,
          groupId: turmaId,
          timeSlot: { start: "08:00:00", end: "09:40:00" },
          roomId: ambienteId,
        },
        {
          date: "2026-03-04T00:00:00Z",
          diaryId: diarioId,
          teacherId: professorId,
          groupId: turmaId,
          timeSlot: { start: "08:00:00", end: "09:40:00" },
          roomId: ambienteId,
        },
      ]),
    );

    const { handler, gerarHorarioRepository, sessaoRepository, mudancaRepository } =
      createHandler();
    gerarHorarioRepository.loadById.mockResolvedValue(domain);

    const resultado = await handler.execute(createTestAccessContext(), { id: domain.id });

    expect(resultado.gerarHorario.status).toBe("ACEITO");
    expect(gerarHorarioRepository.save).toHaveBeenCalledWith(domain);

    expect(sessaoRepository.save).toHaveBeenCalledOnce();
    expect(resultado.sessaoEdicaoId).toBeDefined();

    expect(mudancaRepository.save).toHaveBeenCalledTimes(2);

    const primeiraMudanca = mudancaRepository.save.mock.calls[0][0] as any;
    expect(primeiraMudanca.tipoOperacao).toBe("CRIAR");
    expect(primeiraMudanca.dadosAnteriores).toBeNull();
    expect(primeiraMudanca.sessao.id).toBe(resultado.sessaoEdicaoId);
    expect(primeiraMudanca.dados).toMatchObject({
      dataInicio: "2026-03-02",
      dataFim: "2026-03-02",
      horarioInicio: "08:00:00",
      horarioFim: "09:40:00",
      diaInteiro: false,
      repeticao: null,
      turmas: [{ id: turmaId }],
      diarios: [{ id: diarioId }],
      perfis: [{ id: professorId }],
      ambientes: [{ id: ambienteId }],
    });
  });

  it("should default ambientes to an empty array when the schedule has no roomId", async () => {
    const domain = criarGerarHorarioComSucesso(
      respostaComSchedules([
        {
          date: "2026-03-02T00:00:00Z",
          diaryId: createTestId(),
          teacherId: createTestId(),
          groupId: createTestId(),
          timeSlot: { start: "08:00:00", end: "09:40:00" },
        },
      ]),
    );

    const { handler, gerarHorarioRepository, mudancaRepository } = createHandler();
    gerarHorarioRepository.loadById.mockResolvedValue(domain);

    await handler.execute(createTestAccessContext(), { id: domain.id });

    const mudanca = mudancaRepository.save.mock.calls[0][0] as any;
    expect(mudanca.dados.ambientes).toEqual([]);
  });

  it("should open a session with zero mudancas when there are no schedules", async () => {
    const domain = criarGerarHorarioComSucesso(respostaComSchedules([]));

    const { sessaoRepository, mudancaRepository } = createHandler();
    const gerarHorarioRepository = { loadById: vi.fn().mockResolvedValue(domain), save: vi.fn() };
    const handler = new GerarHorarioAceitarCommandHandlerImpl(
      gerarHorarioRepository as any,
      sessaoRepository as any,
      mudancaRepository as any,
    );

    const resultado = await handler.execute(createTestAccessContext(), { id: domain.id });

    expect(resultado.sessaoEdicaoId).toBeDefined();
    expect(mudancaRepository.save).not.toHaveBeenCalled();
  });

  it("should throw when the request does not exist", async () => {
    const { handler, gerarHorarioRepository } = createHandler();
    gerarHorarioRepository.loadById.mockResolvedValue(null);

    await expect(
      handler.execute(createTestAccessContext(), { id: createTestId() }),
    ).rejects.toThrow();
  });

  it("should throw when the request is not in SUCESSO status", async () => {
    const domain = GerarHorario.create({ dataInicio: "2026-03-01" });

    const { handler, gerarHorarioRepository } = createHandler();
    gerarHorarioRepository.loadById.mockResolvedValue(domain);

    await expect(handler.execute(createTestAccessContext(), { id: domain.id })).rejects.toThrow();
  });
});
