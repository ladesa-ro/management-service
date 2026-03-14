import {
  EntityBaseRestDto,
  PaginatedFilterByIdRestDto,
  PaginationMetaRestDto,
} from "@/modules/@shared/infrastructure/presentation/rest/dtos";
import {
  ApiProperty,
  ApiPropertyOptional,
  ApiSchema,
  commonProperties,
  RegisterModel,
  referenceProperty,
  simpleProperty,
  TransformToArray,
} from "@/modules/@shared/presentation/rest";
import {
  IsArray,
  IsBoolean,
  IsOptional,
  IsString,
  IsUUID,
  Type,
  ValidateNested,
} from "@/modules/@shared/presentation/shared";
import {
  UsuarioFindOneInputRestDto,
  UsuarioFindOneOutputRestDto,
} from "@/modules/acesso/usuario/presentation/rest";
import {
  CampusFindOneInputRestDto,
  CampusFindOneOutputRestDto,
} from "@/modules/ambientes/campus/presentation/rest";

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
export class PerfilFindOneOutputRestDto extends EntityBaseRestDto {
  @ApiProperty({ type: "boolean", description: "Indica se o vinculo esta ativo" })
  @IsBoolean()
  ativo: boolean;

  @ApiProperty({ type: "string", description: "Cargo do usuario no vinculo" })
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
}

// ============================================================================
// List Input/Output
// ============================================================================

@ApiSchema({ name: "PerfilListInputDto" })
export class PerfilListInputRestDto extends PaginatedFilterByIdRestDto {
  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    description: "Filtro por ativo",
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.ativo"?: string[];

  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    description: "Filtro por cargo",
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.cargo"?: string[];

  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    description: "Filtro por ID do Campus",
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  "filter.campus.id"?: string[];

  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    description: "Filtro por ID do Usuario",
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
    type: "string",
    isArray: true,
    description: "Lista de cargos que o usuario tera no campus",
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
  @ApiProperty({
    type: "string",
    description: "Identificador do registro (uuid)",
    format: "uuid",
  })
  @IsUUID()
  id: string;
}
