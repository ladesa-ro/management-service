using Ladesa.TimetableGenerator.Domain.Models;

namespace Ladesa.TimetableGenerator.Application.Generator.DTOs;

public record ServiceGenerateResponseResultSuccessDto(
    Guid RequestId,
    GenerateRequest GenerateRequest,
    GeneratedTimetable[] GeneratedTimetables
);