import type { IdUuid } from "@/modules/@shared";

export class ArquivoGetFileQuery {
  id!: IdUuid;
  acesso?: { id?: string; nome?: string } | null;
}
