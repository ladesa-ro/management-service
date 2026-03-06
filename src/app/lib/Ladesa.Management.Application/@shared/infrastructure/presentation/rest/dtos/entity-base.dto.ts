import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsDateString, IsOptional, IsUUID } from "class-validator";
import { decorate, Mixin } from "ts-mixer";

/**
 * Base DTO for REST entities identified by UUID.
 */
export class EntityIdUuidRestDto {
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

/**
 * Base DTO for REST entities with timestamps.
 */
export class EntityDatedRestDto {
  @decorate(
    ApiProperty({
      type: "string",
      description: "Data e hora da criacao do registro",
      format: "date-time",
    }),
  )
  @decorate(IsDateString())
  dateCreated: Date;

  @decorate(
    ApiProperty({
      type: "string",
      description: "Data e hora da alteracao do registro",
      format: "date-time",
    }),
  )
  @decorate(IsDateString())
  dateUpdated: Date;

  @decorate(
    ApiPropertyOptional({
      type: "string",
      description: "Data e hora da exclusao do registro",
      format: "date-time",
      nullable: true,
    }),
  )
  @decorate(IsOptional())
  @decorate(IsDateString())
  dateDeleted: Date | null;
}

/**
 * Combined base DTO for REST with UUID and timestamps.
 */
export class EntityBaseRestDto extends Mixin(EntityIdUuidRestDto, EntityDatedRestDto) {}
