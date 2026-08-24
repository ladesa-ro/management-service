namespace Ladesa.TimetableGenerator.Application.Generator;

public static class GeneratorErrorCodes
{
    public const string ParseError = "GEN-0001-PARSE";

    public const string MappingError = "GEN-0002-MAP";

    public const string GenerationError = "GEN-0003-GEN";
}

public static class GeneratorErrorMessages
{
    public const string ParseError = "Erro ao tentar parsear o request";

    public const string MappingError = "Erro ao tentar converter request para dto";

    public const string GenerationError = "Erro ao gerar horario";
}
