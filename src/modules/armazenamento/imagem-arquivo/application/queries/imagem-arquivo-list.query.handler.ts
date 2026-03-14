import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import {
  type IImagemArquivoListQuery,
  IImagemArquivoListQueryHandler,
} from "@/modules/armazenamento/imagem-arquivo/domain/queries/imagem-arquivo-list.query.handler.interface";
import { IImagemArquivoQueryRepository } from "../../domain/repositories";
import type { ImagemArquivoListOutputDto } from "../dtos";

@DeclareImplementation()
export class ImagemArquivoListQueryHandlerImpl implements IImagemArquivoListQueryHandler {
  constructor(
    @DeclareDependency(IImagemArquivoQueryRepository)
    private readonly repository: IImagemArquivoQueryRepository,
  ) {}

  async execute({
    accessContext,
    dto,
  }: IImagemArquivoListQuery): Promise<ImagemArquivoListOutputDto> {
    return this.repository.findAll(accessContext, dto);
  }
}
