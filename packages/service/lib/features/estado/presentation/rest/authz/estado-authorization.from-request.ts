import { IEstadoAuthorizationPort } from "@/features/estado";

export const estadoAuthorizationFromRequest = (): IEstadoAuthorizationPort => {
  return {
    canRead: async () => {
      return true;
    },
    getReadFilters: () => {
      return true;
    },
  };
}