import { Inject, Injectable, type StreamableFile } from "@nestjs/common";
import type { AccessContext } from "@/modules/@core/access-context";
import { BaseCrudService, ResourceNotFoundError } from "@/modules/@shared";
import { ArquivoService } from "@/modules/arquivo/application/use-cases/arquivo.service";
import type {
  DisciplinaCreateInput,
  DisciplinaFindOneInput,
  DisciplinaFindOneOutput,
  DisciplinaListInput,
  DisciplinaListOutput,
  DisciplinaUpdateInput,
} from "@/modules/disciplina/application/dtos";
import {
  DISCIPLINA_REPOSITORY_PORT,
  type IDisciplinaRepositoryPort,
} from "@/modules/disciplina/application/ports";
import type { DisciplinaEntity } from "@/modules/disciplina/infrastructure/persistence/typeorm";
import { ImagemService } from "@/modules/imagem/application/use-cases/imagem.service";

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
