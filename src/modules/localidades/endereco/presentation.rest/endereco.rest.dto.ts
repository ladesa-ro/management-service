import { Mixin } from "ts-mixer";
import { EntityBaseRestDto } from "@/modules/@shared/infrastructure/presentation/rest/dtos";
import {
  ApiProperty,
  ApiPropertyOptional,
  ApiSchema,
  commonProperties,
  RegisterModel,
  referenceProperty,
  simpleProperty,
} from "@/modules/@shared/presentation/rest";
import { IsUUID, Type, ValidateNested } from "@/modules/@shared/presentation/shared";
import {
  CidadeFindOneInputRestDto,
  CidadeFindOneOutputRestDto,
} from "@/modules/localidades/cidade/presentation.rest/cidade.rest.dto";
import { EnderecoFieldsMixin } from "../presentation.validations/endereco.validation-mixin";

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
export class EnderecoFindOneOutputRestDto extends Mixin(EntityBaseRestDto, EnderecoFieldsMixin) {
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
  @ValidateNested()
  @Type(() => CidadeFindOneOutputRestDto)
  cidade: CidadeFindOneOutputRestDto;
}

// ============================================================================
// Input (for create/update with nested city reference)
// ============================================================================

@ApiSchema({ name: "EnderecoInputDto" })
export class EnderecoInputRestDto extends EnderecoFieldsMixin {
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
  @ValidateNested()
  @Type(() => CidadeFindOneInputRestDto)
  cidade: CidadeFindOneInputRestDto;
}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ApiSchema({ name: "EnderecoFindOneInputDto" })
export class EnderecoFindOneInputRestDto {
  @ApiProperty({
    type: "string",
    description: "Identificador do registro (uuid)",
    format: "uuid",
  })
  @IsUUID()
  id: string;
}
