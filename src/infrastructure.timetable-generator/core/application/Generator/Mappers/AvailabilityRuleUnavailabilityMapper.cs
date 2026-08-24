namespace Ladesa.TimetableGenerator.Application.Generator.Mappers;

public static class AvailabilityRuleUnavailabilityMapper
{
    public static Domain.Models.AvailabilityRuleUnavailability ToCoreDomainEntity(
        Pb.AvailabilityRuleUnavailability messagesDto)
        => new(
            messagesDto.RRule,
            ProtobufDates.ParaDateTime(messagesDto.DateStart),
            messagesDto.HasDateEnd ? ProtobufDates.ParaDateTime(messagesDto.DateEnd) : null
        );

    public static Pb.AvailabilityRuleUnavailability ToMessagesDto(
        Domain.Models.AvailabilityRuleUnavailability coreDomainEntity)
    {
        var messagesDto = new Pb.AvailabilityRuleUnavailability
        {
            RRule = coreDomainEntity.RRule,
            DateStart = ProtobufDates.DoDateTime(coreDomainEntity.DateStart)
        };

        if (coreDomainEntity.DateEnd is not null)
        {
            messagesDto.DateEnd = ProtobufDates.DoDateTime(coreDomainEntity.DateEnd.Value);
        }

        return messagesDto;
    }
}
