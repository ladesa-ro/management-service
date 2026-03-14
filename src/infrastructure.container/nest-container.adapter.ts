import { Injectable } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import { IContainer } from "@/domain/dependency-injection/interfaces/container.interface";

@Injectable()
export class NestContainerAdapter implements IContainer {
  constructor(private readonly moduleRef: ModuleRef) {}

  get<T>(token: any): T {
    return this.moduleRef.get<T>(token, { strict: false });
  }
}
