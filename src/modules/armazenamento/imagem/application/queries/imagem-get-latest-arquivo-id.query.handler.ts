import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import type {
  IImagemGetLatestArquivoIdQuery,
  IImagemGetLatestArquivoIdQueryHandler,
} from "@/modules/armazenamento/imagem/domain/queries";
import { IImagemArquivoRepository } from "@/modules/armazenamento/imagem/domain/repositories";
import type { AccessContext } from "@/server/access-context";

@DeclareImplementation()
export class ImagemGetLatestArquivoIdQueryHandlerImpl
  implements IImagemGetLatestArquivoIdQueryHandler
{
  constructor(
    @DeclareDependency(IImagemArquivoRepository)
    private readonly imagemArquivoRepository: IImagemArquivoRepository,
  ) {}

  async execute(
    _accessContext: AccessContext | null,
    { imagemId }: IImagemGetLatestArquivoIdQuery,
  ): Promise<string | null> {
    return this.imagemArquivoRepository.findLatestArquivoIdForImagem(imagemId);
  }
}
