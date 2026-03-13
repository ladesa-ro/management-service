import { ArgsType, Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsArray, IsOptional, IsString, IsUUID, MinLength, ValidateNested } from "class-validator";
import { decorate } from "ts-mixer";
import {
  EntityBaseGraphQlDto,
  PaginatedFilterByIdGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/modules/@shared/infrastructure/graphql/dtos";
import { UsuarioFindOneOutputGraphQlDto } from "@/modules/acesso/usuario/presentation/graphql/usuario.graphql.dto";
import { AmbienteFindOneOutputGraphQlDto } from "@/modules/ambientes/ambiente/presentation/graphql/ambiente.graphql.dto";
import { ReservaFieldsMixin } from "../reserva.validation-mixin";

// ============================================================================
// FindOne Output
// ============================================================================

@decorate(ObjectType("ReservaFindOneOutputDto"))
export class ReservaFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @decorate(Field(() => String)) situacao: string;
  @decorate(Field(() => String, { nullable: true })) motivo: string | null;
  @decorate(Field(() => String, { nullable: true })) tipo: string | null;
  @decorate(Field(() => String)) rrule: string;
  @decorate(Field(() => AmbienteFindOneOutputGraphQlDto)) ambiente: AmbienteFindOneOutputGraphQlDto;
  @decorate(Field(() => UsuarioFindOneOutputGraphQlDto)) usuario: UsuarioFindOneOutputGraphQlDto;
}

// ============================================================================
// Ref Inputs
// ============================================================================

@decorate(InputType("ReservaAmbienteRefInputDto"))
export class ReservaAmbienteRefInputGraphQlDto {
  @decorate(Field(() => String)) @decorate(IsString()) id: string;
}

@decorate(InputType("ReservaUsuarioRefInputDto"))
export class ReservaUsuarioRefInputGraphQlDto {
  @decorate(Field(() => String)) @decorate(IsString()) id: string;
}

// ============================================================================
// Create Input
// ============================================================================

@decorate(InputType("ReservaCreateInputDto"))
export class ReservaCreateInputGraphQlDto extends ReservaFieldsMixin {
  @decorate(Field(() => String)) declare situacao: string;
  @decorate(Field(() => String, { nullable: true })) declare motivo: string | null;
  @decorate(Field(() => String, { nullable: true })) declare tipo: string | null;
  @decorate(Field(() => String)) declare rrule: string;
  @decorate(Field(() => ReservaAmbienteRefInputGraphQlDto))
  @decorate(ValidateNested())
  ambiente: ReservaAmbienteRefInputGraphQlDto;
  @decorate(Field(() => ReservaUsuarioRefInputGraphQlDto))
  @decorate(ValidateNested())
  usuario: ReservaUsuarioRefInputGraphQlDto;
}

// ============================================================================
// Update Input
// ============================================================================

@decorate(InputType("ReservaUpdateInputDto"))
export class ReservaUpdateInputGraphQlDto {
  @decorate(Field(() => String, { nullable: true }))
  @decorate(IsOptional())
  @decorate(IsString())
  @decorate(MinLength(1))
  situacao?: string;
  @decorate(Field(() => String, { nullable: true }))
  @decorate(IsOptional())
  @decorate(IsString())
  @decorate(MinLength(1))
  motivo?: string | null;
  @decorate(Field(() => String, { nullable: true }))
  @decorate(IsOptional())
  @decorate(IsString())
  @decorate(MinLength(1))
  tipo?: string | null;
  @decorate(Field(() => String, { nullable: true }))
  @decorate(IsOptional())
  @decorate(IsString())
  rrule?: string;
  @decorate(Field(() => ReservaAmbienteRefInputGraphQlDto, { nullable: true }))
  @decorate(IsOptional())
  @decorate(ValidateNested())
  ambiente?: ReservaAmbienteRefInputGraphQlDto;
  @decorate(Field(() => ReservaUsuarioRefInputGraphQlDto, { nullable: true }))
  @decorate(IsOptional())
  @decorate(ValidateNested())
  usuario?: ReservaUsuarioRefInputGraphQlDto;
}

// ============================================================================
// List Input (GraphQL-compatible - no dots in field names)
// ============================================================================

@decorate(ArgsType())
export class ReservaListInputGraphQlDto extends PaginatedFilterByIdGraphQlDto {
  @decorate(Field(() => [String], { nullable: true, description: "Filtro por situacao" }))
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(IsString({ each: true }))
  filterSituacao?: string[];

  @decorate(Field(() => [String], { nullable: true, description: "Filtro por tipo" }))
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(IsString({ each: true }))
  filterTipo?: string[];

  @decorate(Field(() => [String], { nullable: true, description: "Filtro por ID do Ambiente" }))
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(IsUUID(undefined, { each: true }))
  filterAmbienteId?: string[];

  @decorate(
    Field(() => [String], { nullable: true, description: "Filtro por ID do Bloco do Ambiente" }),
  )
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(IsUUID(undefined, { each: true }))
  filterAmbienteBlocoId?: string[];

  @decorate(
    Field(() => [String], {
      nullable: true,
      description: "Filtro por ID do Campus do Bloco do Ambiente",
    }),
  )
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(IsUUID(undefined, { each: true }))
  filterAmbienteBlocoCampusId?: string[];
}

// ============================================================================
// List Output
// ============================================================================

@decorate(ObjectType("ReservaListResult"))
export class ReservaListOutputGraphQlDto {
  @decorate(Field(() => PaginationMetaGraphQlDto))
  meta: PaginationMetaGraphQlDto;

  @decorate(Field(() => [ReservaFindOneOutputGraphQlDto]))
  data: ReservaFindOneOutputGraphQlDto[];
}
