import { Global, Module } from "@nestjs/common";
import { SearchService } from "@/old/shared/search/search.service";

@Global()
@Module({
  imports: [],
  exports: [SearchService],
  providers: [SearchService],
})
export class SearchModule {}
