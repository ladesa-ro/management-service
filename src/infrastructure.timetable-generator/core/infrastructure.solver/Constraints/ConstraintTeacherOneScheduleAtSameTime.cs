using Ladesa.TimetableGenerator.Infrastructure.Solver.Generator;

namespace Ladesa.TimetableGenerator.Infrastructure.Solver.Constraints;

/// <summary>
///     CONSTRAINT: Teacher - no more than one schedule at the same time.
/// </summary>
internal class ConstraintTeacherOneScheduleAtSameTime : IConstraint
{
    public void Apply(GenerationContext context)
    {
        ConstraintHelpers.ApplyAtMostOnePerGroup(
            context,
            p => new { p.Date, p.TeacherId, p.TimeSlot });
    }
}
