import { ArgsType, Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsDateString, IsOptional } from "class-validator";
import { decorate } from "ts-mixer";
import {
  EntityBaseGraphQlDto,
  PaginatedFilterByIdGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/modules/@shared/infrastructure/graphql/dtos";
import { DisponibilidadeFieldsMixin } from "../disponibilidade.validation-mixin";

// ============================================================================
// FindOne Output
// ============================================================================

@decorate(ObjectType("DisponibilidadeFindOneOutputDto"))
export class DisponibilidadeFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @decorate(Field(() => Date)) dataInicio: Date;
  @decorate(Field(() => Date, { nullable: true })) dataFim: Date | null;
}

// ============================================================================
// Create Input
// ============================================================================

@decorate(InputType("DisponibilidadeCreateInputDto"))
export class DisponibilidadeCreateInputGraphQlDto extends DisponibilidadeFieldsMixin {
  @decorate(Field(() => Date)) declare dataInicio: Date;
  @decorate(Field(() => Date, { nullable: true })) declare dataFim: Date | null;
}

// ============================================================================
// Update Input
// ============================================================================

@decorate(InputType("DisponibilidadeUpdateInputDto"))
export class DisponibilidadeUpdateInputGraphQlDto {
  @decorate(Field(() => Date, { nullable: true }))
  @decorate(IsOptional())
  @decorate(IsDateString())
  dataInicio?: Date;
  @decorate(Field(() => Date, { nullable: true }))
  @decorate(IsOptional())
  @decorate(IsDateString())
  dataFim?: Date | null;
}

// ============================================================================
// List Input
// ============================================================================

@decorate(ArgsType())
export class DisponibilidadeListInputGraphQlDto extends PaginatedFilterByIdGraphQlDto {}

// ============================================================================
// List Output
// ============================================================================

@decorate(ObjectType("DisponibilidadeListResult"))
export class DisponibilidadeListOutputGraphQlDto {
  @decorate(Field(() => PaginationMetaGraphQlDto))
  meta: PaginationMetaGraphQlDto;

  @decorate(Field(() => [DisponibilidadeFindOneOutputGraphQlDto]))
  data: DisponibilidadeFindOneOutputGraphQlDto[];
}
