import { Module } from "@nestjs/common";
import { ENDERECO_REPOSITORY_PORT, EnderecoService } from "@/core/endereco";
import { NestJsPaginateAdapter } from "@/v2/adapters/out/persistence/pagination";
import { EnderecoTypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters";

@Module({
  imports: [],
  controllers: [],
  providers: [
    NestJsPaginateAdapter,
    EnderecoService,
    {
      provide: ENDERECO_REPOSITORY_PORT,
      useClass: EnderecoTypeOrmRepositoryAdapter,
    },
  ],
  exports: [EnderecoService],
})
export class EnderecoModule {}
