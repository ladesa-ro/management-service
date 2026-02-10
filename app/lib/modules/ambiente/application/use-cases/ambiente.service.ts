import { Inject, Injectable, type StreamableFile } from "@nestjs/common";
import type { AccessContext } from "@/modules/@core/access-context";
import {
  AUTHORIZATION_SERVICE_PORT,
  BaseCrudService,
  type IAuthorizationServicePort,
  type PersistInput,
} from "@/modules/@shared";
import { Ambiente, type IAmbiente } from "@/modules/ambiente";
import { ArquivoService } from "@/modules/arquivo/application/use-cases/arquivo.service";
import { BlocoService } from "@/modules/bloco/application/use-cases/bloco.service";
import { ImagemService } from "@/modules/imagem/application/use-cases/imagem.service";
import type {
  AmbienteCreateInputDto,
  AmbienteFindOneInputDto,
  AmbienteFindOneOutputDto,
  AmbienteListInputDto,
  AmbienteListOutputDto,
  AmbienteUpdateInputDto,
} from "../dtos";
import {
  AMBIENTE_REPOSITORY_PORT,
  type IAmbienteRepositoryPort,
  type IAmbienteUseCasePort,
} from "../ports";

@Injectable()
export class AmbienteService
  extends BaseCrudService<
    IAmbiente,
    AmbienteListInputDto,
    AmbienteListOutputDto,
    AmbienteFindOneInputDto,
    AmbienteFindOneOutputDto,
    AmbienteCreateInputDto,
    AmbienteUpdateInputDto
  >
  implements IAmbienteUseCasePort
{
  protected readonly resourceName = "Ambiente";
  protected readonly createAction = "ambiente:create";
  protected readonly updateAction = "ambiente:update";
  protected readonly deleteAction = "ambiente:delete";

  constructor(
    @Inject(AMBIENTE_REPOSITORY_PORT)
    protected readonly repository: IAmbienteRepositoryPort,
    @Inject(AUTHORIZATION_SERVICE_PORT)
    protected readonly authorizationService: IAuthorizationServicePort,
    private readonly blocoService: BlocoService,
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
      "Imagem de capa do Ambiente",
      this.imagemService,
      this.arquivoService,
    );
  }

  async updateImagemCapa(
    accessContext: AccessContext,
    dto: AmbienteFindOneInputDto,
    file: Express.Multer.File,
  ): Promise<boolean> {
    return this.updateImagemField(accessContext, dto.id, file, "imagemCapa", this.imagemService);
  }

  protected async buildCreateData(
    accessContext: AccessContext,
    dto: AmbienteCreateInputDto,
  ): Promise<Partial<PersistInput<IAmbiente>>> {
    const bloco = await this.blocoService.findByIdSimpleStrict(accessContext, dto.bloco.id);
    const domain = Ambiente.criar({
      nome: dto.nome,
      descricao: dto.descricao,
      codigo: dto.codigo,
      capacidade: dto.capacidade,
      tipo: dto.tipo,
      bloco: { id: bloco.id },
    });
    return { ...domain, bloco: { id: bloco.id } };
  }

  protected async buildUpdateData(
    _ac: AccessContext,
    dto: AmbienteFindOneInputDto & AmbienteUpdateInputDto,
    current: AmbienteFindOneOutputDto,
  ): Promise<Partial<PersistInput<IAmbiente>>> {
    const domain = Ambiente.fromData(current);
    domain.atualizar({
      nome: dto.nome,
      descricao: dto.descricao,
      codigo: dto.codigo,
      capacidade: dto.capacidade,
      tipo: dto.tipo,
    });
    return {
      nome: domain.nome,
      descricao: domain.descricao,
      codigo: domain.codigo,
      capacidade: domain.capacidade,
      tipo: domain.tipo,
    };
  }
}
