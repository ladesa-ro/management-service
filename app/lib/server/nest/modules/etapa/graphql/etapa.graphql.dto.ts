import { ArgsType, Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import {
  IsArray,
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
  ValidateNested,
} from "class-validator";
import {
  EntityBaseGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/modules/@shared/infrastructure/graphql/dtos";
import { PaginationInputGraphQlDto } from "@/modules/@shared/infrastructure/graphql/dtos/pagination-graphql.dto";
import { CalendarioLetivoFindOneOutputGraphQlDto } from "@/server/nest/modules/calendario-letivo/graphql/calendario-letivo.graphql.dto";

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("EtapaFindOneOutputDto")
export class EtapaFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @Field(() => Int, { nullable: true }) numero: number | null;
  @Field() dataInicio: string;
  @Field() dataTermino: string;
  @Field({ nullable: true }) cor: string | null;
  @Field(() => CalendarioLetivoFindOneOutputGraphQlDto)
  calendario: CalendarioLetivoFindOneOutputGraphQlDto;
}

// ============================================================================
// Create Input
// ============================================================================

@InputType("CalendarioLetivoRefInputForEtapaDto")
export class CalendarioLetivoRefInputForEtapaGraphQlDto {
  @Field() @IsString() id: string;
}

@InputType("EtapaCreateInputDto")
export class EtapaCreateInputGraphQlDto {
  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(255)
  numero?: number | null;

  @Field() @IsDateString() dataInicio: string;
  @Field() @IsDateString() dataTermino: string;

  @Field({ nullable: true }) @IsOptional() @IsString() cor?: string | null;

  @Field(() => CalendarioLetivoRefInputForEtapaGraphQlDto)
  @ValidateNested()
  calendario: CalendarioLetivoRefInputForEtapaGraphQlDto;
}

// ============================================================================
// Update Input
// ============================================================================

@InputType("EtapaUpdateInputDto")
export class EtapaUpdateInputGraphQlDto {
  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(255)
  numero?: number | null;

  @Field({ nullable: true }) @IsOptional() @IsDateString() dataInicio?: string;
  @Field({ nullable: true }) @IsOptional() @IsDateString() dataTermino?: string;
  @Field({ nullable: true }) @IsOptional() @IsString() cor?: string | null;

  @Field(() => CalendarioLetivoRefInputForEtapaGraphQlDto, { nullable: true })
  @IsOptional()
  @ValidateNested()
  calendario?: CalendarioLetivoRefInputForEtapaGraphQlDto;
}

// ============================================================================
// List Input
// ============================================================================

@ArgsType()
export class EtapaListInputGraphQlDto extends PaginationInputGraphQlDto {
  @Field(() => [String], { nullable: true, description: "Filtro por ID" })
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  filterId?: string[];

  @Field(() => [String], { nullable: true, description: "Filtro por ID do Calendario" })
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  filterCalendarioId?: string[];
}

// ============================================================================
// List Output
// ============================================================================

@ObjectType("EtapaListResult")
export class EtapaListOutputGraphQlDto {
  @Field(() => PaginationMetaGraphQlDto)
  meta: PaginationMetaGraphQlDto;

  @Field(() => [EtapaFindOneOutputGraphQlDto])
  data: EtapaFindOneOutputGraphQlDto[];
}
