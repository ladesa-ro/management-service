import type { IdUuid } from "@/domain/abstractions/scalars";

export class ArquivoGetFileQuery {
  id!: IdUuid;
  acesso?: { id?: string; nome?: string } | null;
}
