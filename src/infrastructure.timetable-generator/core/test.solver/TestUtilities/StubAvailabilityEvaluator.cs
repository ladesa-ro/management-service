using Ladesa.TimetableGenerator.Domain.Models;

namespace Ladesa.TimetableGenerator.Infrastructure.Solver.Test.TestUtilities;

/// <summary>
///     A configurable test double for <see cref="IAvailabilityEvaluator"/> that returns
///     a fixed value for all calls, defaulting to always-available.
///     Use this in tests that need to control availability behavior without depending
///     on the real iCal/RRULE infrastructure implementation.
/// </summary>
public class StubAvailabilityEvaluator : IAvailabilityEvaluator
{
    private readonly bool _defaultResult;

    /// <summary>
    ///     Creates a stub evaluator that returns the given value for all IsAvailable calls.
    /// </summary>
    /// <param name="defaultResult">The value to return from IsAvailable. Defaults to true (always available).</param>
    public StubAvailabilityEvaluator(bool defaultResult = true)
    {
        _defaultResult = defaultResult;
    }

    public bool IsAvailable(AvailabilityRuleUnavailability rule, DateOnly checkDate, TimeSlot checkTimeSlot)
    {
        return _defaultResult;
    }
}
