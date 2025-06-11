using Ladesa.Domain.v4.Generics;
using Ladesa.Domain.v4.Generics.Entities;

namespace Ladesa.Domain.v4.Schemas;

/** Visão completa de um endereco. */
model EnderecoView {
  ...OmitProperties<Endereco, "cidade">;
  cidade: CidadeFindOneResultView;
}

/**
 * Dados de entrada para encontrar um endereço por id.
 */
model EnderecoFindOneInputView is PickProperties<EnderecoView, "id">;

/**
 * Visão FindOne de um endereço.
 */
model EnderecoFindOneResultView {
  //
  ...PickProperties<EnderecoView, "id">;

  ...PickProperties<EnderecoView, "cep">;
  ...PickProperties<EnderecoView, "logradouro">;
  ...PickProperties<EnderecoView, "numero">;
  ...PickProperties<EnderecoView, "bairro">;
  ...PickProperties<EnderecoView, "complemento">;
  ...PickProperties<EnderecoView, "pontoReferencia">;

  //
  ...PickProperties<EnderecoView, "cidade">;

  //
  ...PickProperties<
    EnderecoView,
    "dateCreated" | "dateUpdated" | "dateDeleted"
  >;
}

/**
 * Dados de entrada para um endereco.
 */
model EnderecoInput {
  ...PickProperties<EnderecoView, "cep">;
  ...PickProperties<EnderecoView, "logradouro">;
  ...PickProperties<EnderecoView, "numero">;
  ...PickProperties<EnderecoView, "bairro">;
  ...PickProperties<EnderecoView, "complemento">;
  ...PickProperties<EnderecoView, "pontoReferencia">;
  cidade: CidadeFindOneInputView;
}
