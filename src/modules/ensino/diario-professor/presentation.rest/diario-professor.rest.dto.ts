import { Mixin } from "ts-mixer";
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
  PartialType,
  RegisterModel,
  referenceProperty,
  simpleProperty,
  TransformToArray,
} from "@/modules/@shared/presentation/rest";
import {
  IsArray,
  IsOptional,
  IsUUID,
  Type,
  ValidateNested,
} from "@/modules/@shared/presentation/shared";
import {
  PerfilFindOneInputRestDto,
  PerfilFindOneOutputRestDto,
} from "@/modules/acesso/perfil/presentation.rest";
import {
  DiarioFindOneInputRestDto,
  DiarioFindOneOutputRestDto,
} from "@/modules/ensino/diario/presentation.rest";
import { DiarioProfessorFieldsMixin } from "../presentation.validations/diario-professor.validation-mixin";

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
export class DiarioProfessorFindOneOutputRestDto extends Mixin(
  EntityBaseRestDto,
  DiarioProfessorFieldsMixin,
) {
  @ApiProperty({ type: "boolean", description: "Situacao do vinculo" })
  declare situacao: boolean;

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

  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    description: "Filtro por ID do Diario",
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
export class DiarioProfessorCreateInputRestDto extends DiarioProfessorFieldsMixin {
  @ApiProperty({ type: "boolean", description: "Situacao do vinculo" })
  declare situacao: boolean;

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
  @ApiProperty({
    type: "string",
    description: "Identificador do registro (uuid)",
    format: "uuid",
  })
  @IsUUID()
  id: string;
}
