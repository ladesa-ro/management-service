import { HttpStatus } from "@nestjs/common";
import { describe, expect, it, vi } from "vitest";
import { AppController } from "./app.controller";
import type { AppService } from "./app.service";

describe("AppController", () => {
  const createMockAppService = (healthStatus: "healthy" | "unavailable" = "healthy") => {
    return {
      getServiceInfo: vi.fn().mockReturnValue({ status: "up" }),
      getLiveness: vi.fn().mockReturnValue({ status: "up" }),
      getReadiness: vi.fn().mockReturnValue({ status: healthStatus, dependencies: {} }),
      healthCheck: vi.fn().mockReturnValue({ status: healthStatus, dependencies: {} }),
    } as unknown as AppService;
  };

  it("should return service info", () => {
    const service = createMockAppService();
    const controller = new AppController(service);
    expect(controller.getServiceInfo()).toEqual({ status: "up" });
  });

  it("should return liveness status", () => {
    const service = createMockAppService();
    const controller = new AppController(service);
    expect(controller.liveness()).toEqual({ status: "up" });
  });

  it("should return 200 on healthCheck when healthy", () => {
    const service = createMockAppService("healthy");
    const controller = new AppController(service);
    const mockRes = { status: vi.fn() };

    const result = controller.healthCheck(mockRes as any);
    expect(result.status).toBe("healthy");
    expect(mockRes.status).not.toHaveBeenCalled();
  });

  it("should set HTTP 503 on healthCheck when unavailable", () => {
    const service = createMockAppService("unavailable");
    const controller = new AppController(service);
    const mockRes = { status: vi.fn() };

    const result = controller.healthCheck(mockRes as any);
    expect(result.status).toBe("unavailable");
    expect(mockRes.status).toHaveBeenCalledWith(HttpStatus.SERVICE_UNAVAILABLE);
  });

  it("should set HTTP 503 on readiness when unavailable", () => {
    const service = createMockAppService("unavailable");
    const controller = new AppController(service);
    const mockRes = { status: vi.fn() };

    const result = controller.readiness(mockRes as any);
    expect(result.status).toBe("unavailable");
    expect(mockRes.status).toHaveBeenCalledWith(HttpStatus.SERVICE_UNAVAILABLE);
  });
});
