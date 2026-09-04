import { describe, expect, it } from "vitest";
import { ForbiddenError, UnauthorizedError } from "@/application/errors";
import { BlocoPermissionCheckerImpl } from "./bloco-permission-checker";

describe("BlocoPermissionCheckerImpl", () => {
  const checker = new BlocoPermissionCheckerImpl();

  const superUserContext = {
    requestActor: { id: "u-1", isSuperUser: true },
  };

  const normalContext = {
    requestActor: { id: "u-2", isSuperUser: false },
    currentCampusId: "campus-1",
  };

  it("throws UnauthorizedError when not authenticated", async () => {
    await expect(checker.ensureCanCreate(null, { dto: {} })).rejects.toThrow(UnauthorizedError);
    await expect(checker.ensureCanUpdate(null, { dto: {} }, "b-1")).rejects.toThrow(
      UnauthorizedError,
    );
    await expect(checker.ensureCanDelete(null, { dto: {} }, "b-1")).rejects.toThrow(
      UnauthorizedError,
    );
  });

  it("allows superUser to create, update, and delete bloco", async () => {
    await expect(
      checker.ensureCanCreate(superUserContext as any, { dto: { campus: { id: "campus-2" } } }),
    ).resolves.toBeUndefined();
    await expect(
      checker.ensureCanUpdate(
        superUserContext as any,
        { dto: { campus: { id: "campus-2" } } },
        "b-1",
      ),
    ).resolves.toBeUndefined();
    await expect(
      checker.ensureCanDelete(superUserContext as any, { dto: {} }, "b-1"),
    ).resolves.toBeUndefined();
  });

  it("allows normal user when campus matches and blocks when campus differs", async () => {
    await expect(
      checker.ensureCanCreate(normalContext as any, { dto: { campus: { id: "campus-1" } } }),
    ).resolves.toBeUndefined();

    await expect(
      checker.ensureCanCreate(normalContext as any, { dto: { campus: { id: "campus-2" } } }),
    ).rejects.toThrow(ForbiddenError);
  });
});
