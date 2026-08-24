import { UsuarioFindOneOutputRestDto } from "@/modules/acesso/usuario/presentation.rest/usuario.rest.dto";
import {
  CampusFindOneInputRestDto,
  CampusFindOneOutputRestDto,
} from "@/modules/ambientes/campus/presentation.rest";
import {
  CalendarioColecaoCreateSchema,
  CalendarioColecaoTransferirDonoSchema,
  CalendarioColecaoUpdateSchema,
} from "@/modules/calendario/colecao/domain/calendario-colecao.schemas";
import { CalendarioColecaoFindOneInputSchema } from "@/modules/calendario/colecao/domain/queries/calendario-colecao-find-one.query.schemas";
import { CalendarioColecaoPaginationInputSchema } from "@/modules/calendario/colecao/domain/queries/calendario-colecao-list.query.schemas";
import {
  ApiProperty,
  ApiPropertyOptional,
  ApiSchema,
  PartialType,
  TransformToArray,
} from "@/shared/presentation/rest";
import {
  EntityBaseRestDto,
  PaginatedFilterByIdRestDto,
  PaginationMetaRestDto,
} from "@/shared/presentation/rest/dtos";
import { CalendarioColecaoCreateCommandFields } from "../domain/commands/calendario-colecao-create.command";
import { CalendarioColecaoTransferirDonoCommandFields } from "../domain/commands/calendario-colecao-transferir-dono.command";
import { CalendarioColecaoFindOneQueryResultFields } from "../domain/queries/calendario-colecao-find-one.query.result";
import { CalendarioColecaoListQueryFields } from "../domain/queries/calendario-colecao-list.query";

@ApiSchema({ name: "CalendarioColecaoFindOneOutputDto" })
export class CalendarioColecaoFindOneOutputRestDto extends EntityBaseRestDto {
  @ApiProperty({
    ...CalendarioColecaoFindOneQueryResultFields.nome.swaggerMetadata,
    type: () => UsuarioFindOneOutputRestDto,
    description: "Usuário dono da coleção",
  })
  dono: UsuarioFindOneOutputRestDto;

  @ApiPropertyOptional({
    ...CalendarioColecaoFindOneQueryResultFields.campus.swaggerMetadata,
    type: () => CampusFindOneOutputRestDto,
  })
  campus: CampusFindOneOutputRestDto | null;

  @ApiProperty(CalendarioColecaoFindOneQueryResultFields.nome.swaggerMetadata)
  nome: string;

  @ApiPropertyOptional(CalendarioColecaoFindOneQueryResultFields.cor.swaggerMetadata)
  cor: string | null;

  @ApiProperty({
    ...CalendarioColecaoFindOneQueryResultFields.visibilidade.swaggerMetadata,
    enum: ["PRIVADA", "CAMPUS", "PUBLICA"],
  })
  visibilidade: string;
}

@ApiSchema({ name: "CalendarioColecaoListInputDto" })
export class CalendarioColecaoListInputRestDto extends PaginatedFilterByIdRestDto {
  static schema = CalendarioColecaoPaginationInputSchema;

  @ApiPropertyOptional(CalendarioColecaoListQueryFields.filterCampusId.swaggerMetadata)
  @TransformToArray()
  "filter.campus.id"?: string[];

  @ApiPropertyOptional(CalendarioColecaoListQueryFields.filterVisibilidade.swaggerMetadata)
  @TransformToArray()
  "filter.visibilidade"?: string[];
}

@ApiSchema({ name: "CalendarioColecaoListOutputDto" })
export class CalendarioColecaoListOutputRestDto {
  @ApiProperty({
    ...CalendarioColecaoListQueryFields.meta.swaggerMetadata,
    type: () => PaginationMetaRestDto,
  })
  meta: PaginationMetaRestDto;

  @ApiProperty({
    ...CalendarioColecaoListQueryFields.data.swaggerMetadata,
    type: () => [CalendarioColecaoFindOneOutputRestDto],
  })
  data: CalendarioColecaoFindOneOutputRestDto[];
}

@ApiSchema({ name: "CalendarioColecaoCreateInputDto" })
export class CalendarioColecaoCreateInputRestDto {
  static schema = CalendarioColecaoCreateSchema.presentation;

  @ApiProperty(CalendarioColecaoCreateCommandFields.nome.swaggerMetadata)
  nome: string;

  @ApiPropertyOptional(CalendarioColecaoCreateCommandFields.cor.swaggerMetadata)
  cor?: string;

  @ApiPropertyOptional({
    ...CalendarioColecaoCreateCommandFields.campus.swaggerMetadata,
    type: () => CampusFindOneInputRestDto,
  })
  campus?: CampusFindOneInputRestDto;

  @ApiPropertyOptional({
    ...CalendarioColecaoCreateCommandFields.visibilidade.swaggerMetadata,
    enum: ["PRIVADA", "CAMPUS", "PUBLICA"],
  })
  visibilidade?: string;
}

@ApiSchema({ name: "CalendarioColecaoUpdateInputDto" })
export class CalendarioColecaoUpdateInputRestDto extends PartialType(
  CalendarioColecaoCreateInputRestDto,
) {
  static schema = CalendarioColecaoUpdateSchema.presentation;
}

@ApiSchema({ name: "CalendarioColecaoTransferirDonoInputDto" })
export class CalendarioColecaoTransferirDonoInputRestDto {
  static schema = CalendarioColecaoTransferirDonoSchema.presentation;

  @ApiProperty(CalendarioColecaoTransferirDonoCommandFields.novoDonoId.swaggerMetadata)
  novoDonoId: string;
}

@ApiSchema({ name: "CalendarioColecaoFindOneInputDto" })
export class CalendarioColecaoFindOneInputRestDto {
  static schema = CalendarioColecaoFindOneInputSchema;

  @ApiProperty(CalendarioColecaoFindOneQueryResultFields.id.swaggerMetadata)
  id: string;
}
