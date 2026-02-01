import { Module } from "@nestjs/common";
import { RequestActorCoreModule } from "@/modules/@core/request-actor";
import { RequestActorService } from "./request-actor.service";

/**
 * @deprecated Use `RequestActorCoreModule` from `@/modules/@core/request-actor` instead.
 * Este módulo será removido na próxima versão major.
 */
@Module({
  imports: [RequestActorCoreModule],
  providers: [RequestActorService],
  exports: [RequestActorService, RequestActorCoreModule],
})
export class RequestActorModule {}
