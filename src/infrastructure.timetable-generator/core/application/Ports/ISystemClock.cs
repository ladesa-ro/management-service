namespace Ladesa.TimetableGenerator.Application.Ports;

/// <summary>Abstraction for the system clock, enabling deterministic testing.</summary>
public interface ISystemClock
{
    DateTimeOffset UtcNow { get; }
    DateOnly Today => DateOnly.FromDateTime(UtcNow.DateTime);
}
