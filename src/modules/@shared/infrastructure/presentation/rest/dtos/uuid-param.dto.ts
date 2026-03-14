import { ApiProperty } from "@/modules/@shared/presentation/rest";
import { IsUUID } from "@/modules/@shared/presentation/shared";
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
  @IsUUID()
  id: string;
}
