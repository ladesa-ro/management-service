namespace Ladesa.TimetableGenerator.Domain.Models;
public record Teacher(string Id, Availability Availability) : IHasId;