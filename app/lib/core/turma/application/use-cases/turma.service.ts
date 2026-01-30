import { Inject, Injectable, NotFoundException, type StreamableFile } from "@nestjs/common";
import { has } from "lodash";
import { ArquivoService } from "@/core/arquivo/application/use-cases/arquivo.service";
import { CursoService } from "@/core/curso";
import { ImagemService } from "@/core/imagem/application/use-cases/imagem.service";
import type { TurmaEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import { DatabaseContextService } from "@/v2/adapters/out/persistence/typeorm";
import { AmbienteService } from "@/core/ambiente/application/use-cases/ambiente.service";
import { BaseCrudService } from "@/v2/core/shared";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";
import type {
  TurmaCreateInput,
  TurmaFindOneInput,
  TurmaFindOneOutput,
  TurmaListInput,
  TurmaListOutput,
  TurmaUpdateInput,
} from "../dtos";
import { TURMA_REPOSITORY_PORT, type ITurmaRepositoryPort } from "../ports";

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
    private readonly databaseContext: DatabaseContextService,
  ) {
    super();
  }

  async turmaFindAll(
    accessContext: AccessContext,
    dto: TurmaListInput | null = null,
    selection?: string[] | boolean,
  ): Promise<TurmaListOutput> {
    return this.findAll(accessContext, dto, selection);
  }

  async turmaFindById(
    accessContext: AccessContext | null,
    dto: TurmaFindOneInput,
    selection?: string[] | boolean,
  ): Promise<TurmaFindOneOutput | null> {
    return this.findById(accessContext, dto, selection);
  }

  // Métodos prefixados para compatibilidade

  async turmaFindByIdStrict(
    accessContext: AccessContext | null,
    dto: TurmaFindOneInput,
    selection?: string[] | boolean,
  ): Promise<TurmaFindOneOutput> {
    return this.findByIdStrict(accessContext, dto, selection);
  }

  async turmaFindByIdSimple(
    accessContext: AccessContext,
    id: TurmaFindOneInput["id"],
    selection?: string[],
  ): Promise<TurmaFindOneOutput | null> {
    return this.findByIdSimple(accessContext, id, selection);
  }

  async turmaFindByIdSimpleStrict(
    accessContext: AccessContext,
    id: TurmaFindOneInput["id"],
    selection?: string[],
  ): Promise<TurmaFindOneOutput> {
    return this.findByIdSimpleStrict(accessContext, id, selection);
  }

  async turmaCreate(
    accessContext: AccessContext,
    dto: TurmaCreateInput,
  ): Promise<TurmaFindOneOutput> {
    return this.create(accessContext, dto);
  }

  async turmaUpdate(
    accessContext: AccessContext,
    dto: TurmaFindOneInput & TurmaUpdateInput,
  ): Promise<TurmaFindOneOutput> {
    return this.update(accessContext, dto);
  }

  async turmaDeleteOneById(
    accessContext: AccessContext,
    dto: TurmaFindOneInput,
  ): Promise<boolean> {
    return this.deleteOneById(accessContext, dto);
  }

  async turmaGetImagemCapa(
    accessContext: AccessContext | null,
    id: string,
  ): Promise<StreamableFile> {
    const turma = await this.turmaFindByIdStrict(accessContext, { id });

    if (turma.imagemCapa) {
      // Load versoes separately since it's a OneToMany relation not loaded via QbEfficientLoad
      const versao = await this.databaseContext.imagemArquivoRepository.findOne({
        where: { imagem: { id: turma.imagemCapa.id } },
        relations: { arquivo: true },
        order: { dateCreated: "DESC" },
      });

      if (versao) {
        const { arquivo } = versao;
        return this.arquivoService.getStreamableFile(null, { id: arquivo.id });
      }
    }

    throw new NotFoundException();
  }

  async turmaUpdateImagemCapa(
    accessContext: AccessContext,
    dto: TurmaFindOneInput,
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
    dto: TurmaCreateInput,
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
    dto: TurmaFindOneInput & TurmaUpdateInput,
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
