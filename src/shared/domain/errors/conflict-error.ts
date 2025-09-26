/**
 * ARCHIVO: conflict-error.ts
 * UBICACIÓN: /shared/domain/errors/
 *
 * ¿POR QUÉ ESTÁ AQUÍ? La excepción ConflictError está en /shared/domain porque es un error
 * que puede ocurrir en CUALQUIER módulo del dominio cuando hay conflictos de datos (ej: email duplicado).
 * Al estar en /shared, evita duplicar esta excepción en cada módulo y garantiza
 * consistencia en el manejo de errores de conflicto en toda la aplicación.
 *
 * FUNCIONALIDAD: Define excepción personalizada para casos donde hay conflictos
 * de datos o reglas de negocio (ej: intentar crear un usuario con email existente).
 *
 * BENEFICIO: Proporciona manejo de errores consistente para casos de conflicto,
 * facilitando el debugging y la respuesta apropiada a los usuarios.
 */

export class ConflictError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ConflictError'
  }
}
