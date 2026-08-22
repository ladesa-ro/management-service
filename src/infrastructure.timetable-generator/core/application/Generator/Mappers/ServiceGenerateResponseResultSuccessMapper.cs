using Ladesa.TimetableGenerator.Application.Generator.DTOs;

namespace Ladesa.TimetableGenerator.Application.Generator.Mappers;

public static class ServiceGenerateResponseResultSuccessMapper
{
    public static ServiceGenerateResponseResultSuccessDto ToServiceDto(
        Pb.ServiceGenerateResponseResultSuccess messagesDto)
        => new(
            Guid.Parse(messagesDto.RequestId),
            GenerateRequestMapper.ToCoreDomainEntity(messagesDto.GenerateRequest),
            messagesDto.GeneratedTimetables.Select(GeneratedTimetableMapper.ToCoreDomainEntity).ToArray()
        );

    public static Pb.ServiceGenerateResponseResultSuccess ToMessagesDto(
        ServiceGenerateResponseResultSuccessDto serviceDto)
    {
        var messagesDto = new Pb.ServiceGenerateResponseResultSuccess
        {
            RequestId = serviceDto.RequestId.ToString(),
            GenerateRequest = GenerateRequestMapper.ToMessagesDto(serviceDto.GenerateRequest)
        };

        messagesDto.GeneratedTimetables.AddRange(
            serviceDto.GeneratedTimetables.Select(GeneratedTimetableMapper.ToMessagesDto));

        return messagesDto;
    }
}
