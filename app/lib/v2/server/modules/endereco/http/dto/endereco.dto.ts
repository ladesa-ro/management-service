import { ArgsType, Field, ID, InputType, Int, ObjectType } from "@nestjs/graphql";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
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
} from "@/shared/metadata";
import { CidadeFindOneInputDto, CidadeFindOneOutputDto } from "@/v2/server/modules/cidade/http/dto";

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("Endereco")
@RegisterModel({
  name: "EnderecoFindOneOutput",
  properties: [
    simpleProperty("id"),
    simpleProperty("cep"),
    simpleProperty("logradouro"),
    simpleProperty("numero"),
    simpleProperty("bairro"),
    simpleProperty("complemento", { nullable: true }),
    simpleProperty("pontoReferencia", { nullable: true }),
    referenceProperty("cidade", "CidadeFindOneOutput"),
    ...commonProperties.dated,
  ],
})
export class EnderecoFindOneOutputDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @Field(() => ID)
  @IsUUID()
  id: string;

  @ApiProperty({ description: "Codigo postal (CEP)" })
  @Field()
  @IsString()
  cep: string;

  @ApiProperty({ description: "Logradouro" })
  @Field()
  @IsString()
  logradouro: string;

  @ApiProperty({ description: "Numero", minimum: 0, maximum: 99999 })
  @Field(() => Int)
  @IsInt()
  @Min(0)
  @Max(99999)
  numero: number;

  @ApiProperty({ description: "Bairro" })
  @Field()
  @IsString()
  bairro: string;

  @ApiPropertyOptional({ description: "Complemento", nullable: true })
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  complemento: string | null;

  @ApiPropertyOptional({ description: "Ponto de referencia", nullable: true })
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  pontoReferencia: string | null;

  @ApiProperty({ type: () => CidadeFindOneOutputDto, description: "Cidade" })
  @Field(() => CidadeFindOneOutputDto)
  @ValidateNested()
  @Type(() => CidadeFindOneOutputDto)
  cidade: CidadeFindOneOutputDto;

  @ApiProperty({ description: "Data e hora da criacao do registro" })
  @Field()
  @IsDateString()
  dateCreated: Date;

  @ApiProperty({ description: "Data e hora da alteracao do registro" })
  @Field()
  @IsDateString()
  dateUpdated: Date;

  @ApiPropertyOptional({ description: "Data e hora da exclusao do registro", nullable: true })
  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  dateDeleted: Date | null;
}

// ============================================================================
// Input (for create/update with nested city reference)
// ============================================================================

@InputType("EnderecoInput")
export class EnderecoInputDto {
  @ApiProperty({ description: "Codigo postal (CEP)" })
  @Field()
  @IsString()
  cep: string;

  @ApiProperty({ description: "Logradouro" })
  @Field()
  @IsString()
  logradouro: string;

  @ApiProperty({ description: "Numero", minimum: 0, maximum: 99999 })
  @Field(() => Int)
  @IsInt()
  @Min(0)
  @Max(99999)
  numero: number;

  @ApiProperty({ description: "Bairro" })
  @Field()
  @IsString()
  bairro: string;

  @ApiPropertyOptional({ description: "Complemento", nullable: true })
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  complemento?: string | null;

  @ApiPropertyOptional({ description: "Ponto de referencia", nullable: true })
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  pontoReferencia?: string | null;

  @ApiProperty({ type: () => CidadeFindOneInputDto, description: "Cidade" })
  @Field(() => CidadeFindOneInputDto)
  @ValidateNested()
  @Type(() => CidadeFindOneInputDto)
  cidade: CidadeFindOneInputDto;
}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ArgsType()
export class EnderecoFindOneInputDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @Field(() => ID)
  @IsUUID()
  id: string;
}
