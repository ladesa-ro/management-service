using Ladesa.TimetableGenerator.Application.Generator.DTOs;

namespace Ladesa.TimetableGenerator.Application.Generator.Mappers;

public static class ServiceGenerateRequestMapper
{
    public static ServiceGenerateRequestDto ToServiceDto(Pb.ServiceGenerateRequest messagesDto)
        => new(
            RequestId: Guid.Parse(messagesDto.RequestId),
            GenerateRequest: GenerateRequestMapper.ToCoreDomainEntity(messagesDto.GenerateRequest)
        );

    public static Pb.ServiceGenerateRequest ToMessagesDto(ServiceGenerateRequestDto serviceDto)
        => new()
        {
            RequestId = serviceDto.RequestId.ToString(),
            GenerateRequest = GenerateRequestMapper.ToMessagesDto(serviceDto.GenerateRequest)
        };
}
