using Ladesa.TimetableGenerator.Domain.Models;

namespace Ladesa.TimetableGenerator.Application.Generator.Mappers;

public static class ShiftSettingsMapper
{
    public static ShiftSettings ToCoreDomain(Pb.ShiftSettings messagesDto)
        => new(
            TimeSlotMapper.ToCoreDomainValueObject(messagesDto.Morning),
            TimeSlotMapper.ToCoreDomainValueObject(messagesDto.Afternoon),
            TimeSlotMapper.ToCoreDomainValueObject(messagesDto.Night),
            TimeSlotMapper.ToCoreDomainValueObject(messagesDto.LunchBufferBefore),
            TimeSlotMapper.ToCoreDomainValueObject(messagesDto.LunchBufferAfter)
        );

    public static Pb.ShiftSettings ToMessagesDto(ShiftSettings domain)
        => new()
        {
            Morning = TimeSlotMapper.ToMessagesDto(domain.Morning),
            Afternoon = TimeSlotMapper.ToMessagesDto(domain.Afternoon),
            Night = TimeSlotMapper.ToMessagesDto(domain.Night),
            LunchBufferBefore = TimeSlotMapper.ToMessagesDto(domain.LunchBufferBefore),
            LunchBufferAfter = TimeSlotMapper.ToMessagesDto(domain.LunchBufferAfter)
        };
}
