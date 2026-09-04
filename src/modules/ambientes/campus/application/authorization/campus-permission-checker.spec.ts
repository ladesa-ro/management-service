import { describe, expect, it } from "vitest";
import { ForbiddenError, UnauthorizedError } from "@/application/errors";
import { CampusPermissionCheckerImpl } from "./campus-permission-checker";

describe("CampusPermissionCheckerImpl", () => {
  const checker = new CampusPermissionCheckerImpl();

  const superUserContext = {
    requestActor: { id: "u-1", isSuperUser: true },
  };

  const normalContext = {
    requestActor: { id: "u-2", isSuperUser: false },
    currentCampusId: "campus-1",
  };

  it("throws UnauthorizedError when accessContext is missing or has no actor", async () => {
    await expect(checker.ensureCanCreate(null, { dto: {} })).rejects.toThrow(UnauthorizedError);
    await expect(checker.ensureCanUpdate(null, { dto: {} }, "c-1")).rejects.toThrow(
      UnauthorizedError,
    );
    await expect(checker.ensureCanDelete(null, { dto: {} }, "c-1")).rejects.toThrow(
      UnauthorizedError,
    );
  });

  it("throws ForbiddenError when non-superUser tries to create or delete campus", async () => {
    await expect(checker.ensureCanCreate(normalContext as any, { dto: {} })).rejects.toThrow(
      ForbiddenError,
    );
    await expect(
      checker.ensureCanDelete(normalContext as any, { dto: {} }, "campus-1"),
    ).rejects.toThrow(ForbiddenError);
  });

  it("allows superUser to create, update, and delete campus", async () => {
    await expect(
      checker.ensureCanCreate(superUserContext as any, { dto: {} }),
    ).resolves.toBeUndefined();
    await expect(
      checker.ensureCanUpdate(superUserContext as any, { dto: {} }, "campus-99"),
    ).resolves.toBeUndefined();
    await expect(
      checker.ensureCanDelete(superUserContext as any, { dto: {} }, "campus-99"),
    ).resolves.toBeUndefined();
  });

  it("allows normal user to update their own campus but not another campus", async () => {
    await expect(
      checker.ensureCanUpdate(normalContext as any, { dto: {} }, "campus-1"),
    ).resolves.toBeUndefined();

    await expect(
      checker.ensureCanUpdate(normalContext as any, { dto: {} }, "campus-2"),
    ).rejects.toThrow(ForbiddenError);
  });
});
