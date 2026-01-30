import { Inject, Injectable, NotFoundException, type StreamableFile } from "@nestjs/common";
import { has } from "lodash";
import type { CursoEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import { ArquivoService } from "@/v2/core/arquivo/application/use-cases/arquivo.service";
import { CampusService } from "@/v2/core/campus/application/use-cases/campus.service";
import { ImagemService } from "@/v2/core/imagem/application/use-cases/imagem.service";
import { OfertaFormacaoService } from "@/v2/core/oferta-formacao/application/use-cases/oferta-formacao.service";
import { BaseCrudService } from "@/v2/core/shared";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";
import type {
  CursoCreateInputDto,
  CursoFindOneInputDto,
  CursoFindOneOutputDto,
  CursoListInputDto,
  CursoListOutputDto,
  CursoUpdateInputDto,
} from "@/v2/server/modules/curso/http/dto";
import type { ICursoRepositoryPort } from "../ports";

@Injectable()
export class CursoService extends BaseCrudService<
  CursoEntity,
  CursoListInputDto,
  CursoListOutputDto,
  CursoFindOneInputDto,
  CursoFindOneOutputDto,
  CursoCreateInputDto,
  CursoUpdateInputDto
> {
  protected readonly resourceName = "Curso";
  protected readonly createAction = "curso:create";
  protected readonly updateAction = "curso:update";
  protected readonly deleteAction = "curso:delete";
  protected readonly createFields = ["nome", "nomeAbreviado"] as const;
  protected readonly updateFields = ["nome", "nomeAbreviado"] as const;

  constructor(
    @Inject("ICursoRepositoryPort")
    protected readonly repository: ICursoRepositoryPort,
    private readonly campusService: CampusService,
    private readonly ofertaFormacaoService: OfertaFormacaoService,
    private readonly imagemService: ImagemService,
    private readonly arquivoService: ArquivoService,
  ) {
    super();
  }

  async cursoFindAll(
    accessContext: AccessContext,
    dto: CursoListInputDto | null = null,
    selection?: string[] | boolean,
  ): Promise<CursoListOutputDto> {
    return this.findAll(accessContext, dto, selection);
  }

  async cursoFindById(
    accessContext: AccessContext | null,
    dto: CursoFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<CursoFindOneOutputDto | null> {
    return this.findById(accessContext, dto, selection);
  }

  // Métodos prefixados para compatibilidade

  async cursoFindByIdStrict(
    accessContext: AccessContext | null,
    dto: CursoFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<CursoFindOneOutputDto> {
    return this.findByIdStrict(accessContext, dto, selection);
  }

  async cursoFindByIdSimple(
    accessContext: AccessContext,
    id: CursoFindOneInputDto["id"],
    selection?: string[],
  ): Promise<CursoFindOneOutputDto | null> {
    return this.findByIdSimple(accessContext, id, selection);
  }

  async cursoFindByIdSimpleStrict(
    accessContext: AccessContext,
    id: CursoFindOneInputDto["id"],
    selection?: string[],
  ): Promise<CursoFindOneOutputDto> {
    return this.findByIdSimpleStrict(accessContext, id, selection);
  }

  async cursoCreate(
    accessContext: AccessContext,
    dto: CursoCreateInputDto,
  ): Promise<CursoFindOneOutputDto> {
    return this.create(accessContext, dto);
  }

  async cursoUpdate(
    accessContext: AccessContext,
    dto: CursoFindOneInputDto & CursoUpdateInputDto,
  ): Promise<CursoFindOneOutputDto> {
    return this.update(accessContext, dto);
  }

  async cursoDeleteOneById(
    accessContext: AccessContext,
    dto: CursoFindOneInputDto,
  ): Promise<boolean> {
    return this.deleteOneById(accessContext, dto);
  }

  async cursoGetImagemCapa(
    accessContext: AccessContext | null,
    id: string,
  ): Promise<StreamableFile> {
    const curso = await this.cursoFindByIdStrict(accessContext, { id });

    if (curso.imagemCapa) {
      const [versao] = curso.imagemCapa.versoes;

      if (versao) {
        const { arquivo } = versao;
        return this.arquivoService.getStreamableFile(null, arquivo.id, null);
      }
    }

    throw new NotFoundException();
  }

  async cursoUpdateImagemCapa(
    accessContext: AccessContext,
    dto: CursoFindOneInputDto,
    file: Express.Multer.File,
  ): Promise<boolean> {
    const currentCurso = await this.cursoFindByIdStrict(accessContext, { id: dto.id });

    await accessContext.ensurePermission(
      "curso:update",
      { dto: { id: currentCurso.id } },
      currentCurso.id,
    );

    const { imagem } = await this.imagemService.saveCursoCapa(file);

    const curso = this.repository.create();
    this.repository.merge(curso, { id: currentCurso.id });
    this.repository.merge(curso, { imagemCapa: { id: imagem.id } });

    await this.repository.save(curso);

    return true;
  }

  // Métodos específicos de Curso (não cobertos pela BaseCrudService)

  protected override async beforeCreate(
    accessContext: AccessContext,
    entity: CursoEntity,
    dto: CursoCreateInputDto,
  ): Promise<void> {
    const campus = await this.campusService.campusFindByIdSimpleStrict(
      accessContext,
      dto.campus.id,
    );
    this.repository.merge(entity, { campus: { id: campus.id } });

    const ofertaFormacao = await this.ofertaFormacaoService.ofertaFormacaoFindByIdSimpleStrict(
      accessContext,
      dto.ofertaFormacao.id,
    );
    this.repository.merge(entity, { ofertaFormacao: { id: ofertaFormacao.id } });
  }

  protected override async beforeUpdate(
    accessContext: AccessContext,
    entity: CursoEntity,
    dto: CursoFindOneInputDto & CursoUpdateInputDto,
  ): Promise<void> {
    if (has(dto, "campus") && dto.campus !== undefined) {
      const campus = await this.campusService.campusFindByIdSimpleStrict(
        accessContext,
        dto.campus.id,
      );
      this.repository.merge(entity, { campus: { id: campus.id } });
    }

    if (has(dto, "ofertaFormacao") && dto.ofertaFormacao !== undefined) {
      const ofertaFormacao = await this.ofertaFormacaoService.ofertaFormacaoFindByIdSimpleStrict(
        accessContext,
        dto.ofertaFormacao.id,
      );
      this.repository.merge(entity, { ofertaFormacao: { id: ofertaFormacao.id } });
    }
  }
}
