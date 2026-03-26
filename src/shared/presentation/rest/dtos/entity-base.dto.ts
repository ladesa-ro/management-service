import { Mixin } from "ts-mixer";
import { ApiProperty, ApiPropertyOptional } from "@/shared/presentation/rest";
/**
 * Base DTO for REST entities identified by UUID.
 */

export class EntityIdUuidRestDto {
  @ApiProperty({
    type: "string",
    description: "Identificador do registro (uuid)",
    format: "uuid",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  id: string;
}

/**
 * Base DTO for REST entities with timestamps.
 *
 * Usa string (ISO 8601) em vez de Date — o JSON serializado é sempre string,
 * e o domínio já armazena datas como ScalarDateTimeString.
 */

export class EntityDatedRestDto {
  @ApiProperty({
    type: "string",
    description: "Data e hora da criacao do registro",
    format: "date-time",
  })
  dateCreated: string;

  @ApiProperty({
    type: "string",
    description: "Data e hora da alteracao do registro",
    format: "date-time",
  })
  dateUpdated: string;

  @ApiPropertyOptional({
    type: "string",
    description: "Data e hora da exclusao do registro",
    format: "date-time",
    nullable: true,
  })
  dateDeleted: string | null;
}

/**
 * Combined base DTO for REST with UUID and timestamps.
 */

export class EntityBaseRestDto extends Mixin(EntityIdUuidRestDto, EntityDatedRestDto) {}
