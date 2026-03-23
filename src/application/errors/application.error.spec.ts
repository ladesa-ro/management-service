import { describe, expect, it } from "vitest";
import {
  ApplicationErrorCode,
  ConflictError,
  ForbiddenError,
  InternalError,
  ResourceNotFoundError,
  ServiceUnavailableError,
  UnauthorizedError,
  ValidationError,
} from "./application.error";

describe("ResourceNotFoundError", () => {
  it("sets code to RESOURCE_NOT_FOUND", () => {
    const error = new ResourceNotFoundError("Campus");
    expect(error.code).toBe(ApplicationErrorCode.RESOURCE_NOT_FOUND);
  });

  it("formats message without identifier", () => {
    const error = new ResourceNotFoundError("Campus");
    expect(error.message).toBe("Campus não encontrado(a).");
  });

  it("formats message with a string identifier", () => {
    const error = new ResourceNotFoundError("Campus", "abc-123");
    expect(error.message).toBe('Campus com identificador "abc-123" não encontrado(a).');
  });

  it("formats message with a numeric identifier", () => {
    const error = new ResourceNotFoundError("Cidade", 42);
    expect(error.message).toBe('Cidade com identificador "42" não encontrado(a).');
  });

  it("exposes resource property", () => {
    const error = new ResourceNotFoundError("Turma");
    expect(error.resource).toBe("Turma");
  });

  it("exposes identifier property when provided", () => {
    const error = new ResourceNotFoundError("Campus", "uuid-456");
    expect(error.identifier).toBe("uuid-456");
  });

  it("identifier is undefined when not provided", () => {
    const error = new ResourceNotFoundError("Campus");
    expect(error.identifier).toBeUndefined();
  });

  it("is an instance of Error", () => {
    const error = new ResourceNotFoundError("Campus");
    expect(error).toBeInstanceOf(Error);
  });
});

describe("ForbiddenError", () => {
  it("sets code to FORBIDDEN", () => {
    const error = new ForbiddenError();
    expect(error.code).toBe(ApplicationErrorCode.FORBIDDEN);
  });

  it("uses default message when none is provided", () => {
    const error = new ForbiddenError();
    expect(error.message).toBe("Você não tem permissão para acessar este recurso.");
  });

  it("uses custom message when provided", () => {
    const error = new ForbiddenError("Apenas administradores podem fazer isso.");
    expect(error.message).toBe("Apenas administradores podem fazer isso.");
  });

  it("requiredPermission is undefined when not provided", () => {
    const error = new ForbiddenError();
    expect(error.requiredPermission).toBeUndefined();
  });

  it("exposes requiredPermission when provided", () => {
    const error = new ForbiddenError("Sem permissão.", "campus:delete");
    expect(error.requiredPermission).toBe("campus:delete");
  });

  it("is an instance of Error", () => {
    const error = new ForbiddenError();
    expect(error).toBeInstanceOf(Error);
  });
});

describe("UnauthorizedError", () => {
  it("sets code to UNAUTHORIZED", () => {
    const error = new UnauthorizedError();
    expect(error.code).toBe(ApplicationErrorCode.UNAUTHORIZED);
  });

  it("uses default message when none is provided", () => {
    const error = new UnauthorizedError();
    expect(error.message).toBe("Autenticação necessária para acessar este recurso.");
  });

  it("uses custom message when provided", () => {
    const error = new UnauthorizedError("Token expirado.");
    expect(error.message).toBe("Token expirado.");
  });

  it("is an instance of Error", () => {
    const error = new UnauthorizedError();
    expect(error).toBeInstanceOf(Error);
  });
});

describe("ValidationError", () => {
  describe("constructor", () => {
    it("sets code to VALIDATION", () => {
      const error = new ValidationError([]);
      expect(error.code).toBe(ApplicationErrorCode.VALIDATION);
    });

    it("stores provided details", () => {
      const details = [{ field: "cnpj", message: "formato inválido" }];
      const error = new ValidationError(details);
      expect(error.details).toEqual(details);
    });

    it("uses provided message when given", () => {
      const error = new ValidationError([], "Mensagem personalizada.");
      expect(error.message).toBe("Mensagem personalizada.");
    });
  });

  describe("buildMessage", () => {
    it("returns generic message for zero details", () => {
      const error = new ValidationError([]);
      expect(error.message).toBe("Erro de validação nos dados de entrada.");
    });

    it("returns field-specific message for one detail", () => {
      const error = new ValidationError([{ field: "cnpj", message: "formato inválido" }]);
      expect(error.message).toBe("Erro de validação: formato inválido");
    });

    it("returns count message for multiple details", () => {
      const details = [
        { field: "cnpj", message: "formato inválido" },
        { field: "nomeFantasia", message: "obrigatório" },
      ];
      const error = new ValidationError(details);
      expect(error.message).toBe("Erro de validação em 2 campo(s).");
    });

    it("count message reflects actual number of details", () => {
      const details = [
        { field: "a", message: "err" },
        { field: "b", message: "err" },
        { field: "c", message: "err" },
      ];
      const error = new ValidationError(details);
      expect(error.message).toBe("Erro de validação em 3 campo(s).");
    });
  });

  describe("fromField", () => {
    it("creates an error with a single detail", () => {
      const error = ValidationError.fromField("cnpj", "formato inválido");
      expect(error.details).toHaveLength(1);
      expect(error.details[0]).toMatchObject({ field: "cnpj", message: "formato inválido" });
    });

    it("includes rule when provided", () => {
      const error = ValidationError.fromField("cnpj", "formato inválido", "cnpjFormat");
      expect(error.details[0].rule).toBe("cnpjFormat");
    });

    it("includes value when provided", () => {
      const error = ValidationError.fromField("cnpj", "formato inválido", "cnpjFormat", "12345");
      expect(error.details[0].value).toBe("12345");
    });

    it("returns a ValidationError instance", () => {
      const error = ValidationError.fromField("campo", "mensagem");
      expect(error).toBeInstanceOf(ValidationError);
    });
  });

  describe("fromFields", () => {
    it("creates an error from an array of details", () => {
      const details = [
        { field: "cnpj", message: "formato inválido" },
        { field: "nomeFantasia", message: "obrigatório" },
      ];
      const error = ValidationError.fromFields(details);
      expect(error.details).toEqual(details);
    });

    it("returns a ValidationError instance", () => {
      const error = ValidationError.fromFields([]);
      expect(error).toBeInstanceOf(ValidationError);
    });
  });

  it("is an instance of Error", () => {
    const error = new ValidationError([]);
    expect(error).toBeInstanceOf(Error);
  });
});

describe("ConflictError", () => {
  it("sets code to CONFLICT", () => {
    const error = new ConflictError("CNPJ já cadastrado.");
    expect(error.code).toBe(ApplicationErrorCode.CONFLICT);
  });

  it("uses provided message", () => {
    const error = new ConflictError("CNPJ já cadastrado.");
    expect(error.message).toBe("CNPJ já cadastrado.");
  });

  it("conflictingResource is undefined when not provided", () => {
    const error = new ConflictError("Conflito.");
    expect(error.conflictingResource).toBeUndefined();
  });

  it("exposes conflictingResource when provided", () => {
    const error = new ConflictError("Conflito.", "Campus");
    expect(error.conflictingResource).toBe("Campus");
  });

  it("is an instance of Error", () => {
    const error = new ConflictError("Conflito.");
    expect(error).toBeInstanceOf(Error);
  });
});

describe("InternalError", () => {
  it("sets code to INTERNAL", () => {
    const error = new InternalError();
    expect(error.code).toBe(ApplicationErrorCode.INTERNAL);
  });

  it("uses default message when none is provided", () => {
    const error = new InternalError();
    expect(error.message).toBe("Ocorreu um erro interno. Tente novamente mais tarde.");
  });

  it("uses custom message when provided", () => {
    const error = new InternalError("Falha ao processar a requisição.");
    expect(error.message).toBe("Falha ao processar a requisição.");
  });

  it("cause is undefined when not provided", () => {
    const error = new InternalError();
    expect(error.cause).toBeUndefined();
  });

  it("exposes cause when provided", () => {
    const originalError = new Error("conexão recusada");
    const error = new InternalError("Erro interno.", originalError);
    expect(error.cause).toBe(originalError);
  });

  it("is an instance of Error", () => {
    const error = new InternalError();
    expect(error).toBeInstanceOf(Error);
  });
});

describe("ServiceUnavailableError", () => {
  it("sets code to SERVICE_UNAVAILABLE", () => {
    const error = new ServiceUnavailableError();
    expect(error.code).toBe(ApplicationErrorCode.SERVICE_UNAVAILABLE);
  });

  it("uses default message when none is provided", () => {
    const error = new ServiceUnavailableError();
    expect(error.message).toBe("Serviço temporariamente indisponível. Tente novamente mais tarde.");
  });

  it("uses custom message when provided", () => {
    const error = new ServiceUnavailableError("Keycloak indisponível.");
    expect(error.message).toBe("Keycloak indisponível.");
  });

  it("serviceName is undefined when not provided", () => {
    const error = new ServiceUnavailableError();
    expect(error.serviceName).toBeUndefined();
  });

  it("exposes serviceName when provided", () => {
    const error = new ServiceUnavailableError("Serviço indisponível.", "Keycloak");
    expect(error.serviceName).toBe("Keycloak");
  });

  it("is an instance of Error", () => {
    const error = new ServiceUnavailableError();
    expect(error).toBeInstanceOf(Error);
  });
});
