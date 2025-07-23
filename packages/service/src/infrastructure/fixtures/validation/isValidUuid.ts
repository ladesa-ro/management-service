import { validate } from "uuid";

export const isValidUuid = (data: unknown) => {
  if (typeof data === "string") {
    return validate(data);
  }

  return false;
};
