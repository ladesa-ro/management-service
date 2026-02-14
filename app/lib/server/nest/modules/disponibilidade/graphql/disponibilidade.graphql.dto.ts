import { ArgsType, Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsArray, IsDateString, IsOptional, IsUUID } from "class-validator";
import {
  EntityBaseGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/modules/@shared/infrastructure/graphql/dtos";
import { PaginationInputGraphQlDto } from "@/modules/@shared/infrastructure/graphql/dtos/pagination-graphql.dto";

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("DisponibilidadeFindOneOutputDto")
export class DisponibilidadeFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @Field() dataInicio: Date;
  @Field(() => Date, { nullable: true }) dataFim: Date | null;
}

// ============================================================================
// Create Input
// ============================================================================

@InputType("DisponibilidadeCreateInputDto")
export class DisponibilidadeCreateInputGraphQlDto {
  @Field() @IsDateString() dataInicio: Date;
  @Field(() => Date, { nullable: true }) @IsOptional() @IsDateString() dataFim?: Date | null;
}

// ============================================================================
// Update Input
// ============================================================================

@InputType("DisponibilidadeUpdateInputDto")
export class DisponibilidadeUpdateInputGraphQlDto {
  @Field({ nullable: true }) @IsOptional() @IsDateString() dataInicio?: Date;
  @Field(() => Date, { nullable: true }) @IsOptional() @IsDateString() dataFim?: Date | null;
}

// ============================================================================
// List Input
// ============================================================================

@ArgsType()
export class DisponibilidadeListInputGraphQlDto extends PaginationInputGraphQlDto {
  @Field(() => [String], { nullable: true, description: "Filtro por ID" })
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  filterId?: string[];
}

// ============================================================================
// List Output
// ============================================================================

@ObjectType("DisponibilidadeListResult")
export class DisponibilidadeListOutputGraphQlDto {
  @Field(() => PaginationMetaGraphQlDto)
  meta: PaginationMetaGraphQlDto;

  @Field(() => [DisponibilidadeFindOneOutputGraphQlDto])
  data: DisponibilidadeFindOneOutputGraphQlDto[];
}
