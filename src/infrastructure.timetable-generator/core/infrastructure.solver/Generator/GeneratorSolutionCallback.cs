using Google.OrTools.Sat;
using Ladesa.TimetableGenerator.Domain.Models;

namespace Ladesa.TimetableGenerator.Infrastructure.Solver.Generator;

internal class GeneratorSolutionCallback(
    GenerationContext generationContext,
    Action<GeneratedTimetable> action,
    int maxSolutions)
    : CpSolverSolutionCallback
{
    private int _encontradas;

    public override void OnSolutionCallback()
    {
        var schedules =
            from proposal in generationContext.AllProposals
            where BooleanValue(proposal.ModelBoolVar)
            select new TimetableGridSchedule(
                proposal.GroupId,
                proposal.DiaryId,
                proposal.TeacherId,
                proposal.Date,
                proposal.TimeSlot
            );

        var timetableGrid = new TimetableGrid(
            generationContext.GenerateRequest.DateStart,
            generationContext.GenerateRequest.DateEnd,
            generationContext.GenerateRequest.TimeSlots,
            schedules.ToArray()
        );

        var generatedTimetable = new GeneratedTimetable(timetableGrid, (int)ObjectiveValue());

        action(generatedTimetable);

        _encontradas++;

        if (maxSolutions > 0 && _encontradas >= maxSolutions)
        {
            StopSearch();
        }
    }
}
