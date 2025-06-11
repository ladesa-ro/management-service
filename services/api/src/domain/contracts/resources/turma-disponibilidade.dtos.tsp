using Ladesa.Domain.v4.Generics;
using Ladesa.Domain.v4.Generics.Entities;

namespace Ladesa.Domain.v4.Schemas;

/** Visão completa de uma TurmaDisponibilidade. */
model TurmaDisponibilidadeView {
  ...OmitProperties<TurmaDisponibilidade, "disponibilidade" | "turma">;
  disponibilidade: DisponibilidadeFindOneResultView;
  turma: TurmaFindOneResultView;
}

/** Dados de entrada para encontrar uma TurmaDisponibilidade por ID. */
model TurmaDisponibilidadeFindOneInputView {
  id: TurmaDisponibilidade.id;
}

/** Visão FindOne de uma TurmaDisponibilidade. */
model TurmaDisponibilidadeFindOneResultView {
  ...PickProperties<TurmaDisponibilidadeView, "id">;
  ...PickProperties<TurmaDisponibilidadeView, "disponibilidade" | "turma">;
  ...PickProperties<
    TurmaDisponibilidadeView,
    "dateCreated" | "dateUpdated" | "dateDeleted"
  >;
}

/** Dados de entrada para a criação de uma TurmaDisponibilidade. */
model TurmaDisponibilidadeInputCreateView {
  disponibilidade: DisponibilidadeFindOneInputView;
  turma: TurmaFindOneInputView;
}

/** Dados de entrada para a atualização de uma TurmaDisponibilidade. */
model TurmaDisponibilidadeInputUpdateView
  is OptionalProperties<TurmaDisponibilidadeInputCreateView>;

/** Resultados da busca a TurmaDisponibilidades. */
model TurmaDisponibilidadeListResultView
  is Pagination.Result.View<TurmaDisponibilidadeFindOneResultView>;
