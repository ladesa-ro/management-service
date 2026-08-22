import { BadRequestException } from "@nestjs/common";
import { describe, expect, it, vi } from "vitest";
import { ResourceNotFoundError } from "@/application/errors";
import { createTestAccessContext, createTestId } from "@/test/helpers";
import {
  HorarioEdicaoMudancaTipoOperacao,
  HorarioEdicaoSessaoStatus,
  type IHorarioEdicaoMudanca,
  type IHorarioEdicaoSessao,
} from "../../domain/horario-edicao.types";
import { HorarioEdicaoSessaoDesfazerMudancaCommandHandlerImpl } from "./horario-edicao-sessao-desfazer-mudanca.command.handler";

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

function createHandler() {
  const sessaoRepository = {
    findById: vi.fn(),
    save: vi.fn(async (entity: unknown) => entity),
  };
  const mudancaRepository = {
    save: vi.fn(async (entity: unknown) => entity),
    findById: vi.fn(),
    findBySessaoId: vi.fn().mockResolvedValue([]),
    deleteById: vi.fn().mockResolvedValue(undefined),
  };

  const handler = new HorarioEdicaoSessaoDesfazerMudancaCommandHandlerImpl(
    sessaoRepository as any,
    mudancaRepository as any,
  );

  return { handler, sessaoRepository, mudancaRepository };
}

describe("HorarioEdicaoSessaoDesfazerMudancaCommandHandlerImpl", () => {
  it("should discard a pending CRIAR mudanca and refresh the sessao", async () => {
    const sessao = createSessao();
    const mudanca = createMudanca({
      sessao: { id: sessao.id },
      tipoOperacao: HorarioEdicaoMudancaTipoOperacao.CRIAR,
    });

    const { handler, sessaoRepository, mudancaRepository } = createHandler();
    sessaoRepository.findById.mockResolvedValue(sessao);
    mudancaRepository.findById.mockResolvedValue(mudanca);

    const resultado = await handler.execute(createTestAccessContext(), {
      sessaoId: sessao.id,
      mudancaId: mudanca.id,
    });

    expect(mudancaRepository.deleteById).toHaveBeenCalledWith(mudanca.id);
    expect(resultado.id).toBe(sessao.id);
    expect(sessaoRepository.save).toHaveBeenCalledOnce();
  });

  it("should discard a pending MOVER mudanca without touching calendario_agendamento", async () => {
    const sessao = createSessao();
    const mudanca = createMudanca({
      sessao: { id: sessao.id },
      tipoOperacao: HorarioEdicaoMudancaTipoOperacao.MOVER,
      calendarioAgendamento: { id: createTestId() },
      dadosAnteriores: { nome: "Antigo" },
    });

    const { handler, sessaoRepository, mudancaRepository } = createHandler();
    sessaoRepository.findById.mockResolvedValue(sessao);
    mudancaRepository.findById.mockResolvedValue(mudanca);

    await handler.execute(createTestAccessContext(), {
      sessaoId: sessao.id,
      mudancaId: mudanca.id,
    });

    expect(mudancaRepository.deleteById).toHaveBeenCalledWith(mudanca.id);
  });

  it("should throw BadRequestException when the sessao is not ABERTA", async () => {
    const sessao = createSessao({ status: HorarioEdicaoSessaoStatus.SALVA });

    const { handler, sessaoRepository, mudancaRepository } = createHandler();
    sessaoRepository.findById.mockResolvedValue(sessao);

    await expect(
      handler.execute(createTestAccessContext(), {
        sessaoId: sessao.id,
        mudancaId: createTestId(),
      }),
    ).rejects.toThrow(BadRequestException);
    expect(mudancaRepository.deleteById).not.toHaveBeenCalled();
  });

  it("should throw BadRequestException when the mudanca does not belong to the sessao", async () => {
    const sessao = createSessao();
    const mudanca = createMudanca({ sessao: { id: createTestId() } });

    const { handler, sessaoRepository, mudancaRepository } = createHandler();
    sessaoRepository.findById.mockResolvedValue(sessao);
    mudancaRepository.findById.mockResolvedValue(mudanca);

    await expect(
      handler.execute(createTestAccessContext(), { sessaoId: sessao.id, mudancaId: mudanca.id }),
    ).rejects.toThrow(BadRequestException);
    expect(mudancaRepository.deleteById).not.toHaveBeenCalled();
  });

  it("should throw ResourceNotFoundError when the mudanca does not exist", async () => {
    const sessao = createSessao();

    const { handler, sessaoRepository, mudancaRepository } = createHandler();
    sessaoRepository.findById.mockResolvedValue(sessao);
    mudancaRepository.findById.mockResolvedValue(null);

    await expect(
      handler.execute(createTestAccessContext(), {
        sessaoId: sessao.id,
        mudancaId: createTestId(),
      }),
    ).rejects.toThrow(ResourceNotFoundError);
  });

  it("should throw ResourceNotFoundError when the sessao does not exist", async () => {
    const { handler, sessaoRepository } = createHandler();
    sessaoRepository.findById.mockResolvedValue(null);

    await expect(
      handler.execute(createTestAccessContext(), {
        sessaoId: createTestId(),
        mudancaId: createTestId(),
      }),
    ).rejects.toThrow(ResourceNotFoundError);
  });
});
