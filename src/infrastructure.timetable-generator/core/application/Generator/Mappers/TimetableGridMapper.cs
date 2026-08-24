namespace Ladesa.TimetableGenerator.Application.Generator.Mappers;

public static class TimetableGridMapper
{
    public static Domain.Models.TimetableGrid ToCoreDomainEntity(Pb.TimetableGrid messagesDto)
        => new(
            ProtobufDates.ParaDateOnly(messagesDto.DateStart),
            ProtobufDates.ParaDateOnly(messagesDto.DateEnd),
            messagesDto.TimeSlots.Select(TimeSlotMapper.ToCoreDomainValueObject).ToArray(),
            messagesDto.Schedules.Select(TimetableGridScheduleMapper.ToCoreDomainEntity).ToArray()
        );

    public static Pb.TimetableGrid ToMessagesDto(Domain.Models.TimetableGrid domain)
    {
        var dto = new Pb.TimetableGrid
        {
            DateStart = ProtobufDates.DoDateOnly(domain.DateStart),
            DateEnd = ProtobufDates.DoDateOnly(domain.DateEnd)
        };

        dto.TimeSlots.AddRange(domain.TimeSlots.Select(TimeSlotMapper.ToMessagesDto));
        dto.Schedules.AddRange(domain.Schedules.Select(TimetableGridScheduleMapper.ToMessagesDto));

        return dto;
    }
}
