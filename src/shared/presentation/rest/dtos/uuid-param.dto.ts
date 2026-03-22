import { ApiProperty } from "@/shared/presentation/rest";
/**
 * DTO for UUID path parameter (REST).
 */
export class UuidParamRestDto {
  @ApiProperty({
    type: "string",
    description: "Identificador do registro (uuid)",
    format: "uuid",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  id: string;
}
