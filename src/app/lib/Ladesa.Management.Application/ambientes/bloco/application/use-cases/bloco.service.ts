import { Inject, Injectable, type StreamableFile } from "@nestjs/common";
import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import {
  AUTHORIZATION_SERVICE_PORT,
  BaseCrudService,
  type IAuthorizationServicePort,
  type PersistInput,
} from "@/Ladesa.Management.Application/@shared";
import { Bloco } from "@/Ladesa.Management.Application/ambientes/bloco";
import type {
  BlocoCreateInputDto,
  BlocoFindOneInputDto,
  BlocoFindOneOutputDto,
  BlocoListInputDto,
  BlocoListOutputDto,
  BlocoUpdateInputDto,
} from "@/Ladesa.Management.Application/ambientes/bloco/application/dtos";
import {
  IBlocoRepository,
  type IBlocoUseCasePort,
} from "@/Ladesa.Management.Application/ambientes/bloco/application/ports";
import { CampusService } from "@/Ladesa.Management.Application/ambientes/campus";
import { ArquivoService } from "@/Ladesa.Management.Application/armazenamento/arquivo/application/use-cases/arquivo.service";
import { ImagemService } from "@/Ladesa.Management.Application/armazenamento/imagem/application/use-cases/imagem.service";

@Injectable()
export class BlocoService
  extends BaseCrudService<
    Bloco,
    BlocoListInputDto,
    BlocoListOutputDto,
    BlocoFindOneInputDto,
    BlocoFindOneOutputDto,
    BlocoCreateInputDto,
    BlocoUpdateInputDto
  >
  implements IBlocoUseCasePort
{
  protected readonly resourceName = "Bloco";
  protected readonly createAction = "bloco:create";
  protected readonly updateAction = "bloco:update";
  protected readonly deleteAction = "bloco:delete";

  constructor(
    @Inject(IBlocoRepository)
    protected readonly repository: IBlocoRepository,
    @Inject(AUTHORIZATION_SERVICE_PORT)
    protected readonly authorizationService: IAuthorizationServicePort,
    private readonly campusService: CampusService,
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
      "Imagem de capa do Bloco",
      this.imagemService,
      this.arquivoService,
    );
  }

  async updateImagemCapa(
    accessContext: AccessContext,
    dto: BlocoFindOneInputDto,
    file: Express.Multer.File,
  ): Promise<boolean> {
    return this.updateImagemField(accessContext, dto.id, file, "imagemCapa", this.imagemService);
  }

  protected async buildCreateData(
    accessContext: AccessContext,
    dto: BlocoCreateInputDto,
  ): Promise<Partial<PersistInput<Bloco>>> {
    const campus = await this.campusService.findByIdSimpleStrict(accessContext, dto.campus.id);
    const domain = Bloco.criar({
      nome: dto.nome,
      codigo: dto.codigo,
      campus: { id: campus.id },
    });
    return { ...domain };
  }

  protected async buildUpdateData(
    _ac: AccessContext,
    dto: BlocoFindOneInputDto & BlocoUpdateInputDto,
    current: BlocoFindOneOutputDto,
  ): Promise<Partial<PersistInput<Bloco>>> {
    const domain = Bloco.fromData({
      ...current,
      campusId: current.campus.id,
      imagemCapaId: current.imagemCapa?.id ?? null,
    } as unknown as Bloco);
    domain.atualizar({ nome: dto.nome, codigo: dto.codigo });
    return { nome: domain.nome, codigo: domain.codigo };
  }
}
