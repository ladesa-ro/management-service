import { Inject, Injectable, type StreamableFile } from "@nestjs/common";
import type { AccessContext } from "@/modules/@core/access-context";
import { BaseCrudService } from "@/modules/@shared";
import { ArquivoService } from "@/modules/arquivo/application/use-cases/arquivo.service";
import type {
  DisciplinaCreateInputDto,
  DisciplinaFindOneInputDto,
  DisciplinaFindOneOutputDto,
  DisciplinaListInputDto,
  DisciplinaListOutputDto,
  DisciplinaUpdateInputDto,
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
  DisciplinaListInputDto,
  DisciplinaListOutputDto,
  DisciplinaFindOneInputDto,
  DisciplinaFindOneOutputDto,
  DisciplinaCreateInputDto,
  DisciplinaUpdateInputDto
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
    return this.getImagemField(
      accessContext,
      id,
      "imagemCapa",
      "Imagem de capa da Disciplina",
      this.imagemService,
      this.arquivoService,
    );
  }

  async updateImagemCapa(
    accessContext: AccessContext,
    dto: DisciplinaFindOneInputDto,
    file: Express.Multer.File,
  ): Promise<boolean> {
    return this.updateImagemField(accessContext, dto.id, file, "imagemCapa", this.imagemService);
  }
}
