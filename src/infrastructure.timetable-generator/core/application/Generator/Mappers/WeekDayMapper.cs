namespace Ladesa.TimetableGenerator.Application.Generator.Mappers;

public static class WeekDayMapper
{
    public static DayOfWeek ToCoreDomainValueObject(Pb.WeekDay messagesDto) => (DayOfWeek)messagesDto;

    public static Pb.WeekDay ToMessagesDto(DayOfWeek domainVo) => (Pb.WeekDay)domainVo;
}
