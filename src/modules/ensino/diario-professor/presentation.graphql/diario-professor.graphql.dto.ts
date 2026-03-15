import {
  EntityBaseGraphQlDto,
  PaginatedFilterByIdGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/modules/@shared/infrastructure/graphql/dtos";
import { ArgsType, Field, InputType, ObjectType } from "@/modules/@shared/presentation/graphql";
import {
  IsArray,
  IsBoolean,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from "@/modules/@shared/presentation/shared";
import { PerfilFindOneOutputGraphQlDto } from "@/modules/acesso/perfil/presentation.graphql/perfil.graphql.dto";
import { DiarioProfessorFieldsMixin } from "../presentation.validations/diario-professor.validation-mixin";

// ============================================================================
// Ref Input DTOs for cross-module references
// ============================================================================

@InputType("DiarioProfessorDiarioRefInputDto")
export class DiarioProfessorDiarioRefInputGraphQlDto {
  @Field(() => String) @IsString() id: string;
}

@InputType("DiarioProfessorPerfilRefInputDto")
export class DiarioProfessorPerfilRefInputGraphQlDto {
  @Field(() => String) @IsString() id: string;
}

// ============================================================================
// Diario nested output (diario module not yet refactored to GraphQL)
// ============================================================================

@ObjectType("DiarioProfessorDiarioOutput")
export class DiarioProfessorDiarioOutputGraphQlDto extends EntityBaseGraphQlDto {
  @Field(() => Boolean) ativo: boolean;
}

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("DiarioProfessorFindOneOutputDto")
export class DiarioProfessorFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @Field(() => Boolean) situacao: boolean;
  @Field(() => DiarioProfessorDiarioOutputGraphQlDto)
  diario: DiarioProfessorDiarioOutputGraphQlDto;
  @Field(() => PerfilFindOneOutputGraphQlDto) perfil: PerfilFindOneOutputGraphQlDto;
}

// ============================================================================
// Create Input
// ============================================================================

@InputType("DiarioProfessorCreateInputDto")
export class DiarioProfessorCreateInputGraphQlDto extends DiarioProfessorFieldsMixin {
  @Field(() => Boolean) declare situacao: boolean;
  @Field(() => DiarioProfessorDiarioRefInputGraphQlDto)
  @ValidateNested()
  diario: DiarioProfessorDiarioRefInputGraphQlDto;
  @Field(() => DiarioProfessorPerfilRefInputGraphQlDto)
  @ValidateNested()
  perfil: DiarioProfessorPerfilRefInputGraphQlDto;
}

// ============================================================================
// Update Input
// ============================================================================

@InputType("DiarioProfessorUpdateInputDto")
export class DiarioProfessorUpdateInputGraphQlDto {
  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  situacao?: boolean;
  @Field(() => DiarioProfessorDiarioRefInputGraphQlDto, { nullable: true })
  @IsOptional()
  @ValidateNested()
  diario?: DiarioProfessorDiarioRefInputGraphQlDto;
  @Field(() => DiarioProfessorPerfilRefInputGraphQlDto, { nullable: true })
  @IsOptional()
  @ValidateNested()
  perfil?: DiarioProfessorPerfilRefInputGraphQlDto;
}

// ============================================================================
// List Input (GraphQL-compatible - no dots in field names)
// ============================================================================

@ArgsType()
export class DiarioProfessorListInputGraphQlDto extends PaginatedFilterByIdGraphQlDto {
  @Field(() => [String], { nullable: true, description: "Filtro por ID do Usuario do Perfil" })
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  filterPerfilUsuarioId?: string[];

  @Field(() => [String], { nullable: true, description: "Filtro por ID do Perfil" })
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  filterPerfilId?: string[];

  @Field(() => [String], { nullable: true, description: "Filtro por ID do Diario" })
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  filterDiarioId?: string[];
}

// ============================================================================
// List Output
// ============================================================================

@ObjectType("DiarioProfessorListResult")
export class DiarioProfessorListOutputGraphQlDto {
  @Field(() => PaginationMetaGraphQlDto)
  meta: PaginationMetaGraphQlDto;

  @Field(() => [DiarioProfessorFindOneOutputGraphQlDto])
  data: DiarioProfessorFindOneOutputGraphQlDto[];
}
