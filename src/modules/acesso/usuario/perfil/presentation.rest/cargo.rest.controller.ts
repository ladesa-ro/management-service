import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep } from "@/domain/dependency-injection";
import { ICargoCreateCommandHandler } from "@/modules/acesso/usuario/perfil/domain/commands/cargo-create.command.handler.interface";
import { ICargoDeleteCommandHandler } from "@/modules/acesso/usuario/perfil/domain/commands/cargo-delete.command.handler.interface";
import { ICargoUpdateCommandHandler } from "@/modules/acesso/usuario/perfil/domain/commands/cargo-update.command.handler.interface";
import { ICargoFindOneQueryHandler } from "@/modules/acesso/usuario/perfil/domain/queries/cargo-find-one.query.handler.interface";
import { ICargoListQueryHandler } from "@/modules/acesso/usuario/perfil/domain/queries/cargo-list.query.handler.interface";
import { AccessContextHttp } from "@/server/nest/access-context";
import {
  CargoCreateInputRestDto,
  CargoListInputRestDto,
  CargoListOutputRestDto,
  CargoOutputRestDto,
  CargoUpdateInputRestDto,
} from "./cargo.rest.dto";

@ApiTags("cargos")
@Controller("/cargos")
export class CargoRestController {
  constructor(
    @Dep(ICargoCreateCommandHandler)
    private readonly createHandler: ICargoCreateCommandHandler,
    @Dep(ICargoUpdateCommandHandler)
    private readonly updateHandler: ICargoUpdateCommandHandler,
    @Dep(ICargoDeleteCommandHandler)
    private readonly deleteHandler: ICargoDeleteCommandHandler,
    @Dep(ICargoListQueryHandler)
    private readonly listHandler: ICargoListQueryHandler,
    @Dep(ICargoFindOneQueryHandler)
    private readonly findOneHandler: ICargoFindOneQueryHandler,
  ) {}

  @Post("/")
  @ApiOperation({ summary: "Cria um novo cargo" })
  @ApiCreatedResponse({ type: CargoOutputRestDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: IAccessContext,
    @Body() dto: CargoCreateInputRestDto,
  ): Promise<CargoOutputRestDto> {
    const result = await this.createHandler.execute(accessContext, { nome: dto.nome });
    return result;
  }

  @Get("/")
  @ApiOperation({ summary: "Lista cargos" })
  @ApiOkResponse({ type: CargoListOutputRestDto })
  @ApiForbiddenResponse()
  async list(
    @AccessContextHttp() accessContext: IAccessContext,
    @Query() query: CargoListInputRestDto,
  ): Promise<CargoListOutputRestDto> {
    return this.listHandler.execute(accessContext, query);
  }

  @Get("/:id")
  @ApiOperation({ summary: "Busca cargo por ID" })
  @ApiOkResponse({ type: CargoOutputRestDto })
  @ApiNotFoundResponse()
  @ApiForbiddenResponse()
  async findOne(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param("id") id: string,
  ): Promise<CargoOutputRestDto | null> {
    return this.findOneHandler.execute(accessContext, { id });
  }

  @Patch("/:id")
  @ApiOperation({ summary: "Atualiza um cargo" })
  @ApiOkResponse({ type: CargoOutputRestDto })
  @ApiNotFoundResponse()
  @ApiForbiddenResponse()
  async update(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param("id") id: string,
    @Body() dto: CargoUpdateInputRestDto,
  ): Promise<CargoOutputRestDto | null> {
    return this.updateHandler.execute(accessContext, { id, nome: dto.nome });
  }

  @Delete("/:id")
  @ApiOperation({ summary: "Deleta um cargo" })
  @ApiOkResponse({ description: "Cargo deletado com sucesso", type: Boolean })
  @ApiNotFoundResponse()
  @ApiForbiddenResponse()
  async delete(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param("id") id: string,
  ): Promise<boolean> {
    return this.deleteHandler.execute(accessContext, { id });
  }
}
