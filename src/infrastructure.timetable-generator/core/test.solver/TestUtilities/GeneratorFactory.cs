using Ladesa.TimetableGenerator.Domain.Models;
using Ladesa.TimetableGenerator.Infrastructure.Solver.Generator;

namespace Ladesa.TimetableGenerator.Infrastructure.Solver.Test.TestUtilities;

public static class GeneratorFactory
{
    public static Solver.Generator.Generator CreateDefault()
    {
        var combinationGenerator = new ScheduleCombinationGenerator();
        return new Solver.Generator.Generator(combinationGenerator);
    }
}
