namespace Ladesa.TimetableGenerator.Domain.Models;
public static class GenerateRequestExtensionDates
{
    public static IEnumerable<DateOnly> GetDates(this GenerateRequest request)
    {
        for (var date = request.DateStart; date <= request.DateEnd; date = date.AddDays(1))
            if (!request.NonSchoolDates.Contains(date))
                yield return date;
    }
}