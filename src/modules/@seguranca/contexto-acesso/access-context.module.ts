import { Global, Module } from "@nestjs/common";
import { ResolveAccessContextPipe } from "./infrastructure/pipes";

@Global()
@Module({
  providers: [ResolveAccessContextPipe],
  exports: [ResolveAccessContextPipe],
})
export class AccessContextCoreModule {}
