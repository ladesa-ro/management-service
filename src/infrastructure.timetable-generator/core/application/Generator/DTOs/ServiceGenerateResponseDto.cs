namespace Ladesa.TimetableGenerator.Application.Generator.DTOs;

public record ServiceGenerateResponseDto(
    Guid RequestId,
    bool IsSuccessful,
    ServiceGenerateResponseResultSuccessDto? Success,
    ServiceGenerateResponseResultErrorDto? Error,
    DateOnly DateTimeIssued
);