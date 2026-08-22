namespace Ladesa.TimetableGenerator.Application.Generator.Mappers;

public static class AvailabilityMapper
{
    public static Domain.Models.Availability ToCoreDomainEntity(Pb.Availability messagesDto)
        => new(messagesDto.RulesUnavailability
            .Select(AvailabilityRuleUnavailabilityMapper.ToCoreDomainEntity).ToArray());

    public static Pb.Availability ToMessagesDto(Domain.Models.Availability coreDomainEntity)
    {
        var messagesDto = new Pb.Availability();

        if (coreDomainEntity.RulesUnavailability is not null)
        {
            messagesDto.RulesUnavailability.AddRange(
                coreDomainEntity.RulesUnavailability.Select(AvailabilityRuleUnavailabilityMapper.ToMessagesDto));
        }

        return messagesDto;
    }
}
