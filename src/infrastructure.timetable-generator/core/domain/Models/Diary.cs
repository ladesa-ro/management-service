namespace Ladesa.TimetableGenerator.Domain.Models;
public record Diary(
    string Id,
    string GroupId,
    string TeacherId,
    string SubjectId,
    int WeekLimit,
    int Remaining,
    string? RoomId = null
) : IHasId;