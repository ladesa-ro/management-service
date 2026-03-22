import { Global, Module } from "@nestjs/common";
import { ResolveAccessContextPipe } from "./resolve-access-context.pipe";

@Global()
@Module({
  providers: [ResolveAccessContextPipe],
  exports: [ResolveAccessContextPipe],
})
export class AccessContextCoreModule {}
