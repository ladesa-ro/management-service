using Ladesa.Domain.v4.Generics;
using Ladesa.Domain.v4.Generics.Entities;

namespace Ladesa.Domain.v4.Schemas;

model GerarHorarioInput{
    dataInicial: date;
    dataFinal: date;
    professores: PerfilFindOneResultView[];
    turmas: TurmaFindOneResultView[];
    intervalos: IntervaloDeTempoFindOneResultView[];
}

model GerarHorarioOutput{
    dataInicial: date;
    dataFinal: date;
    aulas: HorarioGeradoAulaFindOneInputView[];
}