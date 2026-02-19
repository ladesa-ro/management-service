import { Global, Module } from "@nestjs/common";
import { SearchService } from "./search.service";

/**
 * @deprecated Use NestJsPaginateAdapter instead. This module is kept for legacy compatibility.
 */
@Global()
@Module({
  exports: [SearchService],
  providers: [SearchService],
})
export class SearchModule {}
