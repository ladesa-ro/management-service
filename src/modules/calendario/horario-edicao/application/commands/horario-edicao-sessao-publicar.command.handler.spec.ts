import { BadRequestException } from "@nestjs/common";
import { describe, expect, it, vi } from "vitest";
import { ForbiddenError, ResourceNotFoundError } from "@/application/errors";
import { createTestAccessContext, createTestId, createTestRequestActor } from "@/test/helpers";
import {
  HorarioEdicaoMudancaTipoOperacao,
  HorarioEdicaoSessaoStatus,
  type IHorarioEdicaoMudanca,
  type IHorarioEdicaoSessao,
} from "../../domain/horario-edicao.types";
import { HorarioEdicaoSessaoPublicarCommandHandlerImpl } from "./horario-edicao-sessao-publicar.command.handler";

const testActorId = createTestId();
const testAccessContext = createTestAccessContext(createTestRequestActor({ id: testActorId }));

function createSessao(overrides: Partial<IHorarioEdicaoSessao> = {}): IHorarioEdicaoSessao {
  return {
    id: createTestId(),
    status: HorarioEdicaoSessaoStatus.ABERTA,
    usuario: { id: testActorId },
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
  const horarioEdicaoApplicator = {
    applyMudancas: vi.fn().mockResolvedValue(undefined),
  };
  const idempotencyService = {
    execute: vi.fn(({ run }: { run: () => Promise<unknown> }) => run()),
  };

  const handler = new HorarioEdicaoSessaoPublicarCommandHandlerImpl(
    sessaoRepository as any,
    mudancaRepository as any,
    horarioEdicaoApplicator as any,
    idempotencyService as any,
  );

  return {
    handler,
    sessaoRepository,
    mudancaRepository,
    horarioEdicaoApplicator,
    idempotencyService,
  };
}

describe("HorarioEdicaoSessaoPublicarCommandHandlerImpl", () => {
  it("should apply pending mudancas and mark the sessao as SALVA", async () => {
    const sessao = createSessao();
    const mudancas = [createMudanca({ sessao: { id: sessao.id } })];

    const { handler, sessaoRepository, mudancaRepository, horarioEdicaoApplicator } =
      createHandler();
    sessaoRepository.findById.mockResolvedValue(sessao);
    mudancaRepository.findBySessaoId.mockResolvedValue(mudancas);

    const resultado = await handler.execute(testAccessContext, { sessaoId: sessao.id });

    expect(mudancaRepository.findBySessaoId).toHaveBeenCalledWith(sessao.id);
    expect(horarioEdicaoApplicator.applyMudancas).toHaveBeenCalledWith(mudancas);
    expect(resultado.status).toBe(HorarioEdicaoSessaoStatus.SALVA);
    expect(sessaoRepository.save).toHaveBeenCalledWith(
      expect.objectContaining({ status: HorarioEdicaoSessaoStatus.SALVA }),
    );
  });

  it("should throw ForbiddenError when user does not own the sessao", async () => {
    const sessao = createSessao({ usuario: { id: createTestId() } });
    const { handler, sessaoRepository } = createHandler();
    sessaoRepository.findById.mockResolvedValue(sessao);

    await expect(handler.execute(testAccessContext, { sessaoId: sessao.id })).rejects.toThrow(
      ForbiddenError,
    );
  });

  it("should throw BadRequestException when the sessao is not ABERTA", async () => {
    const sessao = createSessao({ status: HorarioEdicaoSessaoStatus.SALVA });

    const { handler, sessaoRepository, horarioEdicaoApplicator } = createHandler();
    sessaoRepository.findById.mockResolvedValue(sessao);

    await expect(handler.execute(testAccessContext, { sessaoId: sessao.id })).rejects.toThrow(
      BadRequestException,
    );
    expect(horarioEdicaoApplicator.applyMudancas).not.toHaveBeenCalled();
  });

  it("should throw ResourceNotFoundError when the sessao does not exist", async () => {
    const { handler, sessaoRepository } = createHandler();
    sessaoRepository.findById.mockResolvedValue(null);

    await expect(handler.execute(testAccessContext, { sessaoId: createTestId() })).rejects.toThrow(
      ResourceNotFoundError,
    );
  });

  it("should route execution through the idempotency service with the command's key", async () => {
    const sessao = createSessao();
    const { handler, sessaoRepository, idempotencyService } = createHandler();
    sessaoRepository.findById.mockResolvedValue(sessao);

    await handler.execute(testAccessContext, {
      sessaoId: sessao.id,
      idempotencyKey: "chave-do-cliente",
    });

    expect(idempotencyService.execute).toHaveBeenCalledWith(
      expect.objectContaining({
        idempotencyKey: "chave-do-cliente",
        comando: "horario-edicao-sessao-publicar",
      }),
    );
  });
});
