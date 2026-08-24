using Ladesa.TimetableGenerator.Application.Generator.DTOs;

namespace Ladesa.TimetableGenerator.Application.Ports;

public interface IErrorMapper
{
    ServiceGenerateResponseResultErrorDto MapToErrorDto(string errorCode, string errorMessage, Exception ex, byte[] originalBytes);
}
