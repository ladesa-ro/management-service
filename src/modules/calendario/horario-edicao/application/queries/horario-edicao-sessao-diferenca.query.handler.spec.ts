import { describe, expect, it, vi } from "vitest";
import { ResourceNotFoundError } from "@/application/errors/application.error";
import type { CalendarioAgendamentoFindOneQueryResult } from "@/modules/calendario/agendamento/domain/queries/calendario-agendamento-find-one.query.result";
import type { ICalendarioAgendamentoRepository } from "@/modules/calendario/agendamento/domain/repositories/calendario-agendamento.repository.interface";
import {
  createMockAgendamentoRepository,
  createTestAccessContext,
  createTestId,
} from "@/test/helpers";
import {
  HorarioEdicaoMudancaTipoOperacao,
  HorarioEdicaoSessaoStatus,
  type IHorarioEdicaoMudanca,
  type IHorarioEdicaoSessao,
} from "../../domain/horario-edicao.types";
import type { IHorarioEdicaoMudancaRepository } from "../../domain/repositories/horario-edicao-mudanca.repository.interface";
import type { IHorarioEdicaoSessaoRepository } from "../../domain/repositories/horario-edicao-sessao.repository.interface";
import { HorarioEdicaoSessaoDiferencaQueryHandlerImpl } from "./horario-edicao-sessao-diferenca.query.handler";

function createMockSessaoRepository() {
  return {
    findById: vi.fn(),
    save: vi.fn(),
  } as unknown as IHorarioEdicaoSessaoRepository & { findById: ReturnType<typeof vi.fn> };
}

function createMockMudancaRepository() {
  return {
    save: vi.fn(),
    findById: vi.fn(),
    findBySessaoId: vi.fn(),
  } as unknown as IHorarioEdicaoMudancaRepository & { findBySessaoId: ReturnType<typeof vi.fn> };
}

function createSessao(overrides: Partial<IHorarioEdicaoSessao> = {}): IHorarioEdicaoSessao {
  return {
    id: createTestId(),
    status: HorarioEdicaoSessaoStatus.ABERTA,
    usuario: { id: createTestId() },
    dateCreated: "2026-01-01T00:00:00.000Z",
    dateUpdated: "2026-01-01T00:00:00.000Z",
    ...overrides,
  };
}

function createMudanca(overrides: Partial<IHorarioEdicaoMudanca> = {}): IHorarioEdicaoMudanca {
  return {
    id: createTestId(),
    sessao: { id: createTestId() },
    calendarioAgendamento: null,
    tipoOperacao: HorarioEdicaoMudancaTipoOperacao.CRIAR,
    dados: {},
    dadosAnteriores: null,
    dateCreated: "2026-01-01T00:00:00.000Z",
    ...overrides,
  };
}

function createMockAgendamento(
  overrides: Partial<CalendarioAgendamentoFindOneQueryResult> = {},
): CalendarioAgendamentoFindOneQueryResult {
  return {
    id: createTestId(),
    identificadorExterno: createTestId(),
    tipo: "EVENTO",
    nome: "Agendamento ao vivo",
    dataInicio: "2026-03-15",
    dataFim: "2026-03-15",
    diaInteiro: false,
    horarioInicio: "14:00:00",
    horarioFim: "15:00:00",
    cor: "#2f9e41",
    repeticao: null,
    status: "ATIVO",
    version: 1,
    turmas: [],
    perfis: [],
    calendariosLetivos: [],
    ofertasFormacao: [],
    modalidades: [],
    ambientes: [],
    diarios: [],
    ...overrides,
  } as CalendarioAgendamentoFindOneQueryResult;
}

function createHandler() {
  const sessaoRepository = createMockSessaoRepository();
  const mudancaRepository = createMockMudancaRepository();
  const agendamentoRepository =
    createMockAgendamentoRepository() as unknown as ICalendarioAgendamentoRepository & {
      getFindOneQueryResult: ReturnType<typeof vi.fn>;
    };

  const handler = new HorarioEdicaoSessaoDiferencaQueryHandlerImpl(
    sessaoRepository,
    mudancaRepository,
    agendamentoRepository,
  );

  return { handler, sessaoRepository, mudancaRepository, agendamentoRepository };
}

describe("HorarioEdicaoSessaoDiferencaQueryHandlerImpl", () => {
  it("partitions CRIAR/MOVER/REMOVER mudancas into entram/mudam/saem", async () => {
    const { handler, sessaoRepository, mudancaRepository } = createHandler();
    const sessao = createSessao();
    sessaoRepository.findById.mockResolvedValue(sessao);

    const moverAgendamentoId = createTestId();
    const removerAgendamentoId = createTestId();

    const mudancaCriar = createMudanca({
      tipoOperacao: HorarioEdicaoMudancaTipoOperacao.CRIAR,
      calendarioAgendamento: null,
      dados: { nome: "Novo evento" },
      dadosAnteriores: null,
    });

    const mudancaMover = createMudanca({
      tipoOperacao: HorarioEdicaoMudancaTipoOperacao.MOVER,
      calendarioAgendamento: { id: moverAgendamentoId },
      dados: { horarioInicio: "10:00:00" },
      dadosAnteriores: { horarioInicio: "09:00:00" },
    });

    const mudancaRemover = createMudanca({
      tipoOperacao: HorarioEdicaoMudancaTipoOperacao.REMOVER,
      calendarioAgendamento: { id: removerAgendamentoId },
      dados: {},
      dadosAnteriores: { nome: "Sera removido" },
    });

    mudancaRepository.findBySessaoId.mockResolvedValue([
      mudancaCriar,
      mudancaMover,
      mudancaRemover,
    ]);

    const result = await handler.execute(null, { sessaoId: sessao.id });

    expect(result.sessaoId).toBe(sessao.id);

    expect(result.entram).toEqual([
      {
        tipoOperacao: HorarioEdicaoMudancaTipoOperacao.CRIAR,
        calendarioAgendamentoId: null,
        antes: null,
        depois: { nome: "Novo evento" },
      },
    ]);

    expect(result.mudam).toEqual([
      {
        tipoOperacao: HorarioEdicaoMudancaTipoOperacao.MOVER,
        calendarioAgendamentoId: moverAgendamentoId,
        antes: { horarioInicio: "09:00:00" },
        depois: { horarioInicio: "10:00:00" },
      },
    ]);

    expect(result.saem).toEqual([
      {
        tipoOperacao: HorarioEdicaoMudancaTipoOperacao.REMOVER,
        calendarioAgendamentoId: removerAgendamentoId,
        antes: { nome: "Sera removido" },
        depois: null,
      },
    ]);
  });

  it("falls back to fetching live state when dadosAnteriores is null on a MOVER/REMOVER mudanca", async () => {
    const { handler, sessaoRepository, mudancaRepository, agendamentoRepository } = createHandler();
    const sessao = createSessao();
    sessaoRepository.findById.mockResolvedValue(sessao);

    const agendamentoId = createTestId();
    const agendamentoAoVivo = createMockAgendamento({
      nome: "Estado atual",
      cor: "#123456",
      dataInicio: "2026-04-01",
      dataFim: "2026-04-01",
      horarioInicio: "08:00:00",
      horarioFim: "09:00:00",
      diaInteiro: false,
    });
    agendamentoRepository.getFindOneQueryResult.mockResolvedValue(agendamentoAoVivo);

    const mudancaMover = createMudanca({
      tipoOperacao: HorarioEdicaoMudancaTipoOperacao.MOVER,
      calendarioAgendamento: { id: agendamentoId },
      dados: { horarioInicio: "10:00:00" },
      dadosAnteriores: null,
    });

    mudancaRepository.findBySessaoId.mockResolvedValue([mudancaMover]);

    const accessContext = createTestAccessContext();
    const result = await handler.execute(accessContext, { sessaoId: sessao.id });

    expect(agendamentoRepository.getFindOneQueryResult).toHaveBeenCalledWith(
      accessContext,
      agendamentoId,
    );

    expect(result.mudam).toEqual([
      {
        tipoOperacao: HorarioEdicaoMudancaTipoOperacao.MOVER,
        calendarioAgendamentoId: agendamentoId,
        antes: {
          nome: "Estado atual",
          cor: "#123456",
          dataInicio: "2026-04-01",
          dataFim: "2026-04-01",
          horarioInicio: "08:00:00",
          horarioFim: "09:00:00",
          diaInteiro: false,
        },
        depois: { horarioInicio: "10:00:00" },
      },
    ]);
  });

  it("does not fetch live state when dadosAnteriores is already present", async () => {
    const { handler, sessaoRepository, mudancaRepository, agendamentoRepository } = createHandler();
    const sessao = createSessao();
    sessaoRepository.findById.mockResolvedValue(sessao);

    const mudancaRemover = createMudanca({
      tipoOperacao: HorarioEdicaoMudancaTipoOperacao.REMOVER,
      calendarioAgendamento: { id: createTestId() },
      dados: {},
      dadosAnteriores: { nome: "Ja capturado" },
    });

    mudancaRepository.findBySessaoId.mockResolvedValue([mudancaRemover]);

    await handler.execute(null, { sessaoId: sessao.id });

    expect(agendamentoRepository.getFindOneQueryResult).not.toHaveBeenCalled();
  });

  it("throws ResourceNotFoundError when the sessao does not exist", async () => {
    const { handler, sessaoRepository } = createHandler();
    sessaoRepository.findById.mockResolvedValue(null);

    const sessaoId = createTestId();

    await expect(handler.execute(null, { sessaoId })).rejects.toThrow(ResourceNotFoundError);
  });

  it("returns empty entram/mudam/saem for a sessao with no mudancas", async () => {
    const { handler, sessaoRepository, mudancaRepository } = createHandler();
    const sessao = createSessao();
    sessaoRepository.findById.mockResolvedValue(sessao);
    mudancaRepository.findBySessaoId.mockResolvedValue([]);

    const result = await handler.execute(null, { sessaoId: sessao.id });

    expect(result).toEqual({
      sessaoId: sessao.id,
      entram: [],
      mudam: [],
      saem: [],
    });
  });
});
