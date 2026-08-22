namespace Ladesa.TimetableGenerator.Application.Generator.DTOs;

public record ServiceGenerateResponseResultErrorDto(
    string ErrorCode,
    string ErrorMessage,
    string? AdditionalInfo
);