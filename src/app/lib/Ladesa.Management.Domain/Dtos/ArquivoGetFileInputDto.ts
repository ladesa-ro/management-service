import type { IdUuid } from "@/Ladesa.Management.Domain/Abstractions/Scalars";

export class ArquivoGetFileInputDto {
  id!: IdUuid;
  acesso?: { id?: string; nome?: string } | null;
}
