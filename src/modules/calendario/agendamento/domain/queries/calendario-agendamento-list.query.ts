import {
  createFieldMetadata,
  type IFilterAcceptableValues,
  PaginationQuery,
  SharedListFields,
} from "@/domain/abstractions";

export const CalendarioAgendamentoListQueryFields = {
  ...SharedListFields,
  filterTipo: createFieldMetadata({
    description: "Filtro por tipo de agendamento (INDISPONIBILIDADE, AULA, EVENTO, RESERVA)",
    nullable: true,
  }),
  filterStatus: createFieldMetadata({
    description: "Filtro por status do agendamento (RASCUNHO, ATIVO, INATIVO)",
    nullable: true,
  }),
  filterTurmaId: createFieldMetadata({
    description: "Filtro por ID da turma vinculada",
    nullable: true,
  }),
  filterPerfilId: createFieldMetadata({
    description: "Filtro por ID do perfil vinculado",
    nullable: true,
  }),
  filterCalendarioLetivoId: createFieldMetadata({
    description: "Filtro por ID do calendario letivo vinculado",
    nullable: true,
  }),
  filterOfertaFormacaoId: createFieldMetadata({
    description: "Filtro por ID da oferta de formacao vinculada",
    nullable: true,
  }),
  filterModalidadeId: createFieldMetadata({
    description: "Filtro por ID da modalidade vinculada",
    nullable: true,
  }),
  filterAmbienteId: createFieldMetadata({
    description: "Filtro por ID do ambiente vinculado",
    nullable: true,
  }),
  filterDiarioId: createFieldMetadata({
    description: "Filtro por ID do diario vinculado",
    nullable: true,
  }),
};

export class CalendarioAgendamentoListQuery extends PaginationQuery {
  "filter.id"?: IFilterAcceptableValues;
  "filter.tipo"?: IFilterAcceptableValues;
  "filter.status"?: IFilterAcceptableValues;
  "filter.turma.id"?: IFilterAcceptableValues;
  "filter.perfil.id"?: IFilterAcceptableValues;
  "filter.calendarioLetivo.id"?: IFilterAcceptableValues;
  "filter.ofertaFormacao.id"?: IFilterAcceptableValues;
  "filter.modalidade.id"?: IFilterAcceptableValues;
  "filter.ambiente.id"?: IFilterAcceptableValues;
  "filter.diario.id"?: IFilterAcceptableValues;
}
