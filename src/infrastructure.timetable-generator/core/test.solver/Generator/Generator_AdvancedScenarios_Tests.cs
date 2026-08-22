using Ladesa.TimetableGenerator.Domain.Models;
using Ladesa.TimetableGenerator.Infrastructure.Solver;
using Ladesa.TimetableGenerator.Infrastructure.Solver.Generator;
using Ladesa.TimetableGenerator.Infrastructure.Solver.Test.TestUtilities;

namespace Ladesa.TimetableGenerator.Infrastructure.Solver.Test;

[TestFixture]
public class Generator_AdvancedScenarios_Tests
{
    [Test]
    public void Date_Range_Including_Holidays_Assume_No_Built_In()
    {
        var dateStart = new DateOnly(2025, 4, 21); // Monday, Tiradentes Day
        var dateEnd = new DateOnly(2025, 4, 25); // Friday
        var timeSlot = new TimeSlot("08:00:00", "08:50:00");

        var group = new Group("turma:1", new Availability([]));
        var teacher = new Teacher("prof:1", new Availability([]));
        var diary = new Diary("diario:1", group.Id, teacher.Id, "disc:1", 5, 5);

        var request = new GenerateRequest(
            dateStart, 
            dateEnd,
            [group],
            [teacher],
            [diary],
            [timeSlot]
        );

        var result = GeneratorFactory.CreateDefault().GenerateTimetables(request, new IcalAvailabilityEvaluator()).FirstOrDefault();

        Assert.That(result, Is.Not.Null);
        Assert.That(result!.Timetable.Schedules, Has.Length.EqualTo(5));

        var scheduledDates = result.Timetable.Schedules.Select(s => s.Date).ToList();
        Assert.That(scheduledDates, Does.Contain(dateStart));

        // Variant: teacher unavailable on holiday
        var teacherWithHoliday = new Teacher(
            "prof:1",
            new Availability([
                new AvailabilityRuleUnavailability(
                    "", 
                    dateStart.ToDateTime(new TimeOnly(0, 0, 0)), 
                    dateStart.ToDateTime(new TimeOnly(23, 59, 59))
                )
            ])
        );

        var requestWithRule = new GenerateRequest(
            dateStart,
            dateEnd,
            [group],
            [teacherWithHoliday],
            [diary],
            [timeSlot]
        );

        var resultWithRule = GeneratorFactory.CreateDefault().GenerateTimetables(requestWithRule, new IcalAvailabilityEvaluator()).FirstOrDefault();

        Assert.That(resultWithRule, Is.Not.Null);
        Assert.That(resultWithRule!.Timetable.Schedules, Has.Length.EqualTo(4));

        var scheduledDatesWithRule = resultWithRule.Timetable.Schedules.Select(s => s.Date).ToList();
        Assert.That(scheduledDatesWithRule, Does.Not.Contain(dateStart));
    }

    [Test]
    public void Multiple_Results_From_GenerateTimetables()
    {
        var date = new DateOnly(2025, 10, 27);
        var slots = new[]
        {
            new TimeSlot("08:00:00", "08:50:00"),
            new TimeSlot("09:00:00", "09:50:00")
        };

        var group = new Group("turma:1", new Availability([]));
        var teacher = new Teacher("prof:1", new Availability([]));
        var diary1 = new Diary("diario:1", group.Id, teacher.Id, "disc:1", 1, 1);
        var diary2 = new Diary("diario:2", group.Id, teacher.Id, "disc:2", 1, 1);

        var request = new GenerateRequest(
            date,
            date,
            [group],
            [teacher],
            [diary1, diary2],
            slots
        );

        var results = GeneratorFactory.CreateDefault().GenerateTimetables(request, new IcalAvailabilityEvaluator()).ToList();

        Assert.That(results, Has.Count.GreaterThan(0));

        // The solver enumerates feasible solutions, potentially yielding an initial empty timetable
        // before reaching improved (non-empty) solutions as it maximizes the objective.
        // Therefore, assert that at least one non-empty result exists and that no result exceeds constraints.
        Assert.That(results.Any(r => r.Timetable.Schedules.Length >= 1), Is.True,
            "At least one non-empty timetable should be produced.");

        var maxSchedules = results.Max(r => r.Timetable.Schedules.Length);
        Assert.That(maxSchedules, Is.InRange(1, 2), "The best solution should schedule between 1 and 2 lessons.");

        // No individual result should exceed the upper bound implied by constraints
        Assert.That(results.All(r => r.Timetable.Schedules.Length <= 2), Is.True);

        // For non-empty results, ensure they contain schedules from at least one diary
        foreach (var result in results.Where(r => r.Timetable.Schedules.Length > 0))
        {
            var diaryIds = result.Timetable.Schedules.Select(s => s.DiaryId).Distinct().Count();
            Assert.That(diaryIds, Is.GreaterThanOrEqualTo(1));
        }
    }

    [Test]
    public void Performance_With_Large_Input()
    {
        var dateStart = new DateOnly(2025, 10, 27);
        var dateEnd = new DateOnly(2025, 10, 31);
        var timeSlot = new TimeSlot("08:00:00", "08:50:00");

        var groups = Enumerable.Range(1, 10)
            .Select(i => new Group($"turma:{i}", new Availability([])))
            .ToArray();

        var teachers = Enumerable.Range(1, 10)
            .Select(i => new Teacher($"prof:{i}", new Availability([])))
            .ToArray();

        var random = new Random(42);
        var diaries = Enumerable.Range(1, 50)
            .Select(i =>
            {
                var group = groups[random.Next(groups.Length)];
                var teacher = teachers[random.Next(teachers.Length)];
                return new Diary($"diario:{i}", group.Id, teacher.Id, $"disc:{i}", 5, 100);
            })
            .ToArray();

        var request = new GenerateRequest(dateStart, dateEnd, groups, teachers, diaries, [timeSlot]);

        Assert.DoesNotThrow(() => GeneratorFactory.CreateDefault().GenerateTimetables(request, new IcalAvailabilityEvaluator()).ToList());

        var results = GeneratorFactory.CreateDefault().GenerateTimetables(request, new IcalAvailabilityEvaluator()).ToList();
        Assert.That(results, Is.Not.Empty);

        var result = results.First();
        Assert.That(result.Timetable.Schedules.Length, Is.GreaterThan(0));
    }

    [Test]
    public void Time_Slots_In_Non_Chronological_Order()
    {
        var date = new DateOnly(2025, 10, 27);
        var slots = new[]
        {
            new TimeSlot("10:00:00", "10:50:00"),
            new TimeSlot("08:00:00", "08:50:00"),
            new TimeSlot("09:00:00", "09:50:00")
        };

        var group = new Group("turma:1", new Availability([]));
        var teacher = new Teacher("prof:1", new Availability([]));
        var diary = new Diary("diario:1", group.Id, teacher.Id, "disc:1", 3, 3);

        var request = new GenerateRequest(date, date, [group], [teacher], [diary], slots);

        var result = GeneratorFactory.CreateDefault().GenerateTimetables(request, new IcalAvailabilityEvaluator()).FirstOrDefault();

        Assert.That(result, Is.Not.Null);
        Assert.That(result!.Timetable.Schedules, Has.Length.EqualTo(3));

        var scheduledStarts = result.Timetable.Schedules.Select(s => s.TimeSlot.Start).OrderBy(t => t).ToArray();
        Assert.That(scheduledStarts, Is.EqualTo(["08:00:00", "09:00:00", "10:00:00"]));
    }

    [Test]
    public void Unavailability_With_Timezone_Consideration_If_Applicable()
    {
        var date = new DateOnly(2025, 10, 27);
        var timeSlot = new TimeSlot("08:00:00", "08:50:00");

        var unavailableStart = date.ToDateTime(new TimeOnly(8, 0, 0), DateTimeKind.Utc);
        var unavailableEnd = date.ToDateTime(new TimeOnly(8, 50, 0), DateTimeKind.Utc);

        var group = new Group("turma:1", new Availability([]));
        var teacherWithUnavail = new Teacher(
            "prof:1",
            new Availability([
                new AvailabilityRuleUnavailability("FREQ=DAILY", unavailableStart, unavailableEnd)
            ])
        );
        var diary = new Diary("diario:1", group.Id, teacherWithUnavail.Id, "disc:1", 1, 1);

        var request = new GenerateRequest(date, date, [group], [teacherWithUnavail], [diary], [timeSlot]);

        var result = GeneratorFactory.CreateDefault().GenerateTimetables(request, new IcalAvailabilityEvaluator()).FirstOrDefault();

        Assert.That(result, Is.Not.Null);
        Assert.That(result!.Timetable.Schedules, Has.Length.EqualTo(0));

        // Variant: no unavailability
        var teacherNoUnavail = new Teacher("prof:1", new Availability([]));
        var requestNoUnavail = new GenerateRequest(date, date, [group], [teacherNoUnavail], [diary], [timeSlot]);
        var resultNoUnavail = GeneratorFactory.CreateDefault().GenerateTimetables(requestNoUnavail, new IcalAvailabilityEvaluator()).FirstOrDefault();

        Assert.That(resultNoUnavail!.Timetable.Schedules, Has.Length.EqualTo(1));
    }
}
