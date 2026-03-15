import { ModuleRef } from "@nestjs/core";
import { DeclareImplementation } from "@/domain/dependency-injection";
import { IContainer } from "@/domain/dependency-injection/interfaces/container.interface";

@DeclareImplementation()
export class NestContainerAdapter implements IContainer {
  constructor(private readonly moduleRef: ModuleRef) {}

  get<T>(token: any): T {
    return this.moduleRef.get<T>(token, { strict: false });
  }
}
