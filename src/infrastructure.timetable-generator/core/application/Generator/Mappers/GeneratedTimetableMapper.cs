namespace Ladesa.TimetableGenerator.Application.Generator.Mappers;

public static class GeneratedTimetableMapper
{
    public static Domain.Models.GeneratedTimetable ToCoreDomainEntity(Pb.GeneratedTimetable messagesDto)
        => new(TimetableGridMapper.ToCoreDomainEntity(messagesDto.Timetable), messagesDto.Score);

    public static Pb.GeneratedTimetable ToMessagesDto(Domain.Models.GeneratedTimetable coreDomainEntity)
        => new()
        {
            Timetable = TimetableGridMapper.ToMessagesDto(coreDomainEntity.Timetable),
            Score = coreDomainEntity.Score
        };
}
