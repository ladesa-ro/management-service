import { ApiProperty, ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { ArgsType, Field, ID, ObjectType, InputType } from "@nestjs/graphql";
import { IsUUID, IsString, IsDateString, IsOptional, IsArray, IsBoolean, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { PaginationInputDto, PaginationMetaDto } from "@/shared/dto";
import {
  RegisterModel,
  simpleProperty,
  referenceProperty,
  commonProperties,
} from "@/shared/metadata";
import { PerfilFindOneOutputDto, PerfilFindOneInputDto } from "@/v2/core/perfil/dto";
import { DiarioFindOneOutputDto, DiarioFindOneInputDto } from "@/v2/core/diario/dto";

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("DiarioProfessor")
@RegisterModel({
  name: "DiarioProfessorFindOneOutput",
  properties: [
    simpleProperty("id"),
    simpleProperty("situacao"),
    referenceProperty("perfil", "PerfilFindOneOutput"),
    referenceProperty("diario", "DiarioFindOneOutput"),
    ...commonProperties.dated,
  ],
})
export class DiarioProfessorFindOneOutputDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @Field(() => ID)
  @IsUUID()
  id: string;

  @ApiProperty({ description: "Situacao do vinculo" })
  @Field()
  @IsBoolean()
  situacao: boolean;

  @ApiProperty({ type: () => PerfilFindOneOutputDto, description: "Perfil do usuario ao campus" })
  @Field(() => PerfilFindOneOutputDto)
  @ValidateNested()
  @Type(() => PerfilFindOneOutputDto)
  perfil: PerfilFindOneOutputDto;

  @ApiProperty({ type: () => DiarioFindOneOutputDto, description: "Diario vinculado" })
  @Field(() => DiarioFindOneOutputDto)
  @ValidateNested()
  @Type(() => DiarioFindOneOutputDto)
  diario: DiarioFindOneOutputDto;

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
@InputType("DiarioProfessorListInput")
export class DiarioProfessorListInputDto extends PaginationInputDto {
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

@ObjectType("DiarioProfessorListOutput")
export class DiarioProfessorListOutputDto {
  @ApiProperty({ type: () => PaginationMetaDto, description: "Metadados da busca" })
  @Field(() => PaginationMetaDto)
  meta: PaginationMetaDto;

  @ApiProperty({ type: () => [DiarioProfessorFindOneOutputDto], description: "Resultados da busca" })
  @Field(() => [DiarioProfessorFindOneOutputDto])
  data: DiarioProfessorFindOneOutputDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@InputType("DiarioProfessorCreateInput")
export class DiarioProfessorCreateInputDto {
  @ApiProperty({ description: "Situacao do vinculo" })
  @Field()
  @IsBoolean()
  situacao: boolean;

  @ApiProperty({ type: () => PerfilFindOneInputDto, description: "Perfil do usuario ao campus" })
  @Field(() => PerfilFindOneInputDto)
  @ValidateNested()
  @Type(() => PerfilFindOneInputDto)
  perfil: PerfilFindOneInputDto;

  @ApiProperty({ type: () => DiarioFindOneInputDto, description: "Diario vinculado" })
  @Field(() => DiarioFindOneInputDto)
  @ValidateNested()
  @Type(() => DiarioFindOneInputDto)
  diario: DiarioFindOneInputDto;
}

@InputType("DiarioProfessorUpdateInput")
export class DiarioProfessorUpdateInputDto extends PartialType(DiarioProfessorCreateInputDto) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ArgsType()
@InputType("DiarioProfessorFindOneInput")
export class DiarioProfessorFindOneInputDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @Field(() => ID)
  @IsUUID()
  id: string;
}
