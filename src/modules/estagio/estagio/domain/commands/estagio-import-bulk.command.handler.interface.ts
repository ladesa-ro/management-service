/**
 * IEstagioImportBulkCommandHandler — Contrato para o handler de importação em massa.
 */
import type { IAccessContext } from "@/domain/abstractions";
import type { EstagioImportBulkCommand } from "./estagio-import-bulk.command";

export interface EstagioImportBulkResultItem {
  line: number;
  matriculaEstagiario: string;
  nomeEstagiario: string;
  status: "created" | "skipped" | "failed";
  estágioId?: string;
  reason?: string;
}

export interface EstagioImportBulkResult {
  total: number;
  created: number;
  skipped: number;
  failed: number;
  items: EstagioImportBulkResultItem[];
}

export const IEstagioImportBulkCommandHandler = Symbol("IEstagioImportBulkCommandHandler");

export interface IEstagioImportBulkCommandHandler {
  execute(
    accessContext: IAccessContext | null,
    dto: EstagioImportBulkCommand,
  ): Promise<EstagioImportBulkResult>;
}

export const EstagioImportBulkCommandMetadata = {
  symbol: IEstagioImportBulkCommandHandler,
  operation: "import_bulk",
  resource: "estagio",
} as const;
