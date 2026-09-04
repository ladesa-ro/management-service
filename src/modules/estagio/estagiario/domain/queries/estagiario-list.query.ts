import {
  createFieldMetadata,
  type IFilterAcceptableValues,
  PaginationQuery,
  SharedListFields,
} from "@/domain/abstractions";

export const EstagiarioListQueryFields = {
  ...SharedListFields,
  filterPerfilId: createFieldMetadata({ description: "Filtro por ID de perfil", nullable: true }),
  filterCursoId: createFieldMetadata({ description: "Filtro por ID de curso", nullable: true }),
  filterPeriodo: createFieldMetadata({ description: "Filtro por período", nullable: true }),
  filterMatricula: createFieldMetadata({
    description: "Filtro por matrícula do usuário",
    nullable: true,
  }),
  filterNome: createFieldMetadata({ description: "Filtro por nome do usuário", nullable: true }),
  filterEmail: createFieldMetadata({ description: "Filtro por e-mail do usuário", nullable: true }),
  filterCampusId: createFieldMetadata({
    description: "Filtro por ID do campus do vínculo",
    nullable: true,
  }),
  filterCursoNome: createFieldMetadata({ description: "Filtro por nome do curso", nullable: true }),
  filterEmailInstitucional: createFieldMetadata({
    description: "Filtro por e-mail institucional",
    nullable: true,
  }),
  filterTelefone: createFieldMetadata({ description: "Filtro por telefone", nullable: true }),
};

export class EstagiarioListQuery extends PaginationQuery {
  "filter.id"?: IFilterAcceptableValues;
  "filter.perfil.id"?: IFilterAcceptableValues;
  "filter.perfil.usuario.matricula"?: IFilterAcceptableValues;
  "filter.perfil.usuario.nome"?: IFilterAcceptableValues;
  "filter.perfil.usuario.email"?: IFilterAcceptableValues;
  "filter.perfil.campus.id"?: IFilterAcceptableValues;
  "filter.curso.id"?: IFilterAcceptableValues;
  "filter.curso.nome"?: IFilterAcceptableValues;
  "filter.periodo"?: IFilterAcceptableValues;
  "filter.emailInstitucional"?: IFilterAcceptableValues;
  "filter.telefone"?: IFilterAcceptableValues;
}
