import { describe, expect, it, vi } from "vitest";
import { createTestAccessContext, createTestId } from "@/test/helpers";
import { EmpresaScoreRestController } from "./empresa-score.rest.controller";

describe("EmpresaScoreRestController", () => {
  it("getScore should delegate to findOneHandler and return formatted output", async () => {
    const findOneHandler = { execute: vi.fn() };
    const recalculateHandler = { execute: vi.fn() };
    const controller = new EmpresaScoreRestController(
      findOneHandler as any,
      recalculateHandler as any,
    );

    const empresaId = createTestId();
    const scoreResult = {
      id: createTestId(),
      empresaId,
      score: 85.5,
      averageRating: 4.5,
      totalReviews: 10,
      distribution: { 1: 0, 2: 0, 3: 1, 4: 3, 5: 6 },
      scoreVersion: 1,
      indicators: { priorMean: 3.5 },
      calculatedAt: "2026-08-26T12:00:00.000Z",
    };
    findOneHandler.execute.mockResolvedValue(scoreResult);

    const accessContext = createTestAccessContext();
    const result = await controller.getScore(accessContext, empresaId);

    expect(result.score).toBe(85.5);
    expect(result.averageRating).toBe(4.5);
    expect(findOneHandler.execute).toHaveBeenCalledWith(accessContext, { empresaId });
  });

  it("recalculateScore should delegate to recalculateHandler", async () => {
    const findOneHandler = { execute: vi.fn() };
    const recalculateHandler = { execute: vi.fn() };
    const controller = new EmpresaScoreRestController(
      findOneHandler as any,
      recalculateHandler as any,
    );

    const empresaId = createTestId();
    const scoreResult = {
      id: createTestId(),
      empresaId,
      score: 90.0,
      averageRating: 4.8,
      totalReviews: 20,
      distribution: { 1: 0, 2: 0, 3: 0, 4: 4, 5: 16 },
      scoreVersion: 1,
      calculatedAt: "2026-08-26T12:00:00.000Z",
    };
    recalculateHandler.execute.mockResolvedValue(scoreResult);

    const accessContext = createTestAccessContext();
    const result = await controller.recalculateScore(accessContext, empresaId);

    expect(result.score).toBe(90.0);
    expect(recalculateHandler.execute).toHaveBeenCalledWith(accessContext, { empresaId });
  });
});
