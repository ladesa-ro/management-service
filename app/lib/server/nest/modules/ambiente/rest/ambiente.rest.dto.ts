// Note: AmbienteListInputRestDto does not use @InputType or @Field for filter fields
// because GraphQL field names cannot contain dots. Use AmbienteListInputGraphQlDto for GraphQL.
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
import {
  BlocoFindOneInputRestDto,
  BlocoFindOneOutputRestDto,
  ImagemFindOneOutputRestDto,
} from "@/server/nest/modules/bloco/rest";
import { AmbienteFieldsMixin } from "../ambiente.validation-mixin";

// ============================================================================
// FindOne Output
// ============================================================================

@decorate(ApiSchema({ name: "AmbienteFindOneOutputDto" }))
@decorate(
  RegisterModel({
    name: "AmbienteFindOneOutputDto",
    properties: [
      simpleProperty("id"),
      simpleProperty("nome"),
      simpleProperty("descricao", { nullable: true }),
      simpleProperty("codigo"),
      simpleProperty("capacidade", { nullable: true }),
      simpleProperty("tipo", { nullable: true }),
      referenceProperty("bloco", "BlocoFindOneOutputDto"),
      referenceProperty("imagemCapa", "ImagemFindOneOutputDto", { nullable: true }),
      ...commonProperties.dated,
    ],
  }),
)
export class AmbienteFindOneOutputRestDto extends Mixin(EntityBaseRestDto, AmbienteFieldsMixin) {
  @decorate(ApiProperty({ type: "string", description: "Nome do ambiente/sala", minLength: 1 }))
  declare nome: string;

  @decorate(
    ApiPropertyOptional({
      type: "string",
      description: "Descricao do ambiente/sala",
      nullable: true,
    }),
  )
  declare descricao: string | null;

  @decorate(ApiProperty({ type: "string", description: "Codigo do ambiente/sala", minLength: 1 }))
  declare codigo: string;

  @decorate(
    ApiPropertyOptional({
      type: "integer",
      description: "Capacidade do ambiente/sala",
      nullable: true,
    }),
  )
  declare capacidade: number | null;

  @decorate(
    ApiPropertyOptional({
      type: "string",
      description: "Tipo do ambiente/sala. Ex.: sala aula, auditorio, laboratorio de quimica",
      nullable: true,
    }),
  )
  declare tipo: string | null;

  @decorate(
    ApiProperty({
      type: () => BlocoFindOneOutputRestDto,
      description: "Bloco que o ambiente/sala pertence",
    }),
  )
  @decorate(ValidateNested())
  @decorate(Type(() => BlocoFindOneOutputRestDto))
  bloco: BlocoFindOneOutputRestDto;

  @decorate(
    ApiPropertyOptional({
      type: () => ImagemFindOneOutputRestDto,
      description: "Imagem de capa do ambiente",
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

@decorate(ApiSchema({ name: "AmbienteListInputDto" }))
export class AmbienteListInputRestDto extends PaginatedFilterByIdRestDto {
  @decorate(
    ApiPropertyOptional({
      description: "Filtro por ID do Bloco",
      type: "string",
      isArray: true,
    }),
  )
  @decorate(TransformToArray())
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(IsUUID(undefined, { each: true }))
  "filter.bloco.id"?: string[];

  @decorate(
    ApiPropertyOptional({
      description: "Filtro por ID do Campus do Bloco",
      type: "string",
      isArray: true,
    }),
  )
  @decorate(TransformToArray())
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(IsUUID(undefined, { each: true }))
  "filter.bloco.campus.id"?: string[];
}

@decorate(ApiSchema({ name: "AmbienteListOutputDto" }))
export class AmbienteListOutputRestDto {
  @decorate(ApiProperty({ type: () => PaginationMetaRestDto, description: "Metadados da busca" }))
  meta: PaginationMetaRestDto;

  @decorate(
    ApiProperty({ type: () => [AmbienteFindOneOutputRestDto], description: "Resultados da busca" }),
  )
  data: AmbienteFindOneOutputRestDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@decorate(ApiSchema({ name: "AmbienteCreateInputDto" }))
export class AmbienteCreateInputRestDto extends AmbienteFieldsMixin {
  @decorate(ApiProperty({ type: "string", description: "Nome do ambiente/sala", minLength: 1 }))
  declare nome: string;

  @decorate(
    ApiPropertyOptional({
      type: "string",
      description: "Descricao do ambiente/sala",
      nullable: true,
    }),
  )
  declare descricao?: string | null;

  @decorate(ApiProperty({ type: "string", description: "Codigo do ambiente/sala", minLength: 1 }))
  declare codigo: string;

  @decorate(
    ApiPropertyOptional({
      type: "integer",
      description: "Capacidade do ambiente/sala",
      nullable: true,
    }),
  )
  declare capacidade?: number | null;

  @decorate(
    ApiPropertyOptional({
      type: "string",
      description: "Tipo do ambiente/sala. Ex.: sala aula, auditorio, laboratorio de quimica",
      nullable: true,
    }),
  )
  declare tipo?: string | null;

  @decorate(
    ApiProperty({
      type: () => BlocoFindOneInputRestDto,
      description: "Bloco que o ambiente/sala pertence",
    }),
  )
  @decorate(ValidateNested())
  @decorate(Type(() => BlocoFindOneInputRestDto))
  bloco: BlocoFindOneInputRestDto;
}

@decorate(ApiSchema({ name: "AmbienteUpdateInputDto" }))
export class AmbienteUpdateInputRestDto extends PartialType(AmbienteCreateInputRestDto) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@decorate(ApiSchema({ name: "AmbienteFindOneInputDto" }))
export class AmbienteFindOneInputRestDto {
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
