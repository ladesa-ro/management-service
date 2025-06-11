using Ladesa.Domain.v4.Generics;
using Ladesa.Domain.v4.Generics.Entities;

namespace Ladesa.Domain.v4.Schemas;

/** Visão completa de uma Aula. */
model AulaView {
  ...OmitProperties<Aula, "intervaloDeTempo" | "diario" | "ambiente">;
  intervaloDeTempo: IntervaloDeTempoFindOneResultView;
  diario: DiarioFindOneResultView;
  ambiente: AmbienteFindOneResultView | null;
}

/** Dados de entrada para encontrar uma Aula por ID. */
model AulaFindOneInputView {
  id: Aula.id;
}

/** Visão FindOne de uma Aula. */
model AulaFindOneResultView {
  ...PickProperties<AulaView, "id">;
  ...PickProperties<AulaView, "data" | "modalidade">;
  ...PickProperties<AulaView, "intervaloDeTempo" | "diario" | "ambiente">;
  ...PickProperties<AulaView, "dateCreated" | "dateUpdated" | "dateDeleted">;
}

/** Dados de entrada para a criação de uma Aula. */
model AulaInputCreateView {
  data: date;
  modalidade: string | null;
  intervaloDeTempo: IntervaloDeTempoInputView;
  diario: DiarioFindOneInputView;
  ambiente: AmbienteFindOneInputView | null;
}

/** Dados de entrada para a atualização de uma Aula. */
model AulaInputUpdateView is OptionalProperties<AulaInputCreateView>;

/** Resultados da busca a Aulas. */
model AulaListResultView is Pagination.Result.View<AulaFindOneResultView>;
