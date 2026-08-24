using Google.OrTools.Sat;
using Ladesa.TimetableGenerator.Domain.Models;
using Ladesa.TimetableGenerator.Infrastructure.Solver.Generator;

namespace Ladesa.TimetableGenerator.Infrastructure.Solver.Constraints;

internal class ConstraintTeacherNoOppositeTurns : IConstraint
{
    private static readonly long[,] AllowedShiftArrangements =
    {
        { 0, 0, 0 },
        { 1, 0, 0 },
        { 0, 1, 0 },
        { 0, 0, 1 },
        { 1, 1, 0 },
        { 0, 1, 1 },
    };

    public void Apply(GenerationContext context)
    {
        var proposalsByTeacherAndDate = GroupProposalsByTeacherAndDate(context);

        foreach (var bucket in proposalsByTeacherAndDate)
        {
            if (bucket.Proposals.Count == 0)
                continue;

            ApplyShiftConstraintForBucket(context, bucket.TeacherId, bucket.Date, bucket.Proposals);
        }
    }

    private static IEnumerable<(string TeacherId, DateOnly Date, List<GenerationContextScheduleProposal> Proposals)>
        GroupProposalsByTeacherAndDate(GenerationContext context)
    {
        return from proposal in context.AllProposals
            group proposal by new { proposal.TeacherId, proposal.Date } into grouped
            select (grouped.Key.TeacherId, grouped.Key.Date, grouped.ToList());
    }

    private static void ApplyShiftConstraintForBucket(
        GenerationContext context,
        string teacherId,
        DateOnly date,
        List<GenerationContextScheduleProposal> proposals)
    {
        var turnos = context.GenerateRequest.ShiftSettings;
        var morningVars = FilterByShift(proposals, turnos.Morning);
        var afternoonVars = FilterByShift(proposals, turnos.Afternoon);
        var nightVars = FilterByShift(proposals, turnos.Night);

        if (morningVars.Count == 0 || afternoonVars.Count == 0 || nightVars.Count == 0)
            return;

        var prefix = $"{teacherId}_{date}";

        var shiftCounts = new[]
        {
            CreateShiftCount(context, morningVars, $"{prefix}_morning"),
            CreateShiftCount(context, afternoonVars, $"{prefix}_afternoon"),
            CreateShiftCount(context, nightVars, $"{prefix}_night"),
        };

        var shiftActive = shiftCounts
            .Select(c => CreateShiftActiveVar(context, c.countVar, c.label))
            .ToArray();

        context.CpModel
            .AddAllowedAssignments(shiftActive)
            .AddTuples(AllowedShiftArrangements);
    }

    private static List<BoolVar> FilterByShift(
        List<GenerationContextScheduleProposal> proposals,
        TimeSlot shift)
    {
        return proposals
            .Where(p => p.TimeSlot.Contains(shift))
            .Select(p => (BoolVar)p.ModelBoolVar)
            .ToList();
    }

    private static (IntVar countVar, string label) CreateShiftCount(
        GenerationContext context,
        List<BoolVar> shiftVars,
        string label)
    {
        var countVar = context.CpModel.NewIntVar(0, shiftVars.Count, $"{label}_count");
        context.CpModel.Add(countVar == LinearExpr.Sum(shiftVars));
        return (countVar, label);
    }

    private static BoolVar CreateShiftActiveVar(
        GenerationContext context,
        IntVar countVar,
        string label)
    {
        var activeVar = context.CpModel.NewBoolVar($"{label}_active");
        context.CpModel.Add(countVar >= 1).OnlyEnforceIf(activeVar);
        context.CpModel.Add(countVar < 1).OnlyEnforceIf(activeVar.Not());
        return activeVar;
    }
}
