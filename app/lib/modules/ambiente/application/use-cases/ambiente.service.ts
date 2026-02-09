import { Inject, Injectable, type StreamableFile } from "@nestjs/common";
import type { AccessContext } from "@/modules/@core/access-context";
import {
  AUTHORIZATION_SERVICE_PORT,
  BaseCrudService,
  type IAuthorizationServicePort,
} from "@/modules/@shared";
import type { AmbienteEntity } from "@/modules/ambiente/infrastructure/persistence/typeorm";
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

/**
 * Service centralizado para o módulo Ambiente.
 * Estende BaseCrudService para operações CRUD comuns.
 * Implementa IAmbienteUseCasePort para compatibilidade com a interface existente.
 */
@Injectable()
export class AmbienteService
  extends BaseCrudService<
    AmbienteEntity,
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
  protected readonly createFields = ["nome", "descricao", "codigo", "capacidade", "tipo"] as const;
  protected readonly updateFields = ["nome", "descricao", "codigo", "capacidade", "tipo"] as const;

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

  /**
   * Hook para adicionar relacionamento com Bloco durante criação
   */
  protected override async beforeCreate(
    accessContext: AccessContext,
    entity: AmbienteEntity,
    dto: AmbienteCreateInputDto,
  ): Promise<void> {
    const bloco = await this.blocoService.findByIdSimpleStrict(accessContext, dto.bloco.id);
    this.repository.merge(entity, { bloco: { id: bloco.id } });
  }
}
