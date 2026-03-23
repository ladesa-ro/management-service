import { describe, expect, it, vi } from "vitest";
import { MigrationRunService } from "./migration-run.service";

const createMockDataSource = (migrations: { name: string }[] = []) => ({
  runMigrations: vi.fn().mockResolvedValue(migrations),
});

describe("MigrationRunService", () => {
  it("should call dataSource.runMigrations()", async () => {
    const dataSource = createMockDataSource();
    const service = new MigrationRunService(dataSource as never);

    await service.execute();

    expect(dataSource.runMigrations).toHaveBeenCalledOnce();
  });

  it("should log message when no pending migrations", async () => {
    const dataSource = createMockDataSource([]);
    const service = new MigrationRunService(dataSource as never);
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    await service.execute();

    expect(consoleSpy).toHaveBeenCalledWith("No pending migrations.");
    consoleSpy.mockRestore();
  });

  it("should log executed migration names", async () => {
    const migrations = [{ name: "Migration1" }, { name: "Migration2" }];
    const dataSource = createMockDataSource(migrations);
    const service = new MigrationRunService(dataSource as never);
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    await service.execute();

    expect(consoleSpy).toHaveBeenCalledWith("Executed 2 migration(s):");
    expect(consoleSpy).toHaveBeenCalledWith("  - Migration1");
    expect(consoleSpy).toHaveBeenCalledWith("  - Migration2");
    consoleSpy.mockRestore();
  });

  it("should propagate dataSource errors", async () => {
    const error = new Error("connection failed");
    const dataSource = { runMigrations: vi.fn().mockRejectedValue(error) };
    const service = new MigrationRunService(dataSource as never);

    await expect(service.execute()).rejects.toThrow("connection failed");
  });
});
