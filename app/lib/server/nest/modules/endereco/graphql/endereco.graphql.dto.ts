import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { IsInt, IsOptional, IsString, Max, Min, ValidateNested } from "class-validator";
import { EntityBaseGraphQlDto } from "@/modules/@shared/infrastructure/graphql/dtos";
import {
  CidadeFindOneInputGraphQlDto,
  CidadeFindOneOutputGraphQlDto,
} from "@/server/nest/modules/cidade/graphql/cidade.graphql.dto";

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("EnderecoFindOneOutputDto")
export class EnderecoFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @Field() cep: string;
  @Field() logradouro: string;
  @Field(() => Int) numero: number;
  @Field() bairro: string;
  @Field(() => String, { nullable: true }) complemento: string | null;
  @Field(() => String, { nullable: true }) pontoReferencia: string | null;
  @Field(() => CidadeFindOneOutputGraphQlDto) cidade: CidadeFindOneOutputGraphQlDto;
}

// ============================================================================
// Input (for create/update with nested city reference)
// ============================================================================

@InputType("EnderecoInputDto")
export class EnderecoInputGraphQlDto {
  @Field() @IsString() cep: string;
  @Field() @IsString() logradouro: string;
  @Field(() => Int) @IsInt() @Min(0) @Max(99999) numero: number;
  @Field() @IsString() bairro: string;
  @Field(() => String, { nullable: true }) @IsOptional() @IsString() complemento?: string | null;
  @Field(() => String, { nullable: true }) @IsOptional() @IsString() pontoReferencia?:
    | string
    | null;
  @Field(() => CidadeFindOneInputGraphQlDto) @ValidateNested() cidade: CidadeFindOneInputGraphQlDto;
}
