using Ladesa.TimetableGenerator.Domain.Models;

namespace Ladesa.TimetableGenerator.Application.Generator.DTOs;

public record ServiceGenerateRequestDto(
    Guid RequestId,
    GenerateRequest GenerateRequest
);