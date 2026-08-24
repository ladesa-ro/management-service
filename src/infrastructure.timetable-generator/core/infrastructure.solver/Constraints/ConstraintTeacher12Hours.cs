using Ladesa.TimetableGenerator.Domain.Models;
using Ladesa.TimetableGenerator.Infrastructure.Solver.Generator;

namespace Ladesa.TimetableGenerator.Infrastructure.Solver.Constraints;

internal class ConstraintTeacher12Hours : IConstraint
{
    private static readonly TimeSpan MaxDailyWorkDuration = new(12, 0, 0);

    public void Apply(GenerationContext context)
    {
        foreach (var date in context.GenerateRequest.GetDates())
        {
            var nextDay = date.AddDays(1);

            foreach (var teacher in context.GenerateRequest.Teachers)
            {
                var nightProposals =
                    from scheduleProposal in context.AllProposals
                    where
                        scheduleProposal.TeacherId == teacher.Id
                        && scheduleProposal.Date == date
                        && scheduleProposal.TimeSlot.Contains(context.GenerateRequest.ShiftSettings.Night)
                    select scheduleProposal;

                foreach (var nightProposal in nightProposals)
                {
                    var timeSpanAfter12 = TimeSpan.Parse(nightProposal.TimeSlot.End).Add(MaxDailyWorkDuration);

                    var conflictingProposalsNextDay =
                        from scheduleProposal in context.AllProposals
                        where
                            scheduleProposal.Date == nextDay
                            && scheduleProposal.TeacherId == nightProposal.TeacherId
                            && scheduleProposal.TimeSlot.Contains(timeSpanAfter12)
                        select scheduleProposal.ModelBoolVar;

                    var proposalsBoolVars = conflictingProposalsNextDay.ToArray();

                    if (proposalsBoolVars.Length == 0) continue;

                    var negatedVariables = proposalsBoolVars
                        .Select(v => v.Not())
                        .ToArray();

                    context
                        .CpModel.AddBoolAnd(negatedVariables)
                        .OnlyEnforceIf(nightProposal.ModelBoolVar);
                }
            }
        }
    }
}
