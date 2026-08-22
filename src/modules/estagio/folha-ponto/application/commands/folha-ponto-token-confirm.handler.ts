import { ConflictException, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { IsNull, Not } from "typeorm";
import { Dep } from "@/domain/dependency-injection";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";
import { getNowISO } from "@/utils/date";
import { FolhaPonto } from "../../domain/folha-ponto";
import { FolhaPontoToken, FolhaPontoTokenTipo } from "../../domain/folha-ponto-token";
import { IFolhaPontoRepository, IFolhaPontoTokenRepository } from "../../domain/repositories";
import { FolhaPontoTypeormEntity } from "../../infrastructure.database/typeorm/folha-ponto.typeorm.entity";
import { FolhaPontoTypeormMapper } from "../../infrastructure.database/typeorm/folha-ponto.typeorm.mapper";
import { FolhaPontoTokenTypeormEntity } from "../../infrastructure.database/typeorm/folha-ponto-token.typeorm.entity";
import { FolhaPontoTokenTypeormMapper } from "../../infrastructure.database/typeorm/folha-ponto-token.typeorm.mapper";

/**
 * Handler usado diretamente pelo REST Controller (sem DTO/CQRS estrito),
 * pois trata-se de um endpoint público de webhook/confirmação sem IAccessContext.
 */
@Injectable()
export class FolhaPontoTokenConfirmHandler {
  private readonly logger = new Logger(FolhaPontoTokenConfirmHandler.name);

  constructor(
    @Dep(IFolhaPontoRepository) private readonly repository: IFolhaPontoRepository,
    @Dep(IFolhaPontoTokenRepository) private readonly tokenRepository: IFolhaPontoTokenRepository,
    @Dep(IAppTypeormConnection) private readonly dataSource: IAppTypeormConnection,
  ) {}

  /**
   * Confirma a ação validando o token. Usa Pessimistic Lock na transação.
   * TODAS as operações de leitura e escrita usam o EntityManager da transação
   * para evitar deadlocks com conexões separadas do pool.
   */
  async confirmar(
    tokenId: string,
    ip: string | null,
    userAgent: string | null,
  ): Promise<{ acao: FolhaPontoTokenTipo; folhaPontoId: string; folhaPonto: FolhaPonto }> {
    return this.dataSource.transaction(async (manager) => {
      const tokenRepo = manager.getRepository(FolhaPontoTokenTypeormEntity);
      const folhaPontoRepo = manager.getRepository(FolhaPontoTypeormEntity);

      // 1. Pessimistic Lock no token para evitar duplo-clique.
      // IMPORTANTE: não carregar relations junto com o lock — o PostgreSQL não aceita
      // FOR UPDATE em outer joins ("cannot be applied to the nullable side of an outer join").
      const tokenEntity = await tokenRepo.findOne({
        where: { id: tokenId },
        lock: { mode: "pessimistic_write" },
      });
      if (!tokenEntity) {
        throw new NotFoundException("Token não encontrado.");
      }

      // Convertemos a entidade TypeORM para domínio para aplicar regras
      const token = FolhaPontoTokenTypeormMapper.entityToDomain.map(tokenEntity);

      if (token.isUsed()) {
        this.logger.warn(`Tentativa de reuso de token: ${tokenId} IP: ${ip}`);
        throw new ConflictException("Este link já foi utilizado anteriormente.");
      }
      if (token.isExpired()) {
        this.logger.warn(`Token expirado: ${tokenId} IP: ${ip}`);
        // 410 Gone Exception customizada - NestJS tem HTTP exceptions base, usaremos Conflict ou BadRequest
        throw new ConflictException("Este link expirou e não pode mais ser utilizado.");
      }

      const folhaPontoEntity = await folhaPontoRepo.findOne({
        where: { id: token.folhaPonto.id, dateDeleted: IsNull() },
        lock: { mode: "pessimistic_write" },
      });
      if (!folhaPontoEntity) {
        throw new NotFoundException("Folha de ponto não encontrada.");
      }

      const folhaPonto = FolhaPontoTypeormMapper.entityToDomain.map(folhaPontoEntity);

      // 2. Aplicar ação no domínio da FolhaPonto
      switch (token.tipo) {
        case FolhaPontoTokenTipo.APROVACAO:
          folhaPonto.approve();
          break;
        case FolhaPontoTokenTipo.REJEICAO:
          folhaPonto.reject();
          break;
        case FolhaPontoTokenTipo.CANCELAMENTO:
          folhaPonto.cancel();
          break;
      }

      // 3. Marcar token como consumido
      token.use(ip, userAgent);

      // 4. Salvar tudo USANDO O MESMO MANAGER DA TRANSAÇÃO (evita deadlock com conexões externas)
      const folhaPontoPersistence = FolhaPontoTypeormMapper.domainToPersistence.map(folhaPonto);
      await folhaPontoRepo.save(folhaPontoPersistence);

      await tokenRepo.update(
        { id: token.id },
        {
          usedAt: token.usedAt,
          ipAddress: token.ipAddress,
          userAgent: token.userAgent,
        },
      );

      await tokenRepo.update(
        {
          folhaPontoId: folhaPonto.id,
          id: Not(token.id),
          usedAt: IsNull(),
        },
        {
          usedAt: getNowISO(),
          userAgent: "System Cascade Invalidation",
        },
      );

      this.logger.log(`Token ${token.tipo} confirmado. FolhaPonto: ${folhaPonto.id}`);
      return { acao: token.tipo, folhaPontoId: folhaPonto.id, folhaPonto };
    });
  }

  /**
   * Apenas valida o estado atual do token para exibição na página, sem confirmar.
   */
  async validar(tokenId: string): Promise<{ token: FolhaPontoToken; folhaPonto: FolhaPonto }> {
    const token = await this.tokenRepository.findById(tokenId);

    if (!token) {
      throw new NotFoundException("Token não encontrado.");
    }
    if (token.isUsed()) {
      throw new ConflictException("Este link já foi utilizado anteriormente.");
    }
    if (token.isExpired()) {
      throw new ConflictException("Este link expirou e não pode mais ser utilizado.");
    }

    const folhaPonto = await this.repository.loadById(null, token.folhaPonto.id);
    if (!folhaPonto) {
      throw new NotFoundException("Folha de ponto não encontrada.");
    }

    return { token, folhaPonto };
  }
}
