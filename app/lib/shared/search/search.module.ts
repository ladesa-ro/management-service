import { Global, Module } from "@nestjs/common";
import { SearchService } from "@/shared/search/search.service";

@Global()
@Module({
  imports: [],
  exports: [SearchService],
  providers: [SearchService],
})
export class SearchModule {}
