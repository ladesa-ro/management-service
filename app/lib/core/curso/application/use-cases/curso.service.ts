import { Inject, Injectable, type StreamableFile } from "@nestjs/common";
import { has } from "lodash";
import { BaseCrudService, ResourceNotFoundError } from "@/core/@shared";
import { ArquivoService } from "@/core/arquivo/application/use-cases/arquivo.service";
import { CampusService } from "@/core/campus";
import {
  CURSO_REPOSITORY_PORT,
  type ICursoRepositoryPort,
  type ICursoUseCasePort,
} from "@/core/curso/application/ports";
import { ImagemService } from "@/core/imagem/application/use-cases/imagem.service";
import { OfertaFormacaoService } from "@/core/oferta-formacao";
import type {
  CursoCreateInputDto,
  CursoFindOneInputDto,
  CursoFindOneOutputDto,
  CursoListInputDto,
  CursoListOutputDto,
  CursoUpdateInputDto,
} from "@/server/nest/modules/curso/rest";
import type { CursoEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";

@Injectable()
export class CursoService
  extends BaseCrudService<
    CursoEntity,
    CursoListInputDto,
    CursoListOutputDto,
    CursoFindOneInputDto,
    CursoFindOneOutputDto,
    CursoCreateInputDto,
    CursoUpdateInputDto
  >
  implements ICursoUseCasePort
{
  protected readonly resourceName = "Curso";
  protected readonly createAction = "curso:create";
  protected readonly updateAction = "curso:update";
  protected readonly deleteAction = "curso:delete";
  protected readonly createFields = ["nome", "nomeAbreviado"] as const;
  protected readonly updateFields = ["nome", "nomeAbreviado"] as const;

  constructor(
    @Inject(CURSO_REPOSITORY_PORT)
    protected readonly repository: ICursoRepositoryPort,
    private readonly campusService: CampusService,
    private readonly ofertaFormacaoService: OfertaFormacaoService,
    private readonly imagemService: ImagemService,
    private readonly arquivoService: ArquivoService,
  ) {
    super();
  }

  async getImagemCapa(accessContext: AccessContext | null, id: string): Promise<StreamableFile> {
    const curso = await this.findByIdStrict(accessContext, { id });

    if (curso.imagemCapa) {
      const arquivoId = await this.imagemService.getLatestArquivoIdForImagem(curso.imagemCapa.id);

      if (arquivoId) {
        return this.arquivoService.getStreamableFile(null, { id: arquivoId });
      }
    }

    throw new ResourceNotFoundError("Imagem de capa do Curso", id);
  }

  async updateImagemCapa(
    accessContext: AccessContext,
    dto: CursoFindOneInputDto,
    file: Express.Multer.File,
  ): Promise<boolean> {
    const currentCurso = await this.findByIdStrict(accessContext, { id: dto.id });

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

  protected override async beforeCreate(
    accessContext: AccessContext,
    entity: CursoEntity,
    dto: CursoCreateInputDto,
  ): Promise<void> {
    const campus = await this.campusService.findByIdSimpleStrict(accessContext, dto.campus.id);
    this.repository.merge(entity, { campus: { id: campus.id } });

    const ofertaFormacao = await this.ofertaFormacaoService.findByIdSimpleStrict(
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
      const campus = await this.campusService.findByIdSimpleStrict(accessContext, dto.campus.id);
      this.repository.merge(entity, { campus: { id: campus.id } });
    }

    if (has(dto, "ofertaFormacao") && dto.ofertaFormacao !== undefined) {
      const ofertaFormacao = await this.ofertaFormacaoService.findByIdSimpleStrict(
        accessContext,
        dto.ofertaFormacao.id,
      );
      this.repository.merge(entity, { ofertaFormacao: { id: ofertaFormacao.id } });
    }
  }
}
