namespace Ladesa.TimetableGenerator.Domain.Models;

/// <summary>
///     Evaluates whether a time slot on a given date is available
///     according to unavailability rules (recurrence patterns, date ranges, etc.).
/// </summary>
public interface IAvailabilityEvaluator
{
    bool IsAvailable(AvailabilityRuleUnavailability rule, DateOnly checkDate, TimeSlot checkTimeSlot);
}
