namespace Ladesa.TimetableGenerator.Application.Generator.Mappers;

public static class GenerateRequestMapper
{
    public static Domain.Models.GenerateRequest ToCoreDomainEntity(Pb.GenerateRequest dto)
        => new(
            ProtobufDates.ParaDateOnly(dto.DateStart),
            ProtobufDates.ParaDateOnly(dto.DateEnd),
            dto.Groups.Select(GroupMapper.ToCoreDomainEntity).ToArray(),
            dto.Teachers.Select(TeacherMapper.ToCoreDomainEntity).ToArray(),
            dto.Diarys.Select(DiaryMapper.ToCoreDomainEntity).ToArray(),
            dto.TimeSlots.Select(TimeSlotMapper.ToCoreDomainValueObject).ToArray(),
            dto.PreviousTimetableGrid is not null
                ? TimetableGridMapper.ToCoreDomainEntity(dto.PreviousTimetableGrid)
                : null,
            dto.BoostSameDayOfWeekAndTimeSlot,
            dto.BoostSameDayOfWeekOnly,
            dto.BoostSameTimeSlotOnly,
            dto.BoostLesserDistanceFromDayOfWeek,
            dto.BoostLesserDistanceFromTimeSlot,
            ConstraintKindMapper.ToCoreDomainValueObjects(dto.EnabledConstraints),
            dto.FixedSchedules.Select(TimetableGridScheduleMapper.ToCoreDomainEntity).ToArray(),
            dto.NonSchoolDates.Select(ProtobufDates.ParaDateOnly).ToArray(),
            dto.ShiftSettings is not null ? ShiftSettingsMapper.ToCoreDomain(dto.ShiftSettings) : null
        );

    public static Pb.GenerateRequest ToMessagesDto(Domain.Models.GenerateRequest coreDomainEntity)
    {
        var dto = new Pb.GenerateRequest
        {
            DateStart = ProtobufDates.DoDateOnly(coreDomainEntity.DateStart),
            DateEnd = ProtobufDates.DoDateOnly(coreDomainEntity.DateEnd),
            BoostSameDayOfWeekAndTimeSlot = coreDomainEntity.BoostSameDayOfWeekAndTimeSlot,
            BoostSameDayOfWeekOnly = coreDomainEntity.BoostSameDayOfWeekOnly,
            BoostSameTimeSlotOnly = coreDomainEntity.BoostSameTimeSlotOnly,
            BoostLesserDistanceFromDayOfWeek = coreDomainEntity.BoostLesserDistanceFromDayOfWeek,
            BoostLesserDistanceFromTimeSlot = coreDomainEntity.BoostLesserDistanceFromTimeSlot
        };

        dto.Groups.AddRange(coreDomainEntity.Groups.Select(GroupMapper.ToMessagesDto));
        dto.Teachers.AddRange(coreDomainEntity.Teachers.Select(TeacherMapper.ToMessagesDto));
        dto.Diarys.AddRange(coreDomainEntity.Diaries.Select(DiaryMapper.ToMessagesDto));
        dto.TimeSlots.AddRange(coreDomainEntity.TimeSlots.Select(TimeSlotMapper.ToMessagesDto));
        dto.FixedSchedules.AddRange(
            coreDomainEntity.FixedSchedules.Select(TimetableGridScheduleMapper.ToMessagesDto));
        dto.NonSchoolDates.AddRange(coreDomainEntity.NonSchoolDates.Select(ProtobufDates.DoDateOnly));
        dto.ShiftSettings = ShiftSettingsMapper.ToMessagesDto(coreDomainEntity.ShiftSettings);

        if (coreDomainEntity.PreviousTimetableGrid is not null)
        {
            dto.PreviousTimetableGrid = TimetableGridMapper.ToMessagesDto(coreDomainEntity.PreviousTimetableGrid);
        }

        var enabledConstraints = ConstraintKindMapper.ToMessagesDto(coreDomainEntity.EnabledConstraints);

        if (enabledConstraints is not null)
        {
            dto.EnabledConstraints = enabledConstraints;
        }

        return dto;
    }
}
