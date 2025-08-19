import { Global, Module } from "@nestjs/common";
import { SearchService } from "@/legacy/application/helpers/search.service";

@Global()
@Module({
  imports: [],
  exports: [SearchService],
  providers: [SearchService],
})
export class SearchModule {}
