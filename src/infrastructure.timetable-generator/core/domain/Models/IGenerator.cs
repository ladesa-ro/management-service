namespace Ladesa.TimetableGenerator.Domain.Models;

public interface IGenerator
{
    IEnumerable<GeneratedTimetable> GenerateTimetables(
        GenerateRequest request,
        IAvailabilityEvaluator availabilityEvaluator);

    IEnumerable<GenerationScheduleCombination> GetAllCombinationsWithAvailability(
        GenerateRequest generateRequest,
        IAvailabilityEvaluator availabilityEvaluator);
}
