import type { IdUuid, ScalarDateTimeString } from "./scalars";

/**
 * Contrato para entidades com versionamento temporal.
 * Usado por grade_horaria e calendario_agendamento.
 */
export interface IVersioned {
  identificadorExterno: IdUuid;
  version: number;
  previousVersionId: IdUuid | null;
  validFrom: ScalarDateTimeString;
  validTo: ScalarDateTimeString | null;
}
