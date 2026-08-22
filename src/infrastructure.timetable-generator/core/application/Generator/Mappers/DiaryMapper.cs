namespace Ladesa.TimetableGenerator.Application.Generator.Mappers;

public static class DiaryMapper
{
    public static Domain.Models.Diary ToCoreDomainEntity(Pb.Diary messagesDto)
        => new(
            messagesDto.Id,
            messagesDto.GroupId,
            messagesDto.TeacherId,
            messagesDto.SubjectId,
            messagesDto.WeekLimit,
            messagesDto.Remaining,
            messagesDto.HasRoomId ? messagesDto.RoomId : null
        );

    public static Pb.Diary ToMessagesDto(Domain.Models.Diary coreDomainEntity)
    {
        var messagesDto = new Pb.Diary
        {
            Id = coreDomainEntity.Id,
            GroupId = coreDomainEntity.GroupId,
            TeacherId = coreDomainEntity.TeacherId,
            SubjectId = coreDomainEntity.SubjectId,
            WeekLimit = coreDomainEntity.WeekLimit,
            Remaining = coreDomainEntity.Remaining
        };

        if (coreDomainEntity.RoomId is not null)
        {
            messagesDto.RoomId = coreDomainEntity.RoomId;
        }

        return messagesDto;
    }
}
