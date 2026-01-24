import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Field, ID, ObjectType } from "@nestjs/graphql";
import { IsUUID, IsDateString, IsOptional } from "class-validator";

/**
 * Base DTO for entities identified by UUID.
 */
@ObjectType({ isAbstract: true })
export class EntityIdUuidDto {
  @ApiProperty({
    description: "Identificador do registro (uuid)",
    format: "uuid",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  @Field(() => ID)
  @IsUUID()
  id: string;
}

/**
 * Base DTO for entities with timestamps.
 */
@ObjectType({ isAbstract: true })
export class EntityDatedDto {
  @ApiProperty({
    description: "Data e hora da criacao do registro",
    format: "date-time",
  })
  @Field()
  @IsDateString()
  dateCreated: Date;

  @ApiProperty({
    description: "Data e hora da alteracao do registro",
    format: "date-time",
  })
  @Field()
  @IsDateString()
  dateUpdated: Date;

  @ApiPropertyOptional({
    description: "Data e hora da exclusao do registro",
    format: "date-time",
    nullable: true,
  })
  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  dateDeleted: Date | null;
}

/**
 * Combined base DTO with UUID and timestamps.
 */
@ObjectType({ isAbstract: true })
export class EntityBaseDto extends EntityIdUuidDto {
  @ApiProperty({
    description: "Data e hora da criacao do registro",
    format: "date-time",
  })
  @Field()
  @IsDateString()
  dateCreated: Date;

  @ApiProperty({
    description: "Data e hora da alteracao do registro",
    format: "date-time",
  })
  @Field()
  @IsDateString()
  dateUpdated: Date;

  @ApiPropertyOptional({
    description: "Data e hora da exclusao do registro",
    format: "date-time",
    nullable: true,
  })
  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  dateDeleted: Date | null;
}
