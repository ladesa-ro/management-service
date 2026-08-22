using System.Globalization;
using Ladesa.TimetableGenerator.Domain.Models;
using Ladesa.TimetableGenerator.Infrastructure.Solver;
using Ladesa.TimetableGenerator.Infrastructure.Solver.Generator;
using Ladesa.TimetableGenerator.Infrastructure.Solver.Test.TestUtilities;
using NUnit.Framework;

namespace Ladesa.TimetableGenerator.Infrastructure.Solver.Test;

[TestFixture]
public class Generator_ConflictResolution_Tests
{
    [Test]
    public void Multiple_Diaries_For_Same_Group_And_Teacher()
    {
        var date = new DateOnly(2025, 10, 27); // Monday
        var timeSlot = new TimeSlot("08:00:00", "08:50:00");

        var group = new Group("turma:1", new Availability([]));
        var teacher = new Teacher("prof:1", new Availability([]));
        var diary1 = new Diary("diario:1", group.Id, teacher.Id, "disc:1", 1, 1);
        var diary2 = new Diary("diario:2", group.Id, teacher.Id, "disc:2", 1, 1);

        var request = new GenerateRequest(date, date, [group], [teacher], [diary1, diary2], [timeSlot]);

        var result = GeneratorFactory.CreateDefault().GenerateTimetables(request, new IcalAvailabilityEvaluator()).FirstOrDefault();

        Assert.That(result, Is.Not.Null, "Should generate at least one timetable.");
        Assert.That(result!.Timetable.Schedules, Has.Length.EqualTo(1), "Should generate only one schedule due to single slot.");

        var scheduledDiaryId = result.Timetable.Schedules[0].DiaryId;
        Assert.That(scheduledDiaryId, Is.AnyOf(diary1.Id, diary2.Id), "One of the diaries should be scheduled, the other not.");
    }

    [Test]
    public void Conflicting_Schedules_Between_Two_Diaries()
    {
        var date = new DateOnly(2025, 10, 27); // Monday
        var timeSlot = new TimeSlot("08:00:00", "08:50:00");

        var group1 = new Group("turma:1", new Availability([]));
        var group2 = new Group("turma:2", new Availability([]));
        var teacher = new Teacher("prof:1", new Availability([]));
        var diary1 = new Diary("diario:1", group1.Id, teacher.Id, "disc:1", 1, 1);
        var diary2 = new Diary("diario:2", group2.Id, teacher.Id, "disc:2", 1, 1);

        var request = new GenerateRequest(date, date, [group1, group2], [teacher], [diary1, diary2], [timeSlot]);

        var result = GeneratorFactory.CreateDefault().GenerateTimetables(request, new IcalAvailabilityEvaluator()).FirstOrDefault();

        Assert.That(result, Is.Not.Null, "Should generate at least one timetable.");
        Assert.That(result!.Timetable.Schedules, Has.Length.EqualTo(1), "Should generate only one schedule due to teacher conflict.");
    }

    [Test]
    public void Overlapping_Time_Slots()
    {
        var date = new DateOnly(2025, 10, 27); // Monday
        var slots = new[]
        {
            new TimeSlot("08:00:00", "09:00:00"),
            new TimeSlot("08:30:00", "09:30:00") // Overlapping
        };

        var group = new Group("turma:1", new Availability([]));
        var teacher = new Teacher("prof:1", new Availability([]));
        var diary = new Diary("diario:1", group.Id, teacher.Id, "disc:1", 2, 2);

        var request = new GenerateRequest(date, date, [group], [teacher], [diary], slots);

        var result = GeneratorFactory.CreateDefault().GenerateTimetables(request, new IcalAvailabilityEvaluator()).FirstOrDefault();

        Assert.That(result, Is.Not.Null, "Should generate at least one timetable.");
        Assert.That(result!.Timetable.Schedules, Has.Length.EqualTo(1), "Should generate only one schedule due to overlapping slots.");
    }

    [Test]
    public void Multiple_Teachers_For_One_Diary()
    {
        var date = new DateOnly(2025, 10, 27); // Monday
        var timeSlot = new TimeSlot("08:00:00", "08:50:00");

        var group = new Group("turma:1", new Availability([]));
        var teacher1 = new Teacher("prof:1", new Availability([]));
        var teacher2 = new Teacher("prof:2", new Availability([]));
        var diary = new Diary("diario:1", group.Id, teacher1.Id, "disc:1", 1, 1); // References teacher1

        var request = new GenerateRequest(date, date, [group], [teacher1, teacher2], [diary], [timeSlot]);

        var result = GeneratorFactory.CreateDefault().GenerateTimetables(request, new IcalAvailabilityEvaluator()).FirstOrDefault();

        Assert.That(result, Is.Not.Null, "Should generate at least one timetable.");
        Assert.That(result!.Timetable.Schedules, Has.Length.EqualTo(1), "Should generate schedule only with the diary's teacher.");
        Assert.That(result.Timetable.Schedules[0].TeacherId, Is.EqualTo(teacher1.Id), "Should use the specified teacher, ignore extra.");
    }

    [Test]
    public void Multiple_Groups_For_One_Diary()
    {
        var date = new DateOnly(2025, 10, 27); // Monday
        var timeSlot = new TimeSlot("08:00:00", "08:50:00");

        var group1 = new Group("turma:1", new Availability([]));
        var group2 = new Group("turma:2", new Availability([]));
        var teacher = new Teacher("prof:1", new Availability([]));
        var diary = new Diary("diario:1", group1.Id, teacher.Id, "disc:1", 1, 1); // References group1

        var request = new GenerateRequest(date, date, [group1, group2], [teacher], [diary], [timeSlot]);

        var result = GeneratorFactory.CreateDefault().GenerateTimetables(request, new IcalAvailabilityEvaluator()).FirstOrDefault();

        Assert.That(result, Is.Not.Null, "Should generate at least one timetable.");
        Assert.That(result!.Timetable.Schedules, Has.Length.EqualTo(1), "Should generate schedule only with the diary's group.");
        Assert.That(result.Timetable.Schedules[0].GroupId, Is.EqualTo(group1.Id), "Should use the specified group, ignore extra.");
    }

    [Test]
    public void Priority_Or_Ordering_Of_Diaries()
    {
        var date = new DateOnly(2025, 10, 27); // Monday
        var timeSlot = new TimeSlot("08:00:00", "08:50:00");

        var group = new Group("turma:1", new Availability([]));
        var teacher = new Teacher("prof:1", new Availability([]));
        var diary1 = new Diary("diario:1", group.Id, teacher.Id, "disc:1", 1, 1);
        var diary2 = new Diary("diario:2", group.Id, teacher.Id, "disc:2", 1, 1);

        var request = new GenerateRequest(date, date, [group], [teacher], [diary1, diary2], [timeSlot]);

        var result = GeneratorFactory.CreateDefault().GenerateTimetables(request, new IcalAvailabilityEvaluator()).FirstOrDefault();

        Assert.That(result, Is.Not.Null, "Should generate at least one timetable.");
        Assert.That(result!.Timetable.Schedules, Has.Length.EqualTo(1), "Should generate only one schedule due to limited slots.");
        Assert.That(result.Timetable.Schedules[0].DiaryId, Is.EqualTo(diary1.Id), "Should prioritize first diary in order.");
    }

    [Test]
    public void Duplicate_Time_Slots()
    {
        var date = new DateOnly(2025, 10, 27); // Monday
        var timeSlot = new TimeSlot("08:00:00", "08:50:00");
        var slots = new[] { timeSlot, timeSlot }; // Duplicates

        var group = new Group("turma:1", new Availability([]));
        var teacher = new Teacher("prof:1", new Availability([]));
        var diary = new Diary("diario:1", group.Id, teacher.Id, "disc:1", 2, 2);

        var request = new GenerateRequest(date, date, [group], [teacher], [diary], slots);

        var result = GeneratorFactory.CreateDefault().GenerateTimetables(request, new IcalAvailabilityEvaluator()).FirstOrDefault();

        Assert.That(result, Is.Not.Null, "Should generate at least one timetable.");
        Assert.That(result!.Timetable.Schedules, Has.Length.EqualTo(1), "Should treat duplicates as one; no double schedules.");
    }

    [Test]
    public void Teacher_Shared_Across_Multiple_Groups()
    {
        var date = new DateOnly(2025, 10, 27); // Monday
        var slots = new[]
        {
            new TimeSlot("08:00:00", "08:50:00"),
            new TimeSlot("09:00:00", "09:50:00")
        };

        var group1 = new Group("turma:1", new Availability([]));
        var group2 = new Group("turma:2", new Availability([]));
        var teacher = new Teacher("prof:1", new Availability([]));
        var diary1 = new Diary("diario:1", group1.Id, teacher.Id, "disc:1", 1, 1);
        var diary2 = new Diary("diario:2", group2.Id, teacher.Id, "disc:2", 1, 1);

        var request = new GenerateRequest(date, date, [group1, group2], [teacher], [diary1, diary2], slots);

        var result = GeneratorFactory.CreateDefault().GenerateTimetables(request, new IcalAvailabilityEvaluator()).FirstOrDefault();

        Assert.That(result, Is.Not.Null, "Should generate at least one timetable.");
        Assert.That(result!.Timetable.Schedules, Has.Length.EqualTo(2), "Should generate two schedules in different slots.");
        var scheduledTimes = result.Timetable.Schedules.Select(s => s.TimeSlot.Start).Distinct().Count();
        Assert.That(scheduledTimes, Is.EqualTo(2), "No overlapping schedules for shared teacher.");
    }

    [Test]
    public void Group_Shared_Across_Multiple_Teachers()
    {
        var date = new DateOnly(2025, 10, 27); // Monday
        var slots = new[]
        {
            new TimeSlot("08:00:00", "08:50:00"),
            new TimeSlot("09:00:00", "09:50:00")
        };

        var group = new Group("turma:1", new Availability([]));
        var teacher1 = new Teacher("prof:1", new Availability([]));
        var teacher2 = new Teacher("prof:2", new Availability([]));
        var diary1 = new Diary("diario:1", group.Id, teacher1.Id, "disc:1", 1, 1);
        var diary2 = new Diary("diario:2", group.Id, teacher2.Id, "disc:2", 1, 1);

        var request = new GenerateRequest(date, date, [group], [teacher1, teacher2], [diary1, diary2], slots);

        var result = GeneratorFactory.CreateDefault().GenerateTimetables(request, new IcalAvailabilityEvaluator()).FirstOrDefault();

        Assert.That(result, Is.Not.Null, "Should generate at least one timetable.");
        Assert.That(result!.Timetable.Schedules, Has.Length.EqualTo(2), "Should generate two schedules in different slots.");
        var scheduledTimes = result.Timetable.Schedules.Select(s => s.TimeSlot.Start).Distinct().Count();
        Assert.That(scheduledTimes, Is.EqualTo(2), "No overlapping schedules for shared group.");
    }

    [Test]
    public void Partial_Booking_Due_To_Conflicts()
    {
        var date = new DateOnly(2025, 10, 27); // Monday
        var slots = new[]
        {
            new TimeSlot("08:00:00", "08:50:00"),
            new TimeSlot("09:00:00", "09:50:00")
        };

        var group = new Group("turma:1", new Availability([
            new AvailabilityRuleUnavailability(
                "FREQ=DAILY",
                date.ToDateTime(new TimeOnly(9, 0, 0)),
                date.ToDateTime(new TimeOnly(9, 50, 0))
            )
        ]));
        var teacher = new Teacher("prof:1", new Availability([]));
        var diary = new Diary("diario:1", group.Id, teacher.Id, "disc:1", 2, 2);

        var request = new GenerateRequest(date, date, [group], [teacher], [diary], slots);

        var result = GeneratorFactory.CreateDefault().GenerateTimetables(request, new IcalAvailabilityEvaluator()).FirstOrDefault();

        Assert.That(result, Is.Not.Null, "Should generate at least one timetable.");
        Assert.That(result!.Timetable.Schedules, Has.Length.EqualTo(1), "Should generate partial schedules due to unavailability conflict.");
        Assert.That(result.Timetable.Schedules[0].TimeSlot.Start, Is.EqualTo("08:00:00"), "Should schedule only in available slot.");
    }

    [Test]
    public void Diary_With_SubjectId_Variation()
    {
        var date = new DateOnly(2025, 10, 27); // Monday
        var slots = new[]
        {
            new TimeSlot("08:00:00", "08:50:00"),
            new TimeSlot("09:00:00", "09:50:00")
        };

        var group = new Group("turma:1", new Availability([]));
        var teacher = new Teacher("prof:1", new Availability([]));
        var diary1 = new Diary("diario:1", group.Id, teacher.Id, "disc:1", 1, 1);
        var diary2 = new Diary("diario:2", group.Id, teacher.Id, "disc:2", 1, 1); // Different subject

        var request = new GenerateRequest(date, date, [group], [teacher], [diary1, diary2], slots);

        var result = GeneratorFactory.CreateDefault().GenerateTimetables(request, new IcalAvailabilityEvaluator()).FirstOrDefault();

        Assert.That(result, Is.Not.Null, "Should generate at least one timetable.");
        Assert.That(result!.Timetable.Schedules, Has.Length.EqualTo(2), "Should schedule independently, no conflict on subject.");
    }
}