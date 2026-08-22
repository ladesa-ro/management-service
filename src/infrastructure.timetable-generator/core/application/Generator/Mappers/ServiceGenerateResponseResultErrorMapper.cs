using Ladesa.TimetableGenerator.Application.Generator.DTOs;

namespace Ladesa.TimetableGenerator.Application.Generator.Mappers;

public static class ServiceGenerateResponseResultErrorMapper
{
    public static ServiceGenerateResponseResultErrorDto ToServiceDto(
        Pb.ServiceGenerateResponseResultError messagesDto)
        => new(
            messagesDto.ErrorCode,
            messagesDto.ErrorMessage,
            messagesDto.HasAdditionalInfo ? messagesDto.AdditionalInfo : null
        );

    public static Pb.ServiceGenerateResponseResultError ToMessagesDto(
        ServiceGenerateResponseResultErrorDto serviceDto)
    {
        var messagesDto = new Pb.ServiceGenerateResponseResultError
        {
            ErrorCode = serviceDto.ErrorCode,
            ErrorMessage = serviceDto.ErrorMessage
        };

        if (serviceDto.AdditionalInfo is not null)
        {
            messagesDto.AdditionalInfo = serviceDto.AdditionalInfo;
        }

        return messagesDto;
    }
}
