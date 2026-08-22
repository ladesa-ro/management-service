namespace Ladesa.TimetableGenerator.Application.Generator.Mappers;

public static class TimeSlotMapper
{
    public static Domain.Models.TimeSlot ToCoreDomainValueObject(Pb.TimeSlot messagesDto)
        => new(Start: messagesDto.Start, End: messagesDto.End);

    public static Pb.TimeSlot ToMessagesDto(Domain.Models.TimeSlot coreDomainValueObject)
        => new() { Start = coreDomainValueObject.Start, End = coreDomainValueObject.End };
}
