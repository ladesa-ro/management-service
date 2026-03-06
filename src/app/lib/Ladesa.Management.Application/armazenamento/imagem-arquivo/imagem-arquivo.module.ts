import { Global, Module } from "@nestjs/common";
import { IMAGEM_ARQUIVO_QUERY_REPOSITORY_PORT } from "@/Ladesa.Management.Application/armazenamento/imagem-arquivo/application/ports";
import { ImagemArquivoService } from "@/Ladesa.Management.Application/armazenamento/imagem-arquivo/application/use-cases/imagem-arquivo.service";
import { ImagemArquivoQueryTypeOrmRepositoryAdapter } from "@/Ladesa.Management.Application/armazenamento/imagem-arquivo/infrastructure/persistence/typeorm";
import { ImagemArquivoGraphqlResolver } from "@/Ladesa.Management.Application/armazenamento/imagem-arquivo/presentation/graphql/imagem-arquivo.graphql.resolver";
import { NestJsPaginateAdapter } from "@/Ladesa.Management.Infrastructure.Database/typeorm";

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [
    NestJsPaginateAdapter,
    ImagemArquivoService,
    ImagemArquivoGraphqlResolver,
    {
      provide: IMAGEM_ARQUIVO_QUERY_REPOSITORY_PORT,
      useClass: ImagemArquivoQueryTypeOrmRepositoryAdapter,
    },
  ],
  exports: [ImagemArquivoService],
})
export class ImagemArquivoModule {}
