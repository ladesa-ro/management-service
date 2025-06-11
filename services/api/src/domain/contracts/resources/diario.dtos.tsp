using Ladesa.Domain.v4.Generics;
using Ladesa.Domain.v4.Generics.Entities;

namespace Ladesa.ManagementService.Domain.Contracts;

/** Visão completa de um diário. */
model DiarioView {
  ...OmitProperties<
    Diario,

      | "calendarioLetivo"
      | "turma"
      | "disciplina"
      | "ambientePadrao"
      | "imagemCapa"
  >;
  calendarioLetivo: CalendarioLetivoFindOneOutput;
  turma: TurmaFindOneOutput;
  disciplina: DisciplinaFindOneOutput;
  ambientePadrao: AmbienteFindOneOutput | null;
  imagemCapa: ImagemFindOneOutput | null;
}

/** Dados de entrada para encontrar um diário por ID. */
model DiarioFindOneInput {
  id: Diario.id;
}

/** Visão FindOne de um diário. */
model DiarioFindOneOutput {
  ...PickProperties<DiarioView, "id" | "ativo">;
  ...PickProperties<
    DiarioView,

      | "calendarioLetivo"
      | "turma"
      | "disciplina"
      | "ambientePadrao"
      | "imagemCapa"
  >;
  ...PickProperties<DiarioView, "dateCreated" | "dateUpdated" | "dateDeleted">;
}

/** Dados de entrada para a criação de um diário. */
model DiarioCreateInput {
  ativo: boolean;
  calendarioLetivo: CalendarioLetivoFindOneInput;
  turma: TurmaFindOneInput;
  disciplina: DisciplinaFindOneInput;
  ambientePadrao: AmbienteFindOneInput | null;
}

/** Dados de entrada para a atualização de um diário. */
model DiarioUpdateInput is OptionalProperties<DiarioCreateInput>;

/** Resultados da busca a Diarios. */
model DiarioListOutput is Pagination.Result.View<DiarioFindOneOutput>;
