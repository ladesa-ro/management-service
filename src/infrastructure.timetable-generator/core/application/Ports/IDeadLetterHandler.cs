namespace Ladesa.TimetableGenerator.Application.Ports;

public interface IDeadLetterHandler
{
    Task HandleAsync(string queue, byte[] message, Exception ex);
}