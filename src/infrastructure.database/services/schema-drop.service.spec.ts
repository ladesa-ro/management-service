import { describe, expect, it, vi } from "vitest";
import { SchemaDropService } from "./schema-drop.service";

describe("SchemaDropService", () => {
  it("should call dataSource.dropDatabase()", async () => {
    const dataSource = { dropDatabase: vi.fn().mockResolvedValue(undefined) };
    const service = new SchemaDropService(dataSource as never);

    await service.execute();

    expect(dataSource.dropDatabase).toHaveBeenCalledOnce();
  });

  it("should log confirmation message", async () => {
    const dataSource = { dropDatabase: vi.fn().mockResolvedValue(undefined) };
    const service = new SchemaDropService(dataSource as never);
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    await service.execute();

    expect(consoleSpy).toHaveBeenCalledWith("Database schema dropped.");
    consoleSpy.mockRestore();
  });

  it("should propagate dataSource errors", async () => {
    const error = new Error("connection failed");
    const dataSource = { dropDatabase: vi.fn().mockRejectedValue(error) };
    const service = new SchemaDropService(dataSource as never);

    await expect(service.execute()).rejects.toThrow("connection failed");
  });
});
