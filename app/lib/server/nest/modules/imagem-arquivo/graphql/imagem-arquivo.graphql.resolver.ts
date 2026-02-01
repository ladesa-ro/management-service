import { Args, ID, Info, Query, Resolver } from "@nestjs/graphql";
import { type GraphQLResolveInfo } from "graphql";
import { graphqlExtractSelection } from "@/modules/@shared/infrastructure/graphql";
import { ImagemArquivoService } from "@/modules/imagem-arquivo/application/use-cases/imagem-arquivo.service";
import { AccessContext, AccessContextGraphQl } from "@/v2/old/infrastructure/access-context";
import { ImagemArquivoFindOneOutputDto } from "../rest/imagem-arquivo.rest.dto";
import {
  ImagemArquivoListInputGqlDto,
  ImagemArquivoListOutputGqlDto,
} from "./imagem-arquivo.graphql.dto";
import { ImagemArquivoGraphqlMapper } from "./imagem-arquivo.graphql.mapper";

@Resolver(() => ImagemArquivoFindOneOutputDto)
export class ImagemArquivoGraphqlResolver {
  constructor(private readonly imagemArquivoService: ImagemArquivoService) {}

  @Query(() => ImagemArquivoListOutputGqlDto, { name: "imagemArquivoFindAll" })
  async findAll(
    @AccessContextGraphQl() accessContext: AccessContext,
    @Args() dto: ImagemArquivoListInputGqlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<ImagemArquivoListOutputGqlDto> {
    const input = ImagemArquivoGraphqlMapper.toListInput(dto);

    if (input) {
      input.selection = graphqlExtractSelection(info, "paginated");
    }

    const result = await this.imagemArquivoService.findAll(accessContext, input);
    return ImagemArquivoGraphqlMapper.toListOutputDto(result);
  }

  @Query(() => ImagemArquivoFindOneOutputDto, { name: "imagemArquivoFindById" })
  async findById(
    @AccessContextGraphQl() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Info() info: GraphQLResolveInfo,
  ): Promise<ImagemArquivoFindOneOutputDto> {
    const selection = graphqlExtractSelection(info);
    const result = await this.imagemArquivoService.findByIdStrict(accessContext, { id, selection });
    return ImagemArquivoGraphqlMapper.toFindOneOutputDto(result);
  }
}
