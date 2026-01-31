import { Inject, Injectable } from "@nestjs/common";
import { pick } from "lodash";
import { ResourceNotFoundError } from "@/modules/@shared";
import {
  NivelFormacaoCreateInput,
  NivelFormacaoFindOneInput,
  NivelFormacaoFindOneOutput,
  NivelFormacaoListInput,
  NivelFormacaoListOutput,
  NivelFormacaoUpdateInput,
} from "@/modules/nivel-formacao/application/dtos";
import {
  type INivelFormacaoRepositoryPort,
  type INivelFormacaoUseCasePort,
  NIVEL_FORMACAO_REPOSITORY_PORT,
} from "@/modules/nivel-formacao/application/ports";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";

@Injectable()
export class NivelFormacaoService implements INivelFormacaoUseCasePort {
  constructor(
    @Inject(NIVEL_FORMACAO_REPOSITORY_PORT)
    private readonly nivelFormacaoRepository: INivelFormacaoRepositoryPort,
  ) {}

  async findAll(
    accessContext: AccessContext,
    dto: NivelFormacaoListInput | null = null,
  ): Promise<NivelFormacaoListOutput> {
    return this.nivelFormacaoRepository.findAll(accessContext, dto);
  }

  async findById(
    accessContext: AccessContext,
    dto: NivelFormacaoFindOneInput,
  ): Promise<NivelFormacaoFindOneOutput | null> {
    return this.nivelFormacaoRepository.findById(accessContext, dto);
  }

  async findByIdStrict(
    accessContext: AccessContext,
    dto: NivelFormacaoFindOneInput,
  ): Promise<NivelFormacaoFindOneOutput> {
    const nivelFormacao = await this.nivelFormacaoRepository.findById(accessContext, dto);

    if (!nivelFormacao) {
      throw new ResourceNotFoundError("NivelFormacao", dto.id);
    }

    return nivelFormacao;
  }

  async create(
    accessContext: AccessContext,
    dto: NivelFormacaoCreateInput,
  ): Promise<NivelFormacaoFindOneOutput> {
    const dtoNivelFormacao = pick(dto, ["slug"]);

    const nivelFormacao = this.nivelFormacaoRepository.create();
    this.nivelFormacaoRepository.merge(nivelFormacao, { ...dtoNivelFormacao });

    await this.nivelFormacaoRepository.save(nivelFormacao);

    return this.findByIdStrict(accessContext, { id: nivelFormacao.id });
  }

  async update(
    accessContext: AccessContext,
    dto: NivelFormacaoFindOneInput & NivelFormacaoUpdateInput,
  ): Promise<NivelFormacaoFindOneOutput> {
    const nivelFormacao = await this.findByIdStrict(accessContext, { id: dto.id });

    const dtoNivelFormacao = pick(dto, ["slug"]);
    const entity = this.nivelFormacaoRepository.create();
    this.nivelFormacaoRepository.merge(entity, { id: nivelFormacao.id, ...dtoNivelFormacao });

    await this.nivelFormacaoRepository.save(entity);

    return this.findByIdStrict(accessContext, { id: dto.id });
  }

  async deleteOneById(
    accessContext: AccessContext,
    dto: NivelFormacaoFindOneInput,
  ): Promise<boolean> {
    await this.findByIdStrict(accessContext, dto);
    await this.nivelFormacaoRepository.softDeleteById(dto.id);
    return true;
  }

  async findByIdSimpleStrict(
    accessContext: AccessContext,
    id: string,
  ): Promise<NivelFormacaoFindOneOutput> {
    return this.findByIdStrict(accessContext, { id });
  }
}
