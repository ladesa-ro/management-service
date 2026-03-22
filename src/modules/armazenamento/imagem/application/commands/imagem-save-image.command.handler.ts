import sharp from "sharp";
import { ServiceUnavailableError, ValidationError } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { ILoggerPort, ILoggerPort as ILoggerPortToken } from "@/domain/abstractions/logging";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7";
import { IArquivoCreateCommandHandler } from "@/modules/armazenamento/arquivo/domain/commands";
import type {
  IImagemSaveImageCommand,
  IImagemSaveImageCommandHandler,
} from "@/modules/armazenamento/imagem/domain/commands/imagem-save-image.command.handler.interface";
import {
  IImagemArquivoRepository,
  IImagemRepository,
} from "@/modules/armazenamento/imagem/domain/repositories";

@DeclareImplementation()
export class ImagemSaveImageCommandHandlerImpl implements IImagemSaveImageCommandHandler {
  constructor(
    @DeclareDependency(IArquivoCreateCommandHandler)
    private readonly arquivoCreateHandler: IArquivoCreateCommandHandler,
    @DeclareDependency(IImagemRepository)
    private readonly imagemRepository: IImagemRepository,
    @DeclareDependency(IImagemArquivoRepository)
    private readonly imagemArquivoRepository: IImagemArquivoRepository,
    @DeclareDependency(ILoggerPortToken)
    private readonly logger: ILoggerPort,
  ) {}

  async execute(
    _accessContext: IAccessContext | null,
    { file, options }: IImagemSaveImageCommand,
  ): Promise<{ imagem: { id: string } }> {
    const name = file.originalname;

    // ===============================================

    const originalImage = sharp(file.buffer);

    const metadata = await originalImage.metadata().catch(() => null);

    if (!metadata) {
      throw new ValidationError([], "Formato de imagem não suportada ou inválida.");
    }

    if (
      (options.minWidth !== null && (!metadata.width || metadata.width < options.minWidth)) ||
      (options.minHeight !== null && (!metadata.height || metadata.height < options.minHeight))
    ) {
      throw new ValidationError(
        [],
        `A imagem deve conter largura mínima de ${options.minWidth}px e altura mínima de ${options.minHeight}px.`,
      );
    }

    // ===============================================

    try {
      const imagem = this.imagemRepository.create();

      this.imagemRepository.merge(imagem, {
        id: generateUuidV7(),
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

        const arquivo = await this.arquivoCreateHandler.execute(null, {
          dto: { name, mimeType },
          data: transformedOutput.data,
        });

        const versao = this.imagemArquivoRepository.create();

        this.imagemArquivoRepository.merge(versao, {
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

      await this.imagemRepository.save(imagem);

      return {
        imagem: {
          id: imagem.id,
        },
      };
    } catch (err) {
      this.logger.error(
        String(err),
        err instanceof Error ? err.stack : undefined,
        "ImagemSaveImage",
      );
      throw new ServiceUnavailableError();
    }
  }
}
