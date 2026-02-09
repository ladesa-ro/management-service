import { ApiProperty, ApiPropertyOptional, ApiSchema } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
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
  commonProperties,
  RegisterModel,
  referenceProperty,
  simpleProperty,
} from "@/modules/@shared/infrastructure/persistence/typeorm/metadata";
import {
  CidadeFindOneInputRestDto,
  CidadeFindOneOutputRestDto,
} from "@/server/nest/modules/cidade/rest/cidade.rest.dto";

// ============================================================================
// FindOne Output
// ============================================================================

@ApiSchema({ name: "EnderecoFindOneOutputDto" })
@RegisterModel({
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
})
export class EnderecoFindOneOutputRestDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @IsUUID()
  id: string;

  @ApiProperty({ description: "Codigo postal (CEP)" })
  @IsString()
  cep: string;

  @ApiProperty({ description: "Logradouro" })
  @IsString()
  logradouro: string;

  @ApiProperty({ description: "Numero", minimum: 0, maximum: 99999 })
  @IsInt()
  @Min(0)
  @Max(99999)
  numero: number;

  @ApiProperty({ description: "Bairro" })
  @IsString()
  bairro: string;

  @ApiPropertyOptional({ description: "Complemento", nullable: true })
  @IsOptional()
  @IsString()
  complemento: string | null;

  @ApiPropertyOptional({ description: "Ponto de referencia", nullable: true })
  @IsOptional()
  @IsString()
  pontoReferencia: string | null;

  @ApiProperty({ type: () => CidadeFindOneOutputRestDto, description: "Cidade" })
  @ValidateNested()
  @Type(() => CidadeFindOneOutputRestDto)
  cidade: CidadeFindOneOutputRestDto;

  @ApiProperty({ description: "Data e hora da criacao do registro" })
  @IsDateString()
  dateCreated: Date;

  @ApiProperty({ description: "Data e hora da alteracao do registro" })
  @IsDateString()
  dateUpdated: Date;

  @ApiPropertyOptional({ description: "Data e hora da exclusao do registro", nullable: true })
  @IsOptional()
  @IsDateString()
  dateDeleted: Date | null;
}

// ============================================================================
// Input (for create/update with nested city reference)
// ============================================================================

@ApiSchema({ name: "EnderecoInputDto" })
export class EnderecoInputRestDto {
  @ApiProperty({ description: "Codigo postal (CEP)" })
  @IsString()
  cep: string;

  @ApiProperty({ description: "Logradouro" })
  @IsString()
  logradouro: string;

  @ApiProperty({ description: "Numero", minimum: 0, maximum: 99999 })
  @IsInt()
  @Min(0)
  @Max(99999)
  numero: number;

  @ApiProperty({ description: "Bairro" })
  @IsString()
  bairro: string;

  @ApiPropertyOptional({ description: "Complemento", nullable: true })
  @IsOptional()
  @IsString()
  complemento?: string | null;

  @ApiPropertyOptional({ description: "Ponto de referencia", nullable: true })
  @IsOptional()
  @IsString()
  pontoReferencia?: string | null;

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
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @IsUUID()
  id: string;
}
