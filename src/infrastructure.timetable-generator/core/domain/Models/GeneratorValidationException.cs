namespace Ladesa.TimetableGenerator.Domain.Models;
public enum GeneratorValidationErrorCode
{
    DiaryReferencesNotFound,
    GroupNotFound,
    TeacherNotFound,
    DuplicateGroupId,
    DuplicateTeacherId,
    DuplicateDiaryId,
    InvalidRRule,
    FixedScheduleNotSchedulable
}
public class GeneratorValidationException : Exception
{
    public GeneratorValidationException(GeneratorValidationErrorCode code, string message, string? details = null)
        : base(message)
    {
        Code = code;
        Details = details;
    }
    public GeneratorValidationErrorCode Code { get; }
    public string? Details { get; }
}