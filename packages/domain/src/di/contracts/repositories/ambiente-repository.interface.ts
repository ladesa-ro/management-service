import type { T } from "../../../typings"
import type { IAbstractResourceRepository } from "../abstract-resource-repository.interface"

export type IAmbienteRepository = IAbstractResourceRepository<T.AmbienteFindOneInput, T.AmbienteFindOneOutput, T.AmbienteCreateInput, T.AmbienteUpdateInput, T.AmbienteListInput, T.AmbienteListOutput> & {}
