import { ArgsType, Field, ID, InputType, ObjectType } from "@nestjs/graphql";
import { ApiProperty, ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from "class-validator";
import { PaginationInputDto, PaginationMetaDto } from "@/shared/dto";
import {
  commonProperties,
  RegisterModel,
  referenceProperty,
  simpleProperty,
} from "@/shared/metadata";
import {
  AmbienteFindOneInputDto,
  AmbienteFindOneOutputDto,
} from "@/v2/server/modules/ambiente/http/dto";
import { ImagemFindOneOutputDto } from "@/v2/server/modules/bloco/http/dto";
import { CalendarioLetivoFindOneOutputDto } from "@/v2/server/modules/calendario-letivo/http/dto";
import {
  DisciplinaFindOneInputDto,
  DisciplinaFindOneOutputDto,
} from "@/v2/server/modules/disciplina/http/dto";
import { TurmaFindOneInputDto, TurmaFindOneOutputDto } from "@/v2/server/modules/turma/http/dto";

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

  @ApiProperty({
    type: () => CalendarioLetivoFindOneOutputDto,
    description: "Calendario letivo vinculado ao diario",
  })
  @Field(() => CalendarioLetivoFindOneOutputDto)
  @ValidateNested()
  @Type(() => CalendarioLetivoFindOneOutputDto)
  calendarioLetivo: CalendarioLetivoFindOneOutputDto;

  @ApiProperty({ type: () => TurmaFindOneOutputDto, description: "Turma vinculada ao diario" })
  @Field(() => TurmaFindOneOutputDto)
  @ValidateNested()
  @Type(() => TurmaFindOneOutputDto)
  turma: TurmaFindOneOutputDto;

  @ApiProperty({
    type: () => DisciplinaFindOneOutputDto,
    description: "Disciplina vinculada ao diario",
  })
  @Field(() => DisciplinaFindOneOutputDto)
  @ValidateNested()
  @Type(() => DisciplinaFindOneOutputDto)
  disciplina: DisciplinaFindOneOutputDto;

  @ApiPropertyOptional({
    type: () => AmbienteFindOneOutputDto,
    description: "Ambiente padrao",
    nullable: true,
  })
  @Field(() => AmbienteFindOneOutputDto, { nullable: true })
  @IsOptional()
  @ValidateNested()
  @Type(() => AmbienteFindOneOutputDto)
  ambientePadrao: AmbienteFindOneOutputDto | null;

  @ApiPropertyOptional({
    type: () => ImagemFindOneOutputDto,
    description: "Imagem de capa do diario",
    nullable: true,
  })
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

  @ApiProperty({
    type: () => CalendarioLetivoFindOneInputDto,
    description: "Calendario letivo vinculado ao diario",
  })
  @Field(() => CalendarioLetivoFindOneInputDto)
  @ValidateNested()
  @Type(() => CalendarioLetivoFindOneInputDto)
  calendarioLetivo: CalendarioLetivoFindOneInputDto;

  @ApiProperty({ type: () => TurmaFindOneInputDto, description: "Turma vinculada ao diario" })
  @Field(() => TurmaFindOneInputDto)
  @ValidateNested()
  @Type(() => TurmaFindOneInputDto)
  turma: TurmaFindOneInputDto;

  @ApiProperty({
    type: () => DisciplinaFindOneInputDto,
    description: "Disciplina vinculada ao diario",
  })
  @Field(() => DisciplinaFindOneInputDto)
  @ValidateNested()
  @Type(() => DisciplinaFindOneInputDto)
  disciplina: DisciplinaFindOneInputDto;

  @ApiPropertyOptional({
    type: () => AmbienteFindOneInputDto,
    description: "Ambiente padrao",
    nullable: true,
  })
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
