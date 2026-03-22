import {
  CidadeFindOneInputRestDto,
  CidadeFindOneOutputRestDto,
} from "@/modules/localidades/cidade/presentation.rest/cidade.rest.dto";
import {
  enderecoFindOneInputSchema,
  enderecoInputSchema,
} from "@/modules/localidades/endereco/domain/endereco.schemas";
import {
  ApiProperty,
  ApiPropertyOptional,
  ApiSchema,
  commonProperties,
  RegisterModel,
  referenceProperty,
  simpleProperty,
} from "@/shared/presentation/rest";
import { EntityBaseRestDto } from "@/shared/presentation/rest/dtos";

// ============================================================================
// FindOne Output
// ============================================================================

@ApiSchema({ name: "EnderecoFindOneOutputDto" })
@RegisterModel({
  name: "EnderecoFindOneQueryResult",
  properties: [
    simpleProperty("id"),
    simpleProperty("cep"),
    simpleProperty("logradouro"),
    simpleProperty("numero"),
    simpleProperty("bairro"),
    simpleProperty("complemento", { nullable: true }),
    simpleProperty("pontoReferencia", { nullable: true }),
    referenceProperty("cidade", "CidadeFindOneQueryResult"),
    ...commonProperties.dated,
  ],
})
export class EnderecoFindOneOutputRestDto extends EntityBaseRestDto {
  @ApiProperty({ type: "string", description: "Codigo postal (CEP)" })
  declare cep: string;

  @ApiProperty({ type: "string", description: "Logradouro" })
  declare logradouro: string;

  @ApiProperty({ type: "integer", description: "Numero", minimum: 0, maximum: 99999 })
  declare numero: number;

  @ApiProperty({ type: "string", description: "Bairro" })
  declare bairro: string;

  @ApiPropertyOptional({ type: "string", description: "Complemento", nullable: true })
  declare complemento: string | null;

  @ApiPropertyOptional({ type: "string", description: "Ponto de referencia", nullable: true })
  declare pontoReferencia: string | null;

  @ApiProperty({ type: () => CidadeFindOneOutputRestDto, description: "Cidade" })
  cidade: CidadeFindOneOutputRestDto;
}

// ============================================================================
// Input (for create/update with nested city reference)
// ============================================================================

@ApiSchema({ name: "EnderecoInputDto" })
export class EnderecoInputRestDto {
  static schema = enderecoInputSchema;

  @ApiProperty({ type: "string", description: "Codigo postal (CEP)" })
  declare cep: string;

  @ApiProperty({ type: "string", description: "Logradouro" })
  declare logradouro: string;

  @ApiProperty({ type: "integer", description: "Numero", minimum: 0, maximum: 99999 })
  declare numero: number;

  @ApiProperty({ type: "string", description: "Bairro" })
  declare bairro: string;

  @ApiPropertyOptional({ type: "string", description: "Complemento", nullable: true })
  declare complemento: string | null;

  @ApiPropertyOptional({ type: "string", description: "Ponto de referencia", nullable: true })
  declare pontoReferencia: string | null;

  @ApiProperty({ type: () => CidadeFindOneInputRestDto, description: "Cidade" })
  cidade: CidadeFindOneInputRestDto;
}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ApiSchema({ name: "EnderecoFindOneInputDto" })
export class EnderecoFindOneInputRestDto {
  static schema = enderecoFindOneInputSchema;

  @ApiProperty({
    type: "string",
    description: "Identificador do registro (uuid)",
    format: "uuid",
  })
  id: string;
}
