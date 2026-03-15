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
import { NivelFormacaoFieldsMixin } from "@/modules/ensino/nivel-formacao/presentation.validations/nivel-formacao.validation-mixin";

// ============================================================================
// FindOne Output
// ============================================================================

@ApiSchema({ name: "NivelFormacaoFindOneOutputDto" })
@RegisterModel({
  name: "NivelFormacaoFindOneOutputDto",
  properties: [simpleProperty("id"), simpleProperty("slug"), ...commonProperties.dated],
})
export class NivelFormacaoFindOneOutputRestDto extends Mixin(
  EntityBaseRestDto,
  NivelFormacaoFieldsMixin,
) {
  @ApiProperty({ type: "string", description: "Apelido do nivel de formacao", minLength: 1 })
  declare slug: string;
}

// ============================================================================
// List Input/Output
// ============================================================================

@ApiSchema({ name: "NivelFormacaoListInputDto" })
export class NivelFormacaoListInputRestDto extends PaginatedFilterByIdRestDto {}

@ApiSchema({ name: "NivelFormacaoListOutputDto" })
export class NivelFormacaoListOutputRestDto {
  @ApiProperty({ type: () => PaginationMetaRestDto, description: "Metadados da busca" })
  meta: PaginationMetaRestDto;

  @ApiProperty({
    type: () => [NivelFormacaoFindOneOutputRestDto],
    description: "Resultados da busca",
  })
  data: NivelFormacaoFindOneOutputRestDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@ApiSchema({ name: "NivelFormacaoCreateInputDto" })
export class NivelFormacaoCreateInputRestDto extends NivelFormacaoFieldsMixin {
  @ApiProperty({ type: "string", description: "Apelido do nivel de formacao", minLength: 1 })
  declare slug: string;
}

@ApiSchema({ name: "NivelFormacaoUpdateInputDto" })
export class NivelFormacaoUpdateInputRestDto extends PartialType(NivelFormacaoCreateInputRestDto) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ApiSchema({ name: "NivelFormacaoFindOneInputDto" })
export class NivelFormacaoFindOneInputRestDto {
  @ApiProperty({
    type: "string",
    description: "Identificador do registro (uuid)",
    format: "uuid",
  })
  @IsUUID()
  id: string;
}
