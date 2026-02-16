import { Args, ID, Info, Query, Resolver } from "@nestjs/graphql";
import { type GraphQLResolveInfo } from "graphql";
import { ImagemArquivoService } from "@/modules/@base/armazenamento/imagem-arquivo/application/use-cases/imagem-arquivo.service";
import { AccessContext, AccessContextGraphQL } from "@/modules/@core/access-context";
import { graphqlExtractSelection } from "@/modules/@shared/infrastructure/graphql";
import {
  ImagemArquivoFindOneOutputGraphQlDto,
  ImagemArquivoListInputGraphQlDto,
  ImagemArquivoListOutputGraphQlDto,
} from "./imagem-arquivo.graphql.dto";
import { ImagemArquivoGraphqlMapper } from "./imagem-arquivo.graphql.mapper";

@Resolver(() => ImagemArquivoFindOneOutputGraphQlDto)
export class ImagemArquivoGraphqlResolver {
  constructor(private readonly imagemArquivoService: ImagemArquivoService) {}

  @Query(() => ImagemArquivoListOutputGraphQlDto, { name: "imagemArquivoFindAll" })
  async findAll(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args() dto: ImagemArquivoListInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<ImagemArquivoListOutputGraphQlDto> {
    const input = ImagemArquivoGraphqlMapper.toListInput(dto);

    if (input) {
      input.selection = graphqlExtractSelection(info, "paginated");
    }

    const result = await this.imagemArquivoService.findAll(accessContext, input);
    return ImagemArquivoGraphqlMapper.toListOutputDto(result);
  }

  @Query(() => ImagemArquivoFindOneOutputGraphQlDto, { name: "imagemArquivoFindById" })
  async findById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Info() info: GraphQLResolveInfo,
  ): Promise<ImagemArquivoFindOneOutputGraphQlDto> {
    const selection = graphqlExtractSelection(info);
    const result = await this.imagemArquivoService.findByIdStrict(accessContext, { id, selection });
    return ImagemArquivoGraphqlMapper.toFindOneOutputDto(result);
  }
}
