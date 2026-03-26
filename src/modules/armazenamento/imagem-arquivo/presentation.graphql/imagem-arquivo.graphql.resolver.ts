import { Args, ID, Query, Resolver } from "@nestjs/graphql";
import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency } from "@/domain/dependency-injection";
import { ImagemArquivo } from "@/modules/armazenamento/imagem-arquivo/domain/imagem-arquivo";
import {
  IImagemArquivoFindOneQueryHandler,
  ImagemArquivoFindOneQueryMetadata,
} from "@/modules/armazenamento/imagem-arquivo/domain/queries/imagem-arquivo-find-one.query.handler.interface";
import {
  IImagemArquivoListQueryHandler,
  ImagemArquivoListQueryMetadata,
} from "@/modules/armazenamento/imagem-arquivo/domain/queries/imagem-arquivo-list.query.handler.interface";
import { AccessContextGraphQL } from "@/server/nest/access-context";
import {
  ImagemArquivoFindOneOutputGraphQlDto,
  ImagemArquivoListInputGraphQlDto,
  ImagemArquivoListOutputGraphQlDto,
} from "./imagem-arquivo.graphql.dto";
import * as ImagemArquivoGraphqlMapper from "./imagem-arquivo.graphql.mapper";

@Resolver(() => ImagemArquivoFindOneOutputGraphQlDto)
export class ImagemArquivoGraphqlResolver {
  constructor(
    @DeclareDependency(IImagemArquivoListQueryHandler)
    private readonly listHandler: IImagemArquivoListQueryHandler,
    @DeclareDependency(IImagemArquivoFindOneQueryHandler)
    private readonly findOneHandler: IImagemArquivoFindOneQueryHandler,
  ) {}

  @Query(() => ImagemArquivoListOutputGraphQlDto, ImagemArquivoListQueryMetadata.gqlMetadata)
  async findAll(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args() dto: ImagemArquivoListInputGraphQlDto,
  ): Promise<ImagemArquivoListOutputGraphQlDto> {
    const input = ImagemArquivoGraphqlMapper.toListInput(dto);
    const result = await this.listHandler.execute(accessContext, input);
    return ImagemArquivoGraphqlMapper.toListOutput(result);
  }

  @Query(() => ImagemArquivoFindOneOutputGraphQlDto, ImagemArquivoFindOneQueryMetadata.gqlMetadata)
  async findById(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<ImagemArquivoFindOneOutputGraphQlDto> {
    const input = ImagemArquivoGraphqlMapper.toFindOneInput.map(id);
    const result = await this.findOneHandler.execute(accessContext, input);
    ensureExists(result, ImagemArquivo.entityName, input.id);
    return ImagemArquivoGraphqlMapper.toFindOneOutput.map(result);
  }
}
