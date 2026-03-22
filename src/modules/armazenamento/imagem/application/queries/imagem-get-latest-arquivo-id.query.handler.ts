import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import type {
  IImagemGetLatestArquivoIdQuery,
  IImagemGetLatestArquivoIdQueryHandler,
} from "@/modules/armazenamento/imagem/domain/queries";
import { IImagemArquivoRepository } from "@/modules/armazenamento/imagem/domain/repositories";

@DeclareImplementation()
export class ImagemGetLatestArquivoIdQueryHandlerImpl
  implements IImagemGetLatestArquivoIdQueryHandler
{
  constructor(
    @DeclareDependency(IImagemArquivoRepository)
    private readonly imagemArquivoRepository: IImagemArquivoRepository,
  ) {}

  async execute(
    _accessContext: IAccessContext | null,
    { imagemId }: IImagemGetLatestArquivoIdQuery,
  ): Promise<string | null> {
    return this.imagemArquivoRepository.findLatestArquivoIdForImagem(imagemId);
  }
}
