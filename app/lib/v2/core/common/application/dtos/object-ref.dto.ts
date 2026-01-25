import { IsInt, IsUUID, Min } from "class-validator";

/**
 * Referência a objeto por UUID
 */
export class ObjectUuidRef {
  @IsUUID()
  id!: string;
}

/**
 * Referência a objeto por ID numérico
 */
export class ObjectIntRef {
  @IsInt()
  @Min(1)
  id!: number;
}
