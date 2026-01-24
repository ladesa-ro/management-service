import { ApiProperty, ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { ArgsType, Field, ID, Int, ObjectType, InputType } from "@nestjs/graphql";
import { IsUUID, IsString, MinLength, IsDateString, IsOptional, IsArray, IsBoolean, IsInt, Min, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { PaginationInputDto, PaginationMetaDto } from "@/shared/dto";
import {
  RegisterModel,
  simpleProperty,
  referenceProperty,
  commonProperties,
} from "@/shared/metadata";
import { TurmaFindOneOutputDto, TurmaFindOneInputDto } from "@/v2/core/turma/dto";
import { DisciplinaFindOneOutputDto, DisciplinaFindOneInputDto } from "@/v2/core/disciplina/dto";
import { AmbienteFindOneOutputDto, AmbienteFindOneInputDto } from "@/v2/core/ambiente/dto";
import { CampusFindOneOutputDto, CampusFindOneInputDto } from "@/v2/core/campus/dto";
import { OfertaFormacaoFindOneOutputDto, OfertaFormacaoFindOneInputDto } from "@/v2/core/oferta-formacao/dto";
import { ImagemFindOneOutputDto } from "@/v2/core/bloco/dto";
import { CalendarioLetivoFindOneOutputDto } from "@/v2/core/calendario-letivo/dto";


@InputType("CalendarioLetivoFindOneInputFromDiario")
export class CalendarioLetivoFindOneInputDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @Field(() => ID)
  @IsUUID()
  id: string;
}

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("Diario")
@RegisterModel({
  name: "DiarioFindOneOutput",
  properties: [
    simpleProperty("id"),
    simpleProperty("ativo"),
    referenceProperty("calendarioLetivo", "CalendarioLetivoFindOneOutput"),
    referenceProperty("turma", "TurmaFindOneOutput"),
    referenceProperty("disciplina", "DisciplinaFindOneOutput"),
    referenceProperty("ambientePadrao", "AmbienteFindOneOutput", { nullable: true }),
    referenceProperty("imagemCapa", "ImagemFindOneOutput", { nullable: true }),
    ...commonProperties.dated,
  ],
})
export class DiarioFindOneOutputDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @Field(() => ID)
  @IsUUID()
  id: string;

  @ApiProperty({ description: "Situacao do diario" })
  @Field()
  @IsBoolean()
  ativo: boolean;

  @ApiProperty({ type: () => CalendarioLetivoFindOneOutputDto, description: "Calendario letivo vinculado ao diario" })
  @Field(() => CalendarioLetivoFindOneOutputDto)
  @ValidateNested()
  @Type(() => CalendarioLetivoFindOneOutputDto)
  calendarioLetivo: CalendarioLetivoFindOneOutputDto;

  @ApiProperty({ type: () => TurmaFindOneOutputDto, description: "Turma vinculada ao diario" })
  @Field(() => TurmaFindOneOutputDto)
  @ValidateNested()
  @Type(() => TurmaFindOneOutputDto)
  turma: TurmaFindOneOutputDto;

  @ApiProperty({ type: () => DisciplinaFindOneOutputDto, description: "Disciplina vinculada ao diario" })
  @Field(() => DisciplinaFindOneOutputDto)
  @ValidateNested()
  @Type(() => DisciplinaFindOneOutputDto)
  disciplina: DisciplinaFindOneOutputDto;

  @ApiPropertyOptional({ type: () => AmbienteFindOneOutputDto, description: "Ambiente padrao", nullable: true })
  @Field(() => AmbienteFindOneOutputDto, { nullable: true })
  @IsOptional()
  @ValidateNested()
  @Type(() => AmbienteFindOneOutputDto)
  ambientePadrao: AmbienteFindOneOutputDto | null;

  @ApiPropertyOptional({ type: () => ImagemFindOneOutputDto, description: "Imagem de capa do diario", nullable: true })
  @Field(() => ImagemFindOneOutputDto, { nullable: true })
  @IsOptional()
  @ValidateNested()
  @Type(() => ImagemFindOneOutputDto)
  imagemCapa: ImagemFindOneOutputDto | null;

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
@InputType("DiarioListInput")
export class DiarioListInputDto extends PaginationInputDto {
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

@ObjectType("DiarioListOutput")
export class DiarioListOutputDto {
  @ApiProperty({ type: () => PaginationMetaDto, description: "Metadados da busca" })
  @Field(() => PaginationMetaDto)
  meta: PaginationMetaDto;

  @ApiProperty({ type: () => [DiarioFindOneOutputDto], description: "Resultados da busca" })
  @Field(() => [DiarioFindOneOutputDto])
  data: DiarioFindOneOutputDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@InputType("DiarioCreateInput")
export class DiarioCreateInputDto {
  @ApiProperty({ description: "Situacao do diario" })
  @Field()
  @IsBoolean()
  ativo: boolean;

  @ApiProperty({ type: () => CalendarioLetivoFindOneInputDto, description: "Calendario letivo vinculado ao diario" })
  @Field(() => CalendarioLetivoFindOneInputDto)
  @ValidateNested()
  @Type(() => CalendarioLetivoFindOneInputDto)
  calendarioLetivo: CalendarioLetivoFindOneInputDto;

  @ApiProperty({ type: () => TurmaFindOneInputDto, description: "Turma vinculada ao diario" })
  @Field(() => TurmaFindOneInputDto)
  @ValidateNested()
  @Type(() => TurmaFindOneInputDto)
  turma: TurmaFindOneInputDto;

  @ApiProperty({ type: () => DisciplinaFindOneInputDto, description: "Disciplina vinculada ao diario" })
  @Field(() => DisciplinaFindOneInputDto)
  @ValidateNested()
  @Type(() => DisciplinaFindOneInputDto)
  disciplina: DisciplinaFindOneInputDto;

  @ApiPropertyOptional({ type: () => AmbienteFindOneInputDto, description: "Ambiente padrao", nullable: true })
  @Field(() => AmbienteFindOneInputDto, { nullable: true })
  @IsOptional()
  @ValidateNested()
  @Type(() => AmbienteFindOneInputDto)
  ambientePadrao?: AmbienteFindOneInputDto | null;
}

@InputType("DiarioUpdateInput")
export class DiarioUpdateInputDto extends PartialType(DiarioCreateInputDto) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ArgsType()
@InputType("DiarioFindOneInput")
export class DiarioFindOneInputDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @Field(() => ID)
  @IsUUID()
  id: string;
}
