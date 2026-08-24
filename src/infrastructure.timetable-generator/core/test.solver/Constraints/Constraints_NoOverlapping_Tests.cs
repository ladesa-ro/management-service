using Ladesa.TimetableGenerator.Domain.Models;
using Ladesa.TimetableGenerator.Infrastructure.Solver;
using Ladesa.TimetableGenerator.Infrastructure.Solver.Generator;
using Ladesa.TimetableGenerator.Infrastructure.Solver.Test.TestUtilities;

namespace Ladesa.TimetableGenerator.Infrastructure.Solver.Test.Constraints;

[TestFixture]
public class Constraints_NoOverlapping_Tests
{
    [Test]
    public void Teacher_NoOverlapping_MinuteOverlap_Disallowed()
    {
        var date = new DateOnly(2025, 10, 27);
        var slot1 = Builders.Slot("08:00:00", "09:00:00");
        var slot2 = Builders.Slot("08:30:00", "09:30:00");

        var g1 = Builders.Group("group:1");
        var g2 = Builders.Group("group:2");
        var t1 = Builders.Teacher("teacher:1");

        var d1 = Builders.Diary("diary:1", g1.Id, t1.Id, weekLimit: 10, remaining: 10);
        var d2 = Builders.Diary("diary:2", g2.Id, t1.Id, weekLimit: 10, remaining: 10);

        var request = Builders.Request(
            start: date,
            end: date,
            groups: [g1, g2],
            teachers: [t1],
            diaries: [d1, d2],
            timeSlots: [slot1, slot2]
        );

        var result = GeneratorFactory.CreateDefault().GenerateTimetables(request, new IcalAvailabilityEvaluator()).First();

        Assert.That(result.Timetable.Schedules.Length, Is.EqualTo(1));
    }

    [Test]
    public void Group_NoOverlapping_MinuteOverlap_Disallowed()
    {
        var date = new DateOnly(2025, 10, 27);
        var slot1 = Builders.Slot("08:00:00", "09:00:00");
        var slot2 = Builders.Slot("08:30:00", "09:30:00");

        var g1 = Builders.Group("group:1");
        var t1 = Builders.Teacher("teacher:1");
        var t2 = Builders.Teacher("teacher:2");

        var d1 = Builders.Diary("diary:1", g1.Id, t1.Id, weekLimit: 10, remaining: 10);
        var d2 = Builders.Diary("diary:2", g1.Id, t2.Id, weekLimit: 10, remaining: 10);

        var request = Builders.Request(
            start: date,
            end: date,
            groups: [g1],
            teachers: [t1, t2],
            diaries: [d1, d2],
            timeSlots: [slot1, slot2]
        );

        var result = GeneratorFactory.CreateDefault().GenerateTimetables(request, new IcalAvailabilityEvaluator()).First();

        Assert.That(result.Timetable.Schedules.Length, Is.EqualTo(1));
    }

    [Test]
    public void Group_TouchingBoundaries_ShouldBeAllowed()
    {
        var date = new DateOnly(2025, 10, 27);
        var slot1 = Builders.Slot("08:00:00", "09:00:00");
        var slot2 = Builders.Slot("09:00:00", "10:00:00");

        var g1 = Builders.Group("group:1");
        var t1 = Builders.Teacher("teacher:1");
        var t2 = Builders.Teacher("teacher:2");

        var d1 = Builders.Diary("diary:1", g1.Id, t1.Id, weekLimit: 10, remaining: 10);
        var d2 = Builders.Diary("diary:2", g1.Id, t2.Id, weekLimit: 10, remaining: 10);

        var request = Builders.Request(
            start: date,
            end: date,
            groups: [g1],
            teachers: [t1, t2],
            diaries: [d1, d2],
            timeSlots: [slot1, slot2]
        );

        var result = GeneratorFactory.CreateDefault().GenerateTimetables(request, new IcalAvailabilityEvaluator()).First();

        Assert.That(result.Timetable.Schedules.Length, Is.EqualTo(2));
    }

    [Test]
    public void Teacher_Overlap_DifferentDays_ShouldBeAllowed()
    {
        var start = new DateOnly(2025, 10, 27);
        var end = new DateOnly(2025, 10, 28);
        var slot1 = Builders.Slot("08:00:00", "09:00:00");
        var slot2 = Builders.Slot("08:30:00", "09:30:00");

        var g1 = Builders.Group("group:1");
        var g2 = Builders.Group("group:2");
        var t1 = Builders.Teacher("teacher:1");

        var d1 = Builders.Diary("diary:1", g1.Id, t1.Id, weekLimit: 10, remaining: 10);
        var d2 = Builders.Diary("diary:2", g2.Id, t1.Id, weekLimit: 10, remaining: 10);

        var request = Builders.Request(
            start: start,
            end: end,
            groups: [g1, g2],
            teachers: [t1],
            diaries: [d1, d2],
            timeSlots: [slot1, slot2]
        );

        var result = GeneratorFactory.CreateDefault().GenerateTimetables(request, new IcalAvailabilityEvaluator()).First();

        Assert.That(result.Timetable.Schedules.Length, Is.EqualTo(2));
        Assert.That(result.Timetable.Schedules.Select(s => s.Date).Distinct().Count(), Is.EqualTo(2));
    }
}