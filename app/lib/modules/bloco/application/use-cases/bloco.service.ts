import { Inject, Injectable, type StreamableFile } from "@nestjs/common";
import type { AccessContext } from "@/modules/@core/access-context";
import {
  AUTHORIZATION_SERVICE_PORT,
  BaseCrudService,
  type IAuthorizationServicePort,
  type PersistInput,
} from "@/modules/@shared";
import { ArquivoService } from "@/modules/arquivo/application/use-cases/arquivo.service";
import { Bloco, type IBloco } from "@/modules/bloco";
import type {
  BlocoCreateInputDto,
  BlocoFindOneInputDto,
  BlocoFindOneOutputDto,
  BlocoListInputDto,
  BlocoListOutputDto,
  BlocoUpdateInputDto,
} from "@/modules/bloco/application/dtos";
import {
  BLOCO_REPOSITORY_PORT,
  type IBlocoRepositoryPort,
  type IBlocoUseCasePort,
} from "@/modules/bloco/application/ports";
import { CampusService } from "@/modules/campus";
import { ImagemService } from "@/modules/imagem/application/use-cases/imagem.service";

@Injectable()
export class BlocoService
  extends BaseCrudService<
    IBloco,
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
    @Inject(BLOCO_REPOSITORY_PORT)
    protected readonly repository: IBlocoRepositoryPort,
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
  ): Promise<Partial<PersistInput<IBloco>>> {
    const campus = await this.campusService.findByIdSimpleStrict(accessContext, dto.campus.id);
    const domain = Bloco.criar({
      nome: dto.nome,
      codigo: dto.codigo,
      campus: { id: campus.id },
    });
    return { ...domain, campus: { id: campus.id } };
  }

  protected async buildUpdateData(
    _ac: AccessContext,
    dto: BlocoFindOneInputDto & BlocoUpdateInputDto,
    current: BlocoFindOneOutputDto,
  ): Promise<Partial<PersistInput<IBloco>>> {
    const domain = Bloco.fromData(current);
    domain.atualizar({ nome: dto.nome, codigo: dto.codigo });
    return { nome: domain.nome, codigo: domain.codigo };
  }
}
