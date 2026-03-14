import { Inject, Injectable } from "@nestjs/common";
import type { IImagemGetLatestArquivoIdQueryHandler } from "@/modules/armazenamento/imagem/domain/queries";
import { IImagemArquivoRepository } from "@/modules/armazenamento/imagem/domain/repositories";

@Injectable()
export class ImagemGetLatestArquivoIdQueryHandlerImpl
  implements IImagemGetLatestArquivoIdQueryHandler
{
  constructor(
    @Inject(IImagemArquivoRepository)
    private readonly imagemArquivoRepository: IImagemArquivoRepository,
  ) {}

  async execute({ imagemId }: { imagemId: string }): Promise<string | null> {
    return this.imagemArquivoRepository.findLatestArquivoIdForImagem(imagemId);
  }
}
