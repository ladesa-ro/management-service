using System.Globalization;

namespace Ladesa.TimetableGenerator.Application.Generator.Mappers;

public static class ProtobufDates
{
    private const string FormatoData = "yyyy-MM-dd";

    public static string DoDateOnly(DateOnly valor)
        => valor.ToString(FormatoData, CultureInfo.InvariantCulture);

    public static DateOnly ParaDateOnly(string valor)
        => DateOnly.TryParseExact(valor, FormatoData, CultureInfo.InvariantCulture, DateTimeStyles.None, out var data)
            ? data
            : DateOnly.FromDateTime(DateTime.Parse(valor, CultureInfo.InvariantCulture, DateTimeStyles.RoundtripKind));

    public static string DoDateTime(DateTime valor)
        => valor.ToString("O", CultureInfo.InvariantCulture);

    public static DateTime ParaDateTime(string valor)
        => DateTime.Parse(valor, CultureInfo.InvariantCulture, DateTimeStyles.RoundtripKind);
}
