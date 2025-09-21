/**
 * ARCHIVO: not-found-error.ts
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
