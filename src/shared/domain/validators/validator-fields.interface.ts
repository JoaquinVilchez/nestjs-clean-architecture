/**
 * ARCHIVO: validator-fields.interface.ts
 *
 * FUNCIONALIDAD: Define la interfaz y tipos para validadores de campos en el dominio.
 * Especifica la estructura de errores y el contrato que deben implementar los validadores.
 *
 * BENEFICIO: Proporciona tipado fuerte para validaciones y define un contrato consistente
 * que deben seguir todos los validadores del sistema.
 */

export type FieldsErrors = {
  [field: string]: string[]
}

export interface ValidatorFieldsInterface<PropsValidated> {
  errors: FieldsErrors | null
  validatedData: PropsValidated | undefined

  validate(data: any): boolean
}
