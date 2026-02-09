import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsDateString, IsOptional, IsUUID } from "class-validator";

/**
 * Base DTO for REST entities identified by UUID.
 */
export class EntityIdUuidRestDto {
  @ApiProperty({
    description: "Identificador do registro (uuid)",
    format: "uuid",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  @IsUUID()
  id: string;
}

/**
 * Base DTO for REST entities with timestamps.
 */
export class EntityDatedRestDto {
  @ApiProperty({
    description: "Data e hora da criacao do registro",
    format: "date-time",
  })
  @IsDateString()
  dateCreated: Date;

  @ApiProperty({
    description: "Data e hora da alteracao do registro",
    format: "date-time",
  })
  @IsDateString()
  dateUpdated: Date;

  @ApiPropertyOptional({
    description: "Data e hora da exclusao do registro",
    format: "date-time",
    nullable: true,
  })
  @IsOptional()
  @IsDateString()
  dateDeleted: Date | null;
}

/**
 * Combined base DTO for REST with UUID and timestamps.
 */
export class EntityBaseRestDto extends EntityIdUuidRestDto {
  @ApiProperty({
    description: "Data e hora da criacao do registro",
    format: "date-time",
  })
  @IsDateString()
  dateCreated: Date;

  @ApiProperty({
    description: "Data e hora da alteracao do registro",
    format: "date-time",
  })
  @IsDateString()
  dateUpdated: Date;

  @ApiPropertyOptional({
    description: "Data e hora da exclusao do registro",
    format: "date-time",
    nullable: true,
  })
  @IsOptional()
  @IsDateString()
  dateDeleted: Date | null;
}
