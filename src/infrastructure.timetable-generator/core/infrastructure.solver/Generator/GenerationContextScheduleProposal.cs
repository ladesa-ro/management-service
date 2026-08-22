using Google.OrTools.Sat;
using Ladesa.TimetableGenerator.Domain.Models;

namespace Ladesa.TimetableGenerator.Infrastructure.Solver.Generator;

internal class GenerationContextScheduleProposal(
    GenerationContext generationContext,
    string groupId,
    string diaryId,
    string teacherId,
    DateOnly date,
    TimeSlot timeSlot,
    BoolVar? modelBoolVar = null
)
{
    private GenerationContext GenerationContext { get; } = generationContext;

    public string GroupId { get; } = groupId;
    public string DiaryId { get; } = diaryId;
    public string TeacherId { get; } = teacherId;

    public DateOnly Date { get; } = date;

    public TimeSlot TimeSlot { get; } = timeSlot;

    private BoolVar? CreatedModelBoolVar { get; set; } = modelBoolVar;

    public BoolVar ModelBoolVar
    {
        get
        {
            if (CreatedModelBoolVar != null) return CreatedModelBoolVar!;

            var propostaLabel = string.Join(
                "::",
                new[]
                {
                    $"date_{Date}",
                    $"time_slot_{TimeSlot}",
                    $"diary_{DiaryId}",
                    $"group_{GroupId}"
                }
            );

            CreatedModelBoolVar = GenerationContext.CpModel.NewBoolVar(propostaLabel);
            return CreatedModelBoolVar!;
        }
    }
}