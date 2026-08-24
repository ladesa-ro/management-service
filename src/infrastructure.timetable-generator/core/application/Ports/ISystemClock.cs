namespace Ladesa.TimetableGenerator.Application.Ports;

public interface ISystemClock
{
    DateTimeOffset UtcNow { get; }
    DateOnly Today => DateOnly.FromDateTime(UtcNow.DateTime);
}
