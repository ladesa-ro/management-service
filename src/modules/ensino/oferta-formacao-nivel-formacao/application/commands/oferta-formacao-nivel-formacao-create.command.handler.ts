import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { ensureExists, type PersistInput } from "@/modules/@shared";
import { NivelFormacao } from "@/modules/ensino/nivel-formacao/domain/nivel-formacao.domain";
import { INivelFormacaoFindOneQueryHandler } from "@/modules/ensino/nivel-formacao/domain/queries/nivel-formacao-find-one.query.handler.interface";
import { OfertaFormacao } from "@/modules/ensino/oferta-formacao/domain/oferta-formacao.domain";
import { IOfertaFormacaoFindOneQueryHandler } from "@/modules/ensino/oferta-formacao/domain/queries/oferta-formacao-find-one.query.handler.interface";
import {
  type IOfertaFormacaoNivelFormacaoCreateCommand,
  IOfertaFormacaoNivelFormacaoCreateCommandHandler,
} from "@/modules/ensino/oferta-formacao-nivel-formacao/domain/commands/oferta-formacao-nivel-formacao-create.command.handler.interface";
import { OfertaFormacaoNivelFormacao } from "@/modules/ensino/oferta-formacao-nivel-formacao/domain/oferta-formacao-nivel-formacao.domain";
import type { IOfertaFormacaoNivelFormacao } from "@/modules/ensino/oferta-formacao-nivel-formacao/domain/oferta-formacao-nivel-formacao.types";
import { IOfertaFormacaoNivelFormacaoPermissionChecker } from "../../domain/authorization";
import type { OfertaFormacaoNivelFormacaoFindOneQueryResult } from "../../domain/queries";
import { IOfertaFormacaoNivelFormacaoRepository } from "../../domain/repositories";
@DeclareImplementation()
export class OfertaFormacaoNivelFormacaoCreateCommandHandlerImpl
  implements IOfertaFormacaoNivelFormacaoCreateCommandHandler
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

  async execute({
    accessContext,
    dto,
  }: IOfertaFormacaoNivelFormacaoCreateCommand): Promise<OfertaFormacaoNivelFormacaoFindOneQueryResult> {
    await this.permissionChecker.ensureCanCreate(accessContext, { dto });

    const createData: Partial<PersistInput<IOfertaFormacaoNivelFormacao>> = {};
    if (dto.ofertaFormacao) {
      const ofertaFormacao = await this.ofertaFormacaoFindOneHandler.execute({
        accessContext,
        dto: { id: dto.ofertaFormacao.id },
      });
      ensureExists(ofertaFormacao, OfertaFormacao.entityName, dto.ofertaFormacao.id);
      createData.ofertaFormacao = { id: ofertaFormacao.id };
    }
    if (dto.nivelFormacao) {
      const nivelFormacao = await this.nivelFormacaoFindOneHandler.execute({
        accessContext,
        dto: { id: dto.nivelFormacao.id },
      });
      ensureExists(nivelFormacao, NivelFormacao.entityName, dto.nivelFormacao.id);
      createData.nivelFormacao = { id: nivelFormacao.id };
    }
    const { id } = await this.repository.createFromDomain(createData as any);

    const result = await this.repository.findById(accessContext, { id });

    ensureExists(result, OfertaFormacaoNivelFormacao.entityName, id);

    return result;
  }
}
