using Ladesa.TimetableGenerator.Application.Generator.DTOs;

namespace Ladesa.TimetableGenerator.Application.Generator.Mappers;

public static class ServiceGenerateResponseMapper
{
    public static ServiceGenerateResponseDto ToServiceDto(Pb.ServiceGenerateResponse messagesDto)
        => new(
            RequestId: Guid.Parse(messagesDto.RequestId),
            IsSuccessful: messagesDto.IsSuccessful,

            Success: messagesDto.ResultCase == Pb.ServiceGenerateResponse.ResultOneofCase.ResultSuccess
                ? ServiceGenerateResponseResultSuccessMapper.ToServiceDto(messagesDto.ResultSuccess)
                : null,

            Error: messagesDto.ResultCase == Pb.ServiceGenerateResponse.ResultOneofCase.ResultError
                ? ServiceGenerateResponseResultErrorMapper.ToServiceDto(messagesDto.ResultError)
                : null,

            DateTimeIssued: ProtobufDates.ParaDateOnly(messagesDto.DateTimeIssued)
        );

    public static Pb.ServiceGenerateResponse ToMessagesDto(ServiceGenerateResponseDto applicationDto)
    {
        var messagesDto = new Pb.ServiceGenerateResponse
        {
            RequestId = applicationDto.RequestId.ToString(),
            IsSuccessful = applicationDto.IsSuccessful,
            DateTimeIssued = ProtobufDates.DoDateOnly(applicationDto.DateTimeIssued)
        };

        if (applicationDto.Success is not null)
        {
            messagesDto.ResultSuccess =
                ServiceGenerateResponseResultSuccessMapper.ToMessagesDto(applicationDto.Success);
        }
        else if (applicationDto.Error is not null)
        {
            messagesDto.ResultError =
                ServiceGenerateResponseResultErrorMapper.ToMessagesDto(applicationDto.Error);
        }

        return messagesDto;
    }
}
