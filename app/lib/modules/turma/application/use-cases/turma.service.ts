import { Inject, Injectable, type StreamableFile } from "@nestjs/common";
import { has } from "lodash";
import { BaseCrudService, ResourceNotFoundError } from "@/modules/@shared";
import { AmbienteService } from "@/modules/ambiente/application/use-cases/ambiente.service";
import { ArquivoService } from "@/modules/arquivo/application/use-cases/arquivo.service";
import { CursoService } from "@/modules/curso";
import { ImagemService } from "@/modules/imagem/application/use-cases/imagem.service";
import type { TurmaEntity } from "@/modules/turma/infrastructure/persistence/typeorm";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";
import type {
  TurmaCreateInput,
  TurmaFindOneInput,
  TurmaFindOneOutput,
  TurmaListInput,
  TurmaListOutput,
  TurmaUpdateInput,
} from "../dtos";
import { type ITurmaRepositoryPort, TURMA_REPOSITORY_PORT } from "../ports";

@Injectable()
export class TurmaService extends BaseCrudService<
  TurmaEntity,
  TurmaListInput,
  TurmaListOutput,
  TurmaFindOneInput,
  TurmaFindOneOutput,
  TurmaCreateInput,
  TurmaUpdateInput
> {
  protected readonly resourceName = "Turma";
  protected readonly createAction = "turma:create";
  protected readonly updateAction = "turma:update";
  protected readonly deleteAction = "turma:delete";
  protected readonly createFields = ["periodo"] as const;
  protected readonly updateFields = ["periodo"] as const;

  constructor(
    @Inject(TURMA_REPOSITORY_PORT)
    protected readonly repository: ITurmaRepositoryPort,
    private readonly ambienteService: AmbienteService,
    private readonly cursoService: CursoService,
    private readonly imagemService: ImagemService,
    private readonly arquivoService: ArquivoService,
  ) {
    super();
  }

  async getImagemCapa(accessContext: AccessContext | null, id: string): Promise<StreamableFile> {
    const turma = await this.findByIdStrict(accessContext, { id });

    if (turma.imagemCapa) {
      const arquivoId = await this.imagemService.getLatestArquivoIdForImagem(turma.imagemCapa.id);

      if (arquivoId) {
        return this.arquivoService.getStreamableFile(null, { id: arquivoId });
      }
    }

    throw new ResourceNotFoundError("Imagem de capa da Turma", id);
  }

  async updateImagemCapa(
    accessContext: AccessContext,
    dto: TurmaFindOneInput,
    file: Express.Multer.File,
  ): Promise<boolean> {
    const currentTurma = await this.findByIdStrict(accessContext, { id: dto.id });

    await accessContext.ensurePermission(
      "turma:update",
      { dto: { id: currentTurma.id } },
      currentTurma.id,
    );

    const { imagem } = await this.imagemService.saveTurmaCapa(file);

    const turma = this.repository.create();
    this.repository.merge(turma, { id: currentTurma.id });
    this.repository.merge(turma, { imagemCapa: { id: imagem.id } });

    await this.repository.save(turma);

    return true;
  }

  protected override async beforeCreate(
    accessContext: AccessContext,
    entity: TurmaEntity,
    dto: TurmaCreateInput,
  ): Promise<void> {
    if (dto.ambientePadraoAula) {
      const ambientePadraoAula = await this.ambienteService.findByIdStrict(accessContext, {
        id: dto.ambientePadraoAula.id,
      });
      this.repository.merge(entity, { ambientePadraoAula: { id: ambientePadraoAula.id } });
    } else {
      this.repository.merge(entity, { ambientePadraoAula: null });
    }

    const curso = await this.cursoService.findByIdSimpleStrict(accessContext, dto.curso.id);
    this.repository.merge(entity, { curso: { id: curso.id } });
  }

  protected override async beforeUpdate(
    accessContext: AccessContext,
    entity: TurmaEntity,
    dto: TurmaFindOneInput & TurmaUpdateInput,
  ): Promise<void> {
    if (has(dto, "ambientePadraoAula") && dto.ambientePadraoAula !== undefined) {
      if (dto.ambientePadraoAula !== null) {
        const ambientePadraoAula = await this.ambienteService.findByIdStrict(accessContext, {
          id: dto.ambientePadraoAula.id,
        });
        this.repository.merge(entity, { ambientePadraoAula: { id: ambientePadraoAula.id } });
      } else {
        this.repository.merge(entity, { ambientePadraoAula: null });
      }
    }

    if (has(dto, "curso") && dto.curso !== undefined) {
      const curso = await this.cursoService.findByIdSimpleStrict(accessContext, dto.curso.id);
      this.repository.merge(entity, { curso: { id: curso.id } });
    }
  }
}
