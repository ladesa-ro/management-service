import {
  Inject,
  Injectable,
  ServiceUnavailableException,
  UnprocessableEntityException,
} from "@nestjs/common";
import sharp from "sharp";
import { v4 } from "uuid";
import { IArquivoCreateCommandHandler } from "@/modules/armazenamento/arquivo/domain/commands";
import type {
  IImagemSaveImageCommand,
  IImagemSaveImageCommandHandler,
} from "@/modules/armazenamento/imagem/domain/commands/imagem-save-image.command.handler.interface";
import {
  type IImagemTransactionPort,
  IMAGEM_ITransaction,
} from "@/modules/armazenamento/imagem/domain/repositories";

@Injectable()
export class ImagemSaveImageCommandHandlerImpl implements IImagemSaveImageCommandHandler {
  constructor(
    @Inject(IArquivoCreateCommandHandler)
    private readonly arquivoCreateHandler: IArquivoCreateCommandHandler,
    @Inject(IMAGEM_ITransaction)
    private readonly imagemTransactionPort: IImagemTransactionPort,
  ) {}

  async execute({ file, options }: IImagemSaveImageCommand): Promise<{ imagem: { id: string } }> {
    const name = file.originalname;

    // ===============================================

    const originalImage = sharp(file.buffer);

    const metadata = await originalImage.metadata().catch(() => null);

    if (!metadata) {
      throw new UnprocessableEntityException("Formato de imagem não suportada ou inválida.");
    }

    if (
      (options.minWidth !== null && (!metadata.width || metadata.width < options.minWidth)) ||
      (options.minHeight !== null && (!metadata.height || metadata.height < options.minHeight))
    ) {
      throw new UnprocessableEntityException(
        `A imagem deve conter largura mínima de ${options.minWidth}px e altura mínima de ${options.minHeight}px.`,
      );
    }

    // ===============================================

    return await this.imagemTransactionPort
      .transaction(async ({ imagemRepository, imagemArquivoRepository }) => {
        const imagem = imagemRepository.create();

        imagemRepository.merge(imagem, {
          id: v4(),
          versoes: [],
        });

        for (const transform of options.transforms) {
          let mimeType: string;
          const transformImage = originalImage.clone().keepMetadata();

          if (transform.outputAs === "jpeg") {
            transformImage.jpeg();
            mimeType = "image/jpeg";
          } else {
            throw new TypeError("Invalid transform.outputAs");
          }

          const transformedOutput = await transformImage.toBuffer({
            resolveWithObject: true,
          });

          const arquivo = await this.arquivoCreateHandler.execute({
            dto: { name, mimeType },
            data: transformedOutput.data,
          });

          const versao = imagemArquivoRepository.create();

          imagemArquivoRepository.merge(versao, {
            mimeType,
            formato: transform.outputAs,

            largura: metadata.width,
            altura: metadata.height,

            arquivo: {
              id: arquivo.id,
            },
            imagem: {
              id: imagem.id,
            },
          });

          imagem.versoes.push(versao);
        }

        await imagemRepository.save(imagem);

        return {
          imagem: {
            id: imagem.id,
          },
        };
      })
      .catch((err) => {
        console.error(err);
        throw new ServiceUnavailableException();
      });
  }
}
