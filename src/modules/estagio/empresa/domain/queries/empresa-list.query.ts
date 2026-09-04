import {
  createFieldMetadata,
  type IFilterAcceptableValues,
  PaginationQuery,
  SharedListFields,
} from "@/domain/abstractions";

export const EmpresaListQueryFields = {
  ...SharedListFields,
  filterCnpj: createFieldMetadata({ description: "Filtro por CNPJ", nullable: true }),
  filterNomeFantasia: createFieldMetadata({
    description: "Filtro por nome fantasia",
    nullable: true,
  }),
  filterRazaoSocial: createFieldMetadata({
    description: "Filtro por razão social",
    nullable: true,
  }),
  filterEmail: createFieldMetadata({
    description: "Filtro por e-mail",
    nullable: true,
  }),
  filterTelefone: createFieldMetadata({
    description: "Filtro por telefone",
    nullable: true,
  }),
  filterEnderecoId: createFieldMetadata({
    description: "Filtro por ID de endereço",
    nullable: true,
  }),
  filterCidadeId: createFieldMetadata({
    description: "Filtro por ID da cidade",
    nullable: true,
  }),
  filterCidadeNome: createFieldMetadata({
    description: "Filtro por nome da cidade",
    nullable: true,
  }),
  filterEstadoId: createFieldMetadata({
    description: "Filtro por ID do estado",
    nullable: true,
  }),
  filterEstadoSigla: createFieldMetadata({
    description: "Filtro por sigla do estado (ex: RO, SP)",
    nullable: true,
  }),
};

export class EmpresaListQuery extends PaginationQuery {
  "filter.id"?: IFilterAcceptableValues;
  "filter.cnpj"?: IFilterAcceptableValues;
  "filter.nomeFantasia"?: IFilterAcceptableValues;
  "filter.razaoSocial"?: IFilterAcceptableValues;
  "filter.email"?: IFilterAcceptableValues;
  "filter.telefone"?: IFilterAcceptableValues;
  "filter.endereco.id"?: IFilterAcceptableValues;
  "filter.endereco.cidade.id"?: IFilterAcceptableValues;
  "filter.endereco.cidade.nome"?: IFilterAcceptableValues;
  "filter.endereco.cidade.estado.id"?: IFilterAcceptableValues;
  "filter.endereco.cidade.estado.sigla"?: IFilterAcceptableValues;
}
