using Ladesa.TimetableGenerator.Infrastructure.Solver.Generator;

namespace Ladesa.TimetableGenerator.Infrastructure.Solver.Constraints;

internal class ConstraintTeacherOneScheduleAtSameTime : IConstraint
{
    public void Apply(GenerationContext context)
    {
        ConstraintHelpers.ApplyAtMostOnePerGroup(
            context,
            p => new { p.Date, p.TeacherId, p.TimeSlot });
    }
}
