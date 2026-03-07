import { Inject, Injectable, type StreamableFile } from "@nestjs/common";
import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { BaseCrudService, type PersistInput } from "@/Ladesa.Management.Application/@shared";
import { ArquivoService } from "@/Ladesa.Management.Application/armazenamento/arquivo/application/use-cases/arquivo.service";
import { ImagemService } from "@/Ladesa.Management.Application/armazenamento/imagem/application/use-cases/imagem.service";
import { Disciplina } from "@/Ladesa.Management.Application/ensino/disciplina";
import type {
  DisciplinaCreateInputDto,
  DisciplinaFindOneInputDto,
  DisciplinaFindOneOutputDto,
  DisciplinaListInputDto,
  DisciplinaListOutputDto,
  DisciplinaUpdateInputDto,
} from "@/Ladesa.Management.Application/ensino/disciplina/application/dtos";
import { IDisciplinaRepository } from "@/Ladesa.Management.Application/ensino/disciplina/application/ports";

@Injectable()
export class DisciplinaService extends BaseCrudService<
  Disciplina,
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

  constructor(
    @Inject(IDisciplinaRepository)
    protected readonly repository: IDisciplinaRepository,
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
      "Imagem de capa da Disciplina",
      this.imagemService,
      this.arquivoService,
    );
  }

  async updateImagemCapa(
    accessContext: AccessContext,
    dto: DisciplinaFindOneInputDto,
    file: Express.Multer.File,
  ): Promise<boolean> {
    return this.updateImagemField(accessContext, dto.id, file, "imagemCapa", this.imagemService);
  }

  protected async buildCreateData(
    _ac: AccessContext,
    dto: DisciplinaCreateInputDto,
  ): Promise<Partial<PersistInput<Disciplina>>> {
    const domain = Disciplina.criar({
      nome: dto.nome,
      nomeAbreviado: dto.nomeAbreviado,
      cargaHoraria: dto.cargaHoraria,
    });
    return { ...domain };
  }

  protected async buildUpdateData(
    _ac: AccessContext,
    dto: DisciplinaFindOneInputDto & DisciplinaUpdateInputDto,
    current: DisciplinaFindOneOutputDto,
  ): Promise<Partial<PersistInput<Disciplina>>> {
    const domain = Disciplina.fromData({
      ...current,
      imagemCapaId: current.imagemCapa?.id ?? null,
    } as unknown as Disciplina);
    domain.atualizar({
      nome: dto.nome,
      nomeAbreviado: dto.nomeAbreviado,
      cargaHoraria: dto.cargaHoraria,
    });
    return {
      nome: domain.nome,
      nomeAbreviado: domain.nomeAbreviado,
      cargaHoraria: domain.cargaHoraria,
    };
  }
}
