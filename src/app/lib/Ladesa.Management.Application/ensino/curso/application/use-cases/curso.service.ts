import { Inject, Injectable, type StreamableFile } from "@nestjs/common";
import { has } from "lodash";
import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { BaseCrudService, type PersistInput } from "@/Ladesa.Management.Application/@shared";
import { CampusService } from "@/Ladesa.Management.Application/ambientes/campus";
import { ArquivoService } from "@/Ladesa.Management.Application/armazenamento/arquivo/application/use-cases/arquivo.service";
import { ImagemService } from "@/Ladesa.Management.Application/armazenamento/imagem/application/use-cases/imagem.service";
import { Curso, type ICurso } from "@/Ladesa.Management.Application/ensino/curso";
import type {
  CursoCreateInputDto,
  CursoFindOneInputDto,
  CursoFindOneOutputDto,
  CursoListInputDto,
  CursoListOutputDto,
  CursoUpdateInputDto,
} from "@/Ladesa.Management.Application/ensino/curso/application/dtos";
import {
  CURSO_REPOSITORY_PORT,
  type ICursoRepositoryPort,
  type ICursoUseCasePort,
} from "@/Ladesa.Management.Application/ensino/curso/application/ports";
import { OfertaFormacaoService } from "@/Ladesa.Management.Application/ensino/oferta-formacao";

@Injectable()
export class CursoService
  extends BaseCrudService<
    ICurso,
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
    return this.getImagemField(
      accessContext,
      id,
      "imagemCapa",
      "Imagem de capa do Curso",
      this.imagemService,
      this.arquivoService,
    );
  }

  async updateImagemCapa(
    accessContext: AccessContext,
    dto: CursoFindOneInputDto,
    file: Express.Multer.File,
  ): Promise<boolean> {
    return this.updateImagemField(accessContext, dto.id, file, "imagemCapa", this.imagemService);
  }

  protected async buildCreateData(
    accessContext: AccessContext,
    dto: CursoCreateInputDto,
  ): Promise<Partial<PersistInput<ICurso>>> {
    const campus = await this.campusService.findByIdSimpleStrict(accessContext, dto.campus.id);
    const ofertaFormacao = await this.ofertaFormacaoService.findByIdSimpleStrict(
      accessContext,
      dto.ofertaFormacao.id,
    );
    const domain = Curso.criar({
      nome: dto.nome,
      nomeAbreviado: dto.nomeAbreviado,
      campus: { id: campus.id },
      ofertaFormacao: { id: ofertaFormacao.id },
    });
    return {
      ...domain,
      campus: { id: campus.id },
      ofertaFormacao: { id: ofertaFormacao.id },
    };
  }

  protected async buildUpdateData(
    accessContext: AccessContext,
    dto: CursoFindOneInputDto & CursoUpdateInputDto,
    current: CursoFindOneOutputDto,
  ): Promise<Partial<PersistInput<ICurso>>> {
    const domain = Curso.fromData(current);
    domain.atualizar({ nome: dto.nome, nomeAbreviado: dto.nomeAbreviado });
    const result: Partial<PersistInput<ICurso>> = {
      nome: domain.nome,
      nomeAbreviado: domain.nomeAbreviado,
    };

    if (has(dto, "campus") && dto.campus !== undefined) {
      const campus = await this.campusService.findByIdSimpleStrict(accessContext, dto.campus.id);
      result.campus = { id: campus.id };
    }

    if (has(dto, "ofertaFormacao") && dto.ofertaFormacao !== undefined) {
      const ofertaFormacao = await this.ofertaFormacaoService.findByIdSimpleStrict(
        accessContext,
        dto.ofertaFormacao.id,
      );
      result.ofertaFormacao = { id: ofertaFormacao.id };
    }

    return result;
  }
}
