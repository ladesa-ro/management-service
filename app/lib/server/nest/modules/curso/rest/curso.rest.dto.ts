import { ApiProperty, ApiPropertyOptional, ApiSchema, PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsOptional, IsUUID, ValidateNested } from "class-validator";
import { decorate, Mixin } from "ts-mixer";
import {
  commonProperties,
  RegisterModel,
  referenceProperty,
  simpleProperty,
} from "@/modules/@shared/infrastructure/persistence/typeorm/metadata";
import {
  EntityBaseRestDto,
  PaginatedFilterByIdRestDto,
  PaginationMetaRestDto,
  TransformToArray,
} from "@/modules/@shared/infrastructure/presentation/rest/dtos";
import { ImagemFindOneOutputRestDto } from "@/server/nest/modules/bloco/rest";
import {
  CampusFindOneInputRestDto,
  CampusFindOneOutputRestDto,
} from "@/server/nest/modules/campus/rest";
import { CursoFieldsMixin } from "@/server/nest/modules/curso/curso.validation-mixin";
import {
  OfertaFormacaoFindOneInputRestDto,
  OfertaFormacaoFindOneOutputRestDto,
} from "@/server/nest/modules/oferta-formacao/rest";

// ============================================================================
// FindOne Output
// ============================================================================

@decorate(ApiSchema({ name: "CursoFindOneOutputDto" }))
@decorate(
  RegisterModel({
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
  }),
)
export class CursoFindOneOutputRestDto extends Mixin(EntityBaseRestDto, CursoFieldsMixin) {
  @decorate(ApiProperty({ type: "string", description: "Nome do curso", minLength: 1 }))
  declare nome: string;

  @decorate(ApiProperty({ type: "string", description: "Nome abreviado do curso", minLength: 1 }))
  declare nomeAbreviado: string;

  @decorate(
    ApiProperty({
      type: () => CampusFindOneOutputRestDto,
      description: "Campus que o curso pertence",
    }),
  )
  @decorate(ValidateNested())
  @decorate(Type(() => CampusFindOneOutputRestDto))
  campus: CampusFindOneOutputRestDto;

  @decorate(
    ApiProperty({
      type: () => OfertaFormacaoFindOneOutputRestDto,
      description: "Oferta de formacao do curso",
    }),
  )
  @decorate(ValidateNested())
  @decorate(Type(() => OfertaFormacaoFindOneOutputRestDto))
  ofertaFormacao: OfertaFormacaoFindOneOutputRestDto;

  @decorate(
    ApiPropertyOptional({
      type: () => ImagemFindOneOutputRestDto,
      description: "Imagem de capa do curso",
      nullable: true,
    }),
  )
  @decorate(IsOptional())
  @decorate(ValidateNested())
  @decorate(Type(() => ImagemFindOneOutputRestDto))
  imagemCapa: ImagemFindOneOutputRestDto | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

@decorate(ApiSchema({ name: "CursoListInputDto" }))
export class CursoListInputRestDto extends PaginatedFilterByIdRestDto {
  @decorate(
    ApiPropertyOptional({
      type: "string",
      isArray: true,
      description: "Filtro por ID do Campus",
    }),
  )
  @decorate(TransformToArray())
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(IsUUID(undefined, { each: true }))
  "filter.campus.id"?: string[];

  @decorate(
    ApiPropertyOptional({
      type: "string",
      isArray: true,
      description: "Filtro por ID da Oferta de Formacao",
    }),
  )
  @decorate(TransformToArray())
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(IsUUID(undefined, { each: true }))
  "filter.ofertaFormacao.id"?: string[];
}

@decorate(ApiSchema({ name: "CursoListOutputDto" }))
export class CursoListOutputRestDto {
  @decorate(ApiProperty({ type: () => PaginationMetaRestDto, description: "Metadados da busca" }))
  meta: PaginationMetaRestDto;

  @decorate(
    ApiProperty({ type: () => [CursoFindOneOutputRestDto], description: "Resultados da busca" }),
  )
  data: CursoFindOneOutputRestDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@decorate(ApiSchema({ name: "CursoCreateInputDto" }))
export class CursoCreateInputRestDto extends CursoFieldsMixin {
  @decorate(ApiProperty({ type: "string", description: "Nome do curso", minLength: 1 }))
  declare nome: string;

  @decorate(ApiProperty({ type: "string", description: "Nome abreviado do curso", minLength: 1 }))
  declare nomeAbreviado: string;

  @decorate(
    ApiProperty({
      type: () => CampusFindOneInputRestDto,
      description: "Campus que o curso pertence",
    }),
  )
  @decorate(ValidateNested())
  @decorate(Type(() => CampusFindOneInputRestDto))
  campus: CampusFindOneInputRestDto;

  @decorate(
    ApiProperty({
      type: () => OfertaFormacaoFindOneInputRestDto,
      description: "Oferta de formacao do curso",
    }),
  )
  @decorate(ValidateNested())
  @decorate(Type(() => OfertaFormacaoFindOneInputRestDto))
  ofertaFormacao: OfertaFormacaoFindOneInputRestDto;
}

@decorate(ApiSchema({ name: "CursoUpdateInputDto" }))
export class CursoUpdateInputRestDto extends PartialType(CursoCreateInputRestDto) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@decorate(ApiSchema({ name: "CursoFindOneInputDto" }))
export class CursoFindOneInputRestDto {
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
