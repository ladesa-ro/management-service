using Ladesa.TimetableGenerator.Infrastructure.Solver.Generator;

namespace Ladesa.TimetableGenerator.Infrastructure.Solver.Constraints;

/// <summary>
///     CONSTRAINT: For the same teacher and date, no overlapping time slots may be scheduled.
/// </summary>
internal class ConstraintTeacherNoOverlappingTimeSlots : IConstraint
{
    public void Apply(GenerationContext context)
    {
        ConstraintHelpers.ApplyNoOverlappingTimeSlots(
            context,
            p => new { p.Date, p.TeacherId });
    }
}
