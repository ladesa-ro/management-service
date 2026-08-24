using Google.OrTools.Sat;
using Ladesa.TimetableGenerator.Domain.Models;
using LinearExpr = Google.OrTools.Sat.LinearExpr;

namespace Ladesa.TimetableGenerator.Infrastructure.Solver.Generator;

internal class GenerationContext
{
    public GenerationContext(
        GenerateRequest generateRequest,
        IAvailabilityEvaluator availabilityEvaluator,
        IScheduleCombinationGenerator scheduleCombinationGenerator)
    {
        GenerateRequest = generateRequest;
        InitializeProposals(availabilityEvaluator, scheduleCombinationGenerator);
    }

    public GenerateRequest GenerateRequest { get; }
    public CpModel CpModel { get; } = new();
    public List<GenerationContextScheduleProposal> AllProposals { get; } = [];

    public LinearExpr? Score { set; get; }

    private void InitializeProposals(
        IAvailabilityEvaluator availabilityEvaluator,
        IScheduleCombinationGenerator scheduleCombinationGenerator)
    {
        AllProposals.Clear();

        foreach (var scheduleCombination in scheduleCombinationGenerator.GetAllCombinationsWithAvailability(GenerateRequest, availabilityEvaluator))
        {
            var scheduleProposal = new GenerationContextScheduleProposal(
                this,
                scheduleCombination.GroupId,
                scheduleCombination.DiaryId,
                scheduleCombination.TeacherId,
                scheduleCombination.Date,
                scheduleCombination.TimeSlot
            );

            AllProposals.Add(scheduleProposal);
        }
    }
}
