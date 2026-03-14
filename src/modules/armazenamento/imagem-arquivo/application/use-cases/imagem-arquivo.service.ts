import { Inject, Injectable } from "@nestjs/common";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import { ResourceNotFoundError } from "@/modules/@shared";
import { IImagemArquivoFindOneQueryHandler } from "@/modules/armazenamento/imagem-arquivo/domain/queries/imagem-arquivo-find-one.query.handler.interface";
import { IImagemArquivoListQueryHandler } from "@/modules/armazenamento/imagem-arquivo/domain/queries/imagem-arquivo-list.query.handler.interface";
import type {
  ImagemArquivoFindOneInputDto,
  ImagemArquivoFindOneOutputDto,
  ImagemArquivoListInputDto,
  ImagemArquivoListOutputDto,
} from "../dtos";
import type { IImagemArquivoUseCasePort } from "../ports";

@Injectable()
export class ImagemArquivoService implements IImagemArquivoUseCasePort {
  constructor(
    @Inject(IImagemArquivoListQueryHandler)
    private readonly listHandler: IImagemArquivoListQueryHandler,
    @Inject(IImagemArquivoFindOneQueryHandler)
    private readonly findOneHandler: IImagemArquivoFindOneQueryHandler,
  ) {}

  findAll(
    accessContext: AccessContext,
    dto: ImagemArquivoListInputDto | null = null,
  ): Promise<ImagemArquivoListOutputDto> {
    return this.listHandler.execute({ accessContext, dto });
  }

  findById(
    accessContext: AccessContext,
    dto: ImagemArquivoFindOneInputDto,
  ): Promise<ImagemArquivoFindOneOutputDto | null> {
    return this.findOneHandler.execute({ accessContext, dto });
  }

  async findByIdStrict(
    accessContext: AccessContext,
    dto: ImagemArquivoFindOneInputDto,
  ): Promise<ImagemArquivoFindOneOutputDto> {
    const entity = await this.findById(accessContext, dto);

    if (!entity) {
      throw new ResourceNotFoundError("ImagemArquivo", dto.id);
    }

    return entity;
  }
}
