import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { DeclareDependency } from "@/domain/dependency-injection";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7.js";
import { AccessContext, AccessContextHttp } from "@/modules/@seguranca/contexto-acesso";
import { ensureExists } from "@/modules/@shared";
import { IAppTypeormConnection } from "@/modules/@shared/infrastructure/persistence/typeorm";
import {
  CalendarioAgendamentoEntity,
  CalendarioAgendamentoStatus,
  CalendarioAgendamentoTipo,
} from "@/modules/horarios/calendario-agendamento/infrastructure.database/typeorm/calendario-agendamento.typeorm.entity";
import {
  HorarioEdicaoMudancaEntity,
  HorarioEdicaoMudancaTipoOperacao,
} from "../infrastructure.database/typeorm/horario-edicao-mudanca.typeorm.entity";
import {
  HorarioEdicaoSessaoEntity,
  HorarioEdicaoSessaoStatus,
} from "../infrastructure.database/typeorm/horario-edicao-sessao.typeorm.entity";
import {
  HorarioEdicaoMudancaInputRestDto,
  HorarioEdicaoMudancaOutputRestDto,
  HorarioEdicaoSessaoOutputRestDto,
  HorarioEdicaoSessaoParamsRestDto,
} from "./horario-edicao.rest.dto";

@ApiTags("horarios")
@Controller("/horarios/edicao")
export class HorarioEdicaoRestController {
  constructor(
    @DeclareDependency(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
  ) {}

  private toSessaoOutput(entity: HorarioEdicaoSessaoEntity): HorarioEdicaoSessaoOutputRestDto {
    const dto = new HorarioEdicaoSessaoOutputRestDto();
    dto.id = entity.id;
    dto.status = entity.status;
    dto.idUsuarioFk = entity.idUsuarioFk;
    dto.dateCreated = entity.dateCreated;
    dto.dateUpdated = entity.dateUpdated;
    return dto;
  }

  private toMudancaOutput(entity: HorarioEdicaoMudancaEntity): HorarioEdicaoMudancaOutputRestDto {
    const dto = new HorarioEdicaoMudancaOutputRestDto();
    dto.id = entity.id;
    dto.idSessaoFk = entity.idSessaoFk;
    dto.idCalendarioAgendamentoFk = entity.idCalendarioAgendamentoFk;
    dto.tipoOperacao = entity.tipoOperacao;
    dto.dados = entity.dados;
    dto.dateCreated = entity.dateCreated;
    return dto;
  }

  @Post("/")
  @HttpCode(201)
  @ApiOperation({
    summary: "Cria nova sessao de edicao de horario",
    operationId: "horarioEdicaoCreate",
  })
  @ApiCreatedResponse({ type: HorarioEdicaoSessaoOutputRestDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: AccessContext,
  ): Promise<HorarioEdicaoSessaoOutputRestDto> {
    const repo = this.appTypeormConnection.getRepository(HorarioEdicaoSessaoEntity);

    const entity = new HorarioEdicaoSessaoEntity();
    entity.id = generateUuidV7();
    entity.status = HorarioEdicaoSessaoStatus.ABERTA;
    entity.idUsuarioFk = accessContext.requestActor!.id;
    entity.dateCreated = new Date();
    entity.dateUpdated = new Date();

    await repo.save(entity);

    return this.toSessaoOutput(entity);
  }

  @Patch("/:sessaoId")
  @ApiOperation({
    summary: "Aplica uma mudanca a sessao de edicao de horario",
    operationId: "horarioEdicaoApplyChange",
  })
  @ApiOkResponse({ type: HorarioEdicaoMudancaOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  async applyChange(
    @AccessContextHttp() _accessContext: AccessContext,
    @Param() params: HorarioEdicaoSessaoParamsRestDto,
    @Body() dto: HorarioEdicaoMudancaInputRestDto,
  ): Promise<HorarioEdicaoMudancaOutputRestDto> {
    const sessaoRepo = this.appTypeormConnection.getRepository(HorarioEdicaoSessaoEntity);
    const mudancaRepo = this.appTypeormConnection.getRepository(HorarioEdicaoMudancaEntity);

    const sessao = await sessaoRepo.findOneBy({ id: params.sessaoId });
    ensureExists(sessao, "HorarioEdicaoSessao", params.sessaoId);

    if (sessao!.status !== HorarioEdicaoSessaoStatus.ABERTA) {
      throw new BadRequestException(
        `Sessao ${params.sessaoId} nao esta aberta. Status atual: ${sessao!.status}.`,
      );
    }

    const mudanca = new HorarioEdicaoMudancaEntity();
    mudanca.id = generateUuidV7();
    mudanca.idSessaoFk = params.sessaoId;
    mudanca.idCalendarioAgendamentoFk = dto.calendarioAgendamentoId ?? null;
    mudanca.tipoOperacao = dto.tipoOperacao;
    mudanca.dados = dto.dados;
    mudanca.dateCreated = new Date();

    await mudancaRepo.save(mudanca);

    // Update sessao dateUpdated
    sessao!.dateUpdated = new Date();
    await sessaoRepo.save(sessao!);

    return this.toMudancaOutput(mudanca);
  }

  @Post("/:sessaoId/salvar")
  @ApiOperation({
    summary: "Salva sessao de edicao permanentemente",
    operationId: "horarioEdicaoSalvar",
  })
  @ApiOkResponse({ type: HorarioEdicaoSessaoOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  async salvar(
    @AccessContextHttp() _accessContext: AccessContext,
    @Param() params: HorarioEdicaoSessaoParamsRestDto,
  ): Promise<HorarioEdicaoSessaoOutputRestDto> {
    const repo = this.appTypeormConnection.getRepository(HorarioEdicaoSessaoEntity);

    const sessao = await repo.findOneBy({ id: params.sessaoId });
    ensureExists(sessao, "HorarioEdicaoSessao", params.sessaoId);

    if (sessao!.status !== HorarioEdicaoSessaoStatus.ABERTA) {
      throw new BadRequestException(
        `Sessao ${params.sessaoId} nao esta aberta. Status atual: ${sessao!.status}.`,
      );
    }

    // Apply recorded changes to calendario_agendamento in a transaction
    await this.appTypeormConnection.transaction(async (manager) => {
      const mudancaRepo = manager.getRepository(HorarioEdicaoMudancaEntity);
      const agendamentoRepo = manager.getRepository(CalendarioAgendamentoEntity);

      const mudancas = await mudancaRepo.find({
        where: { idSessaoFk: params.sessaoId },
        order: { dateCreated: "ASC" },
      });

      for (const mudanca of mudancas) {
        const dados = mudanca.dados;

        switch (mudanca.tipoOperacao) {
          case HorarioEdicaoMudancaTipoOperacao.CRIAR: {
            const agendamento = new CalendarioAgendamentoEntity();
            agendamento.id = generateUuidV7();
            agendamento.tipo =
              (dados.tipo as CalendarioAgendamentoTipo) ?? CalendarioAgendamentoTipo.AULA;
            agendamento.nome = (dados.nome as string) ?? null;
            agendamento.dataInicio = new Date(dados.dataInicio as string);
            agendamento.dataFim = dados.dataFim ? new Date(dados.dataFim as string) : null;
            agendamento.diaInteiro = (dados.diaInteiro as boolean) ?? false;
            agendamento.horarioInicio = (dados.horarioInicio as string) ?? "00:00:00";
            agendamento.horarioFim = (dados.horarioFim as string) ?? "23:59:59";
            agendamento.repeticao = (dados.repeticao as string) ?? null;
            agendamento.cor = (dados.cor as string) ?? null;
            agendamento.status = CalendarioAgendamentoStatus.ATIVO;
            await agendamentoRepo.save(agendamento);
            break;
          }

          case HorarioEdicaoMudancaTipoOperacao.MOVER: {
            if (!mudanca.idCalendarioAgendamentoFk) break;
            const existing = await agendamentoRepo.findOneBy({
              id: mudanca.idCalendarioAgendamentoFk,
            });
            if (!existing) break;

            if (dados.dataInicio !== undefined)
              existing.dataInicio = new Date(dados.dataInicio as string);
            if (dados.dataFim !== undefined)
              existing.dataFim = dados.dataFim ? new Date(dados.dataFim as string) : null;
            if (dados.horarioInicio !== undefined)
              existing.horarioInicio = dados.horarioInicio as string;
            if (dados.horarioFim !== undefined) existing.horarioFim = dados.horarioFim as string;
            if (dados.nome !== undefined) existing.nome = dados.nome as string;
            if (dados.diaInteiro !== undefined) existing.diaInteiro = dados.diaInteiro as boolean;
            await agendamentoRepo.save(existing);
            break;
          }

          case HorarioEdicaoMudancaTipoOperacao.REMOVER: {
            if (!mudanca.idCalendarioAgendamentoFk) break;
            const toRemove = await agendamentoRepo.findOneBy({
              id: mudanca.idCalendarioAgendamentoFk,
            });
            if (!toRemove) break;
            toRemove.status = CalendarioAgendamentoStatus.INATIVO;
            await agendamentoRepo.save(toRemove);
            break;
          }
        }
      }

      // Mark session as saved
      sessao!.status = HorarioEdicaoSessaoStatus.SALVA;
      sessao!.dateUpdated = new Date();
      await manager.save(HorarioEdicaoSessaoEntity, sessao!);
    });

    return this.toSessaoOutput(sessao!);
  }

  @Post("/:sessaoId/cancelar")
  @ApiOperation({
    summary: "Cancela e descarta sessao de edicao",
    operationId: "horarioEdicaoCancelar",
  })
  @ApiOkResponse({ type: HorarioEdicaoSessaoOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  async cancelar(
    @AccessContextHttp() _accessContext: AccessContext,
    @Param() params: HorarioEdicaoSessaoParamsRestDto,
  ): Promise<HorarioEdicaoSessaoOutputRestDto> {
    const repo = this.appTypeormConnection.getRepository(HorarioEdicaoSessaoEntity);

    const sessao = await repo.findOneBy({ id: params.sessaoId });
    ensureExists(sessao, "HorarioEdicaoSessao", params.sessaoId);

    if (sessao!.status !== HorarioEdicaoSessaoStatus.ABERTA) {
      throw new BadRequestException(
        `Sessao ${params.sessaoId} nao esta aberta. Status atual: ${sessao!.status}.`,
      );
    }

    sessao!.status = HorarioEdicaoSessaoStatus.CANCELADA;
    sessao!.dateUpdated = new Date();
    await repo.save(sessao!);

    return this.toSessaoOutput(sessao!);
  }
}
