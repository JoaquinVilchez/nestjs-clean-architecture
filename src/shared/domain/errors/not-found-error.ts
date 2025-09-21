/**
 * ARCHIVO: not-found-error.ts
 * UBICACIÓN: /shared/domain/errors/
 *
 * ¿POR QUÉ ESTÁ AQUÍ? La excepción NotFoundError está en /shared/domain porque es un error
 * que puede ocurrir en CUALQUIER módulo del dominio cuando no se encuentra una entidad.
 * Al estar en /shared, evita duplicar esta excepción en cada módulo y garantiza
 * consistencia en el manejo de errores de "no encontrado" en toda la aplicación.
 *
 * FUNCIONALIDAD: Define excepción personalizada para casos donde no se encuentra
 * una entidad o recurso específico en el sistema.
 *
 * BENEFICIO: Proporciona manejo de errores consistente para casos de "no encontrado",
 * facilitando el debugging y la respuesta apropiada a los usuarios.
 */

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'NotFoundError'
  }
}
