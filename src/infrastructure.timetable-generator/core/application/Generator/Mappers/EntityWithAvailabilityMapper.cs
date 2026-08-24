using Ladesa.TimetableGenerator.Domain.Models;

namespace Ladesa.TimetableGenerator.Application.Generator.Mappers;

public static class EntityWithAvailabilityMapper
{
    public static Group GroupToCoreDomainEntity(Pb.Group dto)
        => new(Id: dto.Id, Availability: AvailabilityMapper.ToCoreDomainEntity(dto.Availability));

    public static Pb.Group GroupToMessagesDto(Group domain)
        => new() { Id = domain.Id, Availability = AvailabilityMapper.ToMessagesDto(domain.Availability) };

    public static Teacher TeacherToCoreDomainEntity(Pb.Teacher dto)
        => new(Id: dto.Id, Availability: AvailabilityMapper.ToCoreDomainEntity(dto.Availability));

    public static Pb.Teacher TeacherToMessagesDto(Teacher domain)
        => new() { Id = domain.Id, Availability = AvailabilityMapper.ToMessagesDto(domain.Availability) };
}
