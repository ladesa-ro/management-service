using Ladesa.TimetableGenerator.Domain.Models;
using Ladesa.TimetableGenerator.Infrastructure.Solver;
using Ladesa.TimetableGenerator.Infrastructure.Solver.Generator;
using Ladesa.TimetableGenerator.Infrastructure.Solver.Test.TestUtilities;
using Microsoft.Extensions.Logging.Abstractions;

namespace Ladesa.TimetableGenerator.Infrastructure.Solver.Test.Domain;

[TestFixture]
public class Validation_Standardization_Tests
{
    private readonly IAvailabilityEvaluator _evaluator = new IcalAvailabilityEvaluator();
    [Test]
    public void GenerateTimetables_MissingGroup_ShouldThrow_Standardized()
    {
        var date = new DateOnly(2025, 10, 27);
        var g = Builders.Group("group:1");
        var t = Builders.Teacher("teacher:1");
        var d = Builders.Diary("diary:1", groupId: "group:missing", teacherId: t.Id);
        var req = Builders.Request(date, date, [g], [t], [d], [Builders.Slot("08:00:00", "08:50:00")]);

        var ex = Assert.Throws<GeneratorValidationException>(() => GeneratorFactory.CreateDefault().GenerateTimetables(req, _evaluator).First());
        Assert.That(ex!.Code, Is.EqualTo(GeneratorValidationErrorCode.GroupNotFound));
        Assert.That(ex!.Message, Does.Contain("Group not found"));
    }

    [Test]
    public void GenerateTimetables_MissingTeacher_ShouldThrow_Standardized()
    {
        var date = new DateOnly(2025, 10, 27);
        var g = Builders.Group("group:1");
        var t = Builders.Teacher("teacher:1");
        var d = Builders.Diary("diary:1", groupId: g.Id, teacherId: "teacher:missing");
        var req = Builders.Request(date, date, [g], [t], [d], [Builders.Slot("08:00:00", "08:50:00")]);

        var ex = Assert.Throws<GeneratorValidationException>(() => GeneratorFactory.CreateDefault().GenerateTimetables(req, _evaluator).First());
        Assert.That(ex!.Code, Is.EqualTo(GeneratorValidationErrorCode.TeacherNotFound));
        Assert.That(ex!.Message, Does.Contain("Teacher not found"));
    }

    [Test]
    public void GenerateTimetables_MissingBoth_ShouldThrow_Standardized()
    {
        var date = new DateOnly(2025, 10, 27);
        var g = Builders.Group("group:1");
        var t = Builders.Teacher("teacher:1");
        var d = Builders.Diary("diary:1", groupId: "group:missing", teacherId: "teacher:missing");
        var req = Builders.Request(date, date, [g], [t], [d], [Builders.Slot("08:00:00", "08:50:00")]);

        var ex = Assert.Throws<GeneratorValidationException>(() => GeneratorFactory.CreateDefault().GenerateTimetables(req, _evaluator).First());
        Assert.That(ex!.Code, Is.EqualTo(GeneratorValidationErrorCode.DiaryReferencesNotFound));
        Assert.That(ex!.Message, Does.Contain("Diary references not found"));
    }

    [Test]
    public void Availability_InvalidRRule_ShouldThrow_Standardized()
    {
        var invalidRule = new AvailabilityRuleUnavailability(
            RRule: "THIS_IS_NOT_A_VALID_RRULE",
            DateStart: new DateTime(2025, 10, 27, 8, 0, 0),
            DateEnd: new DateTime(2025, 10, 27, 12, 0, 0)
        );

        var date = new DateOnly(2025, 10, 27);
        var slot = new TimeSlot("09:00:00", "10:00:00");

        var ex = Assert.Throws<GeneratorValidationException>(() => _evaluator.IsAvailable(invalidRule, date, slot));
        Assert.That(ex!.Code, Is.EqualTo(GeneratorValidationErrorCode.InvalidRRule));
        Assert.That(ex!.Message, Does.Contain("invalid RRULE"));
    }
}