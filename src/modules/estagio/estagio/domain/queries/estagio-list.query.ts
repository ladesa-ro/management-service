import {
  createFieldMetadata,
  type IFilterAcceptableValues,
  SharedListFields,
} from "@/domain/abstractions";
import { PaginationQuery } from "@/domain/abstractions/queries/pagination.query";
import { EstagioStatus } from "../estagio";

export const EstagioListQueryFields = {
  ...SharedListFields,
  filterCampusId: createFieldMetadata({ description: "Filtro por campus", nullable: true }),
  filterEmpresaId: createFieldMetadata({
    description: "Filtro por ID da empresa",
    nullable: true,
  }),
  filterEmpresaCnpj: createFieldMetadata({
    description: "Filtro por CNPJ da empresa",
    nullable: true,
  }),
  filterEmpresaRazaoSocial: createFieldMetadata({
    description: "Filtro por razão social da empresa",
    nullable: true,
  }),
  filterEmpresaNomeFantasia: createFieldMetadata({
    description: "Filtro por nome fantasia da empresa",
    nullable: true,
  }),
  filterEstagiarioId: createFieldMetadata({
    description: "Filtro por ID do estagiário",
    nullable: true,
  }),
  filterEstagiarioMatricula: createFieldMetadata({
    description: "Filtro por matrícula do estagiário",
    nullable: true,
  }),
  filterEstagiarioNome: createFieldMetadata({
    description: "Filtro por nome do estagiário",
    nullable: true,
  }),
  filterEstagiarioCursoId: createFieldMetadata({
    description: "Filtro por ID do curso do estagiário",
    nullable: true,
  }),
  filterStatus: createFieldMetadata({
    description: "Filtro por status (string ou array)",
    nullable: true,
  }),
  filterNomeSupervisor: createFieldMetadata({
    description: "Filtro por nome do supervisor",
    nullable: true,
  }),
  filterEmailSupervisor: createFieldMetadata({
    description: "Filtro por e-mail do supervisor",
    nullable: true,
  }),
  filterUsuarioOrientadorMatricula: createFieldMetadata({
    description: "Filtro por matrícula do orientador",
    nullable: true,
  }),
  filterUsuarioOrientadorId: createFieldMetadata({
    description: "Filtro por ID do orientador",
    nullable: true,
  }),
  filterUsuarioOrientadorNome: createFieldMetadata({
    description: "Filtro por nome do orientador",
    nullable: true,
  }),
  filterCursoReferenciaId: createFieldMetadata({
    description: "Filtro por ID do curso de referência",
    nullable: true,
  }),
  filterDataInicio: createFieldMetadata({
    description: "Filtro por data de início",
    nullable: true,
  }),
  filterDataFim: createFieldMetadata({
    description: "Filtro por data de fim",
    nullable: true,
  }),
  filterAditivo: createFieldMetadata({
    description: "Filtro por aditivo (boolean)",
    nullable: true,
  }),
};

export class EstagioListQuery extends PaginationQuery {
  filterCampusId?: string[];
  filterEmpresaId?: string[];
  filterEstagiarioId?: string[];
  filterStatus?: EstagioStatus[];
  filterCursoReferenciaId?: string[];

  "filter.id"?: IFilterAcceptableValues;
  "filter.campus.id"?: IFilterAcceptableValues;
  "filter.empresa.id"?: IFilterAcceptableValues;
  "filter.empresa.cnpj"?: IFilterAcceptableValues;
  "filter.empresa.razaoSocial"?: IFilterAcceptableValues;
  "filter.empresa.nomeFantasia"?: IFilterAcceptableValues;
  "filter.estagiario.id"?: IFilterAcceptableValues;
  "filter.estagiario.perfil.usuario.matricula"?: IFilterAcceptableValues;
  "filter.estagiario.perfil.usuario.nome"?: IFilterAcceptableValues;
  "filter.estagiario.curso.id"?: IFilterAcceptableValues;
  "filter.status"?: IFilterAcceptableValues;
  "filter.nomeSupervisor"?: IFilterAcceptableValues;
  "filter.emailSupervisor"?: IFilterAcceptableValues;
  "filter.CursoReferencia.id"?: IFilterAcceptableValues;
  "filter.usuarioOrientador.id"?: IFilterAcceptableValues;
  "filter.usuarioOrientador.matricula"?: IFilterAcceptableValues;
  "filter.usuarioOrientador.nome"?: IFilterAcceptableValues;
  "filter.dataInicio"?: IFilterAcceptableValues;
  "filter.dataFim"?: IFilterAcceptableValues;
  "filter.aditivo"?: IFilterAcceptableValues;
}
