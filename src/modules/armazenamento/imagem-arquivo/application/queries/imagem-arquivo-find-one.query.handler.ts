import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import {
  type IImagemArquivoFindOneQuery,
  IImagemArquivoFindOneQueryHandler,
} from "@/modules/armazenamento/imagem-arquivo/domain/queries/imagem-arquivo-find-one.query.handler.interface";
import { IImagemArquivoQueryRepository } from "../../domain/repositories";
import type { ImagemArquivoFindOneOutputDto } from "../dtos";

@DeclareImplementation()
export class ImagemArquivoFindOneQueryHandlerImpl implements IImagemArquivoFindOneQueryHandler {
  constructor(
    @DeclareDependency(IImagemArquivoQueryRepository)
    private readonly repository: IImagemArquivoQueryRepository,
  ) {}

  async execute({
    accessContext,
    dto,
  }: IImagemArquivoFindOneQuery): Promise<ImagemArquivoFindOneOutputDto | null> {
    return this.repository.findById(accessContext, dto);
  }
}
