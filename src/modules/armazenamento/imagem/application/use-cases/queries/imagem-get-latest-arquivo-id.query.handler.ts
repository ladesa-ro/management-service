import { Inject, Injectable } from "@nestjs/common";
import type { IImagemGetLatestArquivoIdQueryHandler } from "@/modules/armazenamento/imagem/domain/queries";
import {
  type IImagemArquivoRepositoryPort,
  IMAGEM_ARQUIVO_REPOSITORY_PORT,
} from "@/modules/armazenamento/imagem/domain/repositories";

@Injectable()
export class ImagemGetLatestArquivoIdQueryHandlerImpl
  implements IImagemGetLatestArquivoIdQueryHandler
{
  constructor(
    @Inject(IMAGEM_ARQUIVO_REPOSITORY_PORT)
    private readonly imagemArquivoRepository: IImagemArquivoRepositoryPort,
  ) {}

  async execute({ imagemId }: { imagemId: string }): Promise<string | null> {
    return this.imagemArquivoRepository.findLatestArquivoIdForImagem(imagemId);
  }
}
