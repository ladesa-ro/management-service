import { describe, expect, it, vi } from "vitest";
import { MigrationRevertService } from "./migration-revert.service";

describe("MigrationRevertService", () => {
  it("should call dataSource.undoLastMigration()", async () => {
    const dataSource = { undoLastMigration: vi.fn().mockResolvedValue(undefined) };
    const service = new MigrationRevertService(dataSource as never);

    await service.execute();

    expect(dataSource.undoLastMigration).toHaveBeenCalledOnce();
  });

  it("should log confirmation message", async () => {
    const dataSource = { undoLastMigration: vi.fn().mockResolvedValue(undefined) };
    const service = new MigrationRevertService(dataSource as never);
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    await service.execute();

    expect(consoleSpy).toHaveBeenCalledWith("Last migration reverted.");
    consoleSpy.mockRestore();
  });

  it("should propagate dataSource errors", async () => {
    const error = new Error("connection failed");
    const dataSource = { undoLastMigration: vi.fn().mockRejectedValue(error) };
    const service = new MigrationRevertService(dataSource as never);

    await expect(service.execute()).rejects.toThrow("connection failed");
  });
});
