using Ladesa.TimetableGenerator.Application.Generator.DTOs;

namespace Ladesa.TimetableGenerator.Application.Ports;

/// <summary>Maps exceptions to error response DTOs for queue publishing.</summary>
public interface IErrorMapper
{
    ServiceGenerateResponseResultErrorDto MapToErrorDto(string errorCode, string errorMessage, Exception ex, byte[] originalBytes);
}
