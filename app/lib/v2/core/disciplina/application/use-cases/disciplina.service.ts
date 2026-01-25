import { Inject, Injectable, NotFoundException, type StreamableFile } from "@nestjs/common";
import type { AccessContext } from "@/infrastructure/access-context";
import type {
  DisciplinaCreateInputDto,
  DisciplinaFindOneInputDto,
  DisciplinaFindOneOutputDto,
  DisciplinaListInputDto,
  DisciplinaListOutputDto,
  DisciplinaUpdateInputDto,
} from "@/v2/server/modules/disciplina/http/dto";
import type { DisciplinaEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import { ArquivoService } from "@/v2/core/arquivo/application/use-cases/arquivo.service";
import { ImagemService } from "@/v2/core/imagem/application/use-cases/imagem.service";
import { BaseCrudService } from "@/v2/core/shared";
import type { IDisciplinaRepositoryPort } from "../ports";

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
    @Inject("IDisciplinaRepositoryPort")
    protected readonly repository: IDisciplinaRepositoryPort,
    private readonly imagemService: ImagemService,
    private readonly arquivoService: ArquivoService,
  ) {
    super();
  }

  // Métodos prefixados para compatibilidade

  async disciplinaFindAll(
    accessContext: AccessContext,
    dto: DisciplinaListInputDto | null = null,
    selection?: string[] | boolean,
  ): Promise<DisciplinaListOutputDto> {
    return this.findAll(accessContext, dto, selection);
  }

  async disciplinaFindById(
    accessContext: AccessContext | null,
    dto: DisciplinaFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<DisciplinaFindOneOutputDto | null> {
    return this.findById(accessContext, dto, selection);
  }

  async disciplinaFindByIdStrict(
    accessContext: AccessContext | null,
    dto: DisciplinaFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<DisciplinaFindOneOutputDto> {
    return this.findByIdStrict(accessContext, dto, selection);
  }

  async disciplinaFindByIdSimple(
    accessContext: AccessContext,
    id: DisciplinaFindOneInputDto["id"],
    selection?: string[] | boolean,
  ): Promise<DisciplinaFindOneOutputDto | null> {
    return this.findByIdSimple(accessContext, id, selection);
  }

  async disciplinaFindByIdSimpleStrict(
    accessContext: AccessContext,
    id: DisciplinaFindOneInputDto["id"],
    selection?: string[],
  ): Promise<DisciplinaFindOneOutputDto> {
    return this.findByIdSimpleStrict(accessContext, id, selection);
  }

  async disciplinaCreate(
    accessContext: AccessContext,
    dto: DisciplinaCreateInputDto,
  ): Promise<DisciplinaFindOneOutputDto> {
    return this.create(accessContext, dto);
  }

  async disciplinaUpdate(
    accessContext: AccessContext,
    dto: DisciplinaFindOneInputDto & DisciplinaUpdateInputDto,
  ): Promise<DisciplinaFindOneOutputDto> {
    return this.update(accessContext, dto);
  }

  async disciplinaDeleteOneById(
    accessContext: AccessContext,
    dto: DisciplinaFindOneInputDto,
  ): Promise<boolean> {
    return this.deleteOneById(accessContext, dto);
  }

  // Métodos específicos de Disciplina (não cobertos pela BaseCrudService)

  async disciplinaGetImagemCapa(
    accessContext: AccessContext | null,
    id: string,
  ): Promise<StreamableFile> {
    const disciplina = await this.disciplinaFindByIdStrict(accessContext, { id });

    if (disciplina.imagemCapa) {
      const [versao] = disciplina.imagemCapa.versoes;

      if (versao) {
        const { arquivo } = versao;
        return this.arquivoService.getStreamableFile(null, arquivo.id, null);
      }
    }

    throw new NotFoundException();
  }

  async disciplinaUpdateImagemCapa(
    accessContext: AccessContext,
    dto: DisciplinaFindOneInputDto,
    file: Express.Multer.File,
  ): Promise<boolean> {
    const currentDisciplina = await this.disciplinaFindByIdStrict(accessContext, { id: dto.id });

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
