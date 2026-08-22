namespace Ladesa.TimetableGenerator.Domain.Models;
public record TimetableGridSchedule(
    string GroupId,
    string DiaryId,
    string TeacherId,
    DateOnly Date,
    TimeSlot TimeSlot,
    string? RoomId = null
);