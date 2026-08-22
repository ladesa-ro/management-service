using System.Globalization;
using Ladesa.TimetableGenerator.Domain.Models;
using Ladesa.TimetableGenerator.Infrastructure.Solver;
using Ladesa.TimetableGenerator.Infrastructure.Solver.Generator;
using Ladesa.TimetableGenerator.Infrastructure.Solver.Test.TestUtilities;
using NUnit.Framework;

namespace Ladesa.TimetableGenerator.Infrastructure.Solver.Test;

[TestFixture]
public class Generator_CoreFunctionality_Tests
{
    [Test]
    public void Single_Lesson_With_Minimal_Setup()
    {
        var date = new DateOnly(2025, 10, 27); // Monday
        var timeSlot = new TimeSlot("08:00:00", "08:50:00");

        var group = new Group("turma:1", new Availability([]));
        var teacher = new Teacher("prof:1", new Availability([]));
        var diary = new Diary("diario:1", group.Id, teacher.Id, "disc:1", 1, 1);

        var request = new GenerateRequest(date, date, [group], [teacher], [diary], [timeSlot]);

        var result = GeneratorFactory.CreateDefault().GenerateTimetables(request, new IcalAvailabilityEvaluator()).FirstOrDefault();

        Assert.That(result, Is.Not.Null, "Should generate at least one timetable.");
        Assert.That(result!.Timetable.Schedules, Has.Length.EqualTo(1), "Should have exactly 1 schedule.");

        var schedule = result.Timetable.Schedules[0];
        Assert.Multiple(() =>
        {
            Assert.That(schedule.GroupId, Is.EqualTo(group.Id));
            Assert.That(schedule.TeacherId, Is.EqualTo(teacher.Id));
            Assert.That(schedule.DiaryId, Is.EqualTo(diary.Id));
            Assert.That(schedule.Date, Is.EqualTo(date));
            Assert.That(schedule.TimeSlot, Is.EqualTo(timeSlot));
        });
    }

    [Test]
    public void Multiple_Time_Slots_Same_Day_Respecting_WeekLimit()
    {
        var date = new DateOnly(2025, 10, 27); // Monday
        var slots = new[]
        {
            new TimeSlot("08:00:00", "08:50:00"),
            new TimeSlot("09:00:00", "09:50:00"),
            new TimeSlot("10:00:00", "10:50:00")
        };

        var group = new Group("turma:1", new Availability([]));
        var teacher = new Teacher("prof:1", new Availability([]));
        var diary = new Diary("diario:1", group.Id, teacher.Id, "disc:1", 2, 10);

        var request = new GenerateRequest(date, date, [group], [teacher], [diary], slots);

        var result = GeneratorFactory.CreateDefault().GenerateTimetables(request, new IcalAvailabilityEvaluator()).FirstOrDefault();

        Assert.That(result, Is.Not.Null, "Should generate at least one timetable.");
        Assert.That(result!.Timetable.Schedules, Has.Length.EqualTo(2), "Should generate exactly 2 schedules on the same day.");

        Assert.Multiple(() =>
        {
            foreach (var schedule in result.Timetable.Schedules)
            {
                Assert.That(schedule.Date, Is.EqualTo(date));
            }
        });
    }

    [Test]
    public void Lessons_Over_Multiple_Days_Within_One_Week()
    {
        var dateStart = new DateOnly(2025, 10, 27); // Monday
        var dateEnd = new DateOnly(2025, 10, 31); // Friday
        var timeSlot = new TimeSlot("08:00:00", "08:50:00");

        var group = new Group("turma:1", new Availability([]));
        var teacher = new Teacher("prof:1", new Availability([]));
        var diary = new Diary("diario:1", group.Id, teacher.Id, "disc:1", 3, 10);

        var request = new GenerateRequest(dateStart, dateEnd, [group], [teacher], [diary], [timeSlot]);

        var result = GeneratorFactory.CreateDefault().GenerateTimetables(request, new IcalAvailabilityEvaluator()).FirstOrDefault();

        Assert.That(result, Is.Not.Null, "Should generate at least one timetable.");
        Assert.That(result!.Timetable.Schedules, Has.Length.EqualTo(3), "Should generate exactly 3 schedules.");

        var distinctDates = result.Timetable.Schedules.Select(s => s.Date).Distinct().Count();
        Assert.That(distinctDates, Is.EqualTo(3), "Schedules should be on different days.");

        // Verify all in the same week
        var culture = CultureInfo.InvariantCulture;
        var weekRule = CalendarWeekRule.FirstDay;
        var firstDayOfWeek = DayOfWeek.Monday;

        var weeks = result.Timetable.Schedules
            .Select(s => culture.Calendar.GetWeekOfYear(s.Date.ToDateTime(new TimeOnly()), weekRule, firstDayOfWeek))
            .Distinct()
            .Count();

        Assert.That(weeks, Is.EqualTo(1), "All schedules should be in the same week.");
    }

    [Test]
    public void Adjacent_Time_Slots_Same_Day()
    {
        var date = new DateOnly(2025, 10, 27); // Monday
        var slots = new[]
        {
            new TimeSlot("08:00:00", "08:50:00"),
            new TimeSlot("09:00:00", "09:50:00")
        };

        var group = new Group("turma:1", new Availability([]));
        var teacher = new Teacher("prof:1", new Availability([]));
        var diary = new Diary("diario:1", group.Id, teacher.Id, "disc:1", 2, 10);

        var request = new GenerateRequest(date, date, [group], [teacher], [diary], slots);

        var result = GeneratorFactory.CreateDefault().GenerateTimetables(request, new IcalAvailabilityEvaluator()).FirstOrDefault();

        Assert.That(result, Is.Not.Null, "Should generate at least one timetable.");
        Assert.That(result!.Timetable.Schedules, Has.Length.EqualTo(2), "Should generate 2 schedules on the same day.");

        Assert.Multiple(() =>
        {
            foreach (var schedule in result.Timetable.Schedules)
            {
                Assert.That(schedule.Date, Is.EqualTo(date));
            }
        });
    }

    [Test]
    public void Diary_With_WeekLimit_Greater_Than_Available_Days()
    {
        var dateStart = new DateOnly(2025, 10, 27); // Monday
        var dateEnd = new DateOnly(2025, 10, 31); // Friday, 5 days
        var timeSlot = new TimeSlot("08:00:00", "08:50:00");

        var group = new Group("turma:1", new Availability([]));
        var teacher = new Teacher("prof:1", new Availability([]));
        var diary = new Diary("diario:1", group.Id, teacher.Id, "disc:1", 10, 100);

        var request = new GenerateRequest(dateStart, dateEnd, [group], [teacher], [diary], [timeSlot]);

        var result = GeneratorFactory.CreateDefault().GenerateTimetables(request, new IcalAvailabilityEvaluator()).FirstOrDefault();

        Assert.That(result, Is.Not.Null, "Should generate at least one timetable.");
        Assert.That(result!.Timetable.Schedules, Has.Length.EqualTo(5), "Should generate at most 5 schedules (one per day).");

        var distinctDates = result.Timetable.Schedules.Select(s => s.Date).Distinct().Count();
        Assert.That(distinctDates, Is.EqualTo(5), "Schedules should be on all 5 different days.");
    }

    [Test]
    public void Full_Booking_All_Slots_Filled()
    {
        var dateStart = new DateOnly(2025, 10, 27); // Monday
        var dateEnd = new DateOnly(2025, 10, 31); // Friday, 5 days
        var timeSlot = new TimeSlot("08:00:00", "08:50:00");

        var group = new Group("turma:1", new Availability([]));
        var teacher = new Teacher("prof:1", new Availability([]));
        var diary = new Diary("diario:1", group.Id, teacher.Id, "disc:1", 5, 5);

        var request = new GenerateRequest(dateStart, dateEnd, [group], [teacher], [diary], [timeSlot]);

        var result = GeneratorFactory.CreateDefault().GenerateTimetables(request, new IcalAvailabilityEvaluator()).FirstOrDefault();

        Assert.That(result, Is.Not.Null, "Should generate at least one timetable.");
        Assert.That(result!.Timetable.Schedules, Has.Length.EqualTo(5), "Should fill all 5 available slots.");

        var distinctDates = result.Timetable.Schedules.Select(s => s.Date).Distinct().Count();
        Assert.That(distinctDates, Is.EqualTo(5), "Schedules should be on all 5 different days.");
    }

    [Test]
    public void Long_Date_Range_Month_Plus_Respecting_Weekly_Limits()
    {
        var dateStart = new DateOnly(2025, 10, 1); // Wednesday
        var dateEnd = new DateOnly(2025, 10, 31); // Friday, 31 days
        var timeSlot = new TimeSlot("08:00:00", "08:50:00");

        var group = new Group("turma:1", new Availability([]));
        var teacher = new Teacher("prof:1", new Availability([]));
        var diary = new Diary("diario:1", group.Id, teacher.Id, "disc:1", 2, 100);

        var request = new GenerateRequest(dateStart, dateEnd, [group], [teacher], [diary], [timeSlot]);

        var result = GeneratorFactory.CreateDefault().GenerateTimetables(request, new IcalAvailabilityEvaluator()).FirstOrDefault();

        Assert.That(result, Is.Not.Null, "Should generate at least one timetable.");
        Assert.That(result!.Timetable.Schedules, Has.Length.EqualTo(10), "Should generate exactly 10 schedules (2 per week over 5 weeks).");

        // Verify weekly limits
        var culture = CultureInfo.InvariantCulture;
        var weekRule = CalendarWeekRule.FirstDay;
        var firstDayOfWeek = DayOfWeek.Monday;

        var schedulesByWeek = result.Timetable.Schedules
            .GroupBy(s => culture.Calendar.GetWeekOfYear(s.Date.ToDateTime(new TimeOnly()), weekRule, firstDayOfWeek))
            .ToDictionary(g => g.Key, g => g.Count());

        Assert.That(schedulesByWeek.Count, Is.EqualTo(5), "Schedules should span 5 weeks.");

        foreach (var count in schedulesByWeek.Values)
        {
            Assert.That(count, Is.LessThanOrEqualTo(2), "No week should exceed the weekly limit of 2.");
        }
    }
}