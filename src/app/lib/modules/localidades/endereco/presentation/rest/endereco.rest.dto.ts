import { ApiProperty, ApiPropertyOptional, ApiSchema } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsUUID, ValidateNested } from "class-validator";
import { decorate, Mixin } from "ts-mixer";
import {
  commonProperties,
  RegisterModel,
  referenceProperty,
  simpleProperty,
} from "@/modules/@shared/infrastructure/persistence/typeorm/metadata";
import { EntityBaseRestDto } from "@/modules/@shared/infrastructure/presentation/rest/dtos";
import {
  CidadeFindOneInputRestDto,
  CidadeFindOneOutputRestDto,
} from "@/modules/localidades/cidade/presentation/rest/cidade.rest.dto";
import { EnderecoFieldsMixin } from "../endereco.validation-mixin";

// ============================================================================
// FindOne Output
// ============================================================================

@decorate(ApiSchema({ name: "EnderecoFindOneOutputDto" }))
@decorate(
  RegisterModel({
    name: "EnderecoFindOneOutputDto",
    properties: [
      simpleProperty("id"),
      simpleProperty("cep"),
      simpleProperty("logradouro"),
      simpleProperty("numero"),
      simpleProperty("bairro"),
      simpleProperty("complemento", { nullable: true }),
      simpleProperty("pontoReferencia", { nullable: true }),
      referenceProperty("cidade", "CidadeFindOneOutputDto"),
      ...commonProperties.dated,
    ],
  }),
)
export class EnderecoFindOneOutputRestDto extends Mixin(EntityBaseRestDto, EnderecoFieldsMixin) {
  @decorate(ApiProperty({ type: "string", description: "Codigo postal (CEP)" }))
  declare cep: string;

  @decorate(ApiProperty({ type: "string", description: "Logradouro" }))
  declare logradouro: string;

  @decorate(ApiProperty({ type: "integer", description: "Numero", minimum: 0, maximum: 99999 }))
  declare numero: number;

  @decorate(ApiProperty({ type: "string", description: "Bairro" }))
  declare bairro: string;

  @decorate(ApiPropertyOptional({ type: "string", description: "Complemento", nullable: true }))
  declare complemento: string | null;

  @decorate(
    ApiPropertyOptional({ type: "string", description: "Ponto de referencia", nullable: true }),
  )
  declare pontoReferencia: string | null;

  @decorate(ApiProperty({ type: () => CidadeFindOneOutputRestDto, description: "Cidade" }))
  @decorate(ValidateNested())
  @decorate(Type(() => CidadeFindOneOutputRestDto))
  cidade: CidadeFindOneOutputRestDto;
}

// ============================================================================
// Input (for create/update with nested city reference)
// ============================================================================

@decorate(ApiSchema({ name: "EnderecoInputDto" }))
export class EnderecoInputRestDto extends EnderecoFieldsMixin {
  @decorate(ApiProperty({ type: "string", description: "Codigo postal (CEP)" }))
  declare cep: string;

  @decorate(ApiProperty({ type: "string", description: "Logradouro" }))
  declare logradouro: string;

  @decorate(ApiProperty({ type: "integer", description: "Numero", minimum: 0, maximum: 99999 }))
  declare numero: number;

  @decorate(ApiProperty({ type: "string", description: "Bairro" }))
  declare bairro: string;

  @decorate(ApiPropertyOptional({ type: "string", description: "Complemento", nullable: true }))
  declare complemento: string | null;

  @decorate(
    ApiPropertyOptional({ type: "string", description: "Ponto de referencia", nullable: true }),
  )
  declare pontoReferencia: string | null;

  @decorate(ApiProperty({ type: () => CidadeFindOneInputRestDto, description: "Cidade" }))
  @decorate(ValidateNested())
  @decorate(Type(() => CidadeFindOneInputRestDto))
  cidade: CidadeFindOneInputRestDto;
}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@decorate(ApiSchema({ name: "EnderecoFindOneInputDto" }))
export class EnderecoFindOneInputRestDto {
  @decorate(
    ApiProperty({
      type: "string",
      description: "Identificador do registro (uuid)",
      format: "uuid",
    }),
  )
  @decorate(IsUUID())
  id: string;
}
