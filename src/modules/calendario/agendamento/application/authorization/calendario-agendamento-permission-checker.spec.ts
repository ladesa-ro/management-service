import { ForbiddenException } from "@nestjs/common";
import { describe, expect, it, vi } from "vitest";
import { createTestAccessContext, createTestId, createTestRequestActor } from "@/test/helpers";
import { CalendarioAgendamentoPermissionCheckerImpl } from "./calendario-agendamento-permission-checker";
import type { CalendarioAgendamentoVisibilidadeService } from "./calendario-agendamento-visibilidade.service";

function createMockRepository(
  agendamento: { colecao: { id: string } | null; perfis?: { id: string }[] } | null,
) {
  return {
    loadById: vi.fn().mockResolvedValue(agendamento),
  };
}

function createMockVisibilidadeService(resolvedValues: Record<string, string> = {}) {
  const resolver = vi.fn(async (_ctx: unknown, colecaoId: string | null) => {
    if (colecaoId === null) return "SEM_RESTRICAO";
    return resolvedValues[colecaoId] ?? "SEM_ACESSO";
  });

  return {
    resolver,
    podeEditar: (v: string) => v === "SEM_RESTRICAO" || v === "EDITOR",
  } as unknown as CalendarioAgendamentoVisibilidadeService;
}

function createMockPerfilRepository(perfisAtivos: { id: string }[] = []) {
  return {
    findAllActiveByUsuarioId: vi.fn().mockResolvedValue(perfisAtivos),
  };
}

describe("CalendarioAgendamentoPermissionCheckerImpl", () => {
  describe("ensureCanCreate", () => {
    it("should allow when dto has no colecao", async () => {
      const repository = createMockRepository(null);
      const visibilidadeService = createMockVisibilidadeService();
      const checker = new CalendarioAgendamentoPermissionCheckerImpl(
        repository as any,
        visibilidadeService,
        createMockPerfilRepository() as any,
      );

      await expect(
        checker.ensureCanCreate(createTestAccessContext(), { dto: {} }),
      ).resolves.toBeUndefined();
      expect(visibilidadeService.resolver).not.toHaveBeenCalled();
    });

    it("should allow when the requester is EDITOR on the target colecao", async () => {
      const colecaoId = createTestId();
      const repository = createMockRepository(null);
      const visibilidadeService = createMockVisibilidadeService({ [colecaoId]: "EDITOR" });
      const checker = new CalendarioAgendamentoPermissionCheckerImpl(
        repository as any,
        visibilidadeService,
        createMockPerfilRepository() as any,
      );

      await expect(
        checker.ensureCanCreate(createTestAccessContext(), { dto: { colecao: { id: colecaoId } } }),
      ).resolves.toBeUndefined();
    });

    it("should throw ForbiddenException when the requester only has LEITOR or OCUPACAO", async () => {
      const colecaoId = createTestId();
      const repository = createMockRepository(null);

      for (const papel of ["LEITOR", "OCUPACAO"]) {
        const visibilidadeService = createMockVisibilidadeService({ [colecaoId]: papel });
        const checker = new CalendarioAgendamentoPermissionCheckerImpl(
          repository as any,
          visibilidadeService,
          createMockPerfilRepository() as any,
        );

        await expect(
          checker.ensureCanCreate(createTestAccessContext(), {
            dto: { colecao: { id: colecaoId } },
          }),
        ).rejects.toThrow(ForbiddenException);
      }
    });

    it("should throw ForbiddenException when the requester has no access at all", async () => {
      const colecaoId = createTestId();
      const repository = createMockRepository(null);
      const visibilidadeService = createMockVisibilidadeService();
      const checker = new CalendarioAgendamentoPermissionCheckerImpl(
        repository as any,
        visibilidadeService,
        createMockPerfilRepository() as any,
      );

      await expect(
        checker.ensureCanCreate(createTestAccessContext(), { dto: { colecao: { id: colecaoId } } }),
      ).rejects.toThrow(ForbiddenException);
    });
  });

  describe("ensureCanUpdate / ensureCanDelete", () => {
    it("should allow without consulting visibilidade when the target agendamento has no colecao and the update doesn't set one", async () => {
      const repository = createMockRepository({ colecao: null });
      const visibilidadeService = createMockVisibilidadeService();
      const checker = new CalendarioAgendamentoPermissionCheckerImpl(
        repository as any,
        visibilidadeService,
        createMockPerfilRepository() as any,
      );

      await expect(
        checker.ensureCanUpdate(createTestAccessContext(), { dto: {} }, createTestId()),
      ).resolves.toBeUndefined();
      expect(visibilidadeService.resolver).not.toHaveBeenCalled();
    });

    it("should silently allow (defer to the command handler) when the agendamento does not exist", async () => {
      const repository = createMockRepository(null);
      const visibilidadeService = createMockVisibilidadeService();
      const checker = new CalendarioAgendamentoPermissionCheckerImpl(
        repository as any,
        visibilidadeService,
        createMockPerfilRepository() as any,
      );

      await expect(
        checker.ensureCanUpdate(createTestAccessContext(), { dto: {} }, createTestId()),
      ).resolves.toBeUndefined();
    });

    it("should throw when the requester lacks EDITOR on the agendamento's current colecao", async () => {
      const colecaoId = createTestId();
      const repository = createMockRepository({ colecao: { id: colecaoId } });
      const visibilidadeService = createMockVisibilidadeService({ [colecaoId]: "LEITOR" });
      const checker = new CalendarioAgendamentoPermissionCheckerImpl(
        repository as any,
        visibilidadeService,
        createMockPerfilRepository() as any,
      );

      await expect(
        checker.ensureCanUpdate(createTestAccessContext(), { dto: {} }, createTestId()),
      ).rejects.toThrow(ForbiddenException);

      await expect(
        checker.ensureCanDelete(createTestAccessContext(), { dto: {} }, createTestId()),
      ).rejects.toThrow(ForbiddenException);
    });

    it("should allow when the requester is EDITOR on the current colecao and doesn't change it", async () => {
      const colecaoId = createTestId();
      const repository = createMockRepository({ colecao: { id: colecaoId } });
      const visibilidadeService = createMockVisibilidadeService({ [colecaoId]: "EDITOR" });
      const checker = new CalendarioAgendamentoPermissionCheckerImpl(
        repository as any,
        visibilidadeService,
        createMockPerfilRepository() as any,
      );

      await expect(
        checker.ensureCanUpdate(createTestAccessContext(), { dto: {} }, createTestId()),
      ).resolves.toBeUndefined();
    });

    it("should also require EDITOR on the destination colecao when the update moves the agendamento to a different one", async () => {
      const colecaoAtual = createTestId();
      const colecaoDestino = createTestId();
      const repository = createMockRepository({ colecao: { id: colecaoAtual } });
      const visibilidadeService = createMockVisibilidadeService({
        [colecaoAtual]: "EDITOR",
        [colecaoDestino]: "LEITOR",
      });
      const checker = new CalendarioAgendamentoPermissionCheckerImpl(
        repository as any,
        visibilidadeService,
        createMockPerfilRepository() as any,
      );

      await expect(
        checker.ensureCanUpdate(
          createTestAccessContext(),
          { dto: { colecao: { id: colecaoDestino } } },
          createTestId(),
        ),
      ).rejects.toThrow(ForbiddenException);
    });

    it("should allow moving to a new colecao when EDITOR on both", async () => {
      const colecaoAtual = createTestId();
      const colecaoDestino = createTestId();
      const repository = createMockRepository({ colecao: { id: colecaoAtual } });
      const visibilidadeService = createMockVisibilidadeService({
        [colecaoAtual]: "EDITOR",
        [colecaoDestino]: "EDITOR",
      });
      const checker = new CalendarioAgendamentoPermissionCheckerImpl(
        repository as any,
        visibilidadeService,
        createMockPerfilRepository() as any,
      );

      await expect(
        checker.ensureCanUpdate(
          createTestAccessContext(),
          { dto: { colecao: { id: colecaoDestino } } },
          createTestId(),
        ),
      ).resolves.toBeUndefined();
    });

    it("should allow attaching a colecao to a previously colecao-less agendamento when EDITOR there", async () => {
      const colecaoDestino = createTestId();
      const repository = createMockRepository({ colecao: null });
      const visibilidadeService = createMockVisibilidadeService({ [colecaoDestino]: "EDITOR" });
      const checker = new CalendarioAgendamentoPermissionCheckerImpl(
        repository as any,
        visibilidadeService,
        createMockPerfilRepository() as any,
      );

      await expect(
        checker.ensureCanUpdate(
          createTestAccessContext(),
          { dto: { colecao: { id: colecaoDestino } } },
          createTestId(),
        ),
      ).resolves.toBeUndefined();
    });
  });

  describe("ensureCanCancelarPropria", () => {
    it("should allow EDITOR on the colecao (regression)", async () => {
      const colecaoId = createTestId();
      const repository = createMockRepository({ colecao: { id: colecaoId }, perfis: [] });
      const visibilidadeService = createMockVisibilidadeService({ [colecaoId]: "EDITOR" });
      const perfilRepository = createMockPerfilRepository();
      const checker = new CalendarioAgendamentoPermissionCheckerImpl(
        repository as any,
        visibilidadeService,
        perfilRepository as any,
      );

      await expect(
        checker.ensureCanCancelarPropria(createTestAccessContext(), createTestId()),
      ).resolves.toBeUndefined();
      expect(perfilRepository.findAllActiveByUsuarioId).not.toHaveBeenCalled();
    });

    it("should allow a participating professor without EDITOR on the colecao", async () => {
      const colecaoId = createTestId();
      const perfilId = createTestId();
      const requestActor = createTestRequestActor();
      const repository = createMockRepository({
        colecao: { id: colecaoId },
        perfis: [{ id: perfilId }],
      });
      const visibilidadeService = createMockVisibilidadeService({ [colecaoId]: "LEITOR" });
      const perfilRepository = createMockPerfilRepository([{ id: perfilId }]);
      const checker = new CalendarioAgendamentoPermissionCheckerImpl(
        repository as any,
        visibilidadeService,
        perfilRepository as any,
      );

      await expect(
        checker.ensureCanCancelarPropria(createTestAccessContext(requestActor), createTestId()),
      ).resolves.toBeUndefined();
      expect(perfilRepository.findAllActiveByUsuarioId).toHaveBeenCalledWith(
        expect.anything(),
        requestActor.id,
      );
    });

    it("should throw when the requester is neither EDITOR nor a participating perfil", async () => {
      const colecaoId = createTestId();
      const perfilDoAgendamento = createTestId();
      const outroPerfilDoRequisitante = createTestId();
      const repository = createMockRepository({
        colecao: { id: colecaoId },
        perfis: [{ id: perfilDoAgendamento }],
      });
      const visibilidadeService = createMockVisibilidadeService({ [colecaoId]: "LEITOR" });
      const perfilRepository = createMockPerfilRepository([{ id: outroPerfilDoRequisitante }]);
      const checker = new CalendarioAgendamentoPermissionCheckerImpl(
        repository as any,
        visibilidadeService,
        perfilRepository as any,
      );

      await expect(
        checker.ensureCanCancelarPropria(createTestAccessContext(), createTestId()),
      ).rejects.toThrow(ForbiddenException);
    });

    it("should silently allow (defer to the command handler) when the agendamento does not exist", async () => {
      const repository = createMockRepository(null);
      const visibilidadeService = createMockVisibilidadeService();
      const perfilRepository = createMockPerfilRepository();
      const checker = new CalendarioAgendamentoPermissionCheckerImpl(
        repository as any,
        visibilidadeService,
        perfilRepository as any,
      );

      await expect(
        checker.ensureCanCancelarPropria(createTestAccessContext(), createTestId()),
      ).resolves.toBeUndefined();
    });
  });
});
