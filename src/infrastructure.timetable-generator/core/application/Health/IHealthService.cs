namespace Ladesa.TimetableGenerator.Application.Health;

public interface IHealthService
{
    /// <summary>Returns the current health status of the service.</summary>
    object GetStatus();
}