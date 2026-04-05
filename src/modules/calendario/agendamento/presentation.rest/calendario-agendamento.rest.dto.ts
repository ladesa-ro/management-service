import {
  PerfilFindOneInputRestDto,
  PerfilFindOneOutputRestDto,
} from "@/modules/acesso/usuario/perfil/presentation.rest/perfil.rest.dto";
import {
  AmbienteFindOneInputRestDto,
  AmbienteFindOneOutputRestDto,
} from "@/modules/ambientes/ambiente/presentation.rest/ambiente.rest.dto";
import { CalendarioEventoFields } from "@/modules/calendario/agendamento/domain/calendario-evento.fields";
import {
  CalendarioLetivoFindOneInputRestDto,
  CalendarioLetivoFindOneOutputRestDto,
} from "@/modules/calendario/letivo/presentation.rest/calendario-letivo.rest.dto";
import {
  DiarioFindOneInputRestDto,
  DiarioFindOneOutputRestDto,
} from "@/modules/ensino/diario/presentation.rest/diario.rest.dto";
import {
  ModalidadeFindOneInputRestDto,
  ModalidadeFindOneOutputRestDto,
} from "@/modules/ensino/modalidade/presentation.rest/modalidade.rest.dto";
import {
  OfertaFormacaoFindOneInputRestDto,
  OfertaFormacaoFindOneOutputRestDto,
} from "@/modules/ensino/oferta-formacao/presentation.rest/oferta-formacao.rest.dto";
import {
  TurmaFindOneInputRestDto,
  TurmaFindOneOutputRestDto,
} from "@/modules/ensino/turma/presentation.rest/turma.rest.dto";
import {
  ApiProperty,
  ApiPropertyOptional,
  ApiSchema,
  TransformToArray,
} from "@/shared/presentation/rest";
import { PaginatedFilterByIdRestDto, PaginationMetaRestDto } from "@/shared/presentation/rest/dtos";
import { CalendarioAgendamentoListQueryFields } from "../domain/queries/calendario-agendamento-list.query";
import { CalendarioAgendamentoPaginationInputSchema } from "../domain/queries/calendario-agendamento-list.query.schemas";

// ============================================================================
// Create Input
// ============================================================================

@ApiSchema({ name: "CalendarioAgendamentoCreateInputDto" })
export class CalendarioAgendamentoCreateInputRestDto {
  @ApiProperty({
    ...CalendarioEventoFields.tipo.swaggerMetadata,
    enum: ["INDISPONIBILIDADE", "AULA", "EVENTO", "RESERVA"],
    description: "Tipo de agendamento (AULA, EVENTO, INDISPONIBILIDADE, RESERVA)",
  })
  tipo: string;

  @ApiProperty(CalendarioEventoFields.nome.swaggerMetadata)
  nome: string;

  @ApiProperty(CalendarioEventoFields.dataInicio.swaggerMetadata)
  dataInicio: string;

  @ApiPropertyOptional(CalendarioEventoFields.dataFim.swaggerMetadata)
  dataFim?: string;

  @ApiProperty(CalendarioEventoFields.diaInteiro.swaggerMetadata)
  diaInteiro: boolean;

  @ApiPropertyOptional(CalendarioEventoFields.horarioInicio.swaggerMetadata)
  horarioInicio?: string;

  @ApiPropertyOptional(CalendarioEventoFields.horarioFim.swaggerMetadata)
  horarioFim?: string;

  @ApiPropertyOptional(CalendarioEventoFields.cor.swaggerMetadata)
  cor?: string;

  @ApiPropertyOptional(CalendarioEventoFields.repeticao.swaggerMetadata)
  repeticao?: string;

  @ApiPropertyOptional({
    ...CalendarioEventoFields.turmas.swaggerMetadata,
    type: () => [TurmaFindOneInputRestDto],
  })
  turmas?: TurmaFindOneInputRestDto[];

  @ApiPropertyOptional({
    ...CalendarioEventoFields.perfis.swaggerMetadata,
    type: () => [PerfilFindOneInputRestDto],
  })
  perfis?: PerfilFindOneInputRestDto[];

  @ApiPropertyOptional({
    ...CalendarioEventoFields.calendariosLetivos.swaggerMetadata,
    type: () => [CalendarioLetivoFindOneInputRestDto],
  })
  calendariosLetivos?: CalendarioLetivoFindOneInputRestDto[];

  @ApiPropertyOptional({
    ...CalendarioEventoFields.ofertasFormacao.swaggerMetadata,
    type: () => [OfertaFormacaoFindOneInputRestDto],
  })
  ofertasFormacao?: OfertaFormacaoFindOneInputRestDto[];

  @ApiPropertyOptional({
    ...CalendarioEventoFields.modalidades.swaggerMetadata,
    type: () => [ModalidadeFindOneInputRestDto],
  })
  modalidades?: ModalidadeFindOneInputRestDto[];

  @ApiPropertyOptional({
    ...CalendarioEventoFields.ambientes.swaggerMetadata,
    type: () => [AmbienteFindOneInputRestDto],
  })
  ambientes?: AmbienteFindOneInputRestDto[];

  @ApiPropertyOptional({
    ...CalendarioEventoFields.diarios.swaggerMetadata,
    type: () => [DiarioFindOneInputRestDto],
  })
  diarios?: DiarioFindOneInputRestDto[];
}

// ============================================================================
// Update Input
// ============================================================================

@ApiSchema({ name: "CalendarioAgendamentoUpdateInputDto" })
export class CalendarioAgendamentoUpdateInputRestDto {
  @ApiPropertyOptional({
    ...CalendarioEventoFields.tipo.swaggerMetadata,
    enum: ["INDISPONIBILIDADE", "AULA", "EVENTO", "RESERVA"],
    description: "Tipo de agendamento (AULA, EVENTO, INDISPONIBILIDADE, RESERVA)",
  })
  tipo?: string;

  @ApiPropertyOptional(CalendarioEventoFields.nome.swaggerMetadata) nome?: string;
  @ApiPropertyOptional(CalendarioEventoFields.dataInicio.swaggerMetadata) dataInicio?: string;
  @ApiPropertyOptional(CalendarioEventoFields.dataFim.swaggerMetadata) dataFim?: string;
  @ApiPropertyOptional(CalendarioEventoFields.diaInteiro.swaggerMetadata) diaInteiro?: boolean;
  @ApiPropertyOptional(CalendarioEventoFields.horarioInicio.swaggerMetadata) horarioInicio?: string;
  @ApiPropertyOptional(CalendarioEventoFields.horarioFim.swaggerMetadata) horarioFim?: string;
  @ApiPropertyOptional(CalendarioEventoFields.cor.swaggerMetadata) cor?: string;
  @ApiPropertyOptional(CalendarioEventoFields.repeticao.swaggerMetadata) repeticao?: string;

  @ApiPropertyOptional({
    ...CalendarioEventoFields.turmas.swaggerMetadata,
    type: () => [TurmaFindOneInputRestDto],
  })
  turmas?: TurmaFindOneInputRestDto[];

  @ApiPropertyOptional({
    ...CalendarioEventoFields.perfis.swaggerMetadata,
    type: () => [PerfilFindOneInputRestDto],
  })
  perfis?: PerfilFindOneInputRestDto[];

  @ApiPropertyOptional({
    ...CalendarioEventoFields.calendariosLetivos.swaggerMetadata,
    type: () => [CalendarioLetivoFindOneInputRestDto],
  })
  calendariosLetivos?: CalendarioLetivoFindOneInputRestDto[];

  @ApiPropertyOptional({
    ...CalendarioEventoFields.ofertasFormacao.swaggerMetadata,
    type: () => [OfertaFormacaoFindOneInputRestDto],
  })
  ofertasFormacao?: OfertaFormacaoFindOneInputRestDto[];

  @ApiPropertyOptional({
    ...CalendarioEventoFields.modalidades.swaggerMetadata,
    type: () => [ModalidadeFindOneInputRestDto],
  })
  modalidades?: ModalidadeFindOneInputRestDto[];

  @ApiPropertyOptional({
    ...CalendarioEventoFields.ambientes.swaggerMetadata,
    type: () => [AmbienteFindOneInputRestDto],
  })
  ambientes?: AmbienteFindOneInputRestDto[];

  @ApiPropertyOptional({
    ...CalendarioEventoFields.diarios.swaggerMetadata,
    type: () => [DiarioFindOneInputRestDto],
  })
  diarios?: DiarioFindOneInputRestDto[];
}

// ============================================================================
// Update Status Input
// ============================================================================

@ApiSchema({ name: "CalendarioAgendamentoUpdateStatusInputDto" })
export class CalendarioAgendamentoUpdateStatusInputRestDto {
  @ApiProperty({
    ...CalendarioEventoFields.status.swaggerMetadata,
    enum: ["ATIVO", "INATIVO", "RASCUNHO"],
    description: "Novo status do agendamento (ATIVO, INATIVO, RASCUNHO)",
  })
  status: string;
}

// ============================================================================
// Params
// ============================================================================

@ApiSchema({ name: "CalendarioAgendamentoFindOneParamsDto" })
export class CalendarioAgendamentoFindOneParamsRestDto {
  @ApiProperty(CalendarioEventoFields.id.swaggerMetadata)
  id: string;
}

@ApiSchema({ name: "CalendarioAgendamentoDesvincularTurmaParamsDto" })
export class CalendarioAgendamentoDesvincularTurmaParamsRestDto {
  @ApiProperty(CalendarioEventoFields.id.swaggerMetadata)
  id: string;

  @ApiProperty({ type: "string", format: "uuid", description: "ID da turma a desvincular" })
  turmaId: string;
}

@ApiSchema({ name: "CalendarioAgendamentoDesvincularPerfilParamsDto" })
export class CalendarioAgendamentoDesvincularPerfilParamsRestDto {
  @ApiProperty(CalendarioEventoFields.id.swaggerMetadata)
  id: string;

  @ApiProperty({ type: "string", format: "uuid", description: "ID do perfil a desvincular" })
  perfilId: string;
}

// ============================================================================
// Output (reutiliza o mesmo output — tipo já existe nele)
// ============================================================================

@ApiSchema({ name: "CalendarioAgendamentoFindOneOutputDto" })
export class CalendarioAgendamentoFindOneOutputRestDto {
  @ApiProperty(CalendarioEventoFields.id.swaggerMetadata) id: string;

  @ApiProperty({ type: "string", format: "uuid", description: "Identificador externo estavel" })
  identificadorExterno: string;

  @ApiProperty(CalendarioEventoFields.tipo.swaggerMetadata) tipo: string;
  @ApiPropertyOptional(CalendarioEventoFields.nome.swaggerMetadata) nome: string | null;
  @ApiProperty(CalendarioEventoFields.dataInicio.swaggerMetadata) dataInicio: string;
  @ApiPropertyOptional(CalendarioEventoFields.dataFim.swaggerMetadata) dataFim: string | null;
  @ApiProperty(CalendarioEventoFields.diaInteiro.swaggerMetadata) diaInteiro: boolean;
  @ApiProperty(CalendarioEventoFields.horarioInicio.swaggerMetadata) horarioInicio: string;
  @ApiProperty(CalendarioEventoFields.horarioFim.swaggerMetadata) horarioFim: string;
  @ApiPropertyOptional(CalendarioEventoFields.cor.swaggerMetadata) cor: string | null;
  @ApiPropertyOptional(CalendarioEventoFields.repeticao.swaggerMetadata) repeticao: string | null;
  @ApiPropertyOptional(CalendarioEventoFields.status.swaggerMetadata) status: string | null;
  @ApiProperty({ type: "integer", description: "Numero da versao" }) version: number;

  @ApiPropertyOptional({
    ...CalendarioEventoFields.turmas.swaggerMetadata,
    type: () => [TurmaFindOneOutputRestDto],
  })
  turmas: TurmaFindOneOutputRestDto[];

  @ApiPropertyOptional({
    ...CalendarioEventoFields.perfis.swaggerMetadata,
    type: () => [PerfilFindOneOutputRestDto],
  })
  perfis: PerfilFindOneOutputRestDto[];

  @ApiPropertyOptional({
    ...CalendarioEventoFields.calendariosLetivos.swaggerMetadata,
    type: () => [CalendarioLetivoFindOneOutputRestDto],
  })
  calendariosLetivos: CalendarioLetivoFindOneOutputRestDto[];

  @ApiPropertyOptional({
    ...CalendarioEventoFields.ofertasFormacao.swaggerMetadata,
    type: () => [OfertaFormacaoFindOneOutputRestDto],
  })
  ofertasFormacao: OfertaFormacaoFindOneOutputRestDto[];

  @ApiPropertyOptional({
    ...CalendarioEventoFields.modalidades.swaggerMetadata,
    type: () => [ModalidadeFindOneOutputRestDto],
  })
  modalidades: ModalidadeFindOneOutputRestDto[];

  @ApiPropertyOptional({
    ...CalendarioEventoFields.ambientes.swaggerMetadata,
    type: () => [AmbienteFindOneOutputRestDto],
  })
  ambientes: AmbienteFindOneOutputRestDto[];

  @ApiPropertyOptional({
    ...CalendarioEventoFields.diarios.swaggerMetadata,
    type: () => [DiarioFindOneOutputRestDto],
  })
  diarios: DiarioFindOneOutputRestDto[];
}

// ============================================================================
// List Input/Output
// ============================================================================

@ApiSchema({ name: "CalendarioAgendamentoListInputDto" })
export class CalendarioAgendamentoListInputRestDto extends PaginatedFilterByIdRestDto {
  static schema = CalendarioAgendamentoPaginationInputSchema;

  @ApiPropertyOptional(CalendarioAgendamentoListQueryFields.filterTipo.swaggerMetadata)
  @TransformToArray()
  "filter.tipo"?: string[];

  @ApiPropertyOptional(CalendarioAgendamentoListQueryFields.filterStatus.swaggerMetadata)
  @TransformToArray()
  "filter.status"?: string[];

  @ApiPropertyOptional(CalendarioAgendamentoListQueryFields.filterTurmaId.swaggerMetadata)
  @TransformToArray()
  "filter.turma.id"?: string[];

  @ApiPropertyOptional(CalendarioAgendamentoListQueryFields.filterPerfilId.swaggerMetadata)
  @TransformToArray()
  "filter.perfil.id"?: string[];

  @ApiPropertyOptional(
    CalendarioAgendamentoListQueryFields.filterCalendarioLetivoId.swaggerMetadata,
  )
  @TransformToArray()
  "filter.calendarioLetivo.id"?: string[];

  @ApiPropertyOptional(CalendarioAgendamentoListQueryFields.filterOfertaFormacaoId.swaggerMetadata)
  @TransformToArray()
  "filter.ofertaFormacao.id"?: string[];

  @ApiPropertyOptional(CalendarioAgendamentoListQueryFields.filterModalidadeId.swaggerMetadata)
  @TransformToArray()
  "filter.modalidade.id"?: string[];

  @ApiPropertyOptional(CalendarioAgendamentoListQueryFields.filterAmbienteId.swaggerMetadata)
  @TransformToArray()
  "filter.ambiente.id"?: string[];

  @ApiPropertyOptional(CalendarioAgendamentoListQueryFields.filterDiarioId.swaggerMetadata)
  @TransformToArray()
  "filter.diario.id"?: string[];
}

@ApiSchema({ name: "CalendarioAgendamentoListOutputDto" })
export class CalendarioAgendamentoListOutputRestDto {
  @ApiProperty({
    ...CalendarioAgendamentoListQueryFields.meta.swaggerMetadata,
    type: () => PaginationMetaRestDto,
  })
  meta: PaginationMetaRestDto;

  @ApiProperty({
    ...CalendarioAgendamentoListQueryFields.data.swaggerMetadata,
    type: () => [CalendarioAgendamentoFindOneOutputRestDto],
  })
  data: CalendarioAgendamentoFindOneOutputRestDto[];
}
