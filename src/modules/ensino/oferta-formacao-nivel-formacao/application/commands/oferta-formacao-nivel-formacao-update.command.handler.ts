import { has } from "lodash";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import { ensureExists, type PersistInput, ResourceNotFoundError } from "@/modules/@shared";
import { INivelFormacaoFindOneQueryHandler } from "@/modules/ensino/nivel-formacao/domain/queries/nivel-formacao-find-one.query.handler.interface";
import { IOfertaFormacaoFindOneQueryHandler } from "@/modules/ensino/oferta-formacao/domain/queries/oferta-formacao-find-one.query.handler.interface";
import type { OfertaFormacaoNivelFormacaoUpdateCommand } from "@/modules/ensino/oferta-formacao-nivel-formacao/domain/commands/oferta-formacao-nivel-formacao-update.command";
import { IOfertaFormacaoNivelFormacaoUpdateCommandHandler } from "@/modules/ensino/oferta-formacao-nivel-formacao/domain/commands/oferta-formacao-nivel-formacao-update.command.handler.interface";
import type { IOfertaFormacaoNivelFormacao } from "@/modules/ensino/oferta-formacao-nivel-formacao/domain/oferta-formacao-nivel-formacao";
import { OfertaFormacaoNivelFormacao } from "@/modules/ensino/oferta-formacao-nivel-formacao/domain/oferta-formacao-nivel-formacao";
import type { OfertaFormacaoNivelFormacaoFindOneQuery } from "@/modules/ensino/oferta-formacao-nivel-formacao/domain/queries";
import { IOfertaFormacaoNivelFormacaoPermissionChecker } from "../../domain/authorization";
import type { OfertaFormacaoNivelFormacaoFindOneQueryResult } from "../../domain/queries";
import { IOfertaFormacaoNivelFormacaoRepository } from "../../domain/repositories";

@DeclareImplementation()
export class OfertaFormacaoNivelFormacaoUpdateCommandHandlerImpl
  implements IOfertaFormacaoNivelFormacaoUpdateCommandHandler
{
  constructor(
    @DeclareDependency(IOfertaFormacaoNivelFormacaoRepository)
    private readonly repository: IOfertaFormacaoNivelFormacaoRepository,
    @DeclareDependency(IOfertaFormacaoNivelFormacaoPermissionChecker)
    private readonly permissionChecker: IOfertaFormacaoNivelFormacaoPermissionChecker,
    @DeclareDependency(IOfertaFormacaoFindOneQueryHandler)
    private readonly ofertaFormacaoFindOneHandler: IOfertaFormacaoFindOneQueryHandler,
    @DeclareDependency(INivelFormacaoFindOneQueryHandler)
    private readonly nivelFormacaoFindOneHandler: INivelFormacaoFindOneQueryHandler,
  ) {}

  async execute(
    accessContext: AccessContext | null,
    dto: OfertaFormacaoNivelFormacaoFindOneQuery & OfertaFormacaoNivelFormacaoUpdateCommand,
  ): Promise<OfertaFormacaoNivelFormacaoFindOneQueryResult> {
    const current = await this.repository.findById(accessContext, { id: dto.id });

    ensureExists(current, OfertaFormacaoNivelFormacao.entityName, dto.id);

    await this.permissionChecker.ensureCanUpdate(accessContext, { dto }, dto.id);

    const updateData: Partial<PersistInput<IOfertaFormacaoNivelFormacao>> = {};
    if (has(dto, "ofertaFormacao") && dto.ofertaFormacao !== undefined) {
      const ofertaFormacao =
        dto.ofertaFormacao &&
        (await this.ofertaFormacaoFindOneHandler.execute(accessContext, {
          id: dto.ofertaFormacao.id,
        }));
      if (dto.ofertaFormacao && !ofertaFormacao) {
        throw new ResourceNotFoundError("OfertaFormacao", dto.ofertaFormacao.id);
      }
      updateData.ofertaFormacao = ofertaFormacao ? { id: ofertaFormacao.id } : undefined;
    }
    if (has(dto, "nivelFormacao") && dto.nivelFormacao !== undefined) {
      const nivelFormacao =
        dto.nivelFormacao &&
        (await this.nivelFormacaoFindOneHandler.execute(accessContext, {
          id: dto.nivelFormacao.id,
        }));
      if (dto.nivelFormacao && !nivelFormacao) {
        throw new ResourceNotFoundError("NivelFormacao", dto.nivelFormacao.id);
      }
      updateData.nivelFormacao = nivelFormacao ? { id: nivelFormacao.id } : undefined;
    }
    await this.repository.update(current.id, updateData);

    const result = await this.repository.findById(accessContext, { id: dto.id });

    ensureExists(result, OfertaFormacaoNivelFormacao.entityName, dto.id);

    return result;
  }
}
