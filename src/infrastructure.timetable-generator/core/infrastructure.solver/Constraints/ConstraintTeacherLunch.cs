using Ladesa.TimetableGenerator.Domain.Models;
using Ladesa.TimetableGenerator.Infrastructure.Solver.Generator;

namespace Ladesa.TimetableGenerator.Infrastructure.Solver.Constraints;

internal class ConstraintTeacherLunch : IConstraint
{
    public void Apply(GenerationContext context)
    {
        var lunchBefore = context.GenerateRequest.ShiftSettings.LunchBufferBefore;
        var lunchAfter = context.GenerateRequest.ShiftSettings.LunchBufferAfter;

        ConstraintHelpers.ApplyAtMostOnePerGroup(
            context,
            p => new { p.Date, p.TeacherId },
            p => lunchBefore.Contains(p.TimeSlot.End) || lunchAfter.Contains(p.TimeSlot.Start));
    }
}
