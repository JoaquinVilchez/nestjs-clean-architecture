/**
 * ARCHIVO: entity.ts
 * UBICACIÓN: /shared/domain/entities/
 *
 * ¿POR QUÉ ESTÁ AQUÍ? Esta clase base está en /shared/domain porque es una abstracción
 * fundamental que comparten TODAS las entidades del dominio en cualquier módulo (users, products, etc.).
 * Al estar en /shared, evita duplicación de código y garantiza consistencia en toda la aplicación.
 * Es parte del dominio compartido que no pertenece a un módulo específico.
 *
 * FUNCIONALIDAD: Clase base abstracta para todas las entidades del dominio que implementa
 * el patrón Entity de Domain-Driven Design (DDD). Proporciona funcionalidad común como
 * generación automática de ID único, inmutabilidad y serialización.
 *
 * BENEFICIO: Centraliza la funcionalidad común de todas las entidades, garantiza
 * consistencia en el comportamiento y facilita el mantenimiento del código de dominio.
 */

import { randomUUID as uuidv4 } from 'node:crypto'

export abstract class Entity<Props = any> {
  public readonly _id: string
  public readonly props: Props

  constructor(props: Props, id?: string) {
    this.props = props
    // Genera un UUID único si no se proporciona ID
    this._id = id ?? uuidv4()
  }

  get id() {
    return this._id
  }

  toJSON(): Required<{ id: string } & Props> {
    return {
      id: this._id,
      ...this.props,
    } as Required<{ id: string } & Props>
  }
}
