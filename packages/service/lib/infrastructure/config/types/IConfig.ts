import { IConfigDatabase } from "./IConfigDatabase";
import { IConfigIntegrateAuth } from "./IConfigIntegrateAuth";
import { IConfigRuntime } from "./IConfigRuntime";
import { IConfigTypeOrmDataSources } from "./IConfigTypeOrmDataSources";

export interface IConfig extends IConfigRuntime, IConfigDatabase, IConfigTypeOrmDataSources, IConfigIntegrateAuth {}
