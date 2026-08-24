using Ladesa.TimetableGenerator.Domain.Models;

namespace Ladesa.TimetableGenerator.Application.Generator.Mappers;

public static class ConstraintKindMapper
{
    public static ConstraintKind ToCoreDomainValueObject(Pb.ConstraintKind messagesDto)
        => (ConstraintKind)messagesDto;

    public static Pb.ConstraintKind ToMessagesDto(ConstraintKind domainVo)
        => (Pb.ConstraintKind)domainVo;

    public static ConstraintKind[]? ToCoreDomainValueObjects(Pb.ConstraintKindList? messagesDto)
        => messagesDto is null ? null : messagesDto.Kinds.Select(ToCoreDomainValueObject).ToArray();

    public static Pb.ConstraintKindList? ToMessagesDto(ConstraintKind[]? domainVos)
    {
        if (domainVos is null)
        {
            return null;
        }

        var messagesDto = new Pb.ConstraintKindList();
        messagesDto.Kinds.AddRange(domainVos.Select(ToMessagesDto));
        return messagesDto;
    }
}
