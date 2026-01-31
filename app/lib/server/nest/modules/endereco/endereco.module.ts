import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/@shared/infrastructure/persistence/typeorm";
import { ENDERECO_REPOSITORY_PORT, EnderecoService } from "@/modules/endereco";
import { EnderecoTypeOrmRepositoryAdapter } from "@/modules/endereco/infrastructure/persistence/typeorm";

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
