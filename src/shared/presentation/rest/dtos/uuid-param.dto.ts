import { SharedFields } from "@/domain/abstractions";
import { ApiProperty } from "@/shared/presentation/rest";
/**
 * DTO for UUID path parameter (REST).
 */

export class UuidParamRestDto {
  @ApiProperty(SharedFields.idUuid.swaggerMetadata)
  id: string;
}
