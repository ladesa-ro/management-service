import type { Container } from "inversify";

// Fazendo module augmentation
declare module "express-serve-static-core" {
  interface Request {
    /**
     * Container do Inversify associado a esta requisição.
     * Útil para resolver dependências dinamicamente por request.
     */
    container: Container;
  }
}
