import { ICampusAuthorizationPort } from "@/features/campus";

export const campusAuthorizationFromRequest = (): ICampusAuthorizationPort => {
  return {
    canRead: async () => {
      return true;
    },
    getReadFilters: () => {
      return true;
    },

    canCreate: () => {
      return true;
    },

    canDelete: () => {
      return true;
    },

    canUpdate: () => {
      return true;
    },
  };
};
