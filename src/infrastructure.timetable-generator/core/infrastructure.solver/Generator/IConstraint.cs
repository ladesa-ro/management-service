namespace Ladesa.TimetableGenerator.Infrastructure.Solver.Generator;

internal interface IConstraint
{
    void Apply(GenerationContext context);
}
