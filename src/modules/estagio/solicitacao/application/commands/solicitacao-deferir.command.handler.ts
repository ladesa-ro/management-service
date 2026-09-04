import { ConflictError, ResourceNotFoundError } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";
import { CampusEntity } from "@/modules/ambientes/campus/infrastructure.database/typeorm/campus.typeorm.entity";
import { IEmpresaCreateCommandHandler, IEmpresaRepository } from "@/modules/estagio/empresa";
import { EstagioStatus, IEstagioCreateCommandHandler } from "@/modules/estagio/estagio";
import { IEstagioSolicitacaoPermissionChecker } from "../../domain/authorization/estagio-solicitacao-permission-checker.interface";
import {
  type EstagioSolicitacaoDeferirCommand,
  IEstagioSolicitacaoDeferirCommandHandler,
} from "../../domain/commands/solicitacao-deferir.command";
import type { EstagioSolicitacao } from "../../domain/estagio-solicitacao";
import { IEstagioSolicitacaoRepository } from "../../domain/repositories/estagio-solicitacao.repository.interface";

@Impl()
export class EstagioSolicitacaoDeferirCommandHandlerImpl
  implements IEstagioSolicitacaoDeferirCommandHandler
{
  constructor(
    @Dep(IEstagioSolicitacaoRepository)
    private readonly solicitacaoRepository: IEstagioSolicitacaoRepository,
    @Dep(IEstagioSolicitacaoPermissionChecker)
    private readonly permissionChecker: IEstagioSolicitacaoPermissionChecker,
    @Dep(IEmpresaRepository)
    private readonly empresaRepository: IEmpresaRepository,
    @Dep(IEmpresaCreateCommandHandler)
    private readonly empresaCreateHandler: IEmpresaCreateCommandHandler,
    @Dep(IEstagioCreateCommandHandler)
    private readonly estagioCreateHandler: IEstagioCreateCommandHandler,
    @Dep(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: EstagioSolicitacaoDeferirCommand,
  ): Promise<EstagioSolicitacao> {
    const { userId } = await this.permissionChecker.ensureCanManageSolicitacoes(accessContext);

    const solicitacao = await this.solicitacaoRepository.findById(dto.id);
    if (!solicitacao) {
      throw new ResourceNotFoundError("Solicitação de estágio", dto.id);
    }

    if (solicitacao.situacao !== "PENDENTE" && solicitacao.situacao !== "EM_ANALISE") {
      throw new ConflictError(
        `A solicitação não pode ser deferida porque seu estado atual é ${solicitacao.situacao}.`,
      );
    }

    // Determina ou cria a Empresa
    let empresaId = dto.empresaId;

    if (!empresaId) {
      if (solicitacao.tipo === "INTERNO") {
        // Obter dados do campus e seu endereço
        const campusRepo = this.appTypeormConnection.getRepository(CampusEntity);
        const campusEntity = await campusRepo.findOne({
          where: { id: solicitacao.campus.id },
          relations: { endereco: true },
        });

        if (!campusEntity) {
          throw new ResourceNotFoundError("Campus", solicitacao.campus.id);
        }

        const empresaCampus = await this.empresaRepository.findByCnpj(campusEntity.cnpj);
        if (empresaCampus) {
          empresaId = empresaCampus.id;
        } else {
          const novaEmpresa = await this.empresaCreateHandler.execute(accessContext, {
            razaoSocial: campusEntity.razaoSocial,
            nomeFantasia: campusEntity.nomeFantasia,
            cnpj: campusEntity.cnpj.replace(/\D/g, "").padStart(14, "0").slice(0, 14),
            email: "campus@ifro.edu.br",
            telefone: "6932180000",
            endereco: { id: campusEntity.endereco.id },
          });
          empresaId = novaEmpresa.id;
        }
      } else {
        // EXTERNO
        if (!solicitacao.empresaCnpj) {
          throw new ConflictError("CNPJ da empresa externa não foi informado na solicitação.");
        }

        const empresaExistente = await this.empresaRepository.findByCnpj(solicitacao.empresaCnpj);

        if (empresaExistente) {
          empresaId = empresaExistente.id;
        } else {
          // Precisamos de um endereço para criar a empresa
          let enderecoId = dto.empresaEnderecoId;
          if (!enderecoId) {
            const campusRepo = this.appTypeormConnection.getRepository(CampusEntity);
            const campusEntity = await campusRepo.findOne({
              where: { id: solicitacao.campus.id },
              relations: { endereco: true },
            });
            enderecoId = campusEntity?.endereco?.id;
          }

          if (!enderecoId) {
            throw new ConflictError(
              "Não foi possível determinar o endereço da empresa para cadastro. Forneça o empresaEnderecoId.",
            );
          }

          const novaEmpresa = await this.empresaCreateHandler.execute(accessContext, {
            razaoSocial: solicitacao.empresaRazaoSocial ?? "Empresa Parceira",
            nomeFantasia:
              solicitacao.empresaNomeFantasia ||
              solicitacao.empresaRazaoSocial ||
              "Empresa Parceira",
            cnpj: solicitacao.empresaCnpj.replace(/\D/g, "").padStart(14, "0").slice(0, 14),
            email: solicitacao.empresaEmail || "empresa@contato.com",
            telefone: (solicitacao.empresaTelefone || "69999999999").slice(0, 15),
            endereco: { id: enderecoId },
          });
          empresaId = novaEmpresa.id;
        }
      }
    }

    // Cria o estágio vinculado transacionalmente
    const estagio = await this.estagioCreateHandler.execute(accessContext, {
      campus: { id: solicitacao.campus.id },
      empresa: { id: empresaId },
      estagiario: { id: solicitacao.estagiario.id },
      usuarioOrientador: solicitacao.professorOrientador
        ? { id: solicitacao.professorOrientador.id }
        : undefined,
      cargaHoraria: dto.cargaHoraria ?? 30,
      dataInicio: dto.dataInicio ?? new Date().toISOString().slice(0, 10),
      dataFim: dto.dataPrevistaFim,
      nomeSupervisor: solicitacao.supervisorNome,
      emailSupervisor: solicitacao.supervisorEmail,
      telefoneSupervisor: solicitacao.supervisorTelefone,
      status: EstagioStatus.EM_FASE_INICIAL,
      horariosEstagio: [],
    });

    // Atualiza a solicitação
    solicitacao.deferir(userId, estagio.id, empresaId, dto.parecer);
    return await this.solicitacaoRepository.save(solicitacao);
  }
}
