import { ApiProperty, ApiPropertyOptional, ApiSchema, PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsOptional,
  IsUUID,
  ValidateNested,
} from "class-validator";
import {
  commonProperties,
  RegisterModel,
  referenceProperty,
  simpleProperty,
} from "@/modules/@shared/infrastructure/persistence/typeorm/metadata";
import {
  PaginationInputRestDto,
  PaginationMetaRestDto,
  TransformToArray,
} from "@/modules/@shared/infrastructure/presentation/rest/dtos";
import {
  DiarioFindOneInputRestDto,
  DiarioFindOneOutputRestDto,
} from "@/server/nest/modules/diario/rest";
import {
  PerfilFindOneInputRestDto,
  PerfilFindOneOutputRestDto,
} from "@/server/nest/modules/perfil/rest";

// ============================================================================
// FindOne Output
// ============================================================================

@ApiSchema({ name: "DiarioProfessorFindOneOutputDto" })
@RegisterModel({
  name: "DiarioProfessorFindOneOutputDto",
  properties: [
    simpleProperty("id"),
    simpleProperty("situacao"),
    referenceProperty("perfil", "PerfilFindOneOutputDto"),
    referenceProperty("diario", "DiarioFindOneOutputDto"),
    ...commonProperties.dated,
  ],
})
export class DiarioProfessorFindOneOutputRestDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @IsUUID()
  id: string;

  @ApiProperty({ description: "Situacao do vinculo" })
  @IsBoolean()
  situacao: boolean;

  @ApiProperty({
    type: () => PerfilFindOneOutputRestDto,
    description: "Perfil do usuario ao campus",
  })
  @ValidateNested()
  @Type(() => PerfilFindOneOutputRestDto)
  perfil: PerfilFindOneOutputRestDto;

  @ApiProperty({ type: () => DiarioFindOneOutputRestDto, description: "Diario vinculado" })
  @ValidateNested()
  @Type(() => DiarioFindOneOutputRestDto)
  diario: DiarioFindOneOutputRestDto;

  @ApiProperty({ description: "Data e hora da criacao do registro" })
  @IsDateString()
  dateCreated: Date;

  @ApiProperty({ description: "Data e hora da alteracao do registro" })
  @IsDateString()
  dateUpdated: Date;

  @ApiPropertyOptional({ description: "Data e hora da exclusao do registro", nullable: true })
  @IsOptional()
  @IsDateString()
  dateDeleted: Date | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

@ApiSchema({ name: "DiarioProfessorListInputDto" })
export class DiarioProfessorListInputRestDto extends PaginationInputRestDto {
  @ApiPropertyOptional({
    description: "Filtro por ID",
    type: [String],
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  "filter.id"?: string[];

  @ApiPropertyOptional({
    description: "Filtro por ID do Usuario do Perfil",
    type: [String],
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  "filter.perfil.usuario.id"?: string[];

  @ApiPropertyOptional({
    description: "Filtro por ID do Perfil",
    type: [String],
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  "filter.perfil.id"?: string[];

  @ApiPropertyOptional({
    description: "Filtro por ID do Diario",
    type: [String],
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  "filter.diario.id"?: string[];
}

@ApiSchema({ name: "DiarioProfessorListOutputDto" })
export class DiarioProfessorListOutputRestDto {
  @ApiProperty({ type: () => PaginationMetaRestDto, description: "Metadados da busca" })
  meta: PaginationMetaRestDto;

  @ApiProperty({
    type: () => [DiarioProfessorFindOneOutputRestDto],
    description: "Resultados da busca",
  })
  data: DiarioProfessorFindOneOutputRestDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@ApiSchema({ name: "DiarioProfessorCreateInputDto" })
export class DiarioProfessorCreateInputRestDto {
  @ApiProperty({ description: "Situacao do vinculo" })
  @IsBoolean()
  situacao: boolean;

  @ApiProperty({
    type: () => PerfilFindOneInputRestDto,
    description: "Perfil do usuario ao campus",
  })
  @ValidateNested()
  @Type(() => PerfilFindOneInputRestDto)
  perfil: PerfilFindOneInputRestDto;

  @ApiProperty({ type: () => DiarioFindOneInputRestDto, description: "Diario vinculado" })
  @ValidateNested()
  @Type(() => DiarioFindOneInputRestDto)
  diario: DiarioFindOneInputRestDto;
}

@ApiSchema({ name: "DiarioProfessorUpdateInputDto" })
export class DiarioProfessorUpdateInputRestDto extends PartialType(
  DiarioProfessorCreateInputRestDto,
) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ApiSchema({ name: "DiarioProfessorFindOneInputDto" })
export class DiarioProfessorFindOneInputRestDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @IsUUID()
  id: string;
}
