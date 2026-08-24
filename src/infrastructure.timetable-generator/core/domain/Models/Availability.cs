namespace Ladesa.TimetableGenerator.Domain.Models;

public record Availability(
    AvailabilityRuleUnavailability[]? RulesUnavailability
)
{
    public bool IsAvailable(DateOnly checkDate, TimeSlot checkTimeSlot, IAvailabilityEvaluator evaluator)
    {
        if (RulesUnavailability is null or { Length: 0 }) return true;

        return RulesUnavailability.All(rule => evaluator.IsAvailable(rule, checkDate, checkTimeSlot));
    }
}
