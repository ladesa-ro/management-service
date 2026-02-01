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
import { AccessContext, AccessContextHttp } from "@/modules/@core/access-context";
import { BlocoService } from "@/modules/bloco/application/use-cases/bloco.service";
import {
  BlocoCreateInputDto,
  BlocoFindOneInputDto,
  BlocoFindOneOutputDto,
  BlocoListInputDto,
  BlocoListOutputDto,
  BlocoUpdateInputDto,
} from "./bloco.rest.dto";
import { BlocoRestMapper } from "./bloco.rest.mapper";

@ApiTags("blocos")
@Controller("/blocos")
export class BlocoRestController {
  constructor(private blocoService: BlocoService) {}

  @Get("/")
  @ApiOperation({ summary: "Lista blocos", operationId: "blocoFindAll" })
  @ApiOkResponse({ type: BlocoListOutputDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: BlocoListInputDto,
  ): Promise<BlocoListOutputDto> {
    const input = BlocoRestMapper.toListInput(dto);
    const result = await this.blocoService.findAll(accessContext, input);
    return BlocoRestMapper.toListOutputDto(result);
  }

  @Get("/:id")
  @ApiOperation({ summary: "Busca um bloco por ID", operationId: "blocoFindById" })
  @ApiOkResponse({ type: BlocoFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: BlocoFindOneInputDto,
  ): Promise<BlocoFindOneOutputDto> {
    const input = BlocoRestMapper.toFindOneInput(params);
    const result = await this.blocoService.findByIdStrict(accessContext, input);
    return BlocoRestMapper.toFindOneOutputDto(result);
  }

  @Post("/")
  @ApiOperation({ summary: "Cria um bloco", operationId: "blocoCreate" })
  @ApiCreatedResponse({ type: BlocoFindOneOutputDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: BlocoCreateInputDto,
  ): Promise<BlocoFindOneOutputDto> {
    const input = BlocoRestMapper.toCreateInput(dto);
    const result = await this.blocoService.create(accessContext, input);
    return BlocoRestMapper.toFindOneOutputDto(result);
  }

  @Patch("/:id")
  @ApiOperation({ summary: "Atualiza um bloco", operationId: "blocoUpdate" })
  @ApiOkResponse({ type: BlocoFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: BlocoFindOneInputDto,
    @Body() dto: BlocoUpdateInputDto,
  ): Promise<BlocoFindOneOutputDto> {
    const input = BlocoRestMapper.toUpdateInput(params, dto);
    const result = await this.blocoService.update(accessContext, input);
    return BlocoRestMapper.toFindOneOutputDto(result);
  }

  @Get("/:id/imagem/capa")
  @ApiOperation({
    summary: "Obtem a imagem de capa de um bloco",
    operationId: "blocoGetImagemCapa",
  })
  @ApiOkResponse()
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async getImagemCapa(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: BlocoFindOneInputDto,
  ) {
    return this.blocoService.getImagemCapa(accessContext, params.id);
  }

  @Put("/:id/imagem/capa")
  @ApiOperation({
    summary: "Define a imagem de capa de um bloco",
    operationId: "blocoUpdateImagemCapa",
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
    @Param() params: BlocoFindOneInputDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<boolean> {
    return this.blocoService.updateImagemCapa(accessContext, params, file);
  }

  @Delete("/:id")
  @ApiOperation({ summary: "Remove um bloco", operationId: "blocoDeleteOneById" })
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async deleteOneById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: BlocoFindOneInputDto,
  ): Promise<boolean> {
    const input = BlocoRestMapper.toFindOneInput(params);
    return this.blocoService.deleteOneById(accessContext, input);
  }
}
