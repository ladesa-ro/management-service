import { Scope } from "@/domain/dependency-injection/scope";

export type IProvider = {
  provides: any;
  scope: Scope;
  withImplementation: any;
};
