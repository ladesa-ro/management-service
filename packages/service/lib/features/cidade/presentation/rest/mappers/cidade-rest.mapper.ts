import { CidadeFindOneByIdInputDto, CidadeFindOneByIdRequestDto, CidadeListInputDto } from "@/features/cidade";
import { CidadeListRequestDto } from "@/features/cidade/presentation/rest/dtos";
import { requestListDtoToInputDto } from "@/shared";

export const CidadeRestMapper = {
  cidadeFindOneById: {
    requestToDto(request: CidadeFindOneByIdRequestDto): CidadeFindOneByIdInputDto {
      return {
        id: request.params.id,
      };
    },
  },

  cidadeList: {
    requestToDto: (request: CidadeListRequestDto): CidadeListInputDto => {
      return requestListDtoToInputDto(request);
    },
  },
};
