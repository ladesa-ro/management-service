namespace Ladesa.TimetableGenerator.Application.Ports;

public interface IQueuePublisher
{
    Task PublishAsync(string queue, byte[] bytes, CancellationToken cancellationToken);
}