import { SharedFields } from "@/domain/abstractions";
import type { IdNumeric } from "@/domain/abstractions/scalars";

export const EstadoFindOneQueryFields = {
  id: SharedFields.idNumeric,
};

export class EstadoFindOneQuery {
  id!: IdNumeric;
}
