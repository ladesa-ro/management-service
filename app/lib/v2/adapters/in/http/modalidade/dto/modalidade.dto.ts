import { ApiProperty, ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { ArgsType, Field, ID, InputType, ObjectType } from "@nestjs/graphql";
import { IsArray, IsDateString, IsOptional, IsString, IsUUID, MinLength } from "class-validator";
import { PaginationInputDto, PaginationMetaDto } from "@/shared/dto";
import { commonProperties, RegisterModel, simpleProperty, } from "@/shared/metadata";

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("Modalidade")
@RegisterModel({
  name: "ModalidadeFindOneOutput",
  properties: [
    simpleProperty("id"),
    simpleProperty("nome"),
    simpleProperty("slug"),
    ...commonProperties.dated,
  ],
})
export class ModalidadeFindOneOutputDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @Field(() => ID)
  @IsUUID()
  id: string;

  @ApiProperty({ description: "Nome da modalidade", minLength: 1 })
  @Field()
  @IsString()
  @MinLength(1)
  nome: string;

  @ApiProperty({ description: "Apelido da modalidade", minLength: 1 })
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
@InputType("ModalidadeListInput")
export class ModalidadeListInputDto extends PaginationInputDto {
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

@ObjectType("ModalidadeListOutput")
export class ModalidadeListOutputDto {
  @ApiProperty({ type: () => PaginationMetaDto, description: "Metadados da busca" })
  @Field(() => PaginationMetaDto)
  meta: PaginationMetaDto;

  @ApiProperty({ type: () => [ModalidadeFindOneOutputDto], description: "Resultados da busca" })
  @Field(() => [ModalidadeFindOneOutputDto])
  data: ModalidadeFindOneOutputDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@InputType("ModalidadeCreateInput")
export class ModalidadeCreateInputDto {
  @ApiProperty({ description: "Nome da modalidade", minLength: 1 })
  @Field()
  @IsString()
  @MinLength(1)
  nome: string;

  @ApiProperty({ description: "Apelido da modalidade", minLength: 1 })
  @Field()
  @IsString()
  @MinLength(1)
  slug: string;
}

@InputType("ModalidadeUpdateInput")
export class ModalidadeUpdateInputDto extends PartialType(ModalidadeCreateInputDto) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ArgsType()
export class ModalidadeFindOneInputDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @Field(() => ID)
  @IsUUID()
  id: string;
}
