namespace Ladesa.TimetableGenerator.Application.Generator.Mappers;

public static class SubjectMapper
{
    public static Domain.Models.Subject ToCoreDomainEntity(Pb.Subject messagesDto)
        => new(messagesDto.Id, messagesDto.Name);

    public static Pb.Subject ToMessagesDto(Domain.Models.Subject domain)
        => new() { Id = domain.Id, Name = domain.Name };
}
