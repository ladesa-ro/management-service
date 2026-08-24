namespace Ladesa.TimetableGenerator.Application.Ports;

public interface IMapper<in TSource, out TDest>
{
    TDest Map(TSource source);
}
