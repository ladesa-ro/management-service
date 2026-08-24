using System.Globalization;
using Ladesa.TimetableGenerator.Domain.Models;
using Ladesa.TimetableGenerator.Infrastructure.Solver;
using Ladesa.TimetableGenerator.Infrastructure.Solver.Generator;
using Ladesa.TimetableGenerator.Infrastructure.Solver.Test.TestUtilities;
using NUnit.Framework;

namespace Ladesa.TimetableGenerator.Infrastructure.Solver.Test;

[TestFixture]
public class Generator_InputValidation_Tests
{
    [Test]
    public void No_Time_Slots_Provided()
    {
        var date = new DateOnly(2025, 10, 27);
        var group = new Group("turma:1", new Availability([]));
        var teacher = new Teacher("prof:1", new Availability([]));
        var diary = new Diary("diario:1", group.Id, teacher.Id, "disc:1", 1, 1);

        var request = new GenerateRequest(date, date, [group], [teacher], [diary], []);

        var result = GeneratorFactory.CreateDefault().GenerateTimetables(request, new IcalAvailabilityEvaluator()).FirstOrDefault();

        Assert.That(result, Is.Not.Null, "Should return a timetable context.");
        Assert.That(result!.Timetable.Schedules, Has.Length.EqualTo(0), "Should generate 0 schedules with no time slots.");
    }

    [Test]
    public void No_Groups_Provided()
    {
        var date = new DateOnly(2025, 10, 27);
        var timeSlot = new TimeSlot("08:00:00", "08:50:00");
        var teacher = new Teacher("prof:1", new Availability([]));
        var diary = new Diary("diario:1", "nonexistent-turma", teacher.Id, "disc:1", 1, 1);

        var request = new GenerateRequest(date, date, [], [teacher], [diary], [timeSlot]);

        var ex = Assert.Throws<Ladesa.TimetableGenerator.Domain.Models.GeneratorValidationException>(() => GeneratorFactory.CreateDefault().GenerateTimetables(request, new IcalAvailabilityEvaluator()).FirstOrDefault());
        Assert.That(ex!.Message, Does.Contain("Group not found"), "Should throw exception for non-existent group.");
    }

    [Test]
    public void No_Teachers_Provided()
    {
        var date = new DateOnly(2025, 10, 27);
        var timeSlot = new TimeSlot("08:00:00", "08:50:00");
        var group = new Group("turma:1", new Availability([]));
        var diary = new Diary("diario:1", group.Id, "nonexistent-prof", "disc:1", 1, 1);

        var request = new GenerateRequest(date, date, [group], [], [diary], [timeSlot]);

        var ex = Assert.Throws<Ladesa.TimetableGenerator.Domain.Models.GeneratorValidationException>(() => GeneratorFactory.CreateDefault().GenerateTimetables(request, new IcalAvailabilityEvaluator()).FirstOrDefault());
        Assert.That(ex!.Message, Does.Contain("Teacher not found"), "Should throw exception for non-existent teacher.");
    }

    [Test]
    public void Diary_With_Non_Existent_Group_And_Teacher()
    {
        var date = new DateOnly(2025, 10, 27);
        var timeSlot = new TimeSlot("08:00:00", "08:50:00");
        var group = new Group("turma:1", new Availability([]));
        var teacher = new Teacher("prof:1", new Availability([]));
        var diary = new Diary("diario:1", "nonexistent-turma", "nonexistent-prof", "disc:1", 1, 1);

        var request = new GenerateRequest(date, date, [group], [teacher], [diary], [timeSlot]);

        var ex = Assert.Throws<Ladesa.TimetableGenerator.Domain.Models.GeneratorValidationException>(() => GeneratorFactory.CreateDefault().GenerateTimetables(request, new IcalAvailabilityEvaluator()).FirstOrDefault());
        Assert.That(ex!.Message, Does.Contain("not found"), "Should throw exception for non-existent group and/or teacher.");
    }

    [Test]
    public void Invalid_RRULE_In_Unavailability()
    {
        var date = new DateOnly(2025, 10, 27);
        var timeSlot = new TimeSlot("08:00:00", "08:50:00");

        var group = new Group("turma:1", new Availability([]));
        var teacher = new Teacher("prof:1", new Availability([
            new AvailabilityRuleUnavailability(
                "INVALID_RRULE_SYNTAX",
                date.ToDateTime(new TimeOnly(0, 0, 0)),
                date.ToDateTime(new TimeOnly(23, 59, 59))
            )
        ]));
        var diary = new Diary("diario:1", group.Id, teacher.Id, "disc:1", 1, 1);

        var request = new GenerateRequest(date, date, [group], [teacher], [diary], [timeSlot]);

        var ex = Assert.Throws<Ladesa.TimetableGenerator.Domain.Models.GeneratorValidationException>(() => GeneratorFactory.CreateDefault().GenerateTimetables(request, new IcalAvailabilityEvaluator()).FirstOrDefault());
        Assert.That(ex!.Message, Does.Contain("invalid"), "Should throw exception for invalid RRULE syntax.");
    }

    [Test]
    public void DateStart_After_DateEnd_In_Request()
    {
        var dateStart = new DateOnly(2025, 10, 28);
        var dateEnd = new DateOnly(2025, 10, 27);
        var timeSlot = new TimeSlot("08:00:00", "08:50:00");
        var group = new Group("turma:1", new Availability([]));
        var teacher = new Teacher("prof:1", new Availability([]));
        var diary = new Diary("diario:1", group.Id, teacher.Id, "disc:1", 1, 1);

        var request = new GenerateRequest(dateStart, dateEnd, [group], [teacher], [diary], [timeSlot]);

        var result = GeneratorFactory.CreateDefault().GenerateTimetables(request, new IcalAvailabilityEvaluator()).FirstOrDefault();

        Assert.That(result, Is.Not.Null, "Should return a timetable context.");
        Assert.That(result!.Timetable.Schedules, Has.Length.EqualTo(0), "Should generate 0 schedules for invalid date range.");
    }

    [Test]
    public void No_Diaries_Provided()
    {
        var date = new DateOnly(2025, 10, 27);
        var timeSlot = new TimeSlot("08:00:00", "08:50:00");
        var group = new Group("turma:1", new Availability([]));
        var teacher = new Teacher("prof:1", new Availability([]));

        var request = new GenerateRequest(date, date, [group], [teacher], [], [timeSlot]);

        var result = GeneratorFactory.CreateDefault().GenerateTimetables(request, new IcalAvailabilityEvaluator()).FirstOrDefault();

        Assert.That(result, Is.Not.Null, "Should return a timetable context.");
        Assert.That(result!.Timetable.Schedules, Has.Length.EqualTo(0), "Should generate 0 schedules with no diaries.");
    }

    [Test]
    public void Time_Slots_With_Invalid_Times_Start_After_End()
    {
        var date = new DateOnly(2025, 10, 27);
        var invalidTimeSlot = new TimeSlot("09:00:00", "08:00:00");
        var group = new Group("turma:1", new Availability([]));
        var teacher = new Teacher("prof:1", new Availability([]));
        var diary = new Diary("diario:1", group.Id, teacher.Id, "disc:1", 1, 1);

        Assert.Throws<ArgumentException>(() => new GenerateRequest(date, date, [group], [teacher], [diary], [invalidTimeSlot]),
            "Should throw exception for invalid time slot (start after end).");
    }

    [Test]
    public void Empty_Request_Minimal_Fields()
    {
        var date = new DateOnly(2025, 10, 27);

        var request = new GenerateRequest(date, date, [], [], [], []);

        var result = GeneratorFactory.CreateDefault().GenerateTimetables(request, new IcalAvailabilityEvaluator()).FirstOrDefault();

        Assert.That(result, Is.Not.Null, "Should return a timetable context.");
        Assert.That(result!.Timetable.Schedules, Has.Length.EqualTo(0), "Should generate 0 schedules for empty request.");
    }

    [Test]
    public void Invalid_Date_Feb_30()
    {
        Assert.Throws<ArgumentOutOfRangeException>(() => new DateOnly(2025, 2, 30),
            "Should throw exception for invalid date (Feb 30).");
    }

    [Test]
    public void Time_Slot_Spanning_Midnight()
    {
        var date = new DateOnly(2025, 10, 27);
        var spanningTimeSlot = new TimeSlot("23:00:00", "01:00:00");
        var group = new Group("turma:1", new Availability([]));
        var teacher = new Teacher("prof:1", new Availability([]));
        var diary = new Diary("diario:1", group.Id, teacher.Id, "disc:1", 1, 1);

        Assert.Throws<ArgumentException>(() => new GenerateRequest(date, date, [group], [teacher], [diary], [spanningTimeSlot]),
            "Should throw exception for time slot spanning midnight.");
    }

    [Test]
    public void Zero_Duration_Time_Slot()
    {
        var date = new DateOnly(2025, 10, 27);
        var zeroDurationSlot = new TimeSlot("08:00:00", "08:00:00");
        var group = new Group("turma:1", new Availability([]));
        var teacher = new Teacher("prof:1", new Availability([]));
        var diary = new Diary("diario:1", group.Id, teacher.Id, "disc:1", 1, 1);

        Assert.Throws<ArgumentException>(() => new GenerateRequest(date, date, [group], [teacher], [diary], [zeroDurationSlot]),
            "Should throw exception for zero-duration time slot.");
    }

    [Test]
    public void Duplicate_IDs_In_Entities()
    {
        var date = new DateOnly(2025, 10, 27);
        var timeSlot = new TimeSlot("08:00:00", "08:50:00");
        var group1 = new Group("turma:1", new Availability([]));
        var group2 = new Group("turma:1", new Availability([]));
        var teacher = new Teacher("prof:1", new Availability([]));
        var diary = new Diary("diario:1", group1.Id, teacher.Id, "disc:1", 1, 1);

        Assert.Throws<Ladesa.TimetableGenerator.Domain.Models.GeneratorValidationException>(() => new GenerateRequest(date, date, [group1, group2], [teacher], [diary], [timeSlot]),
            "Should throw exception for duplicate entity IDs.");
    }
}