using Google.Protobuf;
using Ladesa.TimetableGenerator.Application.Generator;
using Ladesa.TimetableGenerator.Application.Generator.DTOs;
using Ladesa.TimetableGenerator.Application.Generator.Mappers;
using Ladesa.TimetableGenerator.Domain.Models;
using Ladesa.TimetableGenerator.Infrastructure.Solver;

namespace Ladesa.TimetableGenerator.Console;

public static class Program
{
    private static readonly JsonParser Parser =
        new(JsonParser.Settings.Default.WithIgnoreUnknownFields(true));

    private static readonly JsonFormatter Formatter =
        new(JsonFormatter.Settings.Default.WithFormatDefaultValues(true));

    public static async Task<int> Main()
    {
        var entrada = await System.Console.In.ReadToEndAsync();

        if (string.IsNullOrWhiteSpace(entrada))
        {
            Erro(null, GeneratorErrorCodes.ParseError, GeneratorErrorMessages.ParseError, "stdin vazio");
            return 1;
        }

        Pb.ServiceGenerateRequest requisicao;

        try
        {
            requisicao = Parser.Parse<Pb.ServiceGenerateRequest>(entrada);
        }
        catch (Exception excecao)
        {
            Erro(null, GeneratorErrorCodes.ParseError, GeneratorErrorMessages.ParseError, excecao.Message);
            return 1;
        }

        ServiceGenerateRequestDto pedido;

        try
        {
            pedido = ServiceGenerateRequestMapper.ToServiceDto(requisicao);
        }
        catch (Exception excecao)
        {
            Erro(requisicao.RequestId, GeneratorErrorCodes.MappingError,
                GeneratorErrorMessages.MappingError, excecao.Message);
            return 1;
        }

        try
        {
            var gerador = new TimetableGeneratorService(
                new Infrastructure.Solver.Generator.Generator(
                    new ScheduleCombinationGenerator(),
                    Infrastructure.Solver.Generator.SolverOptions.FromEnvironment()),
                new IcalAvailabilityEvaluator());

            var grades = gerador.Generate(pedido.GenerateRequest).Take(1).ToArray();

            Sucesso(pedido, grades);
            return 0;
        }
        catch (GeneratorValidationException excecao)
        {
            Erro(requisicao.RequestId, excecao.Code.ToString(),
                GeneratorErrorMessages.GenerationError, excecao.Details);
            return 1;
        }
        catch (Exception excecao)
        {
            Erro(requisicao.RequestId, GeneratorErrorCodes.GenerationError,
                GeneratorErrorMessages.GenerationError, excecao.Message);
            return 1;
        }
    }

    private static void Sucesso(ServiceGenerateRequestDto pedido, GeneratedTimetable[] grades)
    {
        var resposta = new ServiceGenerateResponseDto(
            RequestId: pedido.RequestId,
            IsSuccessful: true,
            Success: new ServiceGenerateResponseResultSuccessDto(
                pedido.RequestId, pedido.GenerateRequest, grades),
            Error: null,
            DateTimeIssued: DateOnly.FromDateTime(DateTime.UtcNow));

        Escrever(ServiceGenerateResponseMapper.ToMessagesDto(resposta));
    }

    private static void Erro(string? requestId, string codigo, string mensagem, string? detalhe)
    {
        System.Console.Error.WriteLine($"{codigo}: {mensagem}. {detalhe}");

        var identificador = Guid.TryParse(requestId, out var lido) ? lido : Guid.Empty;

        var resposta = new ServiceGenerateResponseDto(
            RequestId: identificador,
            IsSuccessful: false,
            Success: null,
            Error: new ServiceGenerateResponseResultErrorDto(codigo, mensagem, detalhe),
            DateTimeIssued: DateOnly.FromDateTime(DateTime.UtcNow));

        Escrever(ServiceGenerateResponseMapper.ToMessagesDto(resposta));
    }

    private static void Escrever(IMessage resposta)
    {
        System.Console.Out.Write(Formatter.Format(resposta));
        System.Console.Out.Flush();
    }
}
