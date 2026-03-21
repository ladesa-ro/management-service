import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { DeclareDependency } from "@/domain/dependency-injection";
import { AccessContext, AccessContextHttp } from "@/modules/@seguranca/contexto-acesso";
import { ensureExists } from "@/modules/@shared";
import { IUsuarioEventoRepository } from "@/modules/acesso/usuario/domain/repositories/usuario-evento.repository.interface";
import {
  UsuarioEventoCreateInputRestDto,
  UsuarioEventoFindOneOutputRestDto,
  UsuarioEventoItemParamsRestDto,
  UsuarioEventoListOutputRestDto,
  UsuarioEventoParentParamsRestDto,
  UsuarioEventoUpdateInputRestDto,
} from "./usuario-evento.rest.dto";

@ApiTags("usuarios")
@Controller("/usuarios/:id/eventos")
export class UsuarioEventoRestController {
  constructor(
    @DeclareDependency(IUsuarioEventoRepository)
    private readonly eventoRepository: IUsuarioEventoRepository,
  ) {}

  @Get("/")
  @ApiOperation({
    summary: "Lista eventos/agenda do usuario (professor)",
    operationId: "usuarioEventoFindAll",
  })
  @ApiOkResponse({ type: UsuarioEventoListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() _accessContext: AccessContext,
    @Param() parentParams: UsuarioEventoParentParamsRestDto,
  ): Promise<UsuarioEventoListOutputRestDto> {
    const perfilIds = await this.eventoRepository.findPerfilIdsByUsuario(parentParams.id);

    if (perfilIds.length === 0) {
      return { data: [] };
    }

    const data = await this.eventoRepository.findEventosByPerfilIds(perfilIds);

    return { data };
  }

  @Post("/")
  @ApiOperation({
    summary: "Cria evento/indisponibilidade escopado ao usuario",
    operationId: "usuarioEventoCreate",
  })
  @ApiCreatedResponse({ type: UsuarioEventoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() _accessContext: AccessContext,
    @Param() parentParams: UsuarioEventoParentParamsRestDto,
    @Body() dto: UsuarioEventoCreateInputRestDto,
  ): Promise<UsuarioEventoFindOneOutputRestDto> {
    const perfilId = await this.eventoRepository.findPerfilIdByUsuario(parentParams.id);

    return this.eventoRepository.createEvento(perfilId, {
      nome: dto.nome,
      tipo: dto.tipo,
      dataInicio: dto.dataInicio,
      dataFim: dto.dataFim,
      diaInteiro: dto.diaInteiro,
      horarioInicio: dto.horarioInicio,
      horarioFim: dto.horarioFim,
      cor: dto.cor,
      repeticao: dto.repeticao,
    });
  }

  @Patch("/:eventoId")
  @ApiOperation({ summary: "Atualiza evento do usuario", operationId: "usuarioEventoUpdate" })
  @ApiOkResponse({ type: UsuarioEventoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @AccessContextHttp() _accessContext: AccessContext,
    @Param() params: UsuarioEventoItemParamsRestDto,
    @Body() dto: UsuarioEventoUpdateInputRestDto,
  ): Promise<UsuarioEventoFindOneOutputRestDto> {
    const result = await this.eventoRepository.updateEvento(params.eventoId, {
      nome: dto.nome,
      dataInicio: dto.dataInicio,
      dataFim: dto.dataFim,
      diaInteiro: dto.diaInteiro,
      horarioInicio: dto.horarioInicio,
      horarioFim: dto.horarioFim,
      cor: dto.cor,
      repeticao: dto.repeticao,
    });

    ensureExists(result, "UsuarioEvento", params.eventoId);

    return result!;
  }

  @Delete("/:eventoId")
  @ApiOperation({ summary: "Remove evento do usuario", operationId: "usuarioEventoDelete" })
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async delete(
    @AccessContextHttp() _accessContext: AccessContext,
    @Param() params: UsuarioEventoItemParamsRestDto,
  ): Promise<boolean> {
    await this.eventoRepository.deleteEventoForUsuario(params.id, params.eventoId);
    return true;
  }
}
