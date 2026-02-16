import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";
import { decorate } from "ts-mixer";

/**
 * DTO for UUID path parameter (REST).
 */
export class UuidParamRestDto {
  @decorate(
    ApiProperty({
      type: "string",
      description: "Identificador do registro (uuid)",
      format: "uuid",
      example: "123e4567-e89b-12d3-a456-426614174000",
    }),
  )
  @decorate(IsUUID())
  id: string;
}
