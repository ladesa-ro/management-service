import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { ensureExists } from "@/modules/@shared";
import { Modalidade } from "@/modules/ensino/modalidade/domain/modalidade.domain";
import { IModalidadeFindOneQueryHandler } from "@/modules/ensino/modalidade/domain/queries/modalidade-find-one.query.handler.interface";
import {
  type IOfertaFormacaoCreateCommand,
  IOfertaFormacaoCreateCommandHandler,
} from "@/modules/ensino/oferta-formacao/domain/commands/oferta-formacao-create.command.handler.interface";
import { OfertaFormacao } from "@/modules/ensino/oferta-formacao/domain/oferta-formacao.domain";
import { IOfertaFormacaoPermissionChecker } from "../../domain/authorization";
import { IOfertaFormacaoRepository } from "../../domain/repositories";
import type { OfertaFormacaoFindOneOutputDto } from "../dtos";

@DeclareImplementation()
export class OfertaFormacaoCreateCommandHandlerImpl implements IOfertaFormacaoCreateCommandHandler {
  constructor(
    @DeclareDependency(IOfertaFormacaoRepository)
    private readonly repository: IOfertaFormacaoRepository,
    @DeclareDependency(IOfertaFormacaoPermissionChecker)
    private readonly permissionChecker: IOfertaFormacaoPermissionChecker,
    @DeclareDependency(IModalidadeFindOneQueryHandler)
    private readonly modalidadeFindOneHandler: IModalidadeFindOneQueryHandler,
  ) {}

  async execute({
    accessContext,
    dto,
  }: IOfertaFormacaoCreateCommand): Promise<OfertaFormacaoFindOneOutputDto> {
    await this.permissionChecker.ensureCanCreate(accessContext, { dto });

    let modalidadeRef: { id: string } | undefined;
    if (dto.modalidade) {
      const modalidade = await this.modalidadeFindOneHandler.execute({
        accessContext,
        dto: { id: dto.modalidade.id },
      });
      ensureExists(modalidade, Modalidade.entityName, dto.modalidade.id);
      modalidadeRef = { id: modalidade.id };
    }
    const domain = OfertaFormacao.criar({
      nome: dto.nome,
      slug: dto.slug,
      modalidade: modalidadeRef,
    });
    const { id } = await this.repository.createFromDomain({
      ...domain,
      ...(modalidadeRef ? { modalidade: modalidadeRef } : {}),
    });

    const result = await this.repository.findById(accessContext, { id });

    ensureExists(result, OfertaFormacao.entityName, id);

    return result;
  }
}
