import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { pick } from "lodash";
import type { AccessContext } from "@/infrastructure/access-context";
import type { NivelFormacaoEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import type {
  NivelFormacaoCreateInputDto,
  NivelFormacaoFindOneInputDto,
  NivelFormacaoFindOneOutputDto,
  NivelFormacaoListInputDto,
  NivelFormacaoListOutputDto,
  NivelFormacaoUpdateInputDto,
} from "@/v2/adapters/in/http/nivel-formacao/dto";
import type { INivelFormacaoRepositoryPort } from "../ports";

@Injectable()
export class NivelFormacaoService {
  constructor(
    @Inject("INivelFormacaoRepositoryPort")
    private nivelFormacaoRepository: INivelFormacaoRepositoryPort,
  ) {}

  async nivelFormacaoFindAll(
    accessContext: AccessContext,
    dto: NivelFormacaoListInputDto | null = null,
    selection?: string[],
  ): Promise<NivelFormacaoListOutputDto> {
    return this.nivelFormacaoRepository.findAll(accessContext, dto, selection);
  }

  async nivelFormacaoFindById(
    accessContext: AccessContext | null,
    dto: NivelFormacaoFindOneInputDto,
    selection?: string[],
  ): Promise<NivelFormacaoFindOneOutputDto | null> {
    return this.nivelFormacaoRepository.findById(accessContext, dto, selection);
  }

  async nivelFormacaoFindByIdStrict(
    accessContext: AccessContext,
    dto: NivelFormacaoFindOneInputDto,
    selection?: string[],
  ): Promise<NivelFormacaoFindOneOutputDto> {
    const nivelFormacao = await this.nivelFormacaoRepository.findById(accessContext, dto, selection);

    if (!nivelFormacao) {
      throw new NotFoundException();
    }

    return nivelFormacao;
  }

  async nivelFormacaoFindByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<NivelFormacaoFindOneOutputDto | null> {
    return this.nivelFormacaoRepository.findByIdSimple(accessContext, id, selection);
  }

  async nivelFormacaoFindByIdSimpleStrict(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<NivelFormacaoFindOneOutputDto> {
    const nivelFormacao = await this.nivelFormacaoRepository.findByIdSimple(accessContext, id, selection);

    if (!nivelFormacao) {
      throw new NotFoundException();
    }

    return nivelFormacao;
  }

  async nivelFormacaoCreate(
    accessContext: AccessContext,
    dto: NivelFormacaoCreateInputDto,
  ): Promise<NivelFormacaoFindOneOutputDto> {
    await accessContext.ensurePermission("nivel_formacao:create", { dto } as any);

    const dtoNivelFormacao = pick(dto, ["slug"]);

    const nivelFormacao = this.nivelFormacaoRepository.create();

    this.nivelFormacaoRepository.merge(nivelFormacao, {
      ...dtoNivelFormacao,
    });

    await this.nivelFormacaoRepository.save(nivelFormacao);

    return this.nivelFormacaoFindByIdStrict(accessContext, {
      id: nivelFormacao.id,
    });
  }

  async nivelFormacaoUpdate(
    accessContext: AccessContext,
    dto: NivelFormacaoFindOneInputDto & NivelFormacaoUpdateInputDto,
  ): Promise<NivelFormacaoFindOneOutputDto> {
    const currentNivelFormacao = await this.nivelFormacaoFindByIdStrict(accessContext, { id: dto.id });

    await accessContext.ensurePermission("nivel_formacao:update", { dto }, dto.id);

    const dtoNivelFormacao = pick(dto, ["slug"]);

    const nivelFormacao = <NivelFormacaoEntity>{
      id: currentNivelFormacao.id,
    };

    this.nivelFormacaoRepository.merge(nivelFormacao, {
      ...dtoNivelFormacao,
    });

    await this.nivelFormacaoRepository.save(nivelFormacao);

    return this.nivelFormacaoFindByIdStrict(accessContext, {
      id: nivelFormacao.id,
    });
  }

  async nivelFormacaoDeleteOneById(
    accessContext: AccessContext,
    dto: NivelFormacaoFindOneInputDto,
  ): Promise<boolean> {
    await accessContext.ensurePermission("nivel_formacao:delete", { dto }, dto.id);

    const nivelFormacao = await this.nivelFormacaoFindByIdStrict(accessContext, dto);

    if (nivelFormacao) {
      await this.nivelFormacaoRepository.softDeleteById(nivelFormacao.id);
    }

    return true;
  }
}
