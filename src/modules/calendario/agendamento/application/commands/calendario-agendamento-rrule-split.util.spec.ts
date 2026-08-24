import { rrulestr } from "rrule";
import { describe, expect, it } from "vitest";
import { dividirRegraRecorrencia } from "./calendario-agendamento-rrule-split.util";

function toDateOnly(dates: Date[]): string[] {
  return dates.map((d) => d.toISOString().slice(0, 10));
}

describe("dividirRegraRecorrencia", () => {
  it("should truncate the old rule to end the day before the cut date (COUNT-based)", () => {
    const dtstart = new Date("2026-03-02T00:00:00Z");
    const dataCorte = new Date("2026-03-06T00:00:00Z");

    const { regraAntiga } = dividirRegraRecorrencia("FREQ=DAILY;COUNT=10", dtstart, dataCorte);

    const datasAntigas = toDateOnly(rrulestr(regraAntiga, { dtstart }).all());

    expect(datasAntigas).toEqual(["2026-03-02", "2026-03-03", "2026-03-04", "2026-03-05"]);
  });

  it("should recompute COUNT for the new rule so it covers only remaining occurrences", () => {
    const dtstart = new Date("2026-03-02T00:00:00Z");
    const dataCorte = new Date("2026-03-06T00:00:00Z");

    const { regraNova } = dividirRegraRecorrencia("FREQ=DAILY;COUNT=10", dtstart, dataCorte);

    const datasNovas = toDateOnly(rrulestr(regraNova, { dtstart: dataCorte }).all());

    expect(datasNovas).toEqual([
      "2026-03-06",
      "2026-03-07",
      "2026-03-08",
      "2026-03-09",
      "2026-03-10",
      "2026-03-11",
    ]);
  });

  it("should keep the same UNTIL for the new rule when the original rule is UNTIL-based", () => {
    const dtstart = new Date("2026-03-02T00:00:00Z");
    const dataCorte = new Date("2026-03-16T00:00:00Z");

    const { regraAntiga, regraNova } = dividirRegraRecorrencia(
      "FREQ=WEEKLY;UNTIL=20260401T000000Z",
      dtstart,
      dataCorte,
    );

    expect(regraAntiga).toContain("UNTIL=20260315");
    expect(regraNova).toContain("UNTIL=20260401T000000Z");
  });

  it("should leave an infinite rule infinite on both halves", () => {
    const dtstart = new Date("2026-03-02T00:00:00Z");
    const dataCorte = new Date("2026-03-16T00:00:00Z");

    const { regraAntiga, regraNova } = dividirRegraRecorrencia(
      "FREQ=WEEKLY;BYDAY=MO",
      dtstart,
      dataCorte,
    );

    expect(regraAntiga).not.toContain("COUNT");
    expect(regraNova).not.toContain("COUNT");
    expect(regraNova).not.toContain("UNTIL");
  });

  it("should not embed DTSTART in either resulting rule", () => {
    const dtstart = new Date("2026-03-02T00:00:00Z");
    const dataCorte = new Date("2026-03-06T00:00:00Z");

    const { regraAntiga, regraNova } = dividirRegraRecorrencia(
      "FREQ=DAILY;COUNT=10",
      dtstart,
      dataCorte,
    );

    expect(regraAntiga).not.toContain("DTSTART");
    expect(regraNova).not.toContain("DTSTART");
  });
});
