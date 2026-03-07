import { Inject, Injectable, type StreamableFile } from "@nestjs/common";
import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import {
  AUTHORIZATION_SERVICE_PORT,
  BaseCrudService,
  type IAuthorizationServicePort,
  type PersistInput,
} from "@/Ladesa.Management.Application/@shared";
import { Ambiente } from "@/Ladesa.Management.Application/ambientes/ambiente";
import { BlocoService } from "@/Ladesa.Management.Application/ambientes/bloco/application/use-cases/bloco.service";
import { ArquivoService } from "@/Ladesa.Management.Application/armazenamento/arquivo/application/use-cases/arquivo.service";
import { ImagemService } from "@/Ladesa.Management.Application/armazenamento/imagem/application/use-cases/imagem.service";
import type {
  AmbienteCreateInputDto,
  AmbienteFindOneInputDto,
  AmbienteFindOneOutputDto,
  AmbienteListInputDto,
  AmbienteListOutputDto,
  AmbienteUpdateInputDto,
} from "../dtos";
import { IAmbienteRepository, type IAmbienteUseCasePort } from "../ports";

@Injectable()
export class AmbienteService
  extends BaseCrudService<
    Ambiente,
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
    @Inject(IAmbienteRepository)
    protected readonly repository: IAmbienteRepository,
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
  ): Promise<Partial<PersistInput<Ambiente>>> {
    const bloco = await this.blocoService.findByIdSimpleStrict(accessContext, dto.bloco.id);
    const domain = Ambiente.criar({
      nome: dto.nome,
      descricao: dto.descricao,
      codigo: dto.codigo,
      capacidade: dto.capacidade,
      tipo: dto.tipo,
      bloco: { id: bloco.id },
    });
    return { ...domain };
  }

  protected async buildUpdateData(
    _ac: AccessContext,
    dto: AmbienteFindOneInputDto & AmbienteUpdateInputDto,
    current: AmbienteFindOneOutputDto,
  ): Promise<Partial<PersistInput<Ambiente>>> {
    const domain = Ambiente.fromData({
      ...current,
      blocoId: current.bloco.id,
      imagemCapaId: current.imagemCapa?.id ?? null,
    } as unknown as Ambiente);
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
