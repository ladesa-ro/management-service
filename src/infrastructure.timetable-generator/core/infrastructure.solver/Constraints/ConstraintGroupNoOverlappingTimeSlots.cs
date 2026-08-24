using Ladesa.TimetableGenerator.Infrastructure.Solver.Generator;

namespace Ladesa.TimetableGenerator.Infrastructure.Solver.Constraints;

internal class ConstraintGroupNoOverlappingTimeSlots : IConstraint
{
    public void Apply(GenerationContext context)
    {
        ConstraintHelpers.ApplyNoOverlappingTimeSlots(
            context,
            p => new { p.Date, p.GroupId });
    }
}
