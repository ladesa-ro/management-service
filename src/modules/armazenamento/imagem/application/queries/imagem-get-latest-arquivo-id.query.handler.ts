import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import type {
  IImagemGetLatestArquivoIdQuery,
  IImagemGetLatestArquivoIdQueryHandler,
} from "@/modules/armazenamento/imagem/domain/queries";
import { IImagemArquivoRepository } from "@/modules/armazenamento/imagem/domain/repositories";

@Impl()
export class ImagemGetLatestArquivoIdQueryHandlerImpl
  implements IImagemGetLatestArquivoIdQueryHandler
{
  constructor(
    @Dep(IImagemArquivoRepository)
    private readonly imagemArquivoRepository: IImagemArquivoRepository,
  ) {}

  async execute(
    _accessContext: IAccessContext | null,
    { imagemId }: IImagemGetLatestArquivoIdQuery,
  ): Promise<string | null> {
    return this.imagemArquivoRepository.findLatestArquivoIdForImagem(imagemId);
  }
}
