import { ModuleRef } from "@nestjs/core";
import { DeclareImplementation } from "@/domain/dependency-injection";
import { IContainer } from "@/domain/dependency-injection/interfaces/container.interface";

@DeclareImplementation()
export class NestContainerAdapter implements IContainer {
  constructor(private readonly moduleRef: ModuleRef) {}

  get<T>(token: string | symbol | (abstract new (...args: unknown[]) => T)): T {
    return this.moduleRef.get<T>(token, { strict: false });
  }
}
