using Ladesa.Domain.v4.Generics;
using Ladesa.Domain.v4.Generics.Entities;

namespace Ladesa.ManagementService.Domain.Contracts;

/** Visão completa de uma ProfessorDisponibilidade. */
model ProfessorDisponibilidadeView {
  ...OmitProperties<ProfessorDisponibilidade, "disponibilidade" | "perfil">;
  disponibilidade: DisponibilidadeFindOneOutput;
  perfil: PerfilFindOneOutput;
}

/** Dados de entrada para encontrar uma ProfessorDisponibilidade por ID. */
model ProfessorDisponibilidadeFindOneInput {
  id: ProfessorDisponibilidade.id;
}

/** Visão FindOne de uma ProfessorDisponibilidade. */
model ProfessorDisponibilidadeFindOneOutput {
  ...PickProperties<ProfessorDisponibilidadeView, "id">;
  ...PickProperties<ProfessorDisponibilidadeView, "disponibilidade" | "perfil">;
  ...PickProperties<
    ProfessorDisponibilidadeView,
    "dateCreated" | "dateUpdated" | "dateDeleted"
  >;
}

/** Dados de entrada para a criação de uma ProfessorDisponibilidade. */
model ProfessorDisponibilidadeCreateInput {
  disponibilidade: DisponibilidadeFindOneInput;
  perfil: PerfilFindOneInput;
}

/** Dados de entrada para a atualização de uma ProfessorDisponibilidade. */
model ProfessorDisponibilidadeUpdateInput
  is OptionalProperties<ProfessorDisponibilidadeCreateInput>;

/** Resultados da busca a ProfessorDisponibilidades. */
model ProfessorDisponibilidadeListOutput
  is Pagination.Result.View<ProfessorDisponibilidadeFindOneOutput>;
