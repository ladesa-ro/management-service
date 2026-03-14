import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import type { IImagemGetLatestArquivoIdQueryHandler } from "@/modules/armazenamento/imagem/domain/queries";
import { IImagemArquivoRepository } from "@/modules/armazenamento/imagem/domain/repositories";

@DeclareImplementation()
export class ImagemGetLatestArquivoIdQueryHandlerImpl
  implements IImagemGetLatestArquivoIdQueryHandler
{
  constructor(
    @DeclareDependency(IImagemArquivoRepository)
    private readonly imagemArquivoRepository: IImagemArquivoRepository,
  ) {}

  async execute({ imagemId }: { imagemId: string }): Promise<string | null> {
    return this.imagemArquivoRepository.findLatestArquivoIdForImagem(imagemId);
  }
}
