import { describe, expect, it } from "vitest";
import { ForbiddenError, UnauthorizedError } from "@/application/errors";
import { UsuarioPermissionCheckerImpl } from "./usuario-permission-checker";

describe("UsuarioPermissionCheckerImpl", () => {
  const checker = new UsuarioPermissionCheckerImpl();

  const superUserContext = {
    requestActor: {
      id: "super-1",
      nome: "Admin",
      matricula: "0001",
      email: "admin@ladesa.com",
      isSuperUser: true,
    },
  };

  const normalUserContext = {
    requestActor: {
      id: "user-1",
      nome: "João",
      matricula: "1111",
      email: "joao@ladesa.com",
      isSuperUser: false,
    },
  };

  describe("ensureCanCreate", () => {
    it("throws UnauthorizedError when not authenticated", async () => {
      await expect(checker.ensureCanCreate(null, { dto: {} })).rejects.toThrow(UnauthorizedError);
    });

    it("throws ForbiddenError when user is not superUser", async () => {
      await expect(checker.ensureCanCreate(normalUserContext as any, { dto: {} })).rejects.toThrow(
        ForbiddenError,
      );
    });

    it("allows when user is superUser", async () => {
      await expect(
        checker.ensureCanCreate(superUserContext as any, { dto: {} }),
      ).resolves.toBeUndefined();
    });
  });

  describe("ensureCanUpdate", () => {
    it("throws UnauthorizedError when not authenticated", async () => {
      await expect(checker.ensureCanUpdate(null, { dto: {} }, "user-1")).rejects.toThrow(
        UnauthorizedError,
      );
    });

    it("allows superUser to update any user", async () => {
      await expect(
        checker.ensureCanUpdate(superUserContext as any, { dto: {} }, "user-2"),
      ).resolves.toBeUndefined();
    });

    it("allows normal user to update their own profile", async () => {
      await expect(
        checker.ensureCanUpdate(
          normalUserContext as any,
          { dto: { nome: "João Silva" } },
          "user-1",
        ),
      ).resolves.toBeUndefined();
    });

    it("throws ForbiddenError when normal user attempts to update another user (anti-BOLA)", async () => {
      await expect(
        checker.ensureCanUpdate(normalUserContext as any, { dto: {} }, "user-other"),
      ).rejects.toThrow(ForbiddenError);
    });

    it("throws ForbiddenError when normal user attempts privilege escalation (isSuperUser: true)", async () => {
      await expect(
        checker.ensureCanUpdate(normalUserContext as any, { dto: { isSuperUser: true } }, "user-1"),
      ).rejects.toThrow(ForbiddenError);
    });
  });

  describe("ensureCanDelete", () => {
    it("throws UnauthorizedError when not authenticated", async () => {
      await expect(checker.ensureCanDelete(null, { dto: {} }, "user-1")).rejects.toThrow(
        UnauthorizedError,
      );
    });

    it("throws ForbiddenError when user is not superUser", async () => {
      await expect(
        checker.ensureCanDelete(normalUserContext as any, { dto: {} }, "user-1"),
      ).rejects.toThrow(ForbiddenError);
    });

    it("allows when user is superUser", async () => {
      await expect(
        checker.ensureCanDelete(superUserContext as any, { dto: {} }, "user-1"),
      ).resolves.toBeUndefined();
    });
  });
});
