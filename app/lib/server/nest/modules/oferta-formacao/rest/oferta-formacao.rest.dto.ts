import { ApiProperty, ApiPropertyOptional, ApiSchema, PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsArray,
  IsDateString,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
  ValidateNested,
} from "class-validator";
import {
  commonProperties,
  RegisterModel,
  referenceProperty,
  simpleProperty,
} from "@/modules/@shared/infrastructure/persistence/typeorm/metadata";
import {
  PaginationInputRestDto,
  PaginationMetaRestDto,
  TransformToArray,
} from "@/modules/@shared/infrastructure/presentation/rest/dtos";
import {
  ModalidadeFindOneInputRestDto,
  ModalidadeFindOneOutputRestDto,
} from "@/server/nest/modules/modalidade/rest/modalidade.rest.dto";

// ============================================================================
// FindOne Output
// ============================================================================

@ApiSchema({ name: "OfertaFormacaoFindOneOutputDto" })
@RegisterModel({
  name: "OfertaFormacaoFindOneOutputDto",
  properties: [
    simpleProperty("id"),
    simpleProperty("nome"),
    simpleProperty("slug"),
    referenceProperty("modalidade", "ModalidadeFindOneOutputDto"),
    ...commonProperties.dated,
  ],
})
export class OfertaFormacaoFindOneOutputRestDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @IsUUID()
  id: string;

  @ApiProperty({ description: "Nome da oferta de formacao", minLength: 1 })
  @IsString()
  @MinLength(1)
  nome: string;

  @ApiProperty({ description: "Apelido da oferta de formacao", minLength: 1 })
  @IsString()
  @MinLength(1)
  slug: string;

  @ApiProperty({
    type: () => ModalidadeFindOneOutputRestDto,
    description: "Modalidade da oferta de formacao",
  })
  @ValidateNested()
  @Type(() => ModalidadeFindOneOutputRestDto)
  modalidade: ModalidadeFindOneOutputRestDto;

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
// List Input/Output
// ============================================================================

@ApiSchema({ name: "OfertaFormacaoListInputDto" })
export class OfertaFormacaoListInputRestDto extends PaginationInputRestDto {
  @ApiPropertyOptional({
    description: "Filtro por ID",
    type: [String],
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  "filter.id"?: string[];

  @ApiPropertyOptional({
    description: "Filtro por ID da Modalidade",
    type: [String],
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  "filter.modalidade.id"?: string[];
}

@ApiSchema({ name: "OfertaFormacaoListOutputDto" })
export class OfertaFormacaoListOutputRestDto {
  @ApiProperty({ type: () => PaginationMetaRestDto, description: "Metadados da busca" })
  meta: PaginationMetaRestDto;

  @ApiProperty({
    type: () => [OfertaFormacaoFindOneOutputRestDto],
    description: "Resultados da busca",
  })
  data: OfertaFormacaoFindOneOutputRestDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@ApiSchema({ name: "OfertaFormacaoCreateInputDto" })
export class OfertaFormacaoCreateInputRestDto {
  @ApiProperty({ description: "Nome da oferta de formacao", minLength: 1 })
  @IsString()
  @MinLength(1)
  nome: string;

  @ApiProperty({ description: "Apelido da oferta de formacao", minLength: 1 })
  @IsString()
  @MinLength(1)
  slug: string;

  @ApiProperty({
    type: () => ModalidadeFindOneInputRestDto,
    description: "Modalidade da oferta de formacao",
  })
  @ValidateNested()
  @Type(() => ModalidadeFindOneInputRestDto)
  modalidade: ModalidadeFindOneInputRestDto;
}

@ApiSchema({ name: "OfertaFormacaoUpdateInputDto" })
export class OfertaFormacaoUpdateInputRestDto extends PartialType(
  OfertaFormacaoCreateInputRestDto,
) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ApiSchema({ name: "OfertaFormacaoFindOneInputDto" })
export class OfertaFormacaoFindOneInputRestDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @IsUUID()
  id: string;
}
