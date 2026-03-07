import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { ValidateNested } from "class-validator";
import { decorate } from "ts-mixer";
import { EntityBaseGraphQlDto } from "@/Ladesa.Management.Server.Api/Apis/GraphQl/Abstractions";
import {
  CidadeFindOneInputGraphQlDto,
  CidadeFindOneOutputGraphQlDto,
} from "@/Ladesa.Management.Server.Api/Apis/GraphQl/Dtos/CidadeGraphqlDto";
import { EnderecoFieldsMixin } from "@/Ladesa.Management.Server.Api/Validation/EnderecoValidationMixin";

// ============================================================================
// FindOne Output
// ============================================================================

@decorate(ObjectType("EnderecoFindOneOutputDto"))
export class EnderecoFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @decorate(Field(() => String)) cep: string;
  @decorate(Field(() => String)) logradouro: string;
  @decorate(Field(() => Int)) numero: number;
  @decorate(Field(() => String)) bairro: string;
  @decorate(Field(() => String, { nullable: true })) complemento: string | null;
  @decorate(Field(() => String, { nullable: true })) pontoReferencia: string | null;
  @decorate(Field(() => CidadeFindOneOutputGraphQlDto)) cidade: CidadeFindOneOutputGraphQlDto;
}

// ============================================================================
// Input (for create/update with nested city reference)
// ============================================================================

@decorate(InputType("EnderecoInputDto"))
export class EnderecoInputGraphQlDto extends EnderecoFieldsMixin {
  @decorate(Field(() => String)) declare cep: string;
  @decorate(Field(() => String)) declare logradouro: string;
  @decorate(Field(() => Int)) declare numero: number;
  @decorate(Field(() => String)) declare bairro: string;
  @decorate(Field(() => String, { nullable: true })) declare complemento: string | null;
  @decorate(Field(() => String, { nullable: true })) declare pontoReferencia: string | null;
  @decorate(Field(() => CidadeFindOneInputGraphQlDto))
  @decorate(ValidateNested())
  cidade: CidadeFindOneInputGraphQlDto;
}
