import type { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

export const CORRELATION_ID_HEADER = "x-correlation-id";

/**
 * Middleware Express que gera ou propaga um correlation ID por request.
 * Se o header x-correlation-id já existir, reutiliza. Caso contrário, gera um novo.
 */
export function correlationIdMiddleware(req: Request, res: Response, next: NextFunction): void {
  const existing = req.headers[CORRELATION_ID_HEADER];
  const correlationId = typeof existing === "string" && existing.length > 0 ? existing : uuidv4();

  (req as any).correlationId = correlationId;
  res.setHeader(CORRELATION_ID_HEADER, correlationId);

  next();
}
