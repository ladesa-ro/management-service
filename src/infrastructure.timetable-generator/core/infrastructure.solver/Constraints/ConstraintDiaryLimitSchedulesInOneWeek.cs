using System.Globalization;
using Google.OrTools.Sat;
using Ladesa.TimetableGenerator.Domain.Models;
using Ladesa.TimetableGenerator.Infrastructure.Solver.Generator;

namespace Ladesa.TimetableGenerator.Infrastructure.Solver.Constraints;

internal class ConstraintDiaryLimitSchedulesInOneWeek : IConstraint
{
    public void Apply(GenerationContext context)
    {
        foreach (var group in context.GenerateRequest.Groups)
        foreach (var diary in context.GenerateRequest.DiaryFindByGroupId(group.Id))
        {
            if (diary.WeekLimit < 0) continue;

            var weeklyGroups = GroupProposalsByWeek(context, diary.Id);

            ApplyWeeklyLimitConstraints(context, weeklyGroups, diary.WeekLimit);
        }
    }

    private static (int WeekOfYear, GenerationContextScheduleProposal[] Proposals)[] GroupProposalsByWeek(
        GenerationContext generationContext,
        string diaryId)
    {
        return (from scheduleProposal in generationContext.AllProposals
            where scheduleProposal.DiaryId == diaryId
            group scheduleProposal by CultureInfo.InvariantCulture.Calendar.GetWeekOfYear(
                scheduleProposal.Date.ToDateTime(new TimeOnly()),
                CalendarWeekRule.FirstDay,
                DayOfWeek.Monday
            )
            into grouped
            select (grouped.Key, grouped.AsEnumerable().ToArray())).ToArray();
    }

    private static void ApplyWeeklyLimitConstraints(
        GenerationContext generationContext,
        (int WeekOfYear, GenerationContextScheduleProposal[] Proposals)[] weeklyGroups,
        int weekLimit)
    {
        if (weeklyGroups.Length == 0) return;

        foreach (var (_, weekProposals) in weeklyGroups)
        {
            var proposals = weekProposals.Select(proposal => proposal.ModelBoolVar).ToArray();

            if (proposals.Length == 0) continue;

            generationContext.CpModel.Add(
                LinearExpr.Sum(proposals) <= weekLimit
            );
        }
    }
}
