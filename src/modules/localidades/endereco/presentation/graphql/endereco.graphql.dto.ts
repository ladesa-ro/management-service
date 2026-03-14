import { EntityBaseGraphQlDto } from "@/modules/@shared/infrastructure/graphql/dtos";
import { Field, InputType, Int, ObjectType } from "@/modules/@shared/presentation/graphql";
import { ValidateNested } from "@/modules/@shared/presentation/shared";
import {
  CidadeFindOneInputGraphQlDto,
  CidadeFindOneOutputGraphQlDto,
} from "@/modules/localidades/cidade/presentation/graphql/cidade.graphql.dto";
import { EnderecoFieldsMixin } from "../endereco.validation-mixin";

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("EnderecoFindOneOutputDto")
export class EnderecoFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @Field(() => String) cep: string;
  @Field(() => String) logradouro: string;
  @Field(() => Int) numero: number;
  @Field(() => String) bairro: string;
  @Field(() => String, { nullable: true }) complemento: string | null;
  @Field(() => String, { nullable: true }) pontoReferencia: string | null;
  @Field(() => CidadeFindOneOutputGraphQlDto) cidade: CidadeFindOneOutputGraphQlDto;
}

// ============================================================================
// Input (for create/update with nested city reference)
// ============================================================================

@InputType("EnderecoInputDto")
export class EnderecoInputGraphQlDto extends EnderecoFieldsMixin {
  @Field(() => String) declare cep: string;
  @Field(() => String) declare logradouro: string;
  @Field(() => Int) declare numero: number;
  @Field(() => String) declare bairro: string;
  @Field(() => String, { nullable: true }) declare complemento: string | null;
  @Field(() => String, { nullable: true }) declare pontoReferencia: string | null;
  @Field(() => CidadeFindOneInputGraphQlDto)
  @ValidateNested()
  cidade: CidadeFindOneInputGraphQlDto;
}
