namespace Ladesa.TimetableGenerator.Domain.Models;
/// <summary>
///     Represents a time slot defined by start and end times (as HH:mm:ss strings).
/// </summary>
public record TimeSlot(string Start, string End)
{
    /// <summary>Checks whether the given time falls within this slot.</summary>
    public bool Contains(TimeSpan time)
    {
        var startTime = TimeSpan.Parse(Start);
        var endTime = TimeSpan.Parse(End);
        return startTime <= time && time <= endTime;
    }
    /// <summary>Checks whether the given time string falls within this slot.</summary>
    public bool Contains(string time)
    {
        var parsed = TimeSpan.Parse(time);
        return Contains(parsed);
    }
    /// <summary>Checks whether the other slot is fully contained within this slot.</summary>
    public bool Contains(TimeSlot other)
    {
        return Contains(other.Start)
               && Contains(other.End);
    }
    public override string ToString()
    {
        return $"[{Start} - {End}]";
    }
    /// <summary>Returns the start time as a DateTime on the given date.</summary>
    public DateTime GetDateTimeStart(DateOnly date)
    {
        return date.ToDateTime(TimeOnly.Parse(Start));
    }
    /// <summary>Returns the end time as a DateTime on the given date.</summary>
    public DateTime GetDateTimeEnd(DateOnly date)
    {
        return date.ToDateTime(TimeOnly.Parse(End));
    }
    /// <summary>Returns the start and end as a DateTime tuple on the given date.</summary>
    public (DateTime, DateTime) GetDateTimeRange(DateOnly date)
    {
        return (GetDateTimeStart(date), GetDateTimeEnd(date));
    }
    /// <summary>Computes the signed time difference between this slot and another, comparing starts first.</summary>
    public TimeSpan Distance(TimeSlot other)
    {
        var thisStart = TimeSpan.Parse(this.Start);
        var otherStart = TimeSpan.Parse(other.Start);
        if (thisStart != otherStart)
            return thisStart - otherStart;
        var thisEnd = TimeSpan.Parse(this.End);
        var otherEnd = TimeSpan.Parse(other.End);
        return thisEnd - otherEnd;
    }
}
