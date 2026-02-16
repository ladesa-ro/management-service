import { applyDecorators, SetMetadata } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";

/**
 * Chave de metadata para indicar se autenticação é necessária.
 */
export const NEEDS_AUTH_KEY = "needs_auth";

/**
 * Decorator que indica que o endpoint requer autenticação.
 * Adiciona ApiBearerAuth para documentação Swagger.
 */
export const NeedsAuth = () => {
  return applyDecorators(SetMetadata(NEEDS_AUTH_KEY, true), ApiBearerAuth());
};

/**
 * Decorator que indica que o endpoint é público (não requer autenticação).
 */
export const Public = () => {
  return applyDecorators(SetMetadata(NEEDS_AUTH_KEY, false));
};
