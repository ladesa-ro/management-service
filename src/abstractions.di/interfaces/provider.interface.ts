import { Scope } from "@/abstractions.di/scope";

export type IProvider = {
  provides: any;
  scope: Scope;
  withImplementation: any;
};
