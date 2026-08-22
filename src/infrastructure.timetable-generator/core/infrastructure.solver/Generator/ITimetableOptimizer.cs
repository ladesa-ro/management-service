namespace Ladesa.TimetableGenerator.Infrastructure.Solver.Generator;

internal interface ITimetableOptimizer
{
    void OptimizeResult(GenerationContext context, long? scoreLimit = null);
}
