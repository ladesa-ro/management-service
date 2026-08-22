namespace Ladesa.TimetableGenerator.Domain.Models;

public enum ConstraintKind
{
    GroupOneScheduleAtSameTime,
    TeacherOneScheduleAtSameTime,
    DiaryLimitSchedulesInOneWeek,
    DiaryLimitRemaining,
    TeacherLunch,
    GroupLunch,
    TeacherNoOppositeTurns,
    Teacher12Hours,
    GroupNoOverlappingTimeSlots,
    TeacherNoOverlappingTimeSlots,
    RoomOneScheduleAtSameTime,
}
