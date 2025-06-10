import { DatabaseContextService } from "@/infrastructure/integrations/database";
import { Injectable, ServiceUnavailableException, UnprocessableEntityException } from "@nestjs/common";
import sharp from "sharp";
import { v4 } from "uuid";
import { ArquivoService } from "../arquivo/arquivo.service";

type ISaveImageOptions = {
  minWidth: number;
  minHeight: number;

  transforms: {
    //
    outputAs: "jpeg";
  }[];
};

@Injectable()
export class ImagemService {
  constructor(
    private arquivoService: ArquivoService,
    private databaseContextService: DatabaseContextService,
  ) {}

  //

  async saveImage(file: Express.Multer.File, options: ISaveImageOptions) {
    const name = file.originalname;

    // ===============================================

    const originalImage = sharp(file.buffer);

    const metadata = await originalImage.metadata().catch(() => null);

    if (!metadata) {
      throw new UnprocessableEntityException("Formato de imagem não suportada ou inválida.");
    }

    if ((options.minWidth !== null && (!metadata.width || metadata.width < options.minWidth)) || (options.minHeight !== null && (!metadata.height || metadata.height < options.minHeight))) {
      throw new UnprocessableEntityException(`A imagem deve conter largura mínima de ${options.minWidth}px e altura mínima de ${options.minHeight}px.`);
    }

    // ===============================================

    return await this.databaseContextService
      .transaction(async ({ databaseContext: { imagemRepository, imagemArquivoRepository } }) => {
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

          const arquivo = await this.arquivoService.arquivoCreate({ name, mimeType }, transformedOutput.data);

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

  async saveBlocoCapa(file: Express.Multer.File) {
    return this.saveImage(file, {
      minWidth: 1,
      minHeight: 1,
      transforms: [
        {
          outputAs: "jpeg",
        },
      ],
    });
  }

  async saveAmbienteCapa(file: Express.Multer.File) {
    return this.saveImage(file, {
      minWidth: 1,
      minHeight: 1,
      transforms: [
        {
          outputAs: "jpeg",
        },
      ],
    });
  }

  async saveUsuarioCapa(file: Express.Multer.File) {
    return this.saveImage(file, {
      minWidth: 1,
      minHeight: 1,
      transforms: [
        {
          outputAs: "jpeg",
        },
      ],
    });
  }

  async saveUsuarioPerfil(file: Express.Multer.File) {
    return this.saveImage(file, {
      minWidth: 1,
      minHeight: 1,
      transforms: [
        {
          outputAs: "jpeg",
        },
      ],
    });
  }

  async saveCursoCapa(file: Express.Multer.File) {
    return this.saveImage(file, {
      minWidth: 1,
      minHeight: 1,
      transforms: [
        {
          outputAs: "jpeg",
        },
      ],
    });
  }

  async saveDisciplinaCapa(file: Express.Multer.File) {
    return this.saveImage(file, {
      minWidth: 1,
      minHeight: 1,
      transforms: [
        {
          outputAs: "jpeg",
        },
      ],
    });
  }

  async saveTurmaCapa(file: Express.Multer.File) {
    return this.saveImage(file, {
      minWidth: 1,
      minHeight: 1,
      transforms: [
        {
          outputAs: "jpeg",
        },
      ],
    });
  }
}
