import { Inject, Injectable, type StreamableFile } from "@nestjs/common";
import { getEntityImagemStreamableFile, ResourceNotFoundError } from "@/modules/@shared";
import { ArquivoService } from "@/modules/armazenamento/arquivo/application/use-cases/arquivo.service";
import { ImagemService } from "@/modules/armazenamento/imagem/application/use-cases/imagem.service";
import {
  type IDisciplinaGetImagemCapaQuery,
  IDisciplinaGetImagemCapaQueryHandler,
} from "@/modules/ensino/disciplina/domain/queries/disciplina-get-imagem-capa.query.handler.interface";
import { DISCIPLINA_REPOSITORY_PORT, type IDisciplinaRepositoryPort } from "../../ports";

@Injectable()
export class DisciplinaGetImagemCapaQueryHandlerImpl
  implements IDisciplinaGetImagemCapaQueryHandler
{
  constructor(
    @Inject(DISCIPLINA_REPOSITORY_PORT)
    private readonly repository: IDisciplinaRepositoryPort,
    private readonly imagemService: ImagemService,
    private readonly arquivoService: ArquivoService,
  ) {}

  async execute({ accessContext, id }: IDisciplinaGetImagemCapaQuery): Promise<StreamableFile> {
    const entity = await this.repository.findById(accessContext, { id });

    if (!entity) {
      throw new ResourceNotFoundError("Disciplina", id);
    }

    return getEntityImagemStreamableFile(
      entity as Record<string, any>,
      "imagemCapa",
      "Imagem de capa do Disciplina",
      id,
      this.imagemService,
      this.arquivoService,
    );
  }
}
