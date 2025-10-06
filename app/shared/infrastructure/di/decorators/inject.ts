import { inject } from "inversify";

export const Inject = (token: string | symbol | any) => {
  return inject(token);
};
