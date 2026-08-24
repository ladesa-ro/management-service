namespace Ladesa.TimetableGenerator.Domain.Models;

public sealed record ShiftSettings(
    TimeSlot Morning,
    TimeSlot Afternoon,
    TimeSlot Night,
    TimeSlot LunchBufferBefore,
    TimeSlot LunchBufferAfter)
{
    public static ShiftSettings Default { get; } = new(
        new TimeSlot("00:00:00", "11:59:59"),
        new TimeSlot("12:00:00", "17:59:59"),
        new TimeSlot("18:00:00", "23:59:59"),
        new TimeSlot("11:30:00", "12:00:00"),
        new TimeSlot("13:00:00", "13:30:00"));
}

public static class TimeSlotConstants
{
    public static readonly TimeSlot MorningShift = ShiftSettings.Default.Morning;
    public static readonly TimeSlot AfternoonShift = ShiftSettings.Default.Afternoon;
    public static readonly TimeSlot NightShift = ShiftSettings.Default.Night;
    public static readonly TimeSlot LunchBufferBefore = ShiftSettings.Default.LunchBufferBefore;
    public static readonly TimeSlot LunchBufferAfter = ShiftSettings.Default.LunchBufferAfter;
}
