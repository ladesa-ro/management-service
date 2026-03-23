import { describe, expect, it } from "vitest";
import { ValidationResult } from "@/domain/validation";
import {
  BusinessRuleViolationError,
  DomainErrorCode,
  EntityValidationError,
  InvalidStateError,
  InvariantViolationError,
} from "./domain.error";

describe("EntityValidationError", () => {
  describe("constructor with a single detail object", () => {
    it("sets code to ENTITY_VALIDATION", () => {
      const error = new EntityValidationError("Campus", {
        field: "apelido",
        message: "obrigatório",
      });
      expect(error.code).toBe(DomainErrorCode.ENTITY_VALIDATION);
    });

    it("wraps a single detail in an array", () => {
      const error = new EntityValidationError("Campus", {
        field: "apelido",
        message: "obrigatório",
      });
      expect(error.details).toHaveLength(1);
      expect(error.details[0]).toEqual({ field: "apelido", message: "obrigatório" });
    });

    it("formats message for a single field", () => {
      const error = new EntityValidationError("Campus", {
        field: "cnpj",
        message: "formato inválido",
      });
      expect(error.message).toBe('[Campus] Campo "cnpj": formato inválido');
    });

    it("sets entity property", () => {
      const error = new EntityValidationError("Turma", { field: "codigo", message: "obrigatório" });
      expect(error.entity).toBe("Turma");
    });
  });

  describe("constructor with an array of details", () => {
    it("accepts an array of details", () => {
      const details = [
        { field: "nomeFantasia", message: "obrigatório" },
        { field: "cnpj", message: "formato inválido" },
      ];
      const error = new EntityValidationError("Campus", details);
      expect(error.details).toHaveLength(2);
    });

    it("formats message listing all field names for multiple errors", () => {
      const details = [
        { field: "nomeFantasia", message: "obrigatório" },
        { field: "cnpj", message: "formato inválido" },
      ];
      const error = new EntityValidationError("Campus", details);
      expect(error.message).toBe("[Campus] Erros de validação nos campos: nomeFantasia, cnpj");
    });
  });

  describe("buildMessage edge cases", () => {
    it("returns generic message when details array is empty", () => {
      const error = new EntityValidationError("Campus", []);
      expect(error.message).toBe("[Campus] Erro de validação");
    });

    it("returns single-field message for exactly one detail", () => {
      const error = new EntityValidationError("Bloco", [{ field: "nome", message: "muito curto" }]);
      expect(error.message).toBe('[Bloco] Campo "nome": muito curto');
    });

    it("returns multi-field message for three or more details", () => {
      const details = [
        { field: "a", message: "err" },
        { field: "b", message: "err" },
        { field: "c", message: "err" },
      ];
      const error = new EntityValidationError("Entidade", details);
      expect(error.message).toBe("[Entidade] Erros de validação nos campos: a, b, c");
    });
  });

  describe("field getter", () => {
    it("returns the field of the first detail", () => {
      const error = new EntityValidationError("Campus", { field: "cnpj", message: "inválido" });
      expect(error.field).toBe("cnpj");
    });

    it("returns empty string when details array is empty", () => {
      const error = new EntityValidationError("Campus", []);
      expect(error.field).toBe("");
    });
  });

  describe("reason getter", () => {
    it("returns the message of the first detail", () => {
      const error = new EntityValidationError("Campus", {
        field: "cnpj",
        message: "formato inválido",
      });
      expect(error.reason).toBe("formato inválido");
    });

    it("returns empty string when details array is empty", () => {
      const error = new EntityValidationError("Campus", []);
      expect(error.reason).toBe("");
    });
  });

  describe("firstDetail getter", () => {
    it("returns the first detail object", () => {
      const detail = { field: "nomeFantasia", message: "obrigatório" };
      const error = new EntityValidationError("Campus", detail);
      expect(error.firstDetail).toEqual(detail);
    });

    it("returns undefined when details array is empty", () => {
      const error = new EntityValidationError("Campus", []);
      expect(error.firstDetail).toBeUndefined();
    });
  });

  describe("fromField", () => {
    it("creates an error from individual field parameters", () => {
      const error = EntityValidationError.fromField("Campus", "cnpj", "formato inválido");
      expect(error.details[0]).toMatchObject({ field: "cnpj", message: "formato inválido" });
    });

    it("includes rule when provided", () => {
      const error = EntityValidationError.fromField(
        "Campus",
        "cnpj",
        "formato inválido",
        "cnpjFormat",
      );
      expect(error.details[0].rule).toBe("cnpjFormat");
    });

    it("includes value when provided", () => {
      const error = EntityValidationError.fromField(
        "Campus",
        "cnpj",
        "formato inválido",
        "cnpjFormat",
        "12345",
      );
      expect(error.details[0].value).toBe("12345");
    });

    it("returns an EntityValidationError instance", () => {
      const error = EntityValidationError.fromField("Campus", "cnpj", "inválido");
      expect(error).toBeInstanceOf(EntityValidationError);
    });
  });

  describe("fromValidationResult", () => {
    it("creates an error from a ValidationResult with errors", () => {
      const result = ValidationResult.invalid("nomeFantasia", "obrigatório", "minLength");
      const error = EntityValidationError.fromValidationResult("Campus", result);
      expect(error).toBeInstanceOf(EntityValidationError);
      expect(error.details).toHaveLength(1);
      expect(error.details[0].field).toBe("nomeFantasia");
    });

    it("creates an error from a ValidationResult with multiple errors", () => {
      const result = ValidationResult.invalid("nomeFantasia", "obrigatório").addError(
        "cnpj",
        "formato inválido",
      );
      const error = EntityValidationError.fromValidationResult("Campus", result);
      expect(error.details).toHaveLength(2);
    });

    it("creates an error from an empty ValidationResult", () => {
      const result = ValidationResult.valid();
      const error = EntityValidationError.fromValidationResult("Campus", result);
      expect(error.details).toHaveLength(0);
      expect(error.message).toBe("[Campus] Erro de validação");
    });
  });

  describe("inheritance", () => {
    it("is an instance of Error", () => {
      const error = new EntityValidationError("Campus", { field: "id", message: "inválido" });
      expect(error).toBeInstanceOf(Error);
    });
  });
});

describe("BusinessRuleViolationError", () => {
  it("sets code to BUSINESS_RULE_VIOLATION", () => {
    const error = new BusinessRuleViolationError("CNPJ_UNICO", "já cadastrado");
    expect(error.code).toBe(DomainErrorCode.BUSINESS_RULE_VIOLATION);
  });

  it("formats message with rule and reason", () => {
    const error = new BusinessRuleViolationError("CNPJ_UNICO", "já cadastrado no sistema");
    expect(error.message).toBe('Regra de negócio "CNPJ_UNICO" violada: já cadastrado no sistema');
  });

  it("exposes rule property", () => {
    const error = new BusinessRuleViolationError("CNPJ_UNICO", "razão");
    expect(error.rule).toBe("CNPJ_UNICO");
  });

  it("exposes reason property", () => {
    const error = new BusinessRuleViolationError("CNPJ_UNICO", "já cadastrado");
    expect(error.reason).toBe("já cadastrado");
  });

  it("is an instance of Error", () => {
    const error = new BusinessRuleViolationError("REGRA", "motivo");
    expect(error).toBeInstanceOf(Error);
  });
});

describe("InvalidStateError", () => {
  it("sets code to INVALID_STATE", () => {
    const error = new InvalidStateError("Turma", "FECHADA", "ABERTA");
    expect(error.code).toBe(DomainErrorCode.INVALID_STATE);
  });

  it("formats message with entity, expected state, and current state", () => {
    const error = new InvalidStateError("Turma", "FECHADA", "ABERTA");
    expect(error.message).toBe('[Turma] Estado inválido: esperado "ABERTA", atual "FECHADA"');
  });

  it("exposes entity property", () => {
    const error = new InvalidStateError("Turma", "FECHADA", "ABERTA");
    expect(error.entity).toBe("Turma");
  });

  it("exposes currentState property", () => {
    const error = new InvalidStateError("Turma", "FECHADA", "ABERTA");
    expect(error.currentState).toBe("FECHADA");
  });

  it("exposes expectedState property", () => {
    const error = new InvalidStateError("Turma", "FECHADA", "ABERTA");
    expect(error.expectedState).toBe("ABERTA");
  });

  it("is an instance of Error", () => {
    const error = new InvalidStateError("Turma", "FECHADA", "ABERTA");
    expect(error).toBeInstanceOf(Error);
  });
});

describe("InvariantViolationError", () => {
  it("sets code to INVARIANT_VIOLATION", () => {
    const error = new InvariantViolationError(
      "DATA_FIM_APOS_INICIO",
      "data de fim anterior ao início",
    );
    expect(error.code).toBe(DomainErrorCode.INVARIANT_VIOLATION);
  });

  it("formats message with invariant name and reason", () => {
    const error = new InvariantViolationError(
      "DATA_FIM_APOS_INICIO",
      "data de fim anterior ao início",
    );
    expect(error.message).toBe(
      'Invariante "DATA_FIM_APOS_INICIO" violada: data de fim anterior ao início',
    );
  });

  it("exposes invariant property", () => {
    const error = new InvariantViolationError("DATA_FIM_APOS_INICIO", "motivo");
    expect(error.invariant).toBe("DATA_FIM_APOS_INICIO");
  });

  it("exposes reason property", () => {
    const error = new InvariantViolationError(
      "DATA_FIM_APOS_INICIO",
      "data de fim anterior ao início",
    );
    expect(error.reason).toBe("data de fim anterior ao início");
  });

  it("is an instance of Error", () => {
    const error = new InvariantViolationError("INVARIANTE", "motivo");
    expect(error).toBeInstanceOf(Error);
  });
});
