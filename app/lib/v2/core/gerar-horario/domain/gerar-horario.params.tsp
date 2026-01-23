using Ladesa.ManagementService.Generics;

namespace Ladesa.ManagementService;

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
