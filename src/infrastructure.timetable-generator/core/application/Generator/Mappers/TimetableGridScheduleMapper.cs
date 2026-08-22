namespace Ladesa.TimetableGenerator.Application.Generator.Mappers;

public static class TimetableGridScheduleMapper
{
    public static Domain.Models.TimetableGridSchedule ToCoreDomainEntity(Pb.TimetableGridSchedule dto)
        => new(
            dto.GroupId,
            dto.DiaryId,
            dto.TeacherId,
            ProtobufDates.ParaDateOnly(dto.Date),
            TimeSlotMapper.ToCoreDomainValueObject(dto.TimeSlot),
            dto.HasRoomId ? dto.RoomId : null
        );

    public static Pb.TimetableGridSchedule ToMessagesDto(Domain.Models.TimetableGridSchedule domain)
    {
        var messagesDto = new Pb.TimetableGridSchedule
        {
            GroupId = domain.GroupId,
            DiaryId = domain.DiaryId,
            TeacherId = domain.TeacherId,
            Date = ProtobufDates.DoDateOnly(domain.Date),
            TimeSlot = TimeSlotMapper.ToMessagesDto(domain.TimeSlot)
        };

        if (domain.RoomId is not null)
        {
            messagesDto.RoomId = domain.RoomId;
        }

        return messagesDto;
    }
}
