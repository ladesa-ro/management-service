using Ladesa.TimetableGenerator.Domain.Models;

namespace Ladesa.TimetableGenerator.Infrastructure.Solver.Test.TestUtilities;

public static class Builders
{
    public static Group Group(string id = "group:1") => new(id, new Availability([]));
    public static Teacher Teacher(string id = "teacher:1") => new(id, new Availability([]));
    public static Diary Diary(
        string id,
        string groupId,
        string teacherId,
        int weekLimit = 100,
        int remaining = 100,
        string disciplineId = "disc:1"
    ) => new(id, groupId, teacherId, disciplineId, weekLimit, remaining);

    public static TimeSlot Slot(string start, string end) => new(start, end);

    public static GenerateRequest Request(
        DateOnly start,
        DateOnly end,
        Group[] groups,
        Teacher[] teachers,
        Diary[] diaries,
        TimeSlot[] timeSlots,
        TimetableGrid? previous = null,
        int boostSameDayAndTime = 100,
        int boostSameDayOnly = 50,
        int boostSameTimeOnly = 50,
        int boostDayDistance = 40,
        int boostTimeDistance = 40,
        TimetableGridSchedule[]? fixedSchedules = null
    ) => new(
        DateStart: start,
        DateEnd: end,
        Groups: groups,
        Teachers: teachers,
        Diaries: diaries,
        TimeSlots: timeSlots,
        PreviousTimetableGrid: previous,
        BoostSameDayOfWeekAndTimeSlot: boostSameDayAndTime,
        BoostSameDayOfWeekOnly: boostSameDayOnly,
        BoostSameTimeSlotOnly: boostSameTimeOnly,
        BoostLesserDistanceFromDayOfWeek: boostDayDistance,
        BoostLesserDistanceFromTimeSlot: boostTimeDistance,
        EnabledConstraints: null,
        FixedSchedules: fixedSchedules
    );
}