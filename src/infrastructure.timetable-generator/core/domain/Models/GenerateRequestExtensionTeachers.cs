namespace Ladesa.TimetableGenerator.Domain.Models;
public static class GenerateRequestExtensionTeachers
{
    public static Teacher? TeacherFindById(this GenerateRequest request, string teacherId)
        => request.Teachers.FindById(teacherId);
    public static Teacher TeacherFindByIdStrict(this GenerateRequest request, string teacherId)
        => request.Teachers.FindByIdStrict(teacherId, GeneratorValidationErrorCode.TeacherNotFound);
}
