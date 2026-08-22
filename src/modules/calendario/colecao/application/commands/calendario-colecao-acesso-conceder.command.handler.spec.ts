import { describe, expect, it, vi } from "vitest";
import { createMockCqrsRepository, createTestAccessContext, createTestId } from "@/test/helpers";
import { CalendarioColecao } from "../../domain/calendario-colecao";
import { CalendarioColecaoAcessoConcederCommandHandlerImpl } from "./calendario-colecao-acesso-conceder.command.handler";

function createActiveColecao(overrides: Record<string, unknown> = {}) {
  return CalendarioColecao.create({
    dono: { id: createTestId() },
    nome: "Agenda do departamento",
    ...overrides,
  });
}

function createMockNotificacaoRepository() {
  return {
    find: vi.fn().mockResolvedValue([]),
    count: vi.fn().mockResolvedValue(0),
    findOneBy: vi.fn().mockResolvedValue(null),
    save: vi.fn().mockResolvedValue(undefined),
  };
}

function createMockPermissionChecker() {
  return {
    ensureCanCreate: vi.fn().mockResolvedValue(undefined),
    ensureCanUpdate: vi.fn().mockResolvedValue(undefined),
    ensureCanDelete: vi.fn().mockResolvedValue(undefined),
  };
}

describe("CalendarioColecaoAcessoConcederCommandHandlerImpl", () => {
  function createHandler(
    overrides: {
      repository?: object;
      colecaoRepository?: object;
      permissionChecker?: object;
      notificacaoRepository?: object;
    } = {},
  ) {
    const repository = overrides.repository ?? createMockCqrsRepository();
    const colecaoRepository = overrides.colecaoRepository ?? createMockCqrsRepository();
    const permissionChecker = overrides.permissionChecker ?? createMockPermissionChecker();
    const notificacaoRepository =
      overrides.notificacaoRepository ?? createMockNotificacaoRepository();

    const handler = new CalendarioColecaoAcessoConcederCommandHandlerImpl(
      repository as any,
      colecaoRepository as any,
      permissionChecker as any,
      notificacaoRepository as any,
    );

    return { handler, repository, colecaoRepository, permissionChecker, notificacaoRepository };
  }

  it("should create a notificacao when escopo is USUARIO", async () => {
    const colecao = createActiveColecao({ nome: "Feriados 2026" });
    const usuarioId = createTestId();

    const colecaoRepository = createMockCqrsRepository();
    colecaoRepository.loadById.mockResolvedValue(colecao);

    const repository = createMockCqrsRepository();
    repository.getFindOneQueryResult.mockResolvedValue({ id: createTestId() });

    const notificacaoRepository = createMockNotificacaoRepository();

    const { handler } = createHandler({ repository, colecaoRepository, notificacaoRepository });

    await handler.execute(createTestAccessContext(), {
      colecaoId: colecao.id,
      escopo: "USUARIO",
      usuario: { id: usuarioId },
      papel: "LEITOR",
    } as any);

    expect(notificacaoRepository.save).toHaveBeenCalledOnce();
    const notificacaoSalva = notificacaoRepository.save.mock.calls[0][0];
    expect(notificacaoSalva.usuario).toEqual({ id: usuarioId });
    expect(notificacaoSalva.lida).toBe(false);
    expect(notificacaoSalva.titulo).toBe("Acesso concedido");
    expect(notificacaoSalva.conteudo).toContain("Feriados 2026");
    expect(notificacaoSalva.conteudo).toContain("LEITOR");
  });

  it("should not create a notificacao when escopo is CAMPUS", async () => {
    const colecao = createActiveColecao();
    const campusId = createTestId();

    const colecaoRepository = createMockCqrsRepository();
    colecaoRepository.loadById.mockResolvedValue(colecao);

    const repository = createMockCqrsRepository();
    repository.getFindOneQueryResult.mockResolvedValue({ id: createTestId() });

    const notificacaoRepository = createMockNotificacaoRepository();

    const { handler } = createHandler({ repository, colecaoRepository, notificacaoRepository });

    await handler.execute(createTestAccessContext(), {
      colecaoId: colecao.id,
      escopo: "CAMPUS",
      campus: { id: campusId },
      papel: "OCUPACAO",
    } as any);

    expect(notificacaoRepository.save).not.toHaveBeenCalled();
  });

  it("should not create a notificacao when escopo is PUBLICO", async () => {
    const colecao = createActiveColecao();

    const colecaoRepository = createMockCqrsRepository();
    colecaoRepository.loadById.mockResolvedValue(colecao);

    const repository = createMockCqrsRepository();
    repository.getFindOneQueryResult.mockResolvedValue({ id: createTestId() });

    const notificacaoRepository = createMockNotificacaoRepository();

    const { handler } = createHandler({ repository, colecaoRepository, notificacaoRepository });

    await handler.execute(createTestAccessContext(), {
      colecaoId: colecao.id,
      escopo: "PUBLICO",
      papel: "LEITOR",
    } as any);

    expect(notificacaoRepository.save).not.toHaveBeenCalled();
  });

  it("should throw when colecao does not exist", async () => {
    const colecaoRepository = createMockCqrsRepository();
    colecaoRepository.loadById.mockResolvedValue(null);

    const { handler } = createHandler({ colecaoRepository });

    await expect(
      handler.execute(createTestAccessContext(), {
        colecaoId: createTestId(),
        escopo: "PUBLICO",
        papel: "LEITOR",
      } as any),
    ).rejects.toThrow();
  });
});
