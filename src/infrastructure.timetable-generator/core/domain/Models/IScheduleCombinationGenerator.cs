namespace Ladesa.TimetableGenerator.Domain.Models;

public interface IScheduleCombinationGenerator
{
    IEnumerable<GenerationScheduleCombination> GetAllCombinationsWithAvailability(
        GenerateRequest generateRequest,
        IAvailabilityEvaluator availabilityEvaluator);
}
