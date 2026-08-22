namespace Ladesa.TimetableGenerator.Domain.Models;
public record TimetableGrid(
    DateOnly DateStart,
    DateOnly DateEnd,
    TimeSlot[] TimeSlots,
    TimetableGridSchedule[] Schedules
);