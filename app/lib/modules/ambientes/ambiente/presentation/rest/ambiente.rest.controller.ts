import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import {
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { AccessContext, AccessContextHttp } from "@/modules/@core/contexto-acesso";
import { AmbienteService } from "@/modules/ambientes/ambiente/application/use-cases/ambiente.service";
import {
  AmbienteCreateInputRestDto,
  AmbienteFindOneInputRestDto,
  AmbienteFindOneOutputRestDto,
  AmbienteListInputRestDto,
  AmbienteListOutputRestDto,
  AmbienteUpdateInputRestDto,
} from "./ambiente.rest.dto";
import { AmbienteRestMapper } from "./ambiente.rest.mapper";

@ApiTags("ambientes")
@Controller("/ambientes")
export class AmbienteRestController {
  constructor(private ambienteService: AmbienteService) {}

  @Get("/")
  @ApiOperation({ summary: "Lista ambientes", operationId: "ambienteFindAll" })
  @ApiOkResponse({ type: AmbienteListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: AmbienteListInputRestDto,
  ): Promise<AmbienteListOutputRestDto> {
    const input = AmbienteRestMapper.toListInput(dto);
    const result = await this.ambienteService.findAll(accessContext, input as any);
    return AmbienteRestMapper.toListOutputDto(result as any);
  }

  @Get("/:id")
  @ApiOperation({ summary: "Busca um ambiente por ID", operationId: "ambienteFindById" })
  @ApiOkResponse({ type: AmbienteFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: AmbienteFindOneInputRestDto,
  ): Promise<AmbienteFindOneOutputRestDto> {
    const input = AmbienteRestMapper.toFindOneInput(params);
    const result = await this.ambienteService.findByIdStrict(accessContext, input as any);
    return AmbienteRestMapper.toFindOneOutputDto(result as any);
  }

  @Post("/")
  @ApiOperation({ summary: "Cria um ambiente", operationId: "ambienteCreate" })
  @ApiCreatedResponse({ type: AmbienteFindOneOutputRestDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: AmbienteCreateInputRestDto,
  ): Promise<AmbienteFindOneOutputRestDto> {
    const input = AmbienteRestMapper.toCreateInput(dto);
    const result = await this.ambienteService.create(accessContext, input as any);
    return AmbienteRestMapper.toFindOneOutputDto(result as any);
  }

  @Patch("/:id")
  @ApiOperation({ summary: "Atualiza um ambiente", operationId: "ambienteUpdate" })
  @ApiOkResponse({ type: AmbienteFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: AmbienteFindOneInputRestDto,
    @Body() dto: AmbienteUpdateInputRestDto,
  ): Promise<AmbienteFindOneOutputRestDto> {
    const input = AmbienteRestMapper.toUpdateInput(params, dto);
    const result = await this.ambienteService.update(accessContext, input as any);
    return AmbienteRestMapper.toFindOneOutputDto(result as any);
  }

  @Get("/:id/imagem/capa")
  @ApiOperation({
    summary: "Obtem a imagem de capa de um ambiente",
    operationId: "ambienteGetImagemCapa",
  })
  @ApiOkResponse()
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async getImagemCapa(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: AmbienteFindOneInputRestDto,
  ) {
    return this.ambienteService.getImagemCapa(accessContext, params.id);
  }

  @Put("/:id/imagem/capa")
  @ApiOperation({
    summary: "Define a imagem de capa de um ambiente",
    operationId: "ambienteUpdateImagemCapa",
  })
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        file: { type: "string", format: "binary" },
      },
      required: ["file"],
    },
  })
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(FileInterceptor("file"))
  async updateImagemCapa(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: AmbienteFindOneInputRestDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<boolean> {
    return this.ambienteService.updateImagemCapa(accessContext, params, file);
  }

  @Delete("/:id")
  @ApiOperation({ summary: "Remove um ambiente", operationId: "ambienteDeleteOneById" })
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async deleteOneById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: AmbienteFindOneInputRestDto,
  ): Promise<boolean> {
    const input = AmbienteRestMapper.toFindOneInput(params);
    return this.ambienteService.deleteOneById(accessContext, input as any);
  }
}
