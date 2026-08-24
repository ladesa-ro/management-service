using Ladesa.TimetableGenerator.Domain.Models;
using Ladesa.TimetableGenerator.Infrastructure.Solver;
using Microsoft.Extensions.Logging.Abstractions;

namespace Ladesa.TimetableGenerator.Infrastructure.Solver.Test.Domain;

[TestFixture]
public class AvailabilityRuleUnavailability_Additional_Tests
{
    private readonly IAvailabilityEvaluator _evaluator = new IcalAvailabilityEvaluator();

    [Test]
    public void Weekly_Without_BYDAY_ShouldDefaultTo_DateStart_DayOfWeek()
    {
        var dateStart = new DateTime(2025, 10, 27, 8, 0, 0);
        var rule = new AvailabilityRuleUnavailability(
            RRule: "FREQ=WEEKLY",
            DateStart: dateStart,
            DateEnd: new DateTime(2025, 10, 27, 12, 0, 0)
        );

        var monday = DateOnly.FromDateTime(dateStart);
        var tuesday = monday.AddDays(1);

        var slot = new TimeSlot("09:00:00", "10:00:00");

        Assert.That(_evaluator.IsAvailable(rule, monday, slot), Is.False, "Monday should be blocked by default.");
        Assert.That(_evaluator.IsAvailable(rule, tuesday, slot), Is.True, "Tuesday should be available.");
    }
}
