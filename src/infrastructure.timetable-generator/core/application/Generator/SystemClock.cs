using Ladesa.TimetableGenerator.Application.Ports;

namespace Ladesa.TimetableGenerator.Application.Generator;

public class SystemClock : ISystemClock
{
    public DateTimeOffset UtcNow => DateTimeOffset.UtcNow;
}
