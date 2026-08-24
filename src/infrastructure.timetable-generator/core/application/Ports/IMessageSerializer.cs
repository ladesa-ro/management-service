namespace Ladesa.TimetableGenerator.Application.Ports;

public interface IMessageSerializer<in T>
{
    byte[] Serialize(T message);
}

public interface IMessageDeserializer<out T>
{
    T Deserialize(byte[] bytes);
}
