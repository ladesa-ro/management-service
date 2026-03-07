import type { IdUuid } from "@/Ladesa.Management.Application/@shared";
import { BaseDatedEntity } from "@/Ladesa.Management.Application/@shared";
import type { CalendarioLetivoCreateDto } from "@/Ladesa.Management.Domain/Dtos/CalendarioLetivoCreateDto";
import type { CalendarioLetivoUpdateDto } from "@/Ladesa.Management.Domain/Dtos/CalendarioLetivoUpdateDto";

/**
 * Entidade de Dominio: CalendarioLetivo
 * Implementa a tipagem ICalendarioLetivo e adiciona regras de negocio
 */
export class CalendarioLetivo extends BaseDatedEntity {
  private constructor(
    public nome: string,
    public ano: number,
    public campusId: IdUuid,
    public ofertaFormacaoId: IdUuid | null,
  ) {
    super();
  }

  protected static get entityName(): string {
    return "CalendarioLetivo";
  }

  static criar(dados: CalendarioLetivoCreateDto): CalendarioLetivo {
    const instance = new CalendarioLetivo(
      dados.nome?.trim() ?? "",
      dados.ano,
      dados.campus.id,
      dados.ofertaFormacao?.id ?? null,
    );
    instance.initDates();
    instance.validar();
    return instance;
  }

  static fromData(data: CalendarioLetivo): CalendarioLetivo {
    const instance = new CalendarioLetivo(
      data.nome,
      data.ano,
      data.campusId,
      data.ofertaFormacaoId,
    );
    instance.id = data.id;
    instance.dateCreated = data.dateCreated;
    instance.dateUpdated = data.dateUpdated;
    instance.dateDeleted = data.dateDeleted;
    return instance;
  }

  validar(): void {
    const { result, rules } = CalendarioLetivo.createValidation();
    rules.required(this.nome, "nome");
    rules.minLength(this.nome, "nome", 1);
    rules.requiredNumber(this.ano, "ano");
    rules.min(this.ano, "ano", 1);
    CalendarioLetivo.throwIfInvalid(result);
  }

  atualizar(dados: CalendarioLetivoUpdateDto): void {
    if (dados.nome !== undefined) {
      this.nome = dados.nome?.trim() ?? "";
    }

    if (dados.ano !== undefined) {
      this.ano = dados.ano;
    }

    this.touchUpdated();
    this.validar();
  }
}
