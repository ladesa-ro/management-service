import { describe, expect, it } from "vitest";
import { PrimitiveException } from "./primitive.exception";

class ConcretePrimitiveException extends PrimitiveException {
  readonly code = "TEST.CONCRETE";

  constructor(message: string) {
    super(message);
  }
}

class AnotherConcreteException extends PrimitiveException {
  readonly code = "TEST.ANOTHER";

  constructor(message: string) {
    super(message);
  }
}

describe("PrimitiveException", () => {
  describe("name", () => {
    it("sets name to the concrete subclass constructor name", () => {
      const error = new ConcretePrimitiveException("test message");
      expect(error.name).toBe("ConcretePrimitiveException");
    });

    it("uses the actual subclass name, not PrimitiveException", () => {
      const error = new AnotherConcreteException("test message");
      expect(error.name).toBe("AnotherConcreteException");
    });
  });

  describe("message", () => {
    it("sets message from the constructor argument", () => {
      const error = new ConcretePrimitiveException("something went wrong");
      expect(error.message).toBe("something went wrong");
    });

    it("preserves an empty string message", () => {
      const error = new ConcretePrimitiveException("");
      expect(error.message).toBe("");
    });

    it("preserves a message with special characters", () => {
      const message = `Campo "nomeFantasia": não pode ser vazio`;
      const error = new ConcretePrimitiveException(message);
      expect(error.message).toBe(message);
    });
  });

  describe("stack trace", () => {
    it("has a stack property after construction", () => {
      const error = new ConcretePrimitiveException("test");
      expect(error.stack).toBeDefined();
      expect(typeof error.stack).toBe("string");
    });

    it("stack contains the error message", () => {
      const error = new ConcretePrimitiveException("my error message");
      expect(error.stack).toContain("my error message");
    });
  });

  describe("inheritance", () => {
    it("is an instance of Error", () => {
      const error = new ConcretePrimitiveException("test");
      expect(error).toBeInstanceOf(Error);
    });

    it("is an instance of PrimitiveException", () => {
      const error = new ConcretePrimitiveException("test");
      expect(error).toBeInstanceOf(PrimitiveException);
    });

    it("is an instance of the concrete subclass", () => {
      const error = new ConcretePrimitiveException("test");
      expect(error).toBeInstanceOf(ConcretePrimitiveException);
    });
  });

  describe("code", () => {
    it("exposes the code defined by the subclass", () => {
      const error = new ConcretePrimitiveException("test");
      expect(error.code).toBe("TEST.CONCRETE");
    });
  });
});
