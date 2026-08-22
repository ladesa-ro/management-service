using System.Text.Json;
using Ladesa.TimetableGenerator.Application.Generator.DTOs;
using Ladesa.TimetableGenerator.Application.Ports;

namespace Ladesa.TimetableGenerator.Application.Generator;

public class ErrorMapper : IErrorMapper
{
    public ServiceGenerateResponseResultErrorDto MapToErrorDto(
        string errorCode,
        string errorMessage,
        Exception ex,
        byte[] originalBytes)
    {
        return new ServiceGenerateResponseResultErrorDto(
            errorCode,
            errorMessage,
            JsonSerializer.Serialize(new { message = ex.Message, bytes = originalBytes })
        );
    }
}
