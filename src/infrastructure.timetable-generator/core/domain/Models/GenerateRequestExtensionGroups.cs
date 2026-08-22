namespace Ladesa.TimetableGenerator.Domain.Models;
public static class GenerateRequestExtensionGroups
{
    public static Group? GroupFindById(this GenerateRequest request, string groupId)
        => request.Groups.FindById(groupId);
    public static Group GroupFindByIdStrict(this GenerateRequest request, string groupId)
        => request.Groups.FindByIdStrict(groupId, GeneratorValidationErrorCode.GroupNotFound);
}
