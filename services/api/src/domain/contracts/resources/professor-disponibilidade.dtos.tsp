using Ladesa.Domain.v4.Generics;
using Ladesa.Domain.v4.Generics.Entities;

namespace Ladesa.Domain.v4.Schemas;

/** Visão completa de uma ProfessorDisponibilidade. */
model ProfessorDisponibilidadeView {
  ...OmitProperties<ProfessorDisponibilidade, "disponibilidade" | "perfil">;
  disponibilidade: DisponibilidadeFindOneResultView;
  perfil: PerfilFindOneResultView;
}

/** Dados de entrada para encontrar uma ProfessorDisponibilidade por ID. */
model ProfessorDisponibilidadeFindOneInputView {
  id: ProfessorDisponibilidade.id;
}

/** Visão FindOne de uma ProfessorDisponibilidade. */
model ProfessorDisponibilidadeFindOneResultView {
  ...PickProperties<ProfessorDisponibilidadeView, "id">;
  ...PickProperties<ProfessorDisponibilidadeView, "disponibilidade" | "perfil">;
  ...PickProperties<
    ProfessorDisponibilidadeView,
    "dateCreated" | "dateUpdated" | "dateDeleted"
  >;
}

/** Dados de entrada para a criação de uma ProfessorDisponibilidade. */
model ProfessorDisponibilidadeInputCreateView {
  disponibilidade: DisponibilidadeFindOneInputView;
  perfil: PerfilFindOneInputView;
}

/** Dados de entrada para a atualização de uma ProfessorDisponibilidade. */
model ProfessorDisponibilidadeInputUpdateView
  is OptionalProperties<ProfessorDisponibilidadeInputCreateView>;

/** Resultados da busca a ProfessorDisponibilidades. */
model ProfessorDisponibilidadeListResultView
  is Pagination.Result.View<ProfessorDisponibilidadeFindOneResultView>;
