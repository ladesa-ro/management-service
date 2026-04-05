import { describe, expect, it } from "vitest";
import { createTestId } from "@/test/helpers";
import {
  CALENDARIO_AGENDAMENTO_CORES_PERMITIDAS,
  CalendarioAgendamentoCreateSchema,
  CalendarioAgendamentoMetadataSchema,
  CalendarioAgendamentoMetadataUpdateSchema,
  CalendarioAgendamentoReviseSchema,
} from "./calendario-agendamento.schemas";
import {
  CalendarioAgendamentoStatus,
  CalendarioAgendamentoTipo,
} from "./calendario-agendamento.types";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const createSchema = CalendarioAgendamentoCreateSchema.domain;

const baseCreateInput = () => ({
  tipo: CalendarioAgendamentoTipo.EVENTO,
  dataInicio: "2026-03-15",
  diaInteiro: true,
});

// ---------------------------------------------------------------------------
// dataFim >= dataInicio (Create)
// ---------------------------------------------------------------------------

describe("CalendarioAgendamentoCreateSchema — dataFim >= dataInicio", () => {
  it("should accept when dataFim > dataInicio", () => {
    const result = createSchema.safeParse({
      ...baseCreateInput(),
      dataFim: "2026-03-20",
    });

    expect(result.success).toBe(true);
  });

  it("should accept when dataFim == dataInicio", () => {
    const result = createSchema.safeParse({
      ...baseCreateInput(),
      dataFim: "2026-03-15",
    });

    expect(result.success).toBe(true);
  });

  it("should reject when dataFim < dataInicio", () => {
    const result = createSchema.safeParse({
      ...baseCreateInput(),
      dataFim: "2026-03-10",
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      const dataFimErrors = result.error.issues.filter((i) => i.path.includes("dataFim"));
      expect(dataFimErrors.length).toBeGreaterThan(0);
    }
  });

  it("should accept when dataFim is null", () => {
    const result = createSchema.safeParse({
      ...baseCreateInput(),
      dataFim: null,
    });

    expect(result.success).toBe(true);
  });

  it("should accept when dataFim is undefined (not provided)", () => {
    const result = createSchema.safeParse(baseCreateInput());

    expect(result.success).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// dataFim >= dataInicio (Revise)
// ---------------------------------------------------------------------------

describe("CalendarioAgendamentoReviseSchema — dataFim >= dataInicio", () => {
  it("should accept when dataFim > dataInicio", () => {
    const result = CalendarioAgendamentoReviseSchema.safeParse({
      dataInicio: "2026-03-15",
      dataFim: "2026-03-20",
    });

    expect(result.success).toBe(true);
  });

  it("should accept when dataFim == dataInicio", () => {
    const result = CalendarioAgendamentoReviseSchema.safeParse({
      dataInicio: "2026-03-15",
      dataFim: "2026-03-15",
    });

    expect(result.success).toBe(true);
  });

  it("should reject when dataFim < dataInicio", () => {
    const result = CalendarioAgendamentoReviseSchema.safeParse({
      dataInicio: "2026-03-15",
      dataFim: "2026-03-10",
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      const dataFimErrors = result.error.issues.filter((i) => i.path.includes("dataFim"));
      expect(dataFimErrors.length).toBeGreaterThan(0);
    }
  });

  it("should accept when dataFim is null", () => {
    const result = CalendarioAgendamentoReviseSchema.safeParse({
      dataInicio: "2026-03-15",
      dataFim: null,
    });

    expect(result.success).toBe(true);
  });

  it("should accept when dataFim is undefined (not provided)", () => {
    const result = CalendarioAgendamentoReviseSchema.safeParse({
      dataInicio: "2026-03-15",
    });

    expect(result.success).toBe(true);
  });

  it("should accept empty object (all fields optional)", () => {
    const result = CalendarioAgendamentoReviseSchema.safeParse({});

    expect(result.success).toBe(true);
  });

  it("should validate dataFim >= dataInicio when both provided in update", () => {
    const result = CalendarioAgendamentoReviseSchema.safeParse({
      dataInicio: "2026-04-01",
      dataFim: "2026-03-01",
    });

    expect(result.success).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// Color palette validation
// ---------------------------------------------------------------------------

describe("CALENDARIO_AGENDAMENTO_CORES_PERMITIDAS", () => {
  it("should contain exactly 10 colors", () => {
    expect(CALENDARIO_AGENDAMENTO_CORES_PERMITIDAS).toHaveLength(10);
  });

  it("all 10 palette colors should be valid in MetadataUpdateSchema", () => {
    for (const cor of CALENDARIO_AGENDAMENTO_CORES_PERMITIDAS) {
      const result = CalendarioAgendamentoMetadataUpdateSchema.safeParse({ cor });
      expect(result.success).toBe(true);
    }
  });
});

describe("corSchema (via MetadataUpdateSchema)", () => {
  it("should accept valid palette color (#2f9e41)", () => {
    const result = CalendarioAgendamentoMetadataUpdateSchema.safeParse({
      cor: "#2f9e41",
    });

    expect(result.success).toBe(true);
  });

  it("should reject invalid hex color (#000000)", () => {
    const result = CalendarioAgendamentoMetadataUpdateSchema.safeParse({
      cor: "#000000",
    });

    expect(result.success).toBe(false);
  });

  it("should accept null color", () => {
    const result = CalendarioAgendamentoMetadataUpdateSchema.safeParse({
      cor: null,
    });

    expect(result.success).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// MetadataSchema (full — for load)
// ---------------------------------------------------------------------------

describe("CalendarioAgendamentoMetadataSchema", () => {
  it("should accept valid metadata", () => {
    const result = CalendarioAgendamentoMetadataSchema.safeParse({
      id: createTestId(),
      identificadorExternoCalendarioAgendamento: createTestId(),
      nome: "Semana de Provas",
      cor: "#2f9e41",
      dateUpdated: "2026-03-15T00:00:00.000Z",
    });

    expect(result.success).toBe(true);
  });

  it("should reject invalid cor", () => {
    const result = CalendarioAgendamentoMetadataSchema.safeParse({
      id: createTestId(),
      identificadorExternoCalendarioAgendamento: createTestId(),
      nome: "Semana de Provas",
      cor: "#ffffff",
      dateUpdated: "2026-03-15T00:00:00.000Z",
    });

    expect(result.success).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// Create schema — required fields and defaults
// ---------------------------------------------------------------------------

describe("CalendarioAgendamentoCreateSchema — required fields and defaults", () => {
  it("should require tipo", () => {
    const { tipo: _, ...input } = baseCreateInput();
    const result = createSchema.safeParse(input);

    expect(result.success).toBe(false);
  });

  it("should require dataInicio", () => {
    const { dataInicio: _, ...input } = baseCreateInput();
    const result = createSchema.safeParse(input);

    expect(result.success).toBe(false);
  });

  it("should require diaInteiro", () => {
    const { diaInteiro: _, ...input } = baseCreateInput();
    const result = createSchema.safeParse(input);

    expect(result.success).toBe(false);
  });

  it("should default status to ATIVO", () => {
    const result = createSchema.safeParse(baseCreateInput());

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data.status).toBe(CalendarioAgendamentoStatus.ATIVO);
    }
  });

  it("should default junction arrays to empty", () => {
    const result = createSchema.safeParse(baseCreateInput());

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data.turmas).toEqual([]);
      expect(result.data.perfis).toEqual([]);
      expect(result.data.calendariosLetivos).toEqual([]);
      expect(result.data.ofertasFormacao).toEqual([]);
      expect(result.data.modalidades).toEqual([]);
      expect(result.data.ambientes).toEqual([]);
      expect(result.data.diarios).toEqual([]);
    }
  });
});
