import { Module } from "@nestjs/common";
import { CampusRepositoryProvider } from "@/features/campus/infrastructure";
import {
  CampusCreateRoute,
  CampusDeleteOneByIdRoute,
  CampusFindOneByIdRoute,
  CampusListRoute,
  CampusUpdateOneByIdRoute
} from "@/features/campus/presentation";
import { CampusApplicationService } from "./application/services/campus.application-service";
import { CampusController } from "./presentation/rest/nestjs/campus.controller";

@Module({
  imports: [],
  controllers: [CampusController],
  providers: [
    CampusApplicationService,
    CampusRepositoryProvider,

    CampusListRoute,
    CampusFindOneByIdRoute,
    CampusCreateRoute,
    CampusUpdateOneByIdRoute,
    CampusDeleteOneByIdRoute,
  ],
  exports: [CampusApplicationService],
})
export class CampusModule {
}
