using Ladesa.TimetableGenerator.Domain.Models;
using Ladesa.TimetableGenerator.Infrastructure.Solver.Generator;

namespace Ladesa.TimetableGenerator.Infrastructure.Solver.Constraints;

internal class ConstraintGroupLunch : IConstraint
{
    public void Apply(GenerationContext context)
    {
        var lunchBefore = context.GenerateRequest.ShiftSettings.LunchBufferBefore;
        var lunchAfter = context.GenerateRequest.ShiftSettings.LunchBufferAfter;

        ConstraintHelpers.ApplyAtMostOnePerGroup(
            context,
            p => new { p.Date, p.GroupId },
            p => lunchBefore.Contains(p.TimeSlot.End) || lunchAfter.Contains(p.TimeSlot.Start));
    }
}
