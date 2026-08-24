using Ladesa.TimetableGenerator.Domain.Models;

namespace Ladesa.TimetableGenerator.Application.Generator.Mappers;

public static class TeacherMapper
{
    public static Teacher ToCoreDomainEntity(Pb.Teacher dto)
        => EntityWithAvailabilityMapper.TeacherToCoreDomainEntity(dto);

    public static Pb.Teacher ToMessagesDto(Teacher domain)
        => EntityWithAvailabilityMapper.TeacherToMessagesDto(domain);
}
