import { Inject, Injectable } from "@nestjs/common";
import { BaseReadOnlyService } from "@/Ladesa.Management.Application/@shared";
import type {
  ImagemArquivoFindOneInputDto,
  ImagemArquivoFindOneOutputDto,
  ImagemArquivoListInputDto,
  ImagemArquivoListOutputDto,
} from "@/Ladesa.Management.Application/armazenamento/imagem-arquivo/application/dtos";
import {
  IImagemArquivoQueryRepository,
  type IImagemArquivoUseCasePort,
} from "@/Ladesa.Management.Application/armazenamento/imagem-arquivo/application/ports";

@Injectable()
export class ImagemArquivoService
  extends BaseReadOnlyService<
    ImagemArquivoListInputDto,
    ImagemArquivoListOutputDto,
    ImagemArquivoFindOneInputDto,
    ImagemArquivoFindOneOutputDto
  >
  implements IImagemArquivoUseCasePort
{
  protected readonly resourceName = "ImagemArquivo";

  constructor(
    @Inject(IImagemArquivoQueryRepository)
    protected readonly repository: IImagemArquivoQueryRepository,
  ) {
    super();
  }
}
