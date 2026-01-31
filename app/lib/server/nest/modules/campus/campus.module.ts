import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/@shared/infrastructure/persistence/typeorm";
import { CAMPUS_REPOSITORY_PORT, CampusService } from "@/modules/campus";
import { CampusTypeOrmRepositoryAdapter } from "@/modules/campus/infrastructure/persistence/typeorm";
import { EnderecoModule } from "@/server/nest/modules/endereco";
import { CampusRestController } from "./rest/campus.rest.controller";

@Module({
  imports: [EnderecoModule],
  controllers: [CampusRestController],
  providers: [
    NestJsPaginateAdapter,
    CampusService,
    {
      provide: CAMPUS_REPOSITORY_PORT,
      useClass: CampusTypeOrmRepositoryAdapter,
    },
  ],
  exports: [CampusService],
})
export class CampusModule {}
