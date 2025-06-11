using Ladesa.Domain.v4.Generics;
using Ladesa.Domain.v4.Generics.Entities;

namespace Ladesa.ManagementService.Domain.Contracts;

model GerarHorarioInput {
  dataInicial: date;
  dataFinal: date;
  professores: PerfilFindOneOutput[];
  turmas: TurmaFindOneOutput[];
  intervalos: IntervaloDeTempoFindOneOutput[];
}

model GerarHorarioOutput {
  dataInicial: date;
  dataFinal: date;
  aulas: HorarioGeradoAulaFindOneInput[];
}
