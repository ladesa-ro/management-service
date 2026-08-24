using Ladesa.TimetableGenerator.Domain.Models;

namespace Ladesa.TimetableGenerator.Application.Generator.Mappers;

public static class GroupMapper
{
    public static Group ToCoreDomainEntity(Pb.Group dto)
        => EntityWithAvailabilityMapper.GroupToCoreDomainEntity(dto);

    public static Pb.Group ToMessagesDto(Group domain)
        => EntityWithAvailabilityMapper.GroupToMessagesDto(domain);
}
