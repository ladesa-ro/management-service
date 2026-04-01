import { Mixin } from "ts-mixer";
import { SharedFields } from "@/domain/abstractions";
import { ApiProperty, ApiPropertyOptional } from "@/shared/presentation/rest";
/**
 * Base DTO for REST entities identified by UUID.
 */

export class EntityIdUuidRestDto {
  @ApiProperty(SharedFields.idUuid.swaggerMetadata)
  id: string;
}

/**
 * Base DTO for REST entities with timestamps.
 *
 * Usa string (ISO 8601) em vez de Date — o JSON serializado é sempre string,
 * e o domínio já armazena datas como ScalarDateTimeString.
 */

export class EntityDatedRestDto {
  @ApiProperty(SharedFields.dateCreated.swaggerMetadata)
  dateCreated: string;

  @ApiProperty(SharedFields.dateUpdated.swaggerMetadata)
  dateUpdated: string;

  @ApiPropertyOptional(SharedFields.dateDeleted.swaggerMetadata)
  dateDeleted: string | null;
}

/**
 * Combined base DTO for REST with UUID and timestamps.
 */

export class EntityBaseRestDto extends Mixin(EntityIdUuidRestDto, EntityDatedRestDto) {}
