import { Module } from "@nestjs/common";
import { EnderecoTypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters";
import { EnderecoService } from "@/v2/core/endereco/application/use-cases/endereco.service";

@Module({
  imports: [],
  controllers: [],
  providers: [
    EnderecoService,
    {
      provide: "IEnderecoRepositoryPort",
      useClass: EnderecoTypeOrmRepositoryAdapter,
    },
  ],
  exports: [EnderecoService],
})
export class EnderecoModule {}
