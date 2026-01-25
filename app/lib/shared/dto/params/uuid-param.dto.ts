import { ArgsType, Field, ID } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";

/**
 * DTO for UUID path parameter.
 */
@ArgsType()
export class UuidParamDto {
  @ApiProperty({
    description: "Identificador do registro (uuid)",
    format: "uuid",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  @Field(() => ID)
  @IsUUID()
  id: string;
}
