namespace Ladesa.TimetableGenerator.Application.Ports;

public interface IQueueListener
{
    Task SubscribeAsync(string queue, Func<byte[], Task> handler, CancellationToken cancellationToken);
}