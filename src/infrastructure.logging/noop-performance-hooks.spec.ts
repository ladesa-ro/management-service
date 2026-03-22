import { describe, expect, it, vi } from "vitest";
import { PerformanceHooksAdapter } from "./noop-performance-hooks";

describe("PerformanceHooksAdapter", () => {
  it("should return a no-op checkpoint when no listeners registered", () => {
    const hooks = new PerformanceHooksAdapter();
    const checkpoint = hooks.startCheckpoint("test");

    expect(checkpoint.name).toBe("");
    expect(checkpoint.startedAt).toBe(0);
    checkpoint.end(); // should not throw
  });

  it("should measure duration when a listener is registered", async () => {
    const hooks = new PerformanceHooksAdapter();
    const listener = vi.fn();

    hooks.onCheckpointEnd(listener);

    const checkpoint = hooks.startCheckpoint("db.query", { table: "users" });
    expect(checkpoint.name).toBe("db.query");
    expect(checkpoint.startedAt).toBeGreaterThan(0);

    // simulate some work
    await new Promise((r) => setTimeout(r, 5));
    checkpoint.end();

    expect(listener).toHaveBeenCalledOnce();
    const call = listener.mock.calls[0][0];
    expect(call.name).toBe("db.query");
    expect(call.durationMs).toBeGreaterThan(0);
    expect(call.meta).toEqual({ table: "users" });
  });

  it("should support multiple listeners", () => {
    const hooks = new PerformanceHooksAdapter();
    const listener1 = vi.fn();
    const listener2 = vi.fn();

    hooks.onCheckpointEnd(listener1);
    hooks.onCheckpointEnd(listener2);

    const checkpoint = hooks.startCheckpoint("test");
    checkpoint.end();

    expect(listener1).toHaveBeenCalledOnce();
    expect(listener2).toHaveBeenCalledOnce();
  });

  it("should remove listener via cleanup function", () => {
    const hooks = new PerformanceHooksAdapter();
    const listener = vi.fn();

    const cleanup = hooks.onCheckpointEnd(listener);
    cleanup();

    const checkpoint = hooks.startCheckpoint("test");
    // back to no-op since no listeners
    expect(checkpoint.name).toBe("");
  });

  it("should return no-op after all listeners removed", () => {
    const hooks = new PerformanceHooksAdapter();
    const listener = vi.fn();

    const cleanup = hooks.onCheckpointEnd(listener);

    const checkpoint1 = hooks.startCheckpoint("with-listener");
    expect(checkpoint1.name).toBe("with-listener");

    cleanup();

    const checkpoint2 = hooks.startCheckpoint("without-listener");
    expect(checkpoint2.name).toBe("");
  });
});
