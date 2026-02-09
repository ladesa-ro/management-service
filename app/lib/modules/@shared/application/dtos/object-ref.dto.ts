import { IdNumeric, IdUuid } from "@/modules/@shared";

/**
 * Referência a objeto por UUID
 */
export class ObjectUuidRefDto {
  id!: IdUuid;
}

/**
 * Referência a objeto por ID numérico
 */
export class ObjectIntRefDto {
  id!: IdNumeric;
}
