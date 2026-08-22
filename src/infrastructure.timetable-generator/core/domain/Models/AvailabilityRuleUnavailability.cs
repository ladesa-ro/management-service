namespace Ladesa.TimetableGenerator.Domain.Models;

/// <summary>
///     Represents an unavailability rule defined by a recurrence pattern (RRULE),
///     start date, and optional end date. Pure data record — evaluation logic
///     is handled by <see cref="IAvailabilityEvaluator"/>.
/// </summary>
public record AvailabilityRuleUnavailability(
    string RRule,
    DateTime DateStart,
    DateTime? DateEnd
);
