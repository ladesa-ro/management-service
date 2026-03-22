import { describe, expect, it, vi } from "vitest";
import { CORRELATION_ID_HEADER, correlationIdMiddleware } from "./correlation-id.middleware";

function createMockReq(headers: Record<string, string> = {}) {
  return { headers } as any;
}

function createMockRes() {
  const res = { setHeader: vi.fn() } as any;
  return res;
}

describe("correlationIdMiddleware", () => {
  it("should generate a new correlation ID when none provided", () => {
    const req = createMockReq();
    const res = createMockRes();
    const next = vi.fn();

    correlationIdMiddleware(req, res, next);

    expect(req.correlationId).toBeDefined();
    expect(typeof req.correlationId).toBe("string");
    expect(req.correlationId.length).toBeGreaterThan(0);
    expect(res.setHeader).toHaveBeenCalledWith(CORRELATION_ID_HEADER, req.correlationId);
    expect(next).toHaveBeenCalledOnce();
  });

  it("should reuse existing correlation ID from header", () => {
    const existingId = "abc-123-existing";
    const req = createMockReq({ [CORRELATION_ID_HEADER]: existingId });
    const res = createMockRes();
    const next = vi.fn();

    correlationIdMiddleware(req, res, next);

    expect(req.correlationId).toBe(existingId);
    expect(res.setHeader).toHaveBeenCalledWith(CORRELATION_ID_HEADER, existingId);
  });

  it("should generate new ID when header is empty string", () => {
    const req = createMockReq({ [CORRELATION_ID_HEADER]: "" });
    const res = createMockRes();
    const next = vi.fn();

    correlationIdMiddleware(req, res, next);

    expect(req.correlationId).not.toBe("");
    expect(req.correlationId.length).toBeGreaterThan(0);
  });
});
