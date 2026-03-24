import { SharedFields } from "@/domain/abstractions";
import type { IdNumeric } from "@/domain/abstractions/scalars";
export const CidadeFindOneQueryFields = {
  id: SharedFields.idNumeric,
};

export class CidadeFindOneQuery {
  id!: IdNumeric;
}
