import { describe, expect, it, vi } from "vitest";
import { computeBackoffDelay, retryWithBackoff } from "./retry-with-backoff";

describe("computeBackoffDelay", () => {
  it("returns base delay on first attempt with zero jitter", () => {
    vi.spyOn(Math, "random").mockReturnValue(0);
    const delay = computeBackoffDelay(0, { baseDelayMs: 1000, maxDelayMs: 30000, jitterFactor: 0 });
    expect(delay).toBe(1000);
    vi.restoreAllMocks();
  });

  it("doubles delay on each attempt", () => {
    vi.spyOn(Math, "random").mockReturnValue(0);
    const d0 = computeBackoffDelay(0, { baseDelayMs: 100, maxDelayMs: 10000, jitterFactor: 0 });
    const d1 = computeBackoffDelay(1, { baseDelayMs: 100, maxDelayMs: 10000, jitterFactor: 0 });
    const d2 = computeBackoffDelay(2, { baseDelayMs: 100, maxDelayMs: 10000, jitterFactor: 0 });
    expect(d0).toBe(100);
    expect(d1).toBe(200);
    expect(d2).toBe(400);
    vi.restoreAllMocks();
  });

  it("caps at maxDelayMs", () => {
    vi.spyOn(Math, "random").mockReturnValue(0);
    const delay = computeBackoffDelay(20, { baseDelayMs: 1000, maxDelayMs: 5000, jitterFactor: 0 });
    expect(delay).toBe(5000);
    vi.restoreAllMocks();
  });

  it("adds jitter when jitterFactor > 0", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.5);
    const delay = computeBackoffDelay(0, {
      baseDelayMs: 1000,
      maxDelayMs: 30000,
      jitterFactor: 0.4,
    });
    // 1000 * (1 + 0.4 * 0.5) = 1000 * 1.2 = 1200
    expect(delay).toBe(1200);
    vi.restoreAllMocks();
  });
});

describe("retryWithBackoff", () => {
  it("returns immediately on success", async () => {
    const fn = vi.fn().mockResolvedValue("ok");

    const result = await retryWithBackoff(fn, {
      maxRetries: 3,
      baseDelayMs: 1,
      maxDelayMs: 10,
      jitterFactor: 0,
    });

    expect(result).toBe("ok");
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("retries on failure and succeeds", async () => {
    const fn = vi
      .fn()
      .mockRejectedValueOnce(new Error("fail 1"))
      .mockRejectedValueOnce(new Error("fail 2"))
      .mockResolvedValue("ok");

    const result = await retryWithBackoff(fn, {
      maxRetries: 3,
      baseDelayMs: 1,
      maxDelayMs: 10,
      jitterFactor: 0,
    });

    expect(result).toBe("ok");
    expect(fn).toHaveBeenCalledTimes(3);
  });

  it("throws after exhausting retries", async () => {
    const fn = vi.fn().mockRejectedValue(new Error("always fails"));

    await expect(
      retryWithBackoff(fn, {
        maxRetries: 2,
        baseDelayMs: 1,
        maxDelayMs: 10,
        jitterFactor: 0,
      }),
    ).rejects.toThrow("always fails");

    expect(fn).toHaveBeenCalledTimes(3); // 1 initial + 2 retries
  });

  it("calls onRetry before each retry", async () => {
    const onRetry = vi.fn();
    const fn = vi.fn().mockRejectedValueOnce(new Error("fail")).mockResolvedValue("ok");

    await retryWithBackoff(fn, {
      maxRetries: 3,
      baseDelayMs: 1,
      maxDelayMs: 10,
      jitterFactor: 0,
      onRetry,
    });

    expect(onRetry).toHaveBeenCalledTimes(1);
    expect(onRetry).toHaveBeenCalledWith(1, expect.any(Error), expect.any(Number));
  });

  it("throws immediately for non-retryable errors", async () => {
    const fn = vi.fn().mockRejectedValue(new TypeError("not retryable"));

    await expect(
      retryWithBackoff(fn, {
        maxRetries: 5,
        baseDelayMs: 1,
        maxDelayMs: 10,
        jitterFactor: 0,
        retryableError: (err) => err instanceof Error && !(err instanceof TypeError),
      }),
    ).rejects.toThrow("not retryable");

    expect(fn).toHaveBeenCalledTimes(1);
  });
});
