/**
 * ARCHIVO: bad-request-error.ts
 * UBICACIÓN: /users/application/errors/
 *
 * ¿POR QUÉ ESTÁ AQUÍ? La excepción BadRequestError está en /users/application porque es un error
 * específico de la capa de aplicación del módulo de usuarios. Al estar en /users/application,
 * maneja errores relacionados con casos de uso específicos de usuarios cuando se reciben
 * peticiones malformadas o con datos inválidos en operaciones de usuarios.
 *
 * FUNCIONALIDAD: Define excepción personalizada para casos donde se recibe una petición
 * con datos inválidos, malformados o que no cumplen con las reglas de validación
 * específicas de los casos de uso de usuarios.
 *
 * BENEFICIO: Proporciona manejo de errores específico para casos de "petición incorrecta"
 * en el contexto de usuarios, facilitando el debugging y la respuesta apropiada
 * cuando se envían datos inválidos en operaciones relacionadas con usuarios.
 */

export class BadRequestError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'BadRequestError'
  }
}
