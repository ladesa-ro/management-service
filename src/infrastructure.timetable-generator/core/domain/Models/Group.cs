namespace Ladesa.TimetableGenerator.Domain.Models;
public record Group(string Id, Availability Availability) : IHasId;