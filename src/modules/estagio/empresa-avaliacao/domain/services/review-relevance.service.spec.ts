import { describe, expect, it } from "vitest";
import { ReviewRelevanceService } from "./review-relevance.service";

describe("ReviewRelevanceService", () => {
  const now = new Date("2026-08-26T12:00:00.000Z");

  it("should calculate baseline relevance for a new review without likes or comment", () => {
    const score = ReviewRelevanceService.calculate(
      {
        likesCount: 0,
        dateCreated: "2026-08-26T12:00:00.000Z",
        comentario: "",
      },
      { referenceDate: now },
    );

    // Likes factor = ln(1+0) = 0
    // Recency factor = 1 / (1 + 0/90) = 1.0 * 3.0 = 3.0
    // Content factor = 0 * 2.0 = 0
    expect(score).toBe(3.0);
  });

  it("should increase relevance score with likes", () => {
    const score0 = ReviewRelevanceService.calculate(
      { likesCount: 0, dateCreated: "2026-08-26T12:00:00.000Z" },
      { referenceDate: now },
    );
    const score5 = ReviewRelevanceService.calculate(
      { likesCount: 5, dateCreated: "2026-08-26T12:00:00.000Z" },
      { referenceDate: now },
    );
    const score50 = ReviewRelevanceService.calculate(
      { likesCount: 50, dateCreated: "2026-08-26T12:00:00.000Z" },
      { referenceDate: now },
    );

    expect(score5).toBeGreaterThan(score0);
    expect(score50).toBeGreaterThan(score5);
  });

  it("should reward detailed constructive comments over empty comments", () => {
    const shortReview = ReviewRelevanceService.calculate(
      {
        likesCount: 0,
        dateCreated: "2026-08-26T12:00:00.000Z",
        comentario: "Bom",
      },
      { referenceDate: now },
    );

    const detailedReview = ReviewRelevanceService.calculate(
      {
        likesCount: 0,
        dateCreated: "2026-08-26T12:00:00.000Z",
        comentario:
          "Excelente empresa com ambiente colaborativo, mentoria contínua dos supervisores e oportunidade real de aprendizado e efetivação.",
      },
      { referenceDate: now },
    );

    expect(detailedReview).toBeGreaterThan(shortReview);
  });

  it("should balance recency so an older comment with likes can eventually be overtaken by fresh popular comment", () => {
    // 1 year old comment with 10 likes
    const oldComment = ReviewRelevanceService.calculate(
      {
        likesCount: 10,
        dateCreated: "2025-08-26T12:00:00.000Z",
        comentario: "Empresa muito boa para trabalhar!",
      },
      { referenceDate: now },
    );

    // 2 days old comment with 8 likes
    const freshComment = ReviewRelevanceService.calculate(
      {
        likesCount: 8,
        dateCreated: "2026-08-24T12:00:00.000Z",
        comentario: "Empresa muito boa para trabalhar!",
      },
      { referenceDate: now },
    );

    expect(freshComment).toBeGreaterThan(oldComment);
  });
});
