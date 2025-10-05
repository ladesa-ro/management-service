import { inject } from "inversify";

export const Inject = (token: string | symbol) => {
  return inject(token);
};
