namespace Ladesa.TimetableGenerator.Domain.Models;

public interface IAvailabilityEvaluator
{
    bool IsAvailable(AvailabilityRuleUnavailability rule, DateOnly checkDate, TimeSlot checkTimeSlot);
}
