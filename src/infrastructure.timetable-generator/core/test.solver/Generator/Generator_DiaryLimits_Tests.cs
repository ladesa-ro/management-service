using System.Globalization;
using Ladesa.TimetableGenerator.Domain.Models;
using Ladesa.TimetableGenerator.Infrastructure.Solver;
using Ladesa.TimetableGenerator.Infrastructure.Solver.Generator;
using Ladesa.TimetableGenerator.Infrastructure.Solver.Test.TestUtilities;
using NUnit.Framework;

namespace Ladesa.TimetableGenerator.Infrastructure.Solver.Test;

[TestFixture]
public class Generator_DiaryLimits_Tests
{
    [Test]
    public void No_Lessons_Due_To_Zero_Remaining()
    {
        var date = new DateOnly(2025, 10, 27);
        var timeSlot = new TimeSlot("08:00:00", "08:50:00");

        var group = new Group("turma:1", new Availability([]));
        var teacher = new Teacher("prof:1", new Availability([]));
        var diary = new Diary("diario:1", group.Id, teacher.Id, "disc:1", 1, 0);

        var request = new GenerateRequest(date, date, [group], [teacher], [diary], [timeSlot]);

        var result = GeneratorFactory.CreateDefault().GenerateTimetables(request, new IcalAvailabilityEvaluator()).FirstOrDefault();

        Assert.That(result, Is.Not.Null, "Should generate at least one timetable.");
        Assert.That(result!.Timetable.Schedules, Has.Length.EqualTo(0), "Should generate 0 schedules due to zero Remaining.");
    }

    [Test]
    public void Respect_Weekly_Limit_Across_Partial_Week()
    {
        var dateStart = new DateOnly(2025, 10, 29);
        var dateEnd = new DateOnly(2025, 10, 31);
        var timeSlot = new TimeSlot("08:00:00", "08:50:00");

        var group = new Group("turma:1", new Availability([]));
        var teacher = new Teacher("prof:1", new Availability([]));
        var diary = new Diary("diario:1", group.Id, teacher.Id, "disc:1", 2, 10);

        var request = new GenerateRequest(dateStart, dateEnd, [group], [teacher], [diary], [timeSlot]);

        var result = GeneratorFactory.CreateDefault().GenerateTimetables(request, new IcalAvailabilityEvaluator()).FirstOrDefault();

        Assert.That(result, Is.Not.Null, "Should generate at least one timetable.");
        Assert.That(result!.Timetable.Schedules.Length, Is.LessThanOrEqualTo(2), "Should generate at most 2 schedules in partial week.");

        var culture = CultureInfo.InvariantCulture;
        var weekRule = CalendarWeekRule.FirstDay;
        var firstDayOfWeek = DayOfWeek.Monday;

        var weekNumber = culture.Calendar.GetWeekOfYear(dateStart.ToDateTime(new TimeOnly()), weekRule, firstDayOfWeek);
        var schedulesInWeek = result.Timetable.Schedules
            .Count(s => culture.Calendar.GetWeekOfYear(s.Date.ToDateTime(new TimeOnly()), weekRule, firstDayOfWeek) == weekNumber);

        Assert.That(schedulesInWeek, Is.LessThanOrEqualTo(2), "Should respect weekly limit in partial week.");
    }

    [Test]
    public void Date_Range_Spanning_Two_Weeks()
    {
        var dateStart = new DateOnly(2025, 10, 31);
        var dateEnd = new DateOnly(2025, 11, 3);
        var timeSlot = new TimeSlot("08:00:00", "08:50:00");

        var group = new Group("turma:1", new Availability([]));
        var teacher = new Teacher("prof:1", new Availability([]));
        var diary = new Diary("diario:1", group.Id, teacher.Id, "disc:1", 1, 10);

        var request = new GenerateRequest(dateStart, dateEnd, [group], [teacher], [diary], [timeSlot]);

        var result = GeneratorFactory.CreateDefault().GenerateTimetables(request, new IcalAvailabilityEvaluator()).FirstOrDefault();

        Assert.That(result, Is.Not.Null, "Should generate at least one timetable.");
        Assert.That(result!.Timetable.Schedules, Has.Length.EqualTo(2), "Should generate exactly 2 schedules (one per week).");

        var culture = CultureInfo.InvariantCulture;
        var weekRule = CalendarWeekRule.FirstDay;
        var firstDayOfWeek = DayOfWeek.Monday;

        var schedulesByWeek = result.Timetable.Schedules
            .GroupBy(s => culture.Calendar.GetWeekOfYear(s.Date.ToDateTime(new TimeOnly()), weekRule, firstDayOfWeek))
            .ToDictionary(g => g.Key, g => g.Count());

        Assert.That(schedulesByWeek.Count, Is.EqualTo(2), "Schedules should span 2 weeks.");
        foreach (var count in schedulesByWeek.Values)
        {
            Assert.That(count, Is.EqualTo(1), "Each week should have exactly 1 schedule.");
        }
    }

    [Test]
    public void Zero_WeekLimit()
    {
        var date = new DateOnly(2025, 10, 27);
        var timeSlot = new TimeSlot("08:00:00", "08:50:00");

        var group = new Group("turma:1", new Availability([]));
        var teacher = new Teacher("prof:1", new Availability([]));
        var diary = new Diary("diario:1", group.Id, teacher.Id, "disc:1", 0, 10);

        var request = new GenerateRequest(date, date, [group], [teacher], [diary], [timeSlot]);

        var result = GeneratorFactory.CreateDefault().GenerateTimetables(request, new IcalAvailabilityEvaluator()).FirstOrDefault();

        Assert.That(result, Is.Not.Null, "Should generate at least one timetable.");
        Assert.That(result!.Timetable.Schedules, Has.Length.EqualTo(0), "Should generate 0 schedules due to zero WeekLimit.");
    }

    [Test]
    public void Remaining_Less_Than_WeekLimit()
    {
        var dateStart = new DateOnly(2025, 10, 27);
        var dateEnd = new DateOnly(2025, 10, 31);
        var timeSlot = new TimeSlot("08:00:00", "08:50:00");

        var group = new Group("turma:1", new Availability([]));
        var teacher = new Teacher("prof:1", new Availability([]));
        var diary = new Diary("diario:1", group.Id, teacher.Id, "disc:1", 3, 2);

        var request = new GenerateRequest(dateStart, dateEnd, [group], [teacher], [diary], [timeSlot]);

        var result = GeneratorFactory.CreateDefault().GenerateTimetables(request, new IcalAvailabilityEvaluator()).FirstOrDefault();

        Assert.That(result, Is.Not.Null, "Should generate at least one timetable.");
        Assert.That(result!.Timetable.Schedules.Length, Is.LessThanOrEqualTo(2), "Should generate at most 2 schedules total due to Remaining.");
    }

    [Test]
    public void Single_Day_With_Multiple_Slots_Exceeding_Remaining()
    {
        var date = new DateOnly(2025, 10, 27);
        var slots = new[]
        {
            new TimeSlot("08:00:00", "08:50:00"),
            new TimeSlot("09:00:00", "09:50:00"),
            new TimeSlot("10:00:00", "10:50:00"),
            new TimeSlot("11:00:00", "11:50:00"),
            new TimeSlot("13:00:00", "13:50:00")
        };

        var group = new Group("turma:1", new Availability([]));
        var teacher = new Teacher("prof:1", new Availability([]));
        var diary = new Diary("diario:1", group.Id, teacher.Id, "disc:1", 10, 3);

        var request = new GenerateRequest(date, date, [group], [teacher], [diary], slots);

        var result = GeneratorFactory.CreateDefault().GenerateTimetables(request, new IcalAvailabilityEvaluator()).FirstOrDefault();

        Assert.That(result, Is.Not.Null, "Should generate at least one timetable.");
        Assert.That(result!.Timetable.Schedules, Has.Length.EqualTo(3), "Should generate exactly 3 schedules on the single day due to Remaining.");
    }

    [Test]
    public void Multi_Week_With_Weekly_Reset()
    {
        var dateStart = new DateOnly(2025, 10, 27);
        var dateEnd = new DateOnly(2025, 11, 9);
        var timeSlot = new TimeSlot("08:00:00", "08:50:00");

        var group = new Group("turma:1", new Availability([]));
        var teacher = new Teacher("prof:1", new Availability([]));
        var diary = new Diary("diario:1", group.Id, teacher.Id, "disc:1", 2, 10);

        var request = new GenerateRequest(dateStart, dateEnd, [group], [teacher], [diary], [timeSlot]);

        var result = GeneratorFactory.CreateDefault().GenerateTimetables(request, new IcalAvailabilityEvaluator()).FirstOrDefault();

        Assert.That(result, Is.Not.Null, "Should generate at least one timetable.");
        Assert.That(result!.Timetable.Schedules, Has.Length.EqualTo(4), "Should generate up to 4 schedules (2 per week over 2 weeks).");

        var culture = CultureInfo.InvariantCulture;
        var weekRule = CalendarWeekRule.FirstDay;
        var firstDayOfWeek = DayOfWeek.Monday;

        var schedulesByWeek = result.Timetable.Schedules
            .GroupBy(s => culture.Calendar.GetWeekOfYear(s.Date.ToDateTime(new TimeOnly()), weekRule, firstDayOfWeek))
            .ToDictionary(g => g.Key, g => g.Count());

        Assert.That(schedulesByWeek.Count, Is.EqualTo(2), "Schedules should span 2 weeks.");
        foreach (var count in schedulesByWeek.Values)
        {
            Assert.That(count, Is.EqualTo(2), "Each week should have exactly 2 schedules.");
        }
    }

    [Test]
    public void Large_Remaining_Limited_Slots()
    {
        var date = new DateOnly(2025, 10, 27);
        var timeSlot = new TimeSlot("08:00:00", "08:50:00");

        var group = new Group("turma:1", new Availability([]));
        var teacher = new Teacher("prof:1", new Availability([]));
        var diary = new Diary("diario:1", group.Id, teacher.Id, "disc:1", 5, 100);

        var request = new GenerateRequest(date, date, [group], [teacher], [diary], [timeSlot]);

        var result = GeneratorFactory.CreateDefault().GenerateTimetables(request, new IcalAvailabilityEvaluator()).FirstOrDefault();

        Assert.That(result, Is.Not.Null, "Should generate at least one timetable.");
        Assert.That(result!.Timetable.Schedules, Has.Length.EqualTo(1), "Should generate only 1 schedule due to limited slots.");
    }

    [Test]
    public void Edge_Case_Remaining_1_WeekLimit_0()
    {
        var date = new DateOnly(2025, 10, 27);
        var timeSlot = new TimeSlot("08:00:00", "08:50:00");

        var group = new Group("turma:1", new Availability([]));
        var teacher = new Teacher("prof:1", new Availability([]));
        var diary = new Diary("diario:1", group.Id, teacher.Id, "disc:1", 0, 1);

        var request = new GenerateRequest(date, date, [group], [teacher], [diary], [timeSlot]);

        var result = GeneratorFactory.CreateDefault().GenerateTimetables(request, new IcalAvailabilityEvaluator()).FirstOrDefault();

        Assert.That(result, Is.Not.Null, "Should generate at least one timetable.");
        Assert.That(result!.Timetable.Schedules, Has.Length.EqualTo(0), "Should generate 0 schedules due to zero WeekLimit.");
    }

    [Test]
    public void Weekly_Limit_Exceeded_In_Multi_Week_With_Carryover()
    {
        var dateStart = new DateOnly(2025, 10, 27);
        var dateEnd = new DateOnly(2025, 11, 3);
        var timeSlot = new TimeSlot("08:00:00", "08:50:00");

        var group = new Group("turma:1", new Availability([]));
        var teacher = new Teacher("prof:1", new Availability([]));
        var diary = new Diary("diario:1", group.Id, teacher.Id, "disc:1", 2, 3);

        var request = new GenerateRequest(dateStart, dateEnd, [group], [teacher], [diary], [timeSlot]);

        var result = GeneratorFactory.CreateDefault().GenerateTimetables(request, new IcalAvailabilityEvaluator()).FirstOrDefault();

        Assert.That(result, Is.Not.Null, "Should generate at least one timetable.");
        Assert.That(result!.Timetable.Schedules.Length, Is.LessThanOrEqualTo(3), "Should not exceed total Remaining.");

        var culture = CultureInfo.InvariantCulture;
        var weekRule = CalendarWeekRule.FirstDay;
        var firstDayOfWeek = DayOfWeek.Monday;

        var schedulesByWeek = result.Timetable.Schedules
            .GroupBy(s => culture.Calendar.GetWeekOfYear(s.Date.ToDateTime(new TimeOnly()), weekRule, firstDayOfWeek))
            .ToDictionary(g => g.Key, g => g.Count());

        foreach (var count in schedulesByWeek.Values)
        {
            Assert.That(count, Is.LessThanOrEqualTo(2), "No week should exceed WeekLimit; limits reset per week without carryover.");
        }
    }
}