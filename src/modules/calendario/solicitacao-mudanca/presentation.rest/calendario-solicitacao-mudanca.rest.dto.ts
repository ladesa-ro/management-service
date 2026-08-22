import { UsuarioFindOneOutputRestDto } from "@/modules/acesso/usuario/presentation.rest/usuario.rest.dto";
import {
  CalendarioSolicitacaoMudancaCreateSchema,
  CalendarioSolicitacaoMudancaRecusarSchema,
} from "@/modules/calendario/solicitacao-mudanca/domain/calendario-solicitacao-mudanca.schemas";
import { CalendarioSolicitacaoMudancaFindOneInputSchema } from "@/modules/calendario/solicitacao-mudanca/domain/queries/calendario-solicitacao-mudanca-find-one.query.schemas";
import { CalendarioSolicitacaoMudancaPaginationInputSchema } from "@/modules/calendario/solicitacao-mudanca/domain/queries/calendario-solicitacao-mudanca-list.query.schemas";
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
import { CalendarioSolicitacaoMudancaCreateCommandFields } from "../domain/commands/calendario-solicitacao-mudanca-create.command";
import { CalendarioSolicitacaoMudancaRecusarCommandFields } from "../domain/commands/calendario-solicitacao-mudanca-recusar.command";
import { CalendarioSolicitacaoMudancaFindOneQueryResultFields } from "../domain/queries/calendario-solicitacao-mudanca-find-one.query.result";
import { CalendarioSolicitacaoMudancaListQueryFields } from "../domain/queries/calendario-solicitacao-mudanca-list.query";

// ============================================================================
// FindOne Output
// ============================================================================

@ApiSchema({ name: "CalendarioSolicitacaoMudancaFindOneOutputDto" })
export class CalendarioSolicitacaoMudancaFindOneOutputRestDto extends EntityBaseRestDto {
  @ApiProperty({
    ...CalendarioSolicitacaoMudancaFindOneQueryResultFields.autor.swaggerMetadata,
    type: () => UsuarioFindOneOutputRestDto,
  })
  autor: UsuarioFindOneOutputRestDto;

  @ApiProperty(
    CalendarioSolicitacaoMudancaFindOneQueryResultFields.calendarioAgendamentoId.swaggerMetadata,
  )
  calendarioAgendamentoId: string;

  @ApiProperty({
    ...CalendarioSolicitacaoMudancaFindOneQueryResultFields.tipoOperacao.swaggerMetadata,
    enum: ["MOVER", "REMOVER"],
  })
  tipoOperacao: string;

  @ApiProperty(CalendarioSolicitacaoMudancaFindOneQueryResultFields.dadosPropostos.swaggerMetadata)
  dadosPropostos: Record<string, unknown>;

  @ApiProperty(CalendarioSolicitacaoMudancaFindOneQueryResultFields.justificativa.swaggerMetadata)
  justificativa: string;

  @ApiProperty({
    ...CalendarioSolicitacaoMudancaFindOneQueryResultFields.status.swaggerMetadata,
    enum: ["ABERTA", "APROVADA", "RECUSADA"],
  })
  status: string;

  @ApiPropertyOptional(
    CalendarioSolicitacaoMudancaFindOneQueryResultFields.motivoRecusa.swaggerMetadata,
  )
  motivoRecusa: string | null;

  @ApiPropertyOptional(
    CalendarioSolicitacaoMudancaFindOneQueryResultFields.sessaoEdicaoId.swaggerMetadata,
  )
  sessaoEdicaoId: string | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

@ApiSchema({ name: "CalendarioSolicitacaoMudancaListInputDto" })
export class CalendarioSolicitacaoMudancaListInputRestDto extends PaginatedFilterByIdRestDto {
  static schema = CalendarioSolicitacaoMudancaPaginationInputSchema;

  @ApiPropertyOptional(CalendarioSolicitacaoMudancaListQueryFields.filterStatus.swaggerMetadata)
  @TransformToArray()
  "filter.status"?: string[];

  @ApiPropertyOptional(
    CalendarioSolicitacaoMudancaListQueryFields.filterCalendarioAgendamentoId.swaggerMetadata,
  )
  @TransformToArray()
  "filter.calendarioAgendamento.id"?: string[];

  @ApiPropertyOptional(CalendarioSolicitacaoMudancaListQueryFields.filterAutorId.swaggerMetadata)
  @TransformToArray()
  "filter.autor.id"?: string[];
}

@ApiSchema({ name: "CalendarioSolicitacaoMudancaListOutputDto" })
export class CalendarioSolicitacaoMudancaListOutputRestDto {
  @ApiProperty({
    ...CalendarioSolicitacaoMudancaListQueryFields.meta.swaggerMetadata,
    type: () => PaginationMetaRestDto,
  })
  meta: PaginationMetaRestDto;

  @ApiProperty({
    ...CalendarioSolicitacaoMudancaListQueryFields.data.swaggerMetadata,
    type: () => [CalendarioSolicitacaoMudancaFindOneOutputRestDto],
  })
  data: CalendarioSolicitacaoMudancaFindOneOutputRestDto[];
}

// ============================================================================
// Create Input
// ============================================================================

@ApiSchema({ name: "CalendarioSolicitacaoMudancaCreateInputDto" })
export class CalendarioSolicitacaoMudancaCreateInputRestDto {
  static schema = CalendarioSolicitacaoMudancaCreateSchema.presentation;

  @ApiProperty(
    CalendarioSolicitacaoMudancaCreateCommandFields.calendarioAgendamentoId.swaggerMetadata,
  )
  calendarioAgendamentoId: string;

  @ApiProperty({
    ...CalendarioSolicitacaoMudancaCreateCommandFields.tipoOperacao.swaggerMetadata,
    enum: ["MOVER", "REMOVER"],
  })
  tipoOperacao: string;

  @ApiProperty(CalendarioSolicitacaoMudancaCreateCommandFields.dadosPropostos.swaggerMetadata)
  dadosPropostos: Record<string, unknown>;

  @ApiProperty(CalendarioSolicitacaoMudancaCreateCommandFields.justificativa.swaggerMetadata)
  justificativa: string;
}

// ============================================================================
// Recusar Input
// ============================================================================

@ApiSchema({ name: "CalendarioSolicitacaoMudancaRecusarInputDto" })
export class CalendarioSolicitacaoMudancaRecusarInputRestDto {
  static schema = CalendarioSolicitacaoMudancaRecusarSchema.presentation;

  @ApiPropertyOptional(
    CalendarioSolicitacaoMudancaRecusarCommandFields.motivoRecusa.swaggerMetadata,
  )
  motivoRecusa?: string;
}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ApiSchema({ name: "CalendarioSolicitacaoMudancaFindOneInputDto" })
export class CalendarioSolicitacaoMudancaFindOneInputRestDto {
  static schema = CalendarioSolicitacaoMudancaFindOneInputSchema;

  @ApiProperty(CalendarioSolicitacaoMudancaFindOneQueryResultFields.id.swaggerMetadata)
  id: string;
}
