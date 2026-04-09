import {
  createFieldMetadata,
  type IFilterAcceptableValues,
  PaginationQuery,
  SharedListFields,
} from "@/domain/abstractions";

export const DiarioListQueryFields = {
  ...SharedListFields,
  filterTurmaId: createFieldMetadata({ description: "Filtro por ID da Turma", nullable: true }),
  filterTurmaCursoCampusId: createFieldMetadata({
    description: "Filtro por ID do Campus do Curso da Turma",
    nullable: true,
  }),
  filterDisciplinaId: createFieldMetadata({
    description: "Filtro por ID da Disciplina",
    nullable: true,
  }),
  filterCalendarioLetivoId: createFieldMetadata({
    description: "Filtro por ID do Calendario Letivo",
    nullable: true,
  }),
  filterAmbientePadraoId: createFieldMetadata({
    description: "Filtro por ID do Ambiente Padrao",
    nullable: true,
  }),
};

export class DiarioListQuery extends PaginationQuery {
  "filter.id"?: IFilterAcceptableValues;
  "filter.turma.id"?: IFilterAcceptableValues;
  "filter.turma.curso.campus.id"?: IFilterAcceptableValues;
  "filter.disciplina.id"?: IFilterAcceptableValues;
  "filter.calendarioLetivo.id"?: IFilterAcceptableValues;
}
