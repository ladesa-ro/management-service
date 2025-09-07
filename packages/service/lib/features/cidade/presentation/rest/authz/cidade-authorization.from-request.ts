import { ICidadeAuthorizationPort } from "../../../application/ports/cidade-authorization.port";

export const cidadeAuthorizationFromRequest = (): ICidadeAuthorizationPort => {
  return {
    canRead: async () => {
      return true;
    },
    getReadFilters: () => {
      return true;
    },
  };
};
