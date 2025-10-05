import { injectable } from "inversify";

type Scope = "Singleton" | "Transient" | "Request";

export const Injectable = (scope: Scope) => {
  return injectable(scope);
};
