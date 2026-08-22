import { BadRequestException, ConflictException, ForbiddenException, Logger } from "@nestjs/common";
import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import {
  type IMessageBrokerService,
  IMessageBrokerService as IMessageBrokerServiceToken,
} from "@/domain/abstractions/message-broker";
import { Dep, Impl } from "@/domain/dependency-injection";
import { IEstagiarioRepository } from "@/modules/estagio/estagiario/domain/repositories";
import { EstagioStatus } from "@/modules/estagio/estagio/domain/estagio";
import { IEstagioRepository } from "@/modules/estagio/estagio/domain/repositories";
import type { FolhaPontoCreateCommand } from "../../domain/commands/folha-ponto-create.command";
import { IFolhaPontoCreateCommandHandler } from "../../domain/commands/folha-ponto-create.command.handler.interface";
import { FolhaPonto } from "../../domain/folha-ponto";
import { FolhaPontoToken, FolhaPontoTokenTipo } from "../../domain/folha-ponto-token";
import type { FolhaPontoFindOneQueryResult } from "../../domain/queries";
import { IFolhaPontoRepository, IFolhaPontoTokenRepository } from "../../domain/repositories";

@Impl()
export class FolhaPontoCreateCommandHandlerImpl implements IFolhaPontoCreateCommandHandler {
  private readonly logger = new Logger(FolhaPontoCreateCommandHandlerImpl.name);

  constructor(
    @Dep(IFolhaPontoRepository) private readonly repository: IFolhaPontoRepository,
    @Dep(IFolhaPontoTokenRepository) private readonly tokenRepository: IFolhaPontoTokenRepository,
    @Dep(IEstagioRepository) private readonly estagioRepository: IEstagioRepository,
    @Dep(IEstagiarioRepository) private readonly estagiarioRepository: IEstagiarioRepository,
    @Dep(IMessageBrokerServiceToken)
    private readonly messageBrokerService: IMessageBrokerService,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: FolhaPontoCreateCommand,
  ): Promise<FolhaPontoFindOneQueryResult> {
    // 1. Carregar estágio
    const estagio = await this.estagioRepository.loadById(accessContext, dto.estagio.id);
    ensureExists(estagio, "Estagio", dto.estagio.id);

    // 2. Verificar status EM_ANDAMENTO
    if (estagio.status !== EstagioStatus.EM_ANDAMENTO) {
      throw new BadRequestException(
        `O estágio precisa estar com status EM_ANDAMENTO para registrar ponto.`,
      );
    }

    // 3. Verificar que o telefoneSupervisor está presente
    if (!estagio.telefoneSupervisor) {
      throw new BadRequestException(`O estágio não possui telefone do supervisor cadastrado.`);
    }

    // 4. Verificar autorização
    if (!accessContext?.requestActor?.isSuperUser) {
      if (!estagio.estagiario?.id) {
        throw new ForbiddenException(`Estágio não possui estagiário associado.`);
      }
      const estagiarioResult = await this.estagiarioRepository.getFindOneQueryResult(
        accessContext,
        { id: estagio.estagiario.id },
      );
      const usuarioId = estagiarioResult?.perfil?.usuario?.id;
      if (usuarioId !== accessContext?.requestActor?.id) {
        throw new ForbiddenException(
          `Apenas o estagiário associado ou um administrador pode solicitar folha de ponto.`,
        );
      }
    }

    // 4. Verificar unicidade por data+estagio
    const jaExiste = await this.repository.existsByEstagioAndData(dto.estagio.id, dto.data);
    if (jaExiste) {
      throw new ConflictException(
        `Já existe uma folha de ponto ativa para a data ${dto.data} neste estágio.`,
      );
    }

    // 5. Criar entidade de domínio
    const folhaPonto = FolhaPonto.create(dto);

    // 6. Gerar tokens de uso único
    const ttlHours = parseInt(process.env.FOLHA_PONTO_TOKEN_TTL_HOURS ?? "72", 10);
    const tokenAprovacao = FolhaPontoToken.create(
      folhaPonto.id,
      FolhaPontoTokenTipo.APROVACAO,
      ttlHours,
    );
    const tokenRejeicao = FolhaPontoToken.create(
      folhaPonto.id,
      FolhaPontoTokenTipo.REJEICAO,
      ttlHours,
    );
    const tokenCancelamento = FolhaPontoToken.create(
      folhaPonto.id,
      FolhaPontoTokenTipo.CANCELAMENTO,
      ttlHours,
    );

    // 7. Persistir folhaPonto + tokens
    await this.repository.save(folhaPonto);
    await this.tokenRepository.save(tokenAprovacao);
    await this.tokenRepository.save(tokenRejeicao);
    await this.tokenRepository.save(tokenCancelamento);

    // 8. Obter nome do estagiário para notificação
    let nomeEstagiario = "Estagiário";
    if (estagio.estagiario?.id) {
      const estagiarioResult = await this.estagiarioRepository.getFindOneQueryResult(
        accessContext,
        { id: estagio.estagiario.id },
      );
      if (estagiarioResult?.perfil?.usuario?.nome) {
        nomeEstagiario = estagiarioResult.perfil.usuario.nome;
      }
    }

    // 9. Publicar evento no RabbitMQ
    const payload = {
      folhaPontoId: folhaPonto.id,
      estagioId: estagio.id,
      data: folhaPonto.data,
      horaInicio: folhaPonto.horaInicio,
      horaFim: folhaPonto.horaFim,
      quantidadeHoras: folhaPonto.quantidadeHoras,
      telefoneSupervisor: estagio.telefoneSupervisor,
      nomeSupervisor: estagio.nomeSupervisor ?? "Supervisor",
      nomeEstagiario,
      tokenAprovacaoId: tokenAprovacao.id,
      tokenRejeicaoId: tokenRejeicao.id,
      tokenCancelamentoId: tokenCancelamento.id,
    };

    await this.messageBrokerService.publishFolhaPontoCreated(payload);

    this.logger.log(`FolhaPonto criada: ${folhaPonto.id} para estágio ${estagio.id}`);

    // 9. Retornar resultado formatado
    const result = await this.repository.getFindOneQueryResult(accessContext, {
      id: folhaPonto.id,
    });
    ensureExists(result, FolhaPonto.entityName, folhaPonto.id);
    return result!;
  }
}
