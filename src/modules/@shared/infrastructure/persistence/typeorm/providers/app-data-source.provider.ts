/** @deprecated Use imports from @/infrastructure.database/typeorm/conn.interface and conn.provider */
export {
  IAppTypeormConnection,
  IAppTypeormConnection as AppTypeormConn,
  IAppTypeormConnection as APP_DATA_SOURCE_TOKEN,
} from "@/infrastructure.database/typeorm/conn.interface";
export { AppTypeormConnectionProvider as appDataSourceProvider } from "@/infrastructure.database/typeorm/conn.provider";
