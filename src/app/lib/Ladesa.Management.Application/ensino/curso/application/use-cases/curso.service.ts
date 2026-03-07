import { Inject, Injectable, type StreamableFile } from "@nestjs/common";
import { has } from "lodash";
import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { BaseCrudService, type PersistInput } from "@/Ladesa.Management.Application/@shared";
import { CampusService } from "@/Ladesa.Management.Application/ambientes/campus";
import { ArquivoService } from "@/Ladesa.Management.Application/armazenamento/arquivo/application/use-cases/arquivo.service";
import { ImagemService } from "@/Ladesa.Management.Application/armazenamento/imagem/application/use-cases/imagem.service";
import { Curso } from "@/Ladesa.Management.Application/ensino/curso";
import {
  ICursoRepository,
  type ICursoUseCasePort,
} from "@/Ladesa.Management.Application/ensino/curso/application/ports";
import { OfertaFormacaoService } from "@/Ladesa.Management.Application/ensino/oferta-formacao";
import { type CursoCreateInputDto } from "@/Ladesa.Management.Domain/Dtos/CursoCreateInputDto";
import { type CursoFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/CursoFindOneInputDto";
import { type CursoFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/CursoFindOneOutputDto";
import { type CursoListInputDto } from "@/Ladesa.Management.Domain/Dtos/CursoListInputDto";
import { type CursoListOutputDto } from "@/Ladesa.Management.Domain/Dtos/CursoListOutputDto";
import { type CursoUpdateInputDto } from "@/Ladesa.Management.Domain/Dtos/CursoUpdateInputDto";

@Injectable()
export class CursoService
  extends BaseCrudService<
    Curso,
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
    @Inject(ICursoRepository)
    protected readonly repository: ICursoRepository,
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
  ): Promise<Partial<PersistInput<Curso>>> {
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
    return { ...domain };
  }

  protected async buildUpdateData(
    accessContext: AccessContext,
    dto: CursoFindOneInputDto & CursoUpdateInputDto,
    current: CursoFindOneOutputDto,
  ): Promise<Partial<PersistInput<Curso>>> {
    const domain = Curso.fromData({
      ...current,
      campusId: current.campus.id,
      ofertaFormacaoId: current.ofertaFormacao.id,
      imagemCapaId: current.imagemCapa?.id ?? null,
    } as unknown as Curso);
    domain.atualizar({ nome: dto.nome, nomeAbreviado: dto.nomeAbreviado });
    const result: Partial<PersistInput<Curso>> = {
      nome: domain.nome,
      nomeAbreviado: domain.nomeAbreviado,
    };

    if (has(dto, "campus") && dto.campus !== undefined) {
      const campus = await this.campusService.findByIdSimpleStrict(accessContext, dto.campus.id);
      result.campusId = campus.id;
    }

    if (has(dto, "ofertaFormacao") && dto.ofertaFormacao !== undefined) {
      const ofertaFormacao = await this.ofertaFormacaoService.findByIdSimpleStrict(
        accessContext,
        dto.ofertaFormacao.id,
      );
      result.ofertaFormacaoId = ofertaFormacao.id;
    }

    return result;
  }
}
