using Ladesa.TimetableGenerator.Domain.Models;
using Ladesa.TimetableGenerator.Infrastructure.Solver;
using Ladesa.TimetableGenerator.Infrastructure.Solver.Generator;
using Ladesa.TimetableGenerator.Infrastructure.Solver.Test.TestUtilities;

namespace Ladesa.TimetableGenerator.Infrastructure.Solver.Test.Domain;

[TestFixture]
public class GenerateRequest_Tests
{
    [Test]
    public void Invalid_TimeSlot_StartEqualsEnd_ShouldThrow()
    {
        var date = new DateOnly(2025, 10, 27);
        var slot = Builders.Slot("08:00:00", "08:00:00");

        Assert.Throws<ArgumentException>(() => Builders.Request(
            start: date,
            end: date,
            groups: [Builders.Group()],
            teachers: [Builders.Teacher()],
            diaries: [Builders.Diary("d1", "group:1", "teacher:1")],
            timeSlots: [slot]
        ));
    }

    [Test]
    public void Invalid_TimeSlot_EndBeforeStart_ShouldThrow()
    {
        var date = new DateOnly(2025, 10, 27);
        var slot = Builders.Slot("09:00:00", "08:00:00");

        Assert.Throws<ArgumentException>(() => Builders.Request(
            start: date,
            end: date,
            groups: [Builders.Group()],
            teachers: [Builders.Teacher()],
            diaries: [Builders.Diary("d1", "group:1", "teacher:1")],
            timeSlots: [slot]
        ));
    }

    [Test]
    public void Duplicate_Group_IDs_ShouldThrow()
    {
        var date = new DateOnly(2025, 10, 27);
        var g1 = Builders.Group("group:1");
        var g2 = Builders.Group("group:1"); // duplicate id

        Assert.Throws<Ladesa.TimetableGenerator.Domain.Models.GeneratorValidationException>(() => Builders.Request(
            start: date,
            end: date,
            groups: [g1, g2],
            teachers: [Builders.Teacher()],
            diaries: [Builders.Diary("d1", g1.Id, "teacher:1")],
            timeSlots: [Builders.Slot("08:00:00", "08:50:00")]
        ));
    }

    [Test]
    public void Duplicate_Teacher_IDs_ShouldThrow()
    {
        var date = new DateOnly(2025, 10, 27);
        var t1 = Builders.Teacher("teacher:1");
        var t2 = Builders.Teacher("teacher:1"); // duplicate id

        Assert.Throws<Ladesa.TimetableGenerator.Domain.Models.GeneratorValidationException>(() => Builders.Request(
            start: date,
            end: date,
            groups: [Builders.Group()],
            teachers: [t1, t2],
            diaries: [Builders.Diary("d1", "group:1", t1.Id)],
            timeSlots: [Builders.Slot("08:00:00", "08:50:00")]
        ));
    }

    [Test]
    public void Duplicate_Diary_IDs_ShouldThrow()
    {
        var date = new DateOnly(2025, 10, 27);
        var g = Builders.Group();
        var t = Builders.Teacher();
        var d1 = Builders.Diary("diary:1", g.Id, t.Id);
        var d2 = Builders.Diary("diary:1", g.Id, t.Id); // duplicate id

        Assert.Throws<Ladesa.TimetableGenerator.Domain.Models.GeneratorValidationException>(() => Builders.Request(
            start: date,
            end: date,
            groups: [g],
            teachers: [t],
            diaries: [d1, d2],
            timeSlots: [Builders.Slot("08:00:00", "08:50:00")]
        ));
    }

    [Test]
    public void GenerateTimetables_DiaryReferencesMissingGroup_ShouldThrow()
    {
        var date = new DateOnly(2025, 10, 27);
        var g = Builders.Group("group:1");
        var t = Builders.Teacher("teacher:1");
        var d = Builders.Diary("diary:1", groupId: "group:missing", teacherId: t.Id);
        var req = Builders.Request(date, date, [g], [t], [d], [Builders.Slot("08:00:00", "08:50:00")]);

        var ex = Assert.Throws<Ladesa.TimetableGenerator.Domain.Models.GeneratorValidationException>(() => GeneratorFactory.CreateDefault().GenerateTimetables(req, new IcalAvailabilityEvaluator()).First());
        Assert.That(ex!.Message, Does.Contain("Group not found"));
    }

    [Test]
    public void GenerateTimetables_DiaryReferencesMissingTeacher_ShouldThrow()
    {
        var date = new DateOnly(2025, 10, 27);
        var g = Builders.Group("group:1");
        var t = Builders.Teacher("teacher:1");
        var d = Builders.Diary("diary:1", groupId: g.Id, teacherId: "teacher:missing");
        var req = Builders.Request(date, date, [g], [t], [d], [Builders.Slot("08:00:00", "08:50:00")]);

        var ex = Assert.Throws<Ladesa.TimetableGenerator.Domain.Models.GeneratorValidationException>(() => GeneratorFactory.CreateDefault().GenerateTimetables(req, new IcalAvailabilityEvaluator()).First());
        Assert.That(ex!.Message, Does.Contain("Teacher not found"));
    }

    [Test]
    public void GenerateTimetables_DiaryReferencesMissingBoth_ShouldThrow()
    {
        var date = new DateOnly(2025, 10, 27);
        var g = Builders.Group("group:1");
        var t = Builders.Teacher("teacher:1");
        var d = Builders.Diary("diary:1", groupId: "group:missing", teacherId: "teacher:missing");
        var req = Builders.Request(date, date, [g], [t], [d], [Builders.Slot("08:00:00", "08:50:00")]);

        var ex = Assert.Throws<Ladesa.TimetableGenerator.Domain.Models.GeneratorValidationException>(() => GeneratorFactory.CreateDefault().GenerateTimetables(req, new IcalAvailabilityEvaluator()).First());
        Assert.That(ex!.Message, Does.Contain("Diary references not found"));
    }
}