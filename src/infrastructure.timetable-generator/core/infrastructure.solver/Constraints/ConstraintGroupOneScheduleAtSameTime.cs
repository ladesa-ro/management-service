using Ladesa.TimetableGenerator.Infrastructure.Solver.Generator;

namespace Ladesa.TimetableGenerator.Infrastructure.Solver.Constraints;

/// <summary>
///     CONSTRAINT: Group - no more than one schedule at the same time.
/// </summary>
internal class ConstraintGroupOneScheduleAtSameTime : IConstraint
{
    public void Apply(GenerationContext context)
    {
        ConstraintHelpers.ApplyAtMostOnePerGroup(
            context,
            p => new { p.Date, p.GroupId, p.TimeSlot });
    }
}
