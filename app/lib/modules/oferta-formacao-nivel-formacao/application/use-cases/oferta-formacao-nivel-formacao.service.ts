import { Inject, Injectable } from "@nestjs/common";
import { has } from "lodash";
import type { AccessContext } from "@/modules/@core/access-context";
import { BaseCrudService } from "@/modules/@shared";
import { NivelFormacaoService } from "@/modules/nivel-formacao/application/use-cases/nivel-formacao.service";
import { OfertaFormacaoService } from "@/modules/oferta-formacao";
import type {
  OfertaFormacaoNivelFormacaoCreateInput,
  OfertaFormacaoNivelFormacaoFindOneInput,
  OfertaFormacaoNivelFormacaoFindOneOutput,
  OfertaFormacaoNivelFormacaoListInput,
  OfertaFormacaoNivelFormacaoListOutput,
  OfertaFormacaoNivelFormacaoUpdateInput,
} from "@/modules/oferta-formacao-nivel-formacao/application/dtos";
import {
  type IOfertaFormacaoNivelFormacaoRepositoryPort,
  type IOfertaFormacaoNivelFormacaoUseCasePort,
  OFERTA_FORMACAO_NIVEL_FORMACAO_REPOSITORY_PORT,
} from "@/modules/oferta-formacao-nivel-formacao/application/ports";
import type { OfertaFormacaoNivelFormacaoEntity } from "@/modules/oferta-formacao-nivel-formacao/infrastructure/persistence/typeorm";

@Injectable()
export class OfertaFormacaoNivelFormacaoService
  extends BaseCrudService<
    OfertaFormacaoNivelFormacaoEntity,
    OfertaFormacaoNivelFormacaoListInput,
    OfertaFormacaoNivelFormacaoListOutput,
    OfertaFormacaoNivelFormacaoFindOneInput,
    OfertaFormacaoNivelFormacaoFindOneOutput,
    OfertaFormacaoNivelFormacaoCreateInput,
    OfertaFormacaoNivelFormacaoUpdateInput
  >
  implements IOfertaFormacaoNivelFormacaoUseCasePort
{
  protected readonly resourceName = "OfertaFormacaoNivelFormacao";
  protected readonly createAction = "oferta_formacao_nivel_formacao:create";
  protected readonly updateAction = "oferta_formacao_nivel_formacao:update";
  protected readonly deleteAction = "oferta_formacao_nivel_formacao:delete";
  protected readonly createFields = [] as const;
  protected readonly updateFields = [] as const;

  constructor(
    @Inject(OFERTA_FORMACAO_NIVEL_FORMACAO_REPOSITORY_PORT)
    protected readonly repository: IOfertaFormacaoNivelFormacaoRepositoryPort,
    private readonly ofertaFormacaoService: OfertaFormacaoService,
    private readonly nivelFormacaoService: NivelFormacaoService,
  ) {
    super();
  }

  protected override async beforeCreate(
    accessContext: AccessContext,
    entity: OfertaFormacaoNivelFormacaoEntity,
    dto: OfertaFormacaoNivelFormacaoCreateInput,
  ): Promise<void> {
    if (dto.ofertaFormacao) {
      const ofertaFormacao = await this.ofertaFormacaoService.findByIdStrict(accessContext, {
        id: dto.ofertaFormacao.id,
      });
      this.repository.merge(entity, { ofertaFormacao: { id: ofertaFormacao.id } } as any);
    }

    if (dto.nivelFormacao) {
      const nivelFormacao = await this.nivelFormacaoService.findByIdStrict(accessContext, {
        id: dto.nivelFormacao.id,
      });
      this.repository.merge(entity, { nivelFormacao: { id: nivelFormacao.id } } as any);
    }
  }

  protected override async beforeUpdate(
    accessContext: AccessContext,
    entity: OfertaFormacaoNivelFormacaoEntity,
    dto: OfertaFormacaoNivelFormacaoFindOneInput & OfertaFormacaoNivelFormacaoUpdateInput,
  ): Promise<void> {
    if (has(dto, "ofertaFormacao") && dto.ofertaFormacao !== undefined) {
      const ofertaFormacao =
        dto.ofertaFormacao &&
        (await this.ofertaFormacaoService.findByIdStrict(accessContext, {
          id: dto.ofertaFormacao.id,
        }));
      this.repository.merge(entity, {
        ofertaFormacao: ofertaFormacao && { id: ofertaFormacao.id },
      } as any);
    }

    if (has(dto, "nivelFormacao") && dto.nivelFormacao !== undefined) {
      const nivelFormacao =
        dto.nivelFormacao &&
        (await this.nivelFormacaoService.findByIdStrict(accessContext, {
          id: dto.nivelFormacao.id,
        }));
      this.repository.merge(entity, {
        nivelFormacao: nivelFormacao && { id: nivelFormacao.id },
      } as any);
    }
  }
}
