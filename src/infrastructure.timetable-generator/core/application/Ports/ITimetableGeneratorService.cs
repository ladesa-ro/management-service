using Ladesa.TimetableGenerator.Domain.Models;

namespace Ladesa.TimetableGenerator.Application.Ports;

public interface ITimetableGeneratorService
{
    IEnumerable<GeneratedTimetable> Generate(GenerateRequest request);
}
