import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { pick } from "lodash";
import type { AccessContext } from "@/infrastructure/access-context";
import type {
  AmbienteCreateInputDto,
  AmbienteFindOneInputDto,
  AmbienteFindOneOutputDto,
  AmbienteListInputDto,
  AmbienteListOutputDto,
  AmbienteUpdateInputDto,
} from "@/v2/adapters/in/http/ambiente/dto";
import type { AmbienteEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import { ArquivoService } from "@/v2/core/arquivo/application/use-cases/arquivo.service";
import { BlocoService } from "@/v2/core/bloco/application/use-cases/bloco.service";
import { ImagemService } from "@/v2/core/imagem/application/use-cases/imagem.service";
import type { IAmbienteRepositoryPort, IAmbienteUseCasePort } from "../ports";

/**
 * Service centralizado para o módulo Ambiente.
 * Implementa todos os use cases definidos em IAmbienteUseCasePort.
 *
 * Por enquanto, toda a lógica fica aqui. Futuramente, pode ser
 * desmembrado em use cases individuais se necessário.
 */
@Injectable()
export class AmbienteService implements IAmbienteUseCasePort {
  constructor(
    @Inject("IAmbienteRepositoryPort")
    private readonly ambienteRepository: IAmbienteRepositoryPort,
    private readonly blocoService: BlocoService,
    private readonly imagemService: ImagemService,
    private readonly arquivoService: ArquivoService,
  ) {}

  async ambienteFindAll(
    accessContext: AccessContext,
    dto: AmbienteListInputDto | null = null,
    selection?: string[] | boolean,
  ): Promise<AmbienteListOutputDto> {
    return this.ambienteRepository.findAll(accessContext, dto, selection);
  }

  async ambienteFindById(
    accessContext: AccessContext | null,
    dto: AmbienteFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<AmbienteFindOneOutputDto | null> {
    return this.ambienteRepository.findById(accessContext, dto, selection);
  }

  async ambienteFindByIdStrict(
    accessContext: AccessContext | null,
    dto: AmbienteFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<AmbienteFindOneOutputDto> {
    const ambiente = await this.ambienteRepository.findById(accessContext, dto, selection);

    if (!ambiente) {
      throw new NotFoundException();
    }

    return ambiente;
  }

  async ambienteCreate(
    accessContext: AccessContext,
    dto: AmbienteCreateInputDto,
  ): Promise<AmbienteFindOneOutputDto> {
    await accessContext.ensurePermission("ambiente:create", { dto } as any);

    const dtoAmbiente = pick(dto, ["nome", "descricao", "codigo", "capacidade", "tipo"]);

    const ambiente = this.ambienteRepository.create();

    this.ambienteRepository.merge(ambiente, {
      ...dtoAmbiente,
    });

    const bloco = await this.blocoService.blocoFindByIdSimpleStrict(accessContext, dto.bloco.id);

    this.ambienteRepository.merge(ambiente, {
      bloco: {
        id: bloco.id,
      },
    });

    await this.ambienteRepository.save(ambiente);

    return this.ambienteFindByIdStrict(accessContext, { id: ambiente.id });
  }

  async ambienteUpdate(
    accessContext: AccessContext,
    dto: AmbienteFindOneInputDto & AmbienteUpdateInputDto,
  ): Promise<AmbienteFindOneOutputDto> {
    const currentAmbiente = await this.ambienteFindByIdStrict(accessContext, dto);

    await accessContext.ensurePermission("ambiente:update", { dto }, dto.id);

    const dtoAmbiente = pick(dto, ["nome", "descricao", "codigo", "capacidade", "tipo"]);

    const ambiente = <AmbienteEntity>{
      id: currentAmbiente.id,
    };

    this.ambienteRepository.merge(ambiente, {
      ...dtoAmbiente,
    });

    await this.ambienteRepository.save(ambiente);

    return this.ambienteFindByIdStrict(accessContext, { id: ambiente.id });
  }

  async ambienteGetImagemCapa(accessContext: AccessContext | null, id: string) {
    const ambiente = await this.ambienteFindByIdStrict(accessContext, { id: id });

    if (ambiente.imagemCapa) {
      const [versao] = ambiente.imagemCapa.versoes;

      if (versao) {
        const { arquivo } = versao;
        return this.arquivoService.getStreamableFile(null, arquivo.id, null);
      }
    }

    throw new NotFoundException();
  }

  async ambienteUpdateImagemCapa(
    accessContext: AccessContext,
    dto: AmbienteFindOneInputDto,
    file: Express.Multer.File,
  ): Promise<boolean> {
    const currentAmbiente = await this.ambienteFindByIdStrict(accessContext, { id: dto.id });

    await accessContext.ensurePermission(
      "ambiente:update",
      {
        dto: {
          id: currentAmbiente.id,
        },
      },
      currentAmbiente.id,
    );

    const { imagem } = await this.imagemService.saveAmbienteCapa(file);

    const ambiente = this.ambienteRepository.create();
    this.ambienteRepository.merge(ambiente, {
      id: currentAmbiente.id,
    });

    this.ambienteRepository.merge(ambiente, {
      imagemCapa: {
        id: imagem.id,
      },
    });

    await this.ambienteRepository.save(ambiente);

    return true;
  }

  async ambienteDeleteOneById(
    accessContext: AccessContext,
    dto: AmbienteFindOneInputDto,
  ): Promise<boolean> {
    await accessContext.ensurePermission("ambiente:delete", { dto }, dto.id);

    const ambiente = await this.ambienteFindByIdStrict(accessContext, dto);

    if (ambiente) {
      await this.ambienteRepository.softDeleteById(ambiente.id);
    }

    return true;
  }
}
