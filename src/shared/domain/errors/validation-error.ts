/**
 * ARCHIVO: validation-error.ts
 * UBICACIÓN: /shared/domain/errors/
 *
 * ¿POR QUÉ ESTÁ AQUÍ? Las excepciones de validación están en /shared/domain porque son
 * errores que pueden ocurrir en CUALQUIER módulo del dominio (users, products, orders, etc.).
 * Al estar en /shared, evita duplicar estas excepciones en cada módulo y garantiza
 * consistencia en el manejo de errores de validación en toda la aplicación.
 *
 * FUNCIONALIDAD: Define excepciones personalizadas para errores de validación en el dominio.
 * Incluye ValidationError genérica y EntityValidationError específica para entidades.
 *
 * BENEFICIO: Proporciona manejo de errores consistente y específico para validaciones,
 * facilitando el debugging y el manejo de errores en la aplicación.
 */

import { FieldsErrors } from '../validators/validator-fields.interface'

export class ValidationError extends Error {}

export class EntityValidationError extends Error {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(error: FieldsErrors) {
    super('Entity Validation Error')
    this.name = 'EntityValidationError'
  }
}
