import { describe, expect, it, vi } from "vitest";
import { ForbiddenError, UnauthorizedError } from "@/application/errors";
import { CalendarioColecaoPermissionCheckerImpl } from "./calendario-colecao-permission-checker";

describe("CalendarioColecaoPermissionCheckerImpl", () => {
  const mockAcessoResolver = {
    resolverPapelEfetivoParaColecao: vi.fn(),
  };

  const mockColecaoRepository = {
    loadById: vi.fn(),
  };

  const checker = new CalendarioColecaoPermissionCheckerImpl(
    mockAcessoResolver as any,
    mockColecaoRepository as any,
  );

  const _superUserContext = {
    requestActor: { id: "u-super", isSuperUser: true },
  };

  const normalContext = {
    requestActor: { id: "u-normal", isSuperUser: false },
  };

  it("throws UnauthorizedError when unauthenticated", async () => {
    await expect(checker.ensureCanCreate(null, { dto: {} })).rejects.toThrow(UnauthorizedError);
    await expect(checker.ensureCanUpdate(null, { dto: {} }, "c-1")).rejects.toThrow(
      UnauthorizedError,
    );
    await expect(checker.ensureCanDelete(null, { dto: {} }, "c-1")).rejects.toThrow(
      UnauthorizedError,
    );
  });

  it("allows any authenticated user to create a colecao", async () => {
    await expect(
      checker.ensureCanCreate(normalContext as any, { dto: {} }),
    ).resolves.toBeUndefined();
  });

  it("allows update when role is EDITOR", async () => {
    mockAcessoResolver.resolverPapelEfetivoParaColecao.mockResolvedValue("EDITOR");

    await expect(
      checker.ensureCanUpdate(normalContext as any, { dto: {} }, "col-1"),
    ).resolves.toBeUndefined();
  });

  it("throws ForbiddenError on update when role is not EDITOR", async () => {
    mockAcessoResolver.resolverPapelEfetivoParaColecao.mockResolvedValue("LEITOR");

    await expect(
      checker.ensureCanUpdate(normalContext as any, { dto: {} }, "col-1"),
    ).rejects.toThrow(ForbiddenError);
  });

  it("allows delete when user is dono", async () => {
    mockColecaoRepository.loadById.mockResolvedValue({
      id: "col-1",
      dono: { id: "u-normal" },
    });

    await expect(
      checker.ensureCanDelete(normalContext as any, { dto: {} }, "col-1"),
    ).resolves.toBeUndefined();
  });

  it("throws ForbiddenError on delete when user is NOT dono", async () => {
    mockColecaoRepository.loadById.mockResolvedValue({
      id: "col-1",
      dono: { id: "u-other" },
    });

    await expect(
      checker.ensureCanDelete(normalContext as any, { dto: {} }, "col-1"),
    ).rejects.toThrow(ForbiddenError);
  });
});
