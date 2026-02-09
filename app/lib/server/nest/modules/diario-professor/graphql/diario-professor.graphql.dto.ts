import { ArgsType, Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Min,
  ValidateNested,
} from "class-validator";
import {
  EntityBaseGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/modules/@shared/infrastructure/graphql/dtos";
import { PerfilFindOneOutputGraphQlDto } from "@/server/nest/modules/perfil/graphql/perfil.graphql.dto";

// ============================================================================
// Ref Input DTOs for cross-module references
// ============================================================================

@InputType("DiarioProfessorDiarioRefInputDto")
export class DiarioProfessorDiarioRefInputGraphQlDto {
  @Field() @IsString() id: string;
}

@InputType("DiarioProfessorPerfilRefInputDto")
export class DiarioProfessorPerfilRefInputGraphQlDto {
  @Field() @IsString() id: string;
}

// ============================================================================
// Diario nested output (diario module not yet refactored to GraphQL)
// ============================================================================

@ObjectType("DiarioProfessorDiarioOutput")
export class DiarioProfessorDiarioOutputGraphQlDto extends EntityBaseGraphQlDto {
  @Field() ativo: boolean;
}

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("DiarioProfessorFindOneOutputDto")
export class DiarioProfessorFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @Field() situacao: boolean;
  @Field(() => DiarioProfessorDiarioOutputGraphQlDto) diario: DiarioProfessorDiarioOutputGraphQlDto;
  @Field(() => PerfilFindOneOutputGraphQlDto) perfil: PerfilFindOneOutputGraphQlDto;
}

// ============================================================================
// Create Input
// ============================================================================

@InputType("DiarioProfessorCreateInputDto")
export class DiarioProfessorCreateInputGraphQlDto {
  @Field() @IsBoolean() situacao: boolean;
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
  @Field({ nullable: true }) @IsOptional() @IsBoolean() situacao?: boolean;
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
export class DiarioProfessorListInputGraphQlDto {
  @Field(() => Int, { nullable: true, defaultValue: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number = 1;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(1)
  limit?: number;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  search?: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  sortBy?: string[];

  @Field(() => [String], { nullable: true, description: "Filtro por ID" })
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  filterId?: string[];

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
