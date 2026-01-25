import { ArgsType, Field, ID, InputType, ObjectType } from "@nestjs/graphql";
import { ApiProperty, ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { IsArray, IsDateString, IsOptional, IsString, IsUUID, MinLength } from "class-validator";
import { PaginationInputDto, PaginationMetaDto } from "@/shared/dto";
import { commonProperties, RegisterModel, simpleProperty } from "@/shared/metadata";

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("NivelFormacao")
@RegisterModel({
  name: "NivelFormacaoFindOneOutput",
  properties: [simpleProperty("id"), simpleProperty("slug"), ...commonProperties.dated],
})
export class NivelFormacaoFindOneOutputDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @Field(() => ID)
  @IsUUID()
  id: string;

  @ApiProperty({ description: "Apelido do nivel de formacao", minLength: 1 })
  @Field()
  @IsString()
  @MinLength(1)
  slug: string;

  @ApiProperty({ description: "Data e hora da criacao do registro" })
  @Field()
  @IsDateString()
  dateCreated: Date;

  @ApiProperty({ description: "Data e hora da alteracao do registro" })
  @Field()
  @IsDateString()
  dateUpdated: Date;

  @ApiPropertyOptional({ description: "Data e hora da exclusao do registro", nullable: true })
  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  dateDeleted: Date | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

@ArgsType()
@InputType("NivelFormacaoListInput")
export class NivelFormacaoListInputDto extends PaginationInputDto {
  @ApiPropertyOptional({
    description: "Filtro por ID",
    type: [String],
  })
  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.id"?: string[];
}

@ObjectType("NivelFormacaoListOutput")
export class NivelFormacaoListOutputDto {
  @ApiProperty({ type: () => PaginationMetaDto, description: "Metadados da busca" })
  @Field(() => PaginationMetaDto)
  meta: PaginationMetaDto;

  @ApiProperty({ type: () => [NivelFormacaoFindOneOutputDto], description: "Resultados da busca" })
  @Field(() => [NivelFormacaoFindOneOutputDto])
  data: NivelFormacaoFindOneOutputDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@InputType("NivelFormacaoCreateInput")
export class NivelFormacaoCreateInputDto {
  @ApiProperty({ description: "Apelido do nivel de formacao", minLength: 1 })
  @Field()
  @IsString()
  @MinLength(1)
  slug: string;
}

@InputType("NivelFormacaoUpdateInput")
export class NivelFormacaoUpdateInputDto extends PartialType(NivelFormacaoCreateInputDto) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ArgsType()
export class NivelFormacaoFindOneInputDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @Field(() => ID)
  @IsUUID()
  id: string;
}
