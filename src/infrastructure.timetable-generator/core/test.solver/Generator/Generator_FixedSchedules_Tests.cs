using Ladesa.TimetableGenerator.Domain.Models;
using Ladesa.TimetableGenerator.Infrastructure.Solver;
using Ladesa.TimetableGenerator.Infrastructure.Solver.Test.TestUtilities;
using NUnit.Framework;

namespace Ladesa.TimetableGenerator.Infrastructure.Solver.Test.Generator;

[TestFixture]
public class GeneratorFixedSchedulesTests
{
    private static readonly DateOnly Inicio = new(2026, 3, 2);
    private static readonly DateOnly Fim = new(2026, 3, 6);

    private static Solver.Generator.Generator CriarGerador() =>
        new(new ScheduleCombinationGenerator());

    [Test]
    public void AulaFixaAparece_NaGradeGerada()
    {
        var manha = Builders.Slot("07:00:00", "07:50:00");
        var tarde = Builders.Slot("07:50:00", "08:40:00");
        var fixa = new TimetableGridSchedule("group:1", "diary:1", "teacher:1", Inicio, tarde);

        var request = Builders.Request(
            Inicio, Fim,
            [Builders.Group()],
            [Builders.Teacher()],
            [Builders.Diary("diary:1", "group:1", "teacher:1", weekLimit: 1, remaining: 1)],
            [manha, tarde],
            fixedSchedules: [fixa]);

        var grade = CriarGerador()
            .GenerateTimetables(request, new IcalAvailabilityEvaluator())
            .First();

        Assert.That(
            grade.Timetable.Schedules,
            Has.Exactly(1).Matches<TimetableGridSchedule>(agendada =>
                agendada.Date == Inicio
                && agendada.TimeSlot.Start == tarde.Start
                && agendada.DiaryId == "diary:1"));
    }

    [Test]
    public void AulaFixaImpossivel_LancaValidacao()
    {
        var manha = Builders.Slot("07:00:00", "07:50:00");
        var inexistente = Builders.Slot("22:00:00", "22:50:00");
        var fixa = new TimetableGridSchedule("group:1", "diary:1", "teacher:1", Inicio, inexistente);

        var request = Builders.Request(
            Inicio, Fim,
            [Builders.Group()],
            [Builders.Teacher()],
            [Builders.Diary("diary:1", "group:1", "teacher:1")],
            [manha],
            fixedSchedules: [fixa]);

        Assert.Throws<GeneratorValidationException>(() =>
            CriarGerador().GenerateTimetables(request, new IcalAvailabilityEvaluator()).ToArray());
    }
}
