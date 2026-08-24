namespace Ladesa.TimetableGenerator.Domain.Models;

public record AvailabilityRuleUnavailability(
    string RRule,
    DateTime DateStart,
    DateTime? DateEnd
);
