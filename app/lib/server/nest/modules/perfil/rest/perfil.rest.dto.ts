import { ApiProperty, ApiPropertyOptional, ApiSchema } from "@nestjs/swagger";
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
  CampusFindOneInputRestDto,
  CampusFindOneOutputRestDto,
} from "@/server/nest/modules/campus/rest";
import {
  UsuarioFindOneInputRestDto,
  UsuarioFindOneOutputRestDto,
} from "@/server/nest/modules/usuario/rest";

// ============================================================================
// FindOne Output
// ============================================================================

@ApiSchema({ name: "PerfilFindOneOutputDto" })
@RegisterModel({
  name: "PerfilFindOneOutputDto",
  properties: [
    simpleProperty("id"),
    simpleProperty("ativo"),
    simpleProperty("cargo"),
    referenceProperty("campus", "CampusFindOneOutputDto"),
    referenceProperty("usuario", "UsuarioFindOneOutputDto"),
    ...commonProperties.dated,
  ],
})
export class PerfilFindOneOutputRestDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @IsUUID()
  id: string;

  @ApiProperty({ description: "Indica se o vinculo esta ativo" })
  @IsBoolean()
  ativo: boolean;

  @ApiProperty({ description: "Cargo do usuario no vinculo" })
  @IsString()
  cargo: string;

  @ApiProperty({
    type: () => CampusFindOneOutputRestDto,
    description: "Campus associado ao vinculo",
  })
  @ValidateNested()
  @Type(() => CampusFindOneOutputRestDto)
  campus: CampusFindOneOutputRestDto;

  @ApiProperty({
    type: () => UsuarioFindOneOutputRestDto,
    description: "Usuario associado ao vinculo",
  })
  @ValidateNested()
  @Type(() => UsuarioFindOneOutputRestDto)
  usuario: UsuarioFindOneOutputRestDto;

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

@ApiSchema({ name: "PerfilListInputDto" })
export class PerfilListInputRestDto extends PaginationInputRestDto {
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
    description: "Filtro por ativo",
    type: [String],
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.ativo"?: string[];

  @ApiPropertyOptional({
    description: "Filtro por cargo",
    type: [String],
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.cargo"?: string[];

  @ApiPropertyOptional({
    description: "Filtro por ID do Campus",
    type: [String],
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  "filter.campus.id"?: string[];

  @ApiPropertyOptional({
    description: "Filtro por ID do Usuario",
    type: [String],
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  "filter.usuario.id"?: string[];
}

@ApiSchema({ name: "PerfilListOutputDto" })
export class PerfilListOutputRestDto {
  @ApiProperty({ type: () => PaginationMetaRestDto, description: "Metadados da busca" })
  meta: PaginationMetaRestDto;

  @ApiProperty({ type: () => [PerfilFindOneOutputRestDto], description: "Resultados da busca" })
  data: PerfilFindOneOutputRestDto[];
}

// ============================================================================
// SetVinculos Input
// ============================================================================

@ApiSchema({ name: "PerfilSetVinculosInputDto" })
export class PerfilSetVinculosInputRestDto {
  @ApiProperty({
    description: "Lista de cargos que o usuario tera no campus",
    type: [String],
    example: ["professor", "coordenador"],
  })
  @IsArray()
  @IsString({ each: true })
  cargos: string[];

  @ApiProperty({
    type: () => CampusFindOneInputRestDto,
    description: "Campus onde os vinculos serao definidos",
  })
  @ValidateNested()
  @Type(() => CampusFindOneInputRestDto)
  campus: CampusFindOneInputRestDto;

  @ApiProperty({
    type: () => UsuarioFindOneInputRestDto,
    description: "Usuario que recebera os vinculos",
  })
  @ValidateNested()
  @Type(() => UsuarioFindOneInputRestDto)
  usuario: UsuarioFindOneInputRestDto;
}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ApiSchema({ name: "PerfilFindOneInputDto" })
export class PerfilFindOneInputRestDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @IsUUID()
  id: string;
}
