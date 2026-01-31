import type { INestApplication } from "@nestjs/common";
import { ApplicationExceptionFilter, DomainExceptionFilter } from "@/server/nest/common/filters";

/**
 * Registra os filtros de exceção globais para tratar erros de domínio e aplicação.
 */
export function useExceptionFilters(app: INestApplication): void {
  // Ordem importa: filtros mais específicos primeiro
  app.useGlobalFilters(new DomainExceptionFilter(), new ApplicationExceptionFilter());
}
