import { Inject, Injectable, NotFoundException, type StreamableFile } from "@nestjs/common";
import { has } from "lodash";
import type { TurmaEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import { AmbienteService } from "@/v2/core/ambiente/application/use-cases/ambiente.service";
import { ArquivoService } from "@/v2/core/arquivo/application/use-cases/arquivo.service";
import { CursoService } from "@/v2/core/curso/application/use-cases/curso.service";
import { ImagemService } from "@/v2/core/imagem/application/use-cases/imagem.service";
import { BaseCrudService } from "@/v2/core/shared";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";
import type {
  TurmaCreateInputDto,
  TurmaFindOneInputDto,
  TurmaFindOneOutputDto,
  TurmaListInputDto,
  TurmaListOutputDto,
  TurmaUpdateInputDto,
} from "@/v2/server/modules/turma/http/dto";
import type { ITurmaRepositoryPort } from "../ports";

@Injectable()
export class TurmaService extends BaseCrudService<
  TurmaEntity,
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
  protected readonly createFields = ["periodo"] as const;
  protected readonly updateFields = ["periodo"] as const;

  constructor(
    @Inject("ITurmaRepositoryPort")
    protected readonly repository: ITurmaRepositoryPort,
    private readonly ambienteService: AmbienteService,
    private readonly cursoService: CursoService,
    private readonly imagemService: ImagemService,
    private readonly arquivoService: ArquivoService,
  ) {
    super();
  }

  async turmaFindAll(
    accessContext: AccessContext,
    dto: TurmaListInputDto | null = null,
    selection?: string[] | boolean,
  ): Promise<TurmaListOutputDto> {
    return this.findAll(accessContext, dto, selection);
  }

  async turmaFindById(
    accessContext: AccessContext | null,
    dto: TurmaFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<TurmaFindOneOutputDto | null> {
    return this.findById(accessContext, dto, selection);
  }

  // Métodos prefixados para compatibilidade

  async turmaFindByIdStrict(
    accessContext: AccessContext | null,
    dto: TurmaFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<TurmaFindOneOutputDto> {
    return this.findByIdStrict(accessContext, dto, selection);
  }

  async turmaFindByIdSimple(
    accessContext: AccessContext,
    id: TurmaFindOneInputDto["id"],
    selection?: string[],
  ): Promise<TurmaFindOneOutputDto | null> {
    return this.findByIdSimple(accessContext, id, selection);
  }

  async turmaFindByIdSimpleStrict(
    accessContext: AccessContext,
    id: TurmaFindOneInputDto["id"],
    selection?: string[],
  ): Promise<TurmaFindOneOutputDto> {
    return this.findByIdSimpleStrict(accessContext, id, selection);
  }

  async turmaCreate(
    accessContext: AccessContext,
    dto: TurmaCreateInputDto,
  ): Promise<TurmaFindOneOutputDto> {
    return this.create(accessContext, dto);
  }

  async turmaUpdate(
    accessContext: AccessContext,
    dto: TurmaFindOneInputDto & TurmaUpdateInputDto,
  ): Promise<TurmaFindOneOutputDto> {
    return this.update(accessContext, dto);
  }

  async turmaDeleteOneById(
    accessContext: AccessContext,
    dto: TurmaFindOneInputDto,
  ): Promise<boolean> {
    return this.deleteOneById(accessContext, dto);
  }

  async turmaGetImagemCapa(
    accessContext: AccessContext | null,
    id: string,
  ): Promise<StreamableFile> {
    const turma = await this.turmaFindByIdStrict(accessContext, { id });

    if (turma.imagemCapa) {
      const [versao] = turma.imagemCapa.versoes;

      if (versao) {
        const { arquivo } = versao;
        return this.arquivoService.getStreamableFile(null, arquivo.id, null);
      }
    }

    throw new NotFoundException();
  }

  async turmaUpdateImagemCapa(
    accessContext: AccessContext,
    dto: TurmaFindOneInputDto,
    file: Express.Multer.File,
  ): Promise<boolean> {
    const currentTurma = await this.turmaFindByIdStrict(accessContext, { id: dto.id });

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

  // Métodos específicos de Turma (não cobertos pela BaseCrudService)

  protected override async beforeCreate(
    accessContext: AccessContext,
    entity: TurmaEntity,
    dto: TurmaCreateInputDto,
  ): Promise<void> {
    if (dto.ambientePadraoAula) {
      const ambientePadraoAula = await this.ambienteService.ambienteFindByIdStrict(accessContext, {
        id: dto.ambientePadraoAula.id,
      });
      this.repository.merge(entity, { ambientePadraoAula: { id: ambientePadraoAula.id } });
    } else {
      this.repository.merge(entity, { ambientePadraoAula: null });
    }

    const curso = await this.cursoService.cursoFindByIdSimpleStrict(accessContext, dto.curso.id);
    this.repository.merge(entity, { curso: { id: curso.id } });
  }

  protected override async beforeUpdate(
    accessContext: AccessContext,
    entity: TurmaEntity,
    dto: TurmaFindOneInputDto & TurmaUpdateInputDto,
  ): Promise<void> {
    if (has(dto, "ambientePadraoAula") && dto.ambientePadraoAula !== undefined) {
      if (dto.ambientePadraoAula !== null) {
        const ambientePadraoAula = await this.ambienteService.ambienteFindByIdStrict(
          accessContext,
          { id: dto.ambientePadraoAula.id },
        );
        this.repository.merge(entity, { ambientePadraoAula: { id: ambientePadraoAula.id } });
      } else {
        this.repository.merge(entity, { ambientePadraoAula: null });
      }
    }

    if (has(dto, "curso") && dto.curso !== undefined) {
      const curso = await this.cursoService.cursoFindByIdSimpleStrict(accessContext, dto.curso.id);
      this.repository.merge(entity, { curso: { id: curso.id } });
    }
  }
}
