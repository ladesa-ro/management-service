namespace Ladesa.TimetableGenerator.Domain.Models;
public static class GenerateRequestExtensionDiaries
{
    public static Diary? DiaryFindById(this GenerateRequest request, string diaryId)
        => request.Diaries.FindById(diaryId);
    public static Diary DiaryFindByIdStrict(this GenerateRequest request, string diaryId)
        => request.Diaries.FindByIdStrict(diaryId, GeneratorValidationErrorCode.DiaryReferencesNotFound);
    public static IEnumerable<Diary> DiaryFindByGroupId(this GenerateRequest request, string groupId)
        => request.Diaries.Where(diary => diary.GroupId == groupId);
}
