using Google.OrTools.Sat;
using Ladesa.TimetableGenerator.Domain.Models;
using Ladesa.TimetableGenerator.Infrastructure.Solver.Generator;

namespace Ladesa.TimetableGenerator.Infrastructure.Solver.Constraints;

internal class ConstraintRoomOneScheduleAtSameTime : IConstraint
{
    public void Apply(GenerationContext context)
    {
        var comSala =
            from proposta in context.AllProposals
            let sala = context.GenerateRequest.DiaryFindById(proposta.DiaryId)?.RoomId
            where !string.IsNullOrEmpty(sala)
            select new { proposta, sala };

        var porSalaEHorario =
            from item in comSala
            group item.proposta by new { item.sala, item.proposta.Date, item.proposta.TimeSlot.Start }
            into agrupado
            where agrupado.Count() > 1
            select agrupado;

        foreach (var grupo in porSalaEHorario)
        {
            context.CpModel.AddAtMostOne(grupo.Select(proposta => proposta.ModelBoolVar));
        }
    }
}
