import { Inject, Injectable, type StreamableFile } from "@nestjs/common";
import { has } from "lodash";
import type { AccessContext } from "@/modules/@core/access-context";
import { BaseCrudService, type PersistInput } from "@/modules/@shared";
import { ArquivoService } from "@/modules/base/armazenamento/arquivo/application/use-cases/arquivo.service";
import { ImagemService } from "@/modules/base/armazenamento/imagem/application/use-cases/imagem.service";
import { CursoService } from "@/modules/ensino/curso";
import { type ITurma, Turma } from "@/modules/ensino/turma";
import { AmbienteService } from "@/modules/sisgea/ambiente/application/use-cases/ambiente.service";
import type {
  TurmaCreateInputDto,
  TurmaFindOneInputDto,
  TurmaFindOneOutputDto,
  TurmaListInputDto,
  TurmaListOutputDto,
  TurmaUpdateInputDto,
} from "../dtos";
import { type ITurmaRepositoryPort, TURMA_REPOSITORY_PORT } from "../ports";

@Injectable()
export class TurmaService extends BaseCrudService<
  ITurma,
  TurmaListInputDto,
  TurmaListOutputDto,
  TurmaFindOneInputDto,
  TurmaFindOneOutputDto,
  TurmaCreateInputDto,
  TurmaUpdateInputDto
> {
  protected readonly resourceName = "Turma";
  protected readonly createAction = "turma:create";
  protected readonly updateAction = "turma:update";
  protected readonly deleteAction = "turma:delete";

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
    return this.getImagemField(
      accessContext,
      id,
      "imagemCapa",
      "Imagem de capa da Turma",
      this.imagemService,
      this.arquivoService,
    );
  }

  async updateImagemCapa(
    accessContext: AccessContext,
    dto: TurmaFindOneInputDto,
    file: Express.Multer.File,
  ): Promise<boolean> {
    return this.updateImagemField(accessContext, dto.id, file, "imagemCapa", this.imagemService);
  }

  protected async buildCreateData(
    accessContext: AccessContext,
    dto: TurmaCreateInputDto,
  ): Promise<Partial<PersistInput<ITurma>>> {
    const curso = await this.cursoService.findByIdSimpleStrict(accessContext, dto.curso.id);

    let ambientePadraoAulaRef: { id: string } | null = null;
    if (dto.ambientePadraoAula) {
      const ambientePadraoAula = await this.ambienteService.findByIdStrict(accessContext, {
        id: dto.ambientePadraoAula.id,
      });
      ambientePadraoAulaRef = { id: ambientePadraoAula.id };
    }

    const domain = Turma.criar({
      periodo: dto.periodo,
      curso: { id: curso.id },
      ambientePadraoAula: ambientePadraoAulaRef,
    });
    return {
      ...domain,
      curso: { id: curso.id },
      ambientePadraoAula: ambientePadraoAulaRef,
    };
  }

  protected async buildUpdateData(
    accessContext: AccessContext,
    dto: TurmaFindOneInputDto & TurmaUpdateInputDto,
    current: TurmaFindOneOutputDto,
  ): Promise<Partial<PersistInput<ITurma>>> {
    const domain = Turma.fromData(current);
    domain.atualizar({ periodo: dto.periodo });
    const result: Partial<PersistInput<ITurma>> = { periodo: domain.periodo };

    if (has(dto, "ambientePadraoAula") && dto.ambientePadraoAula !== undefined) {
      if (dto.ambientePadraoAula !== null) {
        const ambientePadraoAula = await this.ambienteService.findByIdStrict(accessContext, {
          id: dto.ambientePadraoAula.id,
        });
        result.ambientePadraoAula = { id: ambientePadraoAula.id };
      } else {
        result.ambientePadraoAula = null;
      }
    }

    if (has(dto, "curso") && dto.curso !== undefined) {
      const curso = await this.cursoService.findByIdSimpleStrict(accessContext, dto.curso.id);
      result.curso = { id: curso.id };
    }

    return result;
  }
}
