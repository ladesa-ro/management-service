import { Inject, Injectable, type StreamableFile } from "@nestjs/common";
import { has } from "lodash";
import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { BaseCrudService, type PersistInput } from "@/Ladesa.Management.Application/@shared";
import { AmbienteService } from "@/Ladesa.Management.Application/ambientes/ambiente/application/use-cases/ambiente.service";
import { ArquivoService } from "@/Ladesa.Management.Application/armazenamento/arquivo/application/use-cases/arquivo.service";
import { ImagemService } from "@/Ladesa.Management.Application/armazenamento/imagem/application/use-cases/imagem.service";
import { CursoService } from "@/Ladesa.Management.Application/ensino/curso";
import { Turma } from "@/Ladesa.Management.Application/ensino/turma";
import { type TurmaCreateInputDto } from "@/Ladesa.Management.Domain/Dtos/TurmaCreateInputDto";
import { type TurmaFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/TurmaFindOneInputDto";
import { type TurmaFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/TurmaFindOneOutputDto";
import { type TurmaListInputDto } from "@/Ladesa.Management.Domain/Dtos/TurmaListInputDto";
import { type TurmaListOutputDto } from "@/Ladesa.Management.Domain/Dtos/TurmaListOutputDto";
import { type TurmaUpdateInputDto } from "@/Ladesa.Management.Domain/Dtos/TurmaUpdateInputDto";
import { ITurmaRepository } from "../ports";

@Injectable()
export class TurmaService extends BaseCrudService<
  Turma,
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
    @Inject(ITurmaRepository)
    protected readonly repository: ITurmaRepository,
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
  ): Promise<Partial<PersistInput<Turma>>> {
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
    return { ...domain };
  }

  protected async buildUpdateData(
    accessContext: AccessContext,
    dto: TurmaFindOneInputDto & TurmaUpdateInputDto,
    current: TurmaFindOneOutputDto,
  ): Promise<Partial<PersistInput<Turma>>> {
    const domain = Turma.fromData({
      ...current,
      cursoId: current.curso.id,
      ambientePadraoAulaId: current.ambientePadraoAula?.id ?? null,
      imagemCapaId: current.imagemCapa?.id ?? null,
    } as unknown as Turma);
    domain.atualizar({ periodo: dto.periodo });
    const result: Partial<PersistInput<Turma>> = { periodo: domain.periodo };

    if (has(dto, "ambientePadraoAula") && dto.ambientePadraoAula !== undefined) {
      if (dto.ambientePadraoAula !== null) {
        const ambientePadraoAula = await this.ambienteService.findByIdStrict(accessContext, {
          id: dto.ambientePadraoAula.id,
        });
        result.ambientePadraoAulaId = ambientePadraoAula.id;
      } else {
        result.ambientePadraoAulaId = null;
      }
    }

    if (has(dto, "curso") && dto.curso !== undefined) {
      const curso = await this.cursoService.findByIdSimpleStrict(accessContext, dto.curso.id);
      result.cursoId = curso.id;
    }

    return result;
  }
}
