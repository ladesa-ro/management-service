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
  IsUUID,
  Type,
  ValidateNested,
} from "@/modules/@shared/presentation/shared";
import {
  PerfilFindOneOutputRestDto,
} from "@/modules/acesso/perfil/presentation.rest";
import {
  DiarioFindOneOutputRestDto,
} from "./diario.rest.dto";

// ============================================================================
// Parent Route Params
// ============================================================================

@ApiSchema({ name: "DiarioProfessorParentParamsDto" })
export class DiarioProfessorParentParamsRestDto {
  @ApiProperty({
    type: "string",
    description: "ID do diario (uuid)",
    format: "uuid",
  })
  @IsUUID()
  diarioId: string;
}

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
export class DiarioProfessorFindOneOutputRestDto extends EntityBaseRestDto {
  @ApiProperty({ type: "boolean", description: "Situacao do vinculo" })
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
}

// ============================================================================
// List Input/Output
// ============================================================================

@ApiSchema({ name: "DiarioProfessorListInputDto" })
export class DiarioProfessorListInputRestDto extends PaginatedFilterByIdRestDto {
  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    description: "Filtro por ID do Usuario do Perfil",
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  "filter.perfil.usuario.id"?: string[];

  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    description: "Filtro por ID do Perfil",
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  "filter.perfil.id"?: string[];
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
// Bulk Replace Input
// ============================================================================

@ApiSchema({ name: "DiarioProfessorBulkReplaceItemDto" })
export class DiarioProfessorBulkReplaceItemRestDto {
  @ApiProperty({ type: "string", description: "ID do perfil (uuid)", format: "uuid" })
  @IsUUID()
  perfilId: string;

  @ApiProperty({ type: "boolean", description: "Situacao do vinculo" })
  @IsBoolean()
  situacao: boolean;
}

@ApiSchema({ name: "DiarioProfessorBulkReplaceInputDto" })
export class DiarioProfessorBulkReplaceInputRestDto {
  @ApiProperty({
    type: () => [DiarioProfessorBulkReplaceItemRestDto],
    description: "Lista de professores para vincular ao diario",
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DiarioProfessorBulkReplaceItemRestDto)
  professores: DiarioProfessorBulkReplaceItemRestDto[];
}
