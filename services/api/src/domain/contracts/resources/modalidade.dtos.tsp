using Ladesa.Domain.v4.Generics;
using Ladesa.Domain.v4.Generics.Entities;

namespace Ladesa.ManagementService.Domain.Contracts;

/** Visão completa de uma modalidade. */
model ModalidadeView {
  ...Modalidade;
}

/** Dados de entrada para encontrar uma modalidade por ID. */
model ModalidadeFindOneInput {
  id: Modalidade.id;
}

/** Visão FindOne de uma modalidade. */
model ModalidadeFindOneOutput {
  ...PickProperties<ModalidadeView, "id">;
  ...PickProperties<ModalidadeView, "slug">;
  ...PickProperties<
    ModalidadeView,
    "dateCreated" | "dateUpdated" | "dateDeleted"
  >;
}

/** Dados de entrada para a criação de uma modalidade. */
model ModalidadeCreateInput {
  ...PickProperties<ModalidadeView, "slug">;
}

/** Dados de entrada para a atualização de uma modalidade. */
model ModalidadeUpdateInput is OptionalProperties<ModalidadeCreateInput>;

/** Resultados da busca a Modalidades. */
model ModalidadeListOutput is Pagination.Result.View<ModalidadeFindOneOutput>;
