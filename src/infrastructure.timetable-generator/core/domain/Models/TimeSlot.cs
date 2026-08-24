namespace Ladesa.TimetableGenerator.Domain.Models;
public record TimeSlot(string Start, string End)
{
    public bool Contains(TimeSpan time)
    {
        var startTime = TimeSpan.Parse(Start);
        var endTime = TimeSpan.Parse(End);
        return startTime <= time && time <= endTime;
    }
    public bool Contains(string time)
    {
        var parsed = TimeSpan.Parse(time);
        return Contains(parsed);
    }
    public bool Contains(TimeSlot other)
    {
        return Contains(other.Start)
               && Contains(other.End);
    }
    public override string ToString()
    {
        return $"[{Start} - {End}]";
    }
    public DateTime GetDateTimeStart(DateOnly date)
    {
        return date.ToDateTime(TimeOnly.Parse(Start));
    }
    public DateTime GetDateTimeEnd(DateOnly date)
    {
        return date.ToDateTime(TimeOnly.Parse(End));
    }
    public (DateTime, DateTime) GetDateTimeRange(DateOnly date)
    {
        return (GetDateTimeStart(date), GetDateTimeEnd(date));
    }
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
