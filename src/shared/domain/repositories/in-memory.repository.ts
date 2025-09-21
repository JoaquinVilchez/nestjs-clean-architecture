/**
 * ARCHIVO: in-memory.repository.ts
 * UBICACIÓN: /shared/domain/repositories/
 *
 * ¿POR QUÉ ESTÁ AQUÍ? La implementación base en memoria está en /shared/domain porque
 * puede ser utilizada por CUALQUIER módulo del dominio para testing y desarrollo.
 * Al estar en /shared, evita duplicar esta implementación en cada módulo y proporciona
 * una base común para todos los repositorios en memoria de la aplicación.
 *
 * FUNCIONALIDAD: Implementación base de repositorio en memoria que proporciona
 * funcionalidad CRUD básica para testing y desarrollo. Es una clase abstracta
 * que puede ser extendida por repositorios específicos de entidades.
 *
 * BENEFICIO: Permite testing rápido sin base de datos, desarrollo sin dependencias
 * externas y proporciona una implementación de referencia para repositorios reales.
 */

import { Entity } from '../entities/entity'
import { NotFoundError } from '../errors/not-found-error'
import { RepositoryInterface } from './repository-contracts'

export abstract class InMemoryRepository<E extends Entity>
  implements RepositoryInterface<E>
{
  items: E[] = []

  insert(entity: E): Promise<void> {
    this.items.push(entity)
    return Promise.resolve()
  }

  async findById(id: string): Promise<E> {
    return this._get(id)
  }

  findAll(): Promise<E[]> {
    return Promise.resolve(this.items)
  }

  async update(entity: E): Promise<void> {
    // Verifica que la entidad existe antes de actualizar
    await this._get(entity.id)
    const index = this.items.findIndex(item => item.id === entity.id)
    this.items[index] = entity
  }

  async delete(id: string): Promise<void> {
    // Verifica que la entidad existe antes de eliminar
    await this._get(id)
    const index = this.items.findIndex(item => item.id === id)
    this.items.splice(index, 1)
  }

  protected _get(id: string): Promise<E> {
    // Convierte el ID a string para comparación consistente
    const _id = `${id}`
    const entity = this.items.find(item => item.id === _id)
    if (!entity) {
      throw new NotFoundError(`Entity not found`)
    }
    return Promise.resolve(entity)
  }
}
