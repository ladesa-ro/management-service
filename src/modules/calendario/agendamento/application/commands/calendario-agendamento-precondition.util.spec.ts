import { describe, expect, it } from "vitest";
import { GoneError, PreconditionFailedError } from "@/application/errors/application.error";
import { createTestId } from "@/test/helpers";
import { CalendarioAgendamento } from "../../domain/calendario-agendamento";
import { CalendarioAgendamentoTipo } from "../../domain/calendario-agendamento.types";
import { ensureIfMatch } from "./calendario-agendamento-precondition.util";

function criarAgendamento() {
  return CalendarioAgendamento.create({
    tipo: CalendarioAgendamentoTipo.AULA,
    dataInicio: "2026-03-02",
    diaInteiro: false,
    horarioInicio: "08:00:00",
    horarioFim: "09:00:00",
  });
}

describe("ensureIfMatch", () => {
  it("does not throw when ifMatch is absent and the entity is active", () => {
    const agendamento = criarAgendamento();
    expect(() => ensureIfMatch(agendamento, undefined, agendamento.id)).not.toThrow();
  });

  it("falls back to GoneError (regressão: comportamento anterior) when ifMatch is absent and the entity was superseded", () => {
    const agendamento = criarAgendamento();
    agendamento.close();

    expect(() => ensureIfMatch(agendamento, undefined, agendamento.id)).toThrow(GoneError);
  });

  it("does not throw when ifMatch matches the current version and the entity is active", () => {
    const agendamento = criarAgendamento();
    expect(() => ensureIfMatch(agendamento, String(agendamento.version), agendamento.id)).not.toThrow();
  });

  it("rejects with PreconditionFailedError when ifMatch does not match the current version", () => {
    const agendamento = criarAgendamento();

    expect(() => ensureIfMatch(agendamento, "999", agendamento.id)).toThrow(
      PreconditionFailedError,
    );
  });

  it("rejects with PreconditionFailedError when ifMatch is not a valid integer", () => {
    const agendamento = criarAgendamento();

    expect(() => ensureIfMatch(agendamento, "not-a-number", agendamento.id)).toThrow(
      PreconditionFailedError,
    );
  });

  it("cenário de corrida real: carrega versão N, outro escreve (fecha a versão), primeiro tenta escrever com N e é rejeitado com 412", () => {
    const agendamento = criarAgendamento();
    const versaoLidaPeloPrimeiroCliente = String(agendamento.version);

    // "outro escreve": fecha a versão que ambos os clientes leram, como
    // saveNewVersion faz ao promover uma nova versão.
    agendamento.close();

    expect(() =>
      ensureIfMatch(agendamento, versaoLidaPeloPrimeiroCliente, agendamento.id),
    ).toThrow(PreconditionFailedError);
  });

  it("PreconditionFailedError exposes resource and identifier", () => {
    const agendamento = criarAgendamento();
    const id = createTestId();

    try {
      ensureIfMatch(agendamento, "999", id);
      throw new Error("should have thrown");
    } catch (error) {
      expect(error).toBeInstanceOf(PreconditionFailedError);
      expect((error as PreconditionFailedError).resource).toBe(CalendarioAgendamento.entityName);
      expect((error as PreconditionFailedError).identifier).toBe(id);
    }
  });
});
