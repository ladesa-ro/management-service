namespace Ladesa.TimetableGenerator.Domain.Models;
public static class EntityExtensions
{
    public static T? FindById<T>(this IEnumerable<T> items, string id) where T : IHasId
    {
        return items.FirstOrDefault(item => item.Id == id);
    }
    public static T FindByIdStrict<T>(this IEnumerable<T> items, string id, GeneratorValidationErrorCode errorCode) where T : IHasId
    {
        return items.FindById(id)
            ?? throw new GeneratorValidationException(errorCode, $"{typeof(T).Name} not found: {id}.");
    }
}
