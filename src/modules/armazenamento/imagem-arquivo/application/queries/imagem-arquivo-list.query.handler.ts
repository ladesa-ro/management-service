import { Inject, Injectable } from "@nestjs/common";
import {
  type IImagemArquivoListQuery,
  IImagemArquivoListQueryHandler,
} from "@/modules/armazenamento/imagem-arquivo/domain/queries/imagem-arquivo-list.query.handler.interface";
import { IImagemArquivoQueryRepository } from "../../domain/repositories";
import type { ImagemArquivoListOutputDto } from "../dtos";

@Injectable()
export class ImagemArquivoListQueryHandlerImpl implements IImagemArquivoListQueryHandler {
  constructor(
    @Inject(IImagemArquivoQueryRepository)
    private readonly repository: IImagemArquivoQueryRepository,
  ) {}

  async execute({
    accessContext,
    dto,
  }: IImagemArquivoListQuery): Promise<ImagemArquivoListOutputDto> {
    return this.repository.findAll(accessContext, dto);
  }
}
