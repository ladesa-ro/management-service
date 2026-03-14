import { IdNumeric, IdUuid } from "@/modules/@shared";

/**
 * Referência a objeto por UUID
 */
export class ObjectUuidRef {
  id!: IdUuid;
}

/**
 * Referência a objeto por ID numérico
 */
export class ObjectIntRef {
  id!: IdNumeric;
}
