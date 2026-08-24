using Ladesa.TimetableGenerator.Infrastructure.Solver.Generator;
using Ladesa.TimetableGenerator.Domain.Models;

namespace Ladesa.TimetableGenerator.Infrastructure.Solver.Constraints;

internal static class ConstraintHelpers
{
    public static void ApplyAtMostOnePerGroup<TKey>(
        GenerationContext context,
        Func<GenerationContextScheduleProposal, TKey> keySelector,
        Func<GenerationContextScheduleProposal, bool>? filter = null)
    {
        var source = filter is not null
            ? context.AllProposals.Where(filter)
            : context.AllProposals;

        var groups = source.GroupBy(keySelector);

        foreach (var group in groups)
        {
            var boolVars = group.Select(p => p.ModelBoolVar).ToArray();
            if (boolVars.Length == 0) continue;
            context.CpModel.AddAtMostOne(boolVars);
        }
    }

    public static void ApplyNoOverlappingTimeSlots<TKey>(
        GenerationContext context,
        Func<GenerationContextScheduleProposal, TKey> keySelector)
    {
        var groups = context.AllProposals.GroupBy(keySelector);

        foreach (var group in groups)
        {
            var proposals = group.ToArray();
            for (var i = 0; i < proposals.Length; i++)
            {
                for (var j = i + 1; j < proposals.Length; j++)
                {
                    if (TimeSlotsOverlap(proposals[i].TimeSlot, proposals[j].TimeSlot, proposals[i].Date))
                        context.CpModel.AddAtMostOne([proposals[i].ModelBoolVar, proposals[j].ModelBoolVar]);
                }
            }
        }
    }

    private static bool TimeSlotsOverlap(TimeSlot first, TimeSlot second, DateOnly date)
    {
        var (firstStart, firstEnd) = first.GetDateTimeRange(date);
        var (secondStart, secondEnd) = second.GetDateTimeRange(date);
        return firstStart < secondEnd && firstEnd > secondStart;
    }
}
