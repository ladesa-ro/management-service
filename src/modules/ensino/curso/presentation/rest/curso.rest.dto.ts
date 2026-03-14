import { Mixin } from "ts-mixer";
import {
  EntityBaseRestDto,
  PaginatedFilterByIdRestDto,
  PaginationMetaRestDto,
} from "@/modules/@shared/infrastructure/presentation/rest/dtos";
import {
  ApiProperty,
  ApiPropertyOptional,
  ApiSchema,
  commonProperties,
  PartialType,
  RegisterModel,
  referenceProperty,
  simpleProperty,
  TransformToArray,
} from "@/modules/@shared/presentation/rest";
import {
  IsArray,
  IsOptional,
  IsUUID,
  Type,
  ValidateNested,
} from "@/modules/@shared/presentation/shared";
import { ImagemFindOneOutputRestDto } from "@/modules/ambientes/bloco/presentation/rest";
import {
  CampusFindOneInputRestDto,
  CampusFindOneOutputRestDto,
} from "@/modules/ambientes/campus/presentation/rest";
import { CursoFieldsMixin } from "@/modules/ensino/curso/presentation/curso.validation-mixin";
import {
  OfertaFormacaoFindOneInputRestDto,
  OfertaFormacaoFindOneOutputRestDto,
} from "@/modules/ensino/oferta-formacao/presentation/rest";

// ============================================================================
// FindOne Output
// ============================================================================

@ApiSchema({ name: "CursoFindOneOutputDto" })
@RegisterModel({
  name: "CursoFindOneOutputDto",
  properties: [
    simpleProperty("id"),
    simpleProperty("nome"),
    simpleProperty("nomeAbreviado"),
    referenceProperty("campus", "CampusFindOneOutputDto"),
    referenceProperty("ofertaFormacao", "OfertaFormacaoFindOneOutputDto"),
    referenceProperty("imagemCapa", "ImagemFindOneOutputDto", { nullable: true }),
    ...commonProperties.dated,
  ],
})
export class CursoFindOneOutputRestDto extends Mixin(EntityBaseRestDto, CursoFieldsMixin) {
  @ApiProperty({ type: "string", description: "Nome do curso", minLength: 1 })
  declare nome: string;

  @ApiProperty({ type: "string", description: "Nome abreviado do curso", minLength: 1 })
  declare nomeAbreviado: string;

  @ApiProperty({
    type: () => CampusFindOneOutputRestDto,
    description: "Campus que o curso pertence",
  })
  @ValidateNested()
  @Type(() => CampusFindOneOutputRestDto)
  campus: CampusFindOneOutputRestDto;

  @ApiProperty({
    type: () => OfertaFormacaoFindOneOutputRestDto,
    description: "Oferta de formacao do curso",
  })
  @ValidateNested()
  @Type(() => OfertaFormacaoFindOneOutputRestDto)
  ofertaFormacao: OfertaFormacaoFindOneOutputRestDto;

  @ApiPropertyOptional({
    type: () => ImagemFindOneOutputRestDto,
    description: "Imagem de capa do curso",
    nullable: true,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => ImagemFindOneOutputRestDto)
  imagemCapa: ImagemFindOneOutputRestDto | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

@ApiSchema({ name: "CursoListInputDto" })
export class CursoListInputRestDto extends PaginatedFilterByIdRestDto {
  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    description: "Filtro por ID do Campus",
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  "filter.campus.id"?: string[];

  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    description: "Filtro por ID da Oferta de Formacao",
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  "filter.ofertaFormacao.id"?: string[];
}

@ApiSchema({ name: "CursoListOutputDto" })
export class CursoListOutputRestDto {
  @ApiProperty({ type: () => PaginationMetaRestDto, description: "Metadados da busca" })
  meta: PaginationMetaRestDto;

  @ApiProperty({ type: () => [CursoFindOneOutputRestDto], description: "Resultados da busca" })
  data: CursoFindOneOutputRestDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@ApiSchema({ name: "CursoCreateInputDto" })
export class CursoCreateInputRestDto extends CursoFieldsMixin {
  @ApiProperty({ type: "string", description: "Nome do curso", minLength: 1 })
  declare nome: string;

  @ApiProperty({ type: "string", description: "Nome abreviado do curso", minLength: 1 })
  declare nomeAbreviado: string;

  @ApiProperty({
    type: () => CampusFindOneInputRestDto,
    description: "Campus que o curso pertence",
  })
  @ValidateNested()
  @Type(() => CampusFindOneInputRestDto)
  campus: CampusFindOneInputRestDto;

  @ApiProperty({
    type: () => OfertaFormacaoFindOneInputRestDto,
    description: "Oferta de formacao do curso",
  })
  @ValidateNested()
  @Type(() => OfertaFormacaoFindOneInputRestDto)
  ofertaFormacao: OfertaFormacaoFindOneInputRestDto;
}

@ApiSchema({ name: "CursoUpdateInputDto" })
export class CursoUpdateInputRestDto extends PartialType(CursoCreateInputRestDto) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ApiSchema({ name: "CursoFindOneInputDto" })
export class CursoFindOneInputRestDto {
  @ApiProperty({
    type: "string",
    description: "Identificador do registro (uuid)",
    format: "uuid",
  })
  @IsUUID()
  id: string;
}
