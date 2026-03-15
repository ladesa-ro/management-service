import { Global, Module } from "@nestjs/common";
import { IContainer } from "@/domain/dependency-injection/interfaces/container.interface";
import { NestContainerAdapter } from "./nest-container.adapter";

@Global()
@Module({
  providers: [{ provide: IContainer, useClass: NestContainerAdapter }],
  exports: [IContainer],
})
export class ContainerModule {}
