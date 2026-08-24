namespace Ladesa.TimetableGenerator.Domain.Models;

public class ScheduleCombinationGenerator : IScheduleCombinationGenerator
{
    internal static IEnumerable<GenerationScheduleCombination> GetAllPossibleCombinations(
        GenerateRequest request)
    {
        return from date in request.GetDates()
            from timeSlot in request.TimeSlots
            from grp in request.Groups
            from diary in request.DiaryFindByGroupId(grp.Id)
            select new GenerationScheduleCombination(
                date, timeSlot, grp.Id, diary.Id, diary.TeacherId);
    }

    public IEnumerable<GenerationScheduleCombination> GetAllCombinationsWithAvailability(
        GenerateRequest generateRequest,
        IAvailabilityEvaluator availabilityEvaluator)
    {
        foreach (var combination in GetAllPossibleCombinations(generateRequest))
        {
            var group = generateRequest.GroupFindByIdStrict(combination.GroupId);
            var teacher = generateRequest.TeacherFindByIdStrict(combination.TeacherId);

            if (group.Availability.IsAvailable(combination.Date, combination.TimeSlot, availabilityEvaluator)
                && teacher.Availability.IsAvailable(combination.Date, combination.TimeSlot, availabilityEvaluator))
                yield return combination;
        }
    }
}
