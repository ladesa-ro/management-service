import { Inject, Injectable } from "@nestjs/common";
import { BaseReadOnlyService } from "@/Ladesa.Management.Application/@shared";
import {
  IImagemArquivoQueryRepository,
  type IImagemArquivoUseCasePort,
} from "@/Ladesa.Management.Application/armazenamento/imagem-arquivo/application/ports";
import { type ImagemArquivoFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/ImagemArquivoFindOneInputDto";
import { type ImagemArquivoFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/ImagemArquivoFindOneOutputDto";
import { type ImagemArquivoListInputDto } from "@/Ladesa.Management.Domain/Dtos/ImagemArquivoListInputDto";
import { type ImagemArquivoListOutputDto } from "@/Ladesa.Management.Domain/Dtos/ImagemArquivoListOutputDto";

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
