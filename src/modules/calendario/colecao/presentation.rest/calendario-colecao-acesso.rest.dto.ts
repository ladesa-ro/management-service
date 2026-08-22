import {
  UsuarioFindOneInputRestDto,
  UsuarioFindOneOutputRestDto,
} from "@/modules/acesso/usuario/presentation.rest/usuario.rest.dto";
import {
  CampusFindOneInputRestDto,
  CampusFindOneOutputRestDto,
} from "@/modules/ambientes/campus/presentation.rest";
import { CalendarioColecaoAcessoCreateSchema } from "@/modules/calendario/colecao/domain/calendario-colecao-acesso.schemas";
import {
  CalendarioColecaoAcessoFindOneInputSchema,
  CalendarioColecaoAcessoParentParamsSchema,
} from "@/modules/calendario/colecao/domain/queries/calendario-colecao-acesso-find-one.query.schemas";
import { CalendarioColecaoAcessoPaginationInputSchema } from "@/modules/calendario/colecao/domain/queries/calendario-colecao-acesso-list.query.schemas";
import {
  ApiProperty,
  ApiPropertyOptional,
  ApiSchema,
  TransformToArray,
} from "@/shared/presentation/rest";
import {
  EntityBaseRestDto,
  PaginatedFilterByIdRestDto,
  PaginationMetaRestDto,
} from "@/shared/presentation/rest/dtos";
import { CalendarioColecaoAcessoConcederCommandFields } from "../domain/commands/calendario-colecao-acesso-conceder.command";
import { CalendarioColecaoAcessoFindOneQueryResultFields } from "../domain/queries/calendario-colecao-acesso-find-one.query.result";
import { CalendarioColecaoAcessoListQueryFields } from "../domain/queries/calendario-colecao-acesso-list.query";

// ============================================================================
// FindOne Output
// ============================================================================

@ApiSchema({ name: "CalendarioColecaoAcessoFindOneOutputDto" })
export class CalendarioColecaoAcessoFindOneOutputRestDto extends EntityBaseRestDto {
  @ApiProperty({ type: "string", format: "uuid", description: "ID da coleção" })
  colecaoId: string;

  @ApiProperty({
    ...CalendarioColecaoAcessoFindOneQueryResultFields.escopo.swaggerMetadata,
    enum: ["USUARIO", "CAMPUS", "PUBLICO"],
  })
  escopo: string;

  @ApiPropertyOptional({
    ...CalendarioColecaoAcessoFindOneQueryResultFields.usuario.swaggerMetadata,
    type: () => UsuarioFindOneOutputRestDto,
  })
  usuario: UsuarioFindOneOutputRestDto | null;

  @ApiPropertyOptional({
    ...CalendarioColecaoAcessoFindOneQueryResultFields.campus.swaggerMetadata,
    type: () => CampusFindOneOutputRestDto,
  })
  campus: CampusFindOneOutputRestDto | null;

  @ApiProperty({
    ...CalendarioColecaoAcessoFindOneQueryResultFields.papel.swaggerMetadata,
    enum: ["OCUPACAO", "LEITOR", "EDITOR"],
  })
  papel: string;
}

// ============================================================================
// List Input/Output
// ============================================================================

@ApiSchema({ name: "CalendarioColecaoAcessoListInputDto" })
export class CalendarioColecaoAcessoListInputRestDto extends PaginatedFilterByIdRestDto {
  static schema = CalendarioColecaoAcessoPaginationInputSchema;

  @ApiPropertyOptional(CalendarioColecaoAcessoListQueryFields.filterEscopo.swaggerMetadata)
  @TransformToArray()
  "filter.escopo"?: string[];
}

@ApiSchema({ name: "CalendarioColecaoAcessoListOutputDto" })
export class CalendarioColecaoAcessoListOutputRestDto {
  @ApiProperty({
    ...CalendarioColecaoAcessoListQueryFields.meta.swaggerMetadata,
    type: () => PaginationMetaRestDto,
  })
  meta: PaginationMetaRestDto;

  @ApiProperty({
    ...CalendarioColecaoAcessoListQueryFields.data.swaggerMetadata,
    type: () => [CalendarioColecaoAcessoFindOneOutputRestDto],
  })
  data: CalendarioColecaoAcessoFindOneOutputRestDto[];
}

// ============================================================================
// Conceder (Create) Input
// ============================================================================

@ApiSchema({ name: "CalendarioColecaoAcessoConcederInputDto" })
export class CalendarioColecaoAcessoConcederInputRestDto {
  static schema = CalendarioColecaoAcessoCreateSchema.presentation;

  @ApiProperty({
    ...CalendarioColecaoAcessoConcederCommandFields.escopo.swaggerMetadata,
    enum: ["USUARIO", "CAMPUS", "PUBLICO"],
  })
  escopo: string;

  @ApiPropertyOptional({
    ...CalendarioColecaoAcessoConcederCommandFields.usuario.swaggerMetadata,
    type: () => UsuarioFindOneInputRestDto,
  })
  usuario?: UsuarioFindOneInputRestDto;

  @ApiPropertyOptional({
    ...CalendarioColecaoAcessoConcederCommandFields.campus.swaggerMetadata,
    type: () => CampusFindOneInputRestDto,
  })
  campus?: CampusFindOneInputRestDto;

  @ApiProperty({
    ...CalendarioColecaoAcessoConcederCommandFields.papel.swaggerMetadata,
    enum: ["OCUPACAO", "LEITOR", "EDITOR"],
  })
  papel: string;
}

// ============================================================================
// Path params
// ============================================================================

@ApiSchema({ name: "CalendarioColecaoAcessoParentParamsDto" })
export class CalendarioColecaoAcessoParentParamsRestDto {
  static schema = CalendarioColecaoAcessoParentParamsSchema;

  @ApiProperty({ type: "string", format: "uuid", description: "ID da coleção" })
  colecaoId: string;
}

@ApiSchema({ name: "CalendarioColecaoAcessoFindOneParamsDto" })
export class CalendarioColecaoAcessoFindOneParamsRestDto {
  static schema = CalendarioColecaoAcessoFindOneInputSchema;

  @ApiProperty({ type: "string", format: "uuid", description: "ID da coleção" })
  colecaoId: string;

  @ApiProperty({ type: "string", format: "uuid", description: "ID do acesso concedido" })
  id: string;
}
