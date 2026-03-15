import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import { IImagemArquivoFindOneQueryHandler } from "@/modules/armazenamento/imagem-arquivo/domain/queries/imagem-arquivo-find-one.query.handler.interface";
import type {
  ImagemArquivoFindOneQuery,
  ImagemArquivoFindOneQueryResult,
} from "../../domain/queries";
import { IImagemArquivoQueryRepository } from "../../domain/repositories";

@DeclareImplementation()
export class ImagemArquivoFindOneQueryHandlerImpl implements IImagemArquivoFindOneQueryHandler {
  constructor(
    @DeclareDependency(IImagemArquivoQueryRepository)
    private readonly repository: IImagemArquivoQueryRepository,
  ) {}

  async execute(
    accessContext: AccessContext | null,
    dto: ImagemArquivoFindOneQuery,
  ): Promise<ImagemArquivoFindOneQueryResult | null> {
    return this.repository.findById(accessContext, dto);
  }
}
