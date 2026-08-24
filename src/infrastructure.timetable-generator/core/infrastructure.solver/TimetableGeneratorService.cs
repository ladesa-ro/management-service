using Ladesa.TimetableGenerator.Application.Ports;
using Ladesa.TimetableGenerator.Domain.Models;

namespace Ladesa.TimetableGenerator.Infrastructure.Solver;

public class TimetableGeneratorService : ITimetableGeneratorService
{
    private readonly IGenerator _generator;
    private readonly IAvailabilityEvaluator _availabilityEvaluator;

    public TimetableGeneratorService(
        IGenerator generator,
        IAvailabilityEvaluator availabilityEvaluator)
    {
        _generator = generator;
        _availabilityEvaluator = availabilityEvaluator;
    }

    public IEnumerable<GeneratedTimetable> Generate(GenerateRequest request)
        => _generator.GenerateTimetables(request, _availabilityEvaluator);
}
