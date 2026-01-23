import { IAppRequestRepresentationGeneric } from "@/__legacy/interfaces/i-app-request-representation-generic";

export const requestRepresentationMergeToDomain = <RequestRepresentation extends IAppRequestRepresentationGeneric>(requestRepresentation: RequestRepresentation) => {
  return {
    ...requestRepresentation.params,
    ...requestRepresentation.query,
    ...requestRepresentation.body,
  };
};
