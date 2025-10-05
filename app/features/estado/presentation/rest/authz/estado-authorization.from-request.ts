import type { IEstadoAuthorizationPort } from "@/features/estado";
import type { RequestRepresentationDto } from "@/shared";

export const estadoAuthorizationFromRequest = (_: RequestRepresentationDto): IEstadoAuthorizationPort => {
  return {
    canRead: async () => {
      return true;
    },
    getReadFilters: () => {
      return true;
    },
  };
};
