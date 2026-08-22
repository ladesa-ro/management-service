namespace Ladesa.TimetableGenerator.Application.Ports;

/// <summary>Maps from <typeparamref name="TSource"/> to <typeparamref name="TDest"/>.</summary>
public interface IMapper<in TSource, out TDest>
{
    TDest Map(TSource source);
}
