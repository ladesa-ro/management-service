import { Inject, Injectable, type StreamableFile } from "@nestjs/common";
import { BaseCrudService, ResourceNotFoundError } from "@/core/@shared";
import { ArquivoService } from "@/core/arquivo/application/use-cases/arquivo.service";
import type {
  DisciplinaCreateInput,
  DisciplinaFindOneInput,
  DisciplinaFindOneOutput,
  DisciplinaListInput,
  DisciplinaListOutput,
  DisciplinaUpdateInput,
} from "@/core/disciplina/application/dtos";
import {
  DISCIPLINA_REPOSITORY_PORT,
  type IDisciplinaRepositoryPort,
} from "@/core/disciplina/application/ports";
import { ImagemService } from "@/core/imagem/application/use-cases/imagem.service";
import type { DisciplinaEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";

@Injectable()
export class DisciplinaService extends BaseCrudService<
  DisciplinaEntity,
  DisciplinaListInput,
  DisciplinaListOutput,
  DisciplinaFindOneInput,
  DisciplinaFindOneOutput,
  DisciplinaCreateInput,
  DisciplinaUpdateInput
> {
  protected readonly resourceName = "Disciplina";
  protected readonly createAction = "disciplina:create";
  protected readonly updateAction = "disciplina:update";
  protected readonly deleteAction = "disciplina:delete";
  protected readonly createFields = ["nome", "nomeAbreviado", "cargaHoraria"] as const;
  protected readonly updateFields = ["nome", "nomeAbreviado", "cargaHoraria"] as const;

  constructor(
    @Inject(DISCIPLINA_REPOSITORY_PORT)
    protected readonly repository: IDisciplinaRepositoryPort,
    private readonly imagemService: ImagemService,
    private readonly arquivoService: ArquivoService,
  ) {
    super();
  }

  async getImagemCapa(accessContext: AccessContext | null, id: string): Promise<StreamableFile> {
    const disciplina = await this.findByIdStrict(accessContext, { id });

    if (disciplina.imagemCapa) {
      const arquivoId = await this.imagemService.getLatestArquivoIdForImagem(
        disciplina.imagemCapa.id,
      );

      if (arquivoId) {
        return this.arquivoService.getStreamableFile(null, { id: arquivoId });
      }
    }

    throw new ResourceNotFoundError("Imagem de capa da Disciplina", id);
  }

  async updateImagemCapa(
    accessContext: AccessContext,
    dto: DisciplinaFindOneInput,
    file: Express.Multer.File,
  ): Promise<boolean> {
    const currentDisciplina = await this.findByIdStrict(accessContext, { id: dto.id });

    await accessContext.ensurePermission(
      "disciplina:update",
      { dto: { id: currentDisciplina.id } },
      currentDisciplina.id,
    );

    const { imagem } = await this.imagemService.saveDisciplinaCapa(file);

    const disciplina = this.repository.create();
    this.repository.merge(disciplina, { id: currentDisciplina.id });
    this.repository.merge(disciplina, { imagemCapa: { id: imagem.id } });

    await this.repository.save(disciplina);

    return true;
  }
}
