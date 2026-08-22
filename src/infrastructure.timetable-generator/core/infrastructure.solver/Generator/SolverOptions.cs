namespace Ladesa.TimetableGenerator.Infrastructure.Solver.Generator;

public sealed record SolverOptions(
    int MaxSolutionsPerIteration = 1,
    double? MaxTimeSeconds = null,
    int ChannelCapacity = 64)
{
    public static SolverOptions FromEnvironment()
    {
        var bruto = Environment.GetEnvironmentVariable("TIMETABLE_SOLVER_BUDGET_SECONDS");

        var orcamento = double.TryParse(bruto, out var segundos) && segundos > 0
            ? segundos
            : (double?)null;

        return new SolverOptions(MaxTimeSeconds: orcamento);
    }
}
