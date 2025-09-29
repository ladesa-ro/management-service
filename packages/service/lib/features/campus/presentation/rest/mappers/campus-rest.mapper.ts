import {
  CampusCreateInputDto,
  CampusCreateRequestDto,
  CampusDeleteOneByIdInputDto,
  CampusDeleteOneByIdRequestDto,
  CampusFindOneByIdInputDto,
  CampusFindOneByIdRequestDto,
  CampusListInputDto,
  CampusListRequestDto,
  CampusUpdateOneByIdInputDto,
  CampusUpdateOneByIdRequestDto,
} from "@/features/campus";
import { requestListDtoToInputDto } from "@/shared";

export const CampusRestMapper = {
  campusFindOneById: {
    requestToDto(request: CampusFindOneByIdRequestDto): CampusFindOneByIdInputDto {
      return {
        id: request.params.id,
      };
    },
  },

  campusList: {
    requestToDto(request: CampusListRequestDto): CampusListInputDto {
      return requestListDtoToInputDto(request);
    },
  },

  campusUpdateOneById: {
    requestToDto(request: CampusUpdateOneByIdRequestDto): CampusUpdateOneByIdInputDto {
      return {
        targetEntity: {
          id: request.params.id,
        },
        data: {
          ...request.body,
        },
      };
    },
  },

  campusDeleteOneById: {
    requestToDto(request: CampusDeleteOneByIdRequestDto): CampusDeleteOneByIdInputDto {
      return {
        id: request.params.id,
      };
    },
  },

  campusCreate: {
    requestToDto(request: CampusCreateRequestDto): CampusCreateInputDto {
      return {
        ...request.body,
      };
    },
  },
};
