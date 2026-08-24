using Ladesa.TimetableGenerator.Domain.Models;

namespace Ladesa.TimetableGenerator.Infrastructure.Solver.Test.TestUtilities;

public class StubAvailabilityEvaluator : IAvailabilityEvaluator
{
    private readonly bool _defaultResult;

    public StubAvailabilityEvaluator(bool defaultResult = true)
    {
        _defaultResult = defaultResult;
    }

    public bool IsAvailable(AvailabilityRuleUnavailability rule, DateOnly checkDate, TimeSlot checkTimeSlot)
    {
        return _defaultResult;
    }
}
