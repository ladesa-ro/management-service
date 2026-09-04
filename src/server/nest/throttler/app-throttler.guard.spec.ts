import { describe, expect, it } from "vitest";
import { AppThrottlerGuard } from "./app-throttler.guard";

describe("AppThrottlerGuard", () => {
  const guard = new AppThrottlerGuard({} as any, {} as any, {} as any);

  it("should extract req and res from HTTP context", () => {
    const mockReq = { headers: {} };
    const mockRes = { header: () => {} };

    const mockContext = {
      getType: () => "http",
      switchToHttp: () => ({
        getRequest: () => mockReq,
        getResponse: () => mockRes,
      }),
      getHandler: () => () => {},
      getClass: () => ({}),
      getArgs: () => [],
    };

    const result = (guard as any).getRequestResponse(mockContext as any);
    expect(result.req).toBe(mockReq);
    expect(result.res).toBe(mockRes);
  });

  it("should extract req and res from GraphQL context", () => {
    const mockReq = { headers: {}, res: { header: () => {} } };

    const mockContext = {
      getType: () => "graphql",
      switchToHttp: () => ({
        getRequest: () => undefined,
        getResponse: () => undefined,
      }),
      getHandler: () => () => {},
      getClass: () => ({}),
      getArgs: () => [{}, {}, { req: mockReq }, {}],
    };

    const result = (guard as any).getRequestResponse(mockContext as any);
    expect(result.req).toBe(mockReq);
  });
});
