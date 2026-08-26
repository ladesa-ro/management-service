import { describe, expect, it } from "vitest";
import { CompanyScoreService } from "./company-score.service";

describe("CompanyScoreService", () => {
  const now = new Date("2026-08-26T12:00:00.000Z");

  it("should return 0 score and empty metrics when company has no reviews", () => {
    const result = CompanyScoreService.calculate([], { referenceDate: now });

    expect(result.score).toBe(0);
    expect(result.averageRating).toBe(0);
    expect(result.totalReviews).toBe(0);
    expect(result.distribution).toEqual({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });
    expect(result.scoreVersion).toBe(1);
    expect(result.indicators.totalReviews).toBe(0);
  });

  it("should mitigate single 5-star review using Bayesian prior instead of giving 100", () => {
    const reviews = [{ rating: 5, dateCreated: "2026-08-26T10:00:00.000Z" }];

    const result = CompanyScoreService.calculate(reviews, { referenceDate: now });

    // With 1 review of 5.0 and prior mean 3.5 (weight 5.0):
    // bayesian rating = (3.5 * 5 + 5 * 1) / (5 + 1) = 22.5 / 6 = 3.75
    // score = ((3.75 - 1) / 4) * 100 = 68.75
    expect(result.averageRating).toBe(5.0);
    expect(result.totalReviews).toBe(1);
    expect(result.distribution[5]).toBe(1);
    expect(result.score).toBe(68.75);
    expect(result.score).toBeLessThan(100);
  });

  it("should converge close to 100 with large number of 5-star reviews", () => {
    const reviews = Array.from({ length: 500 }, () => ({
      rating: 5,
      dateCreated: "2026-08-26T11:00:00.000Z",
    }));

    const result = CompanyScoreService.calculate(reviews, { referenceDate: now });

    expect(result.averageRating).toBe(5.0);
    expect(result.totalReviews).toBe(500);
    expect(result.score).toBeGreaterThan(98.5);
    expect(result.score).toBeLessThanOrEqual(100);
  });

  it("should mitigate single 1-star review using Bayesian prior instead of giving 0", () => {
    const reviews = [{ rating: 1, dateCreated: "2026-08-26T10:00:00.000Z" }];

    const result = CompanyScoreService.calculate(reviews, { referenceDate: now });

    // bayesian rating = (3.5 * 5 + 1 * 1) / 6 = 18.5 / 6 = 3.0833
    // score = ((3.0833 - 1) / 4) * 100 = 52.08
    expect(result.averageRating).toBe(1.0);
    expect(result.totalReviews).toBe(1);
    expect(result.distribution[1]).toBe(1);
    expect(result.score).toBeCloseTo(52.08, 1);
  });

  it("should converge close to 0 with large number of 1-star reviews", () => {
    const reviews = Array.from({ length: 500 }, () => ({
      rating: 1,
      dateCreated: "2026-08-26T11:00:00.000Z",
    }));

    const result = CompanyScoreService.calculate(reviews, { referenceDate: now });

    expect(result.averageRating).toBe(1.0);
    expect(result.totalReviews).toBe(500);
    expect(result.score).toBeLessThan(1.5);
    expect(result.score).toBeGreaterThanOrEqual(0);
  });

  it("should give higher weight to recent reviews compared to old reviews", () => {
    // 10 old 5-star reviews (360 days ago = ~2 half-lives ago, weight ~0.25 each -> sum weight ~2.5)
    const oldReviews = Array.from({ length: 10 }, () => ({
      rating: 5,
      dateCreated: "2025-08-31T12:00:00.000Z",
    }));

    // 10 new 1-star reviews (today, weight ~1.0 each -> sum weight ~10.0)
    const newReviews = Array.from({ length: 10 }, () => ({
      rating: 1,
      dateCreated: "2026-08-26T11:00:00.000Z",
    }));

    const result = CompanyScoreService.calculate([...oldReviews, ...newReviews], {
      referenceDate: now,
    });

    // The raw average is 3.0 (half 5s, half 1s)
    expect(result.averageRating).toBe(3.0);
    // But because recent reviews are 1-star, the weighted score will be significantly lower than 3.0
    expect(result.indicators.weightedAverageRating).toBeLessThan(2.2);
    expect(result.score).toBeLessThan(50);
  });

  it("should correctly record distribution across all ratings 1 to 5", () => {
    const reviews = [
      { rating: 1, dateCreated: "2026-08-20T00:00:00.000Z" },
      { rating: 2, dateCreated: "2026-08-21T00:00:00.000Z" },
      { rating: 3, dateCreated: "2026-08-22T00:00:00.000Z" },
      { rating: 4, dateCreated: "2026-08-23T00:00:00.000Z" },
      { rating: 5, dateCreated: "2026-08-24T00:00:00.000Z" },
      { rating: 5, dateCreated: "2026-08-25T00:00:00.000Z" },
    ];

    const result = CompanyScoreService.calculate(reviews, { referenceDate: now });

    expect(result.distribution).toEqual({
      1: 1,
      2: 1,
      3: 1,
      4: 1,
      5: 2,
    });
    expect(result.totalReviews).toBe(6);
  });
});
