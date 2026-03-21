// Note: AmbienteListInputRestDto does not use @InputType or @Field for filter fields
// because GraphQL field names cannot contain dots. Use AmbienteListInputGraphQlDto for GraphQL.
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
import {
  BlocoFindOneInputRestDto,
  BlocoFindOneOutputRestDto,
  ImagemFindOneOutputRestDto,
} from "@/modules/ambientes/bloco/presentation.rest";
import { AmbienteFieldsMixin } from "../presentation.validations/ambiente.validation-mixin";

// ============================================================================
// FindOne Output
// ============================================================================

@ApiSchema({ name: "AmbienteFindOneOutputDto" })
@RegisterModel({
  name: "AmbienteFindOneQueryResult",
  properties: [
    simpleProperty("id"),
    simpleProperty("nome"),
    simpleProperty("descricao", { nullable: true }),
    simpleProperty("codigo"),
    simpleProperty("capacidade", { nullable: true }),
    simpleProperty("tipo", { nullable: true }),
    referenceProperty("bloco", "BlocoFindOneQueryResult"),
    referenceProperty("imagemCapa", "ImagemFindOneQueryResult", { nullable: true }),
    ...commonProperties.dated,
  ],
})
export class AmbienteFindOneOutputRestDto extends Mixin(EntityBaseRestDto, AmbienteFieldsMixin) {
  @ApiProperty({ type: "string", description: "Nome do ambiente/sala", minLength: 1 })
  declare nome: string;

  @ApiPropertyOptional({
    type: "string",
    description: "Descricao do ambiente/sala",
    nullable: true,
  })
  declare descricao: string | null;

  @ApiProperty({ type: "string", description: "Codigo do ambiente/sala", minLength: 1 })
  declare codigo: string;

  @ApiPropertyOptional({
    type: "integer",
    description: "Capacidade do ambiente/sala",
    nullable: true,
  })
  declare capacidade: number | null;

  @ApiPropertyOptional({
    type: "string",
    description: "Tipo do ambiente/sala. Ex.: sala aula, auditorio, laboratorio de quimica",
    nullable: true,
  })
  declare tipo: string | null;

  @ApiProperty({
    type: () => BlocoFindOneOutputRestDto,
    description: "Bloco que o ambiente/sala pertence",
  })
  @ValidateNested()
  @Type(() => BlocoFindOneOutputRestDto)
  bloco: BlocoFindOneOutputRestDto;

  @ApiPropertyOptional({
    type: () => ImagemFindOneOutputRestDto,
    description: "Imagem de capa do ambiente",
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

@ApiSchema({ name: "AmbienteListInputDto" })
export class AmbienteListInputRestDto extends PaginatedFilterByIdRestDto {
  @ApiPropertyOptional({
    description: "Filtro por ID do Bloco",
    type: "string",
    isArray: true,
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  "filter.bloco.id"?: string[];

  @ApiPropertyOptional({
    description: "Filtro por ID do Campus do Bloco",
    type: "string",
    isArray: true,
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  "filter.bloco.campus.id"?: string[];
}

@ApiSchema({ name: "AmbienteListOutputDto" })
export class AmbienteListOutputRestDto {
  @ApiProperty({ type: () => PaginationMetaRestDto, description: "Metadados da busca" })
  meta: PaginationMetaRestDto;

  @ApiProperty({ type: () => [AmbienteFindOneOutputRestDto], description: "Resultados da busca" })
  data: AmbienteFindOneOutputRestDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@ApiSchema({ name: "AmbienteCreateInputDto" })
export class AmbienteCreateInputRestDto extends AmbienteFieldsMixin {
  @ApiProperty({ type: "string", description: "Nome do ambiente/sala", minLength: 1 })
  declare nome: string;

  @ApiPropertyOptional({
    type: "string",
    description: "Descricao do ambiente/sala",
    nullable: true,
  })
  declare descricao?: string | null;

  @ApiProperty({ type: "string", description: "Codigo do ambiente/sala", minLength: 1 })
  declare codigo: string;

  @ApiPropertyOptional({
    type: "integer",
    description: "Capacidade do ambiente/sala",
    nullable: true,
  })
  declare capacidade?: number | null;

  @ApiPropertyOptional({
    type: "string",
    description: "Tipo do ambiente/sala. Ex.: sala aula, auditorio, laboratorio de quimica",
    nullable: true,
  })
  declare tipo?: string | null;

  @ApiProperty({
    type: () => BlocoFindOneInputRestDto,
    description: "Bloco que o ambiente/sala pertence",
  })
  @ValidateNested()
  @Type(() => BlocoFindOneInputRestDto)
  bloco: BlocoFindOneInputRestDto;
}

@ApiSchema({ name: "AmbienteUpdateInputDto" })
export class AmbienteUpdateInputRestDto extends PartialType(AmbienteCreateInputRestDto) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ApiSchema({ name: "AmbienteFindOneInputDto" })
export class AmbienteFindOneInputRestDto {
  @ApiProperty({
    type: "string",
    description: "Identificador do registro (uuid)",
    format: "uuid",
  })
  @IsUUID()
  id: string;
}
