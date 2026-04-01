import { SharedFields } from "@/domain/abstractions";
import {
  CidadeFindOneInputRestDto,
  CidadeFindOneOutputRestDto,
} from "@/modules/localidades/cidade/presentation.rest/cidade.rest.dto";
import { EnderecoFields } from "@/modules/localidades/endereco/domain/endereco.fields";
import { EnderecoInputSchema } from "@/modules/localidades/endereco/domain/endereco.schemas";
import { EnderecoFindOneInputSchema } from "@/modules/localidades/endereco/domain/queries/endereco-find-one.query.schemas";
import { ApiProperty, ApiPropertyOptional, ApiSchema } from "@/shared/presentation/rest";
import { EntityBaseRestDto } from "@/shared/presentation/rest/dtos";

// ============================================================================
// FindOne Output
// ============================================================================

@ApiSchema({ name: "EnderecoFindOneOutputDto" })
export class EnderecoFindOneOutputRestDto extends EntityBaseRestDto {
  @ApiProperty(EnderecoFields.cep.swaggerMetadata)
  declare cep: string;

  @ApiProperty(EnderecoFields.logradouro.swaggerMetadata)
  declare logradouro: string;

  @ApiProperty(EnderecoFields.numero.swaggerMetadata)
  declare numero: number;

  @ApiProperty(EnderecoFields.bairro.swaggerMetadata)
  declare bairro: string;

  @ApiPropertyOptional(EnderecoFields.complemento.swaggerMetadata)
  declare complemento: string | null;

  @ApiPropertyOptional(EnderecoFields.pontoReferencia.swaggerMetadata)
  declare pontoReferencia: string | null;

  @ApiProperty({
    ...EnderecoFields.cidade.swaggerMetadata,
    type: () => CidadeFindOneOutputRestDto,
  })
  cidade: CidadeFindOneOutputRestDto;
}

// ============================================================================
// Input (for create/update with nested city reference)
// ============================================================================

@ApiSchema({ name: "EnderecoInputDto" })
export class EnderecoInputRestDto {
  static schema = EnderecoInputSchema.presentation;

  @ApiProperty(EnderecoFields.cep.swaggerMetadata)
  declare cep: string;

  @ApiProperty(EnderecoFields.logradouro.swaggerMetadata)
  declare logradouro: string;

  @ApiProperty(EnderecoFields.numero.swaggerMetadata)
  declare numero: number;

  @ApiProperty(EnderecoFields.bairro.swaggerMetadata)
  declare bairro: string;

  @ApiPropertyOptional(EnderecoFields.complemento.swaggerMetadata)
  declare complemento: string | null;

  @ApiPropertyOptional(EnderecoFields.pontoReferencia.swaggerMetadata)
  declare pontoReferencia: string | null;

  @ApiProperty({
    ...EnderecoFields.cidade.swaggerMetadata,
    type: () => CidadeFindOneInputRestDto,
  })
  cidade: CidadeFindOneInputRestDto;
}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ApiSchema({ name: "EnderecoFindOneInputDto" })
export class EnderecoFindOneInputRestDto {
  static schema = EnderecoFindOneInputSchema;

  @ApiProperty(SharedFields.idUuid.swaggerMetadata)
  id: string;
}
