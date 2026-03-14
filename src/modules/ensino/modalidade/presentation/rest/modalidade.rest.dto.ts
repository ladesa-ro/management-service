import { Mixin } from "ts-mixer";
import {
  EntityBaseRestDto,
  PaginatedFilterByIdRestDto,
  PaginationMetaRestDto,
} from "@/modules/@shared/infrastructure/presentation/rest/dtos";
import {
  ApiProperty,
  ApiSchema,
  commonProperties,
  PartialType,
  RegisterModel,
  simpleProperty,
} from "@/modules/@shared/presentation/rest";
import { IsUUID } from "@/modules/@shared/presentation/shared";
import { ModalidadeFieldsMixin } from "../modalidade.validation-mixin";

// ============================================================================
// FindOne Output
// ============================================================================

@ApiSchema({ name: "ModalidadeFindOneOutputDto" })
@RegisterModel({
  name: "ModalidadeFindOneOutputDto",
  properties: [
    simpleProperty("id"),
    simpleProperty("nome"),
    simpleProperty("slug"),
    ...commonProperties.dated,
  ],
})
export class ModalidadeFindOneOutputRestDto extends Mixin(
  EntityBaseRestDto,
  ModalidadeFieldsMixin,
) {
  @ApiProperty({ type: "string", description: "Nome da modalidade", minLength: 1 })
  declare nome: string;

  @ApiProperty({ type: "string", description: "Apelido da modalidade", minLength: 1 })
  declare slug: string;
}

// ============================================================================
// List Input/Output
// ============================================================================

@ApiSchema({ name: "ModalidadeListInputDto" })
export class ModalidadeListInputRestDto extends PaginatedFilterByIdRestDto {}

@ApiSchema({ name: "ModalidadeListOutputDto" })
export class ModalidadeListOutputRestDto {
  @ApiProperty({ type: () => PaginationMetaRestDto, description: "Metadados da busca" })
  meta: PaginationMetaRestDto;

  @ApiProperty({
    type: () => [ModalidadeFindOneOutputRestDto],
    description: "Resultados da busca",
  })
  data: ModalidadeFindOneOutputRestDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@ApiSchema({ name: "ModalidadeCreateInputDto" })
export class ModalidadeCreateInputRestDto extends ModalidadeFieldsMixin {
  @ApiProperty({ type: "string", description: "Nome da modalidade", minLength: 1 })
  declare nome: string;

  @ApiProperty({ type: "string", description: "Apelido da modalidade", minLength: 1 })
  declare slug: string;
}

@ApiSchema({ name: "ModalidadeUpdateInputDto" })
export class ModalidadeUpdateInputRestDto extends PartialType(ModalidadeCreateInputRestDto) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ApiSchema({ name: "ModalidadeFindOneInputDto" })
export class ModalidadeFindOneInputRestDto {
  @ApiProperty({
    type: "string",
    description: "Identificador do registro (uuid)",
    format: "uuid",
  })
  @IsUUID()
  id: string;
}
