import {
  EstadoFindOneByIdInputDto,
  EstadoFindOneByIdRequestDto,
  EstadoListInputDto,
  EstadoListRequestDto
} from "@/features/estado";
import { requestListDtoToInputDto } from "@/shared";

export const EstadoRestMapper = {
  estadoFindOneById: {
    requestToDto(request: EstadoFindOneByIdRequestDto): EstadoFindOneByIdInputDto {
      return {
        id: request.params.id,
      };
    },
  },

  estadoList: {
    requestToDto(request: EstadoListRequestDto): EstadoListInputDto {
      return requestListDtoToInputDto(request);
    },
  },
};
