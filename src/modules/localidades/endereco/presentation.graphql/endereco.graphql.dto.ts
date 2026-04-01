import { EntityBaseGraphQlDto } from "@/infrastructure.graphql/dtos";
import {
  CidadeFindOneInputGraphQlDto,
  CidadeFindOneOutputGraphQlDto,
} from "@/modules/localidades/cidade/presentation.graphql/cidade.graphql.dto";
import { EnderecoFields } from "@/modules/localidades/endereco/domain/endereco.fields";
import { EnderecoInputSchema } from "@/modules/localidades/endereco/domain/endereco.schemas";
import { Field, InputType, Int, ObjectType } from "@/shared/presentation/graphql";

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("EnderecoFindOneOutputDto")
export class EnderecoFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @Field(() => String, EnderecoFields.cep.gqlMetadata) cep: string;
  @Field(() => String, EnderecoFields.logradouro.gqlMetadata) logradouro: string;
  @Field(() => Int, EnderecoFields.numero.gqlMetadata) numero: number;
  @Field(() => String, EnderecoFields.bairro.gqlMetadata) bairro: string;
  @Field(() => String, EnderecoFields.complemento.gqlMetadata) complemento: string | null;
  @Field(() => String, EnderecoFields.pontoReferencia.gqlMetadata) pontoReferencia: string | null;
  @Field(() => CidadeFindOneOutputGraphQlDto, EnderecoFields.cidade.gqlMetadata)
  cidade: CidadeFindOneOutputGraphQlDto;
}

// ============================================================================
// Input (for create/update with nested city reference)
// ============================================================================

@InputType("EnderecoInputDto")
export class EnderecoInputGraphQlDto {
  static schema = EnderecoInputSchema.domain;

  @Field(() => String, EnderecoFields.cep.gqlMetadata) declare cep: string;
  @Field(() => String, EnderecoFields.logradouro.gqlMetadata) declare logradouro: string;
  @Field(() => Int, EnderecoFields.numero.gqlMetadata) declare numero: number;
  @Field(() => String, EnderecoFields.bairro.gqlMetadata) declare bairro: string;
  @Field(() => String, EnderecoFields.complemento.gqlMetadata) declare complemento: string | null;
  @Field(() => String, EnderecoFields.pontoReferencia.gqlMetadata)
  declare pontoReferencia: string | null;
  @Field(() => CidadeFindOneInputGraphQlDto, EnderecoFields.cidade.gqlMetadata)
  cidade: CidadeFindOneInputGraphQlDto;
}
