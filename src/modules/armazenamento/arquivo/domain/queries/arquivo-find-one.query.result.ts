import { EntityQueryResult } from "@/domain/abstractions";

export class ArquivoFindOneQueryResult extends EntityQueryResult {
  name!: string | null;
  mimeType!: string | null;
  sizeBytes!: number | null;
  storageType!: string;
}
