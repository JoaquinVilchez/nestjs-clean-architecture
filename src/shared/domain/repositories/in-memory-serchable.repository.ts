import { Entity } from '../entities/entity'
import { SearchableRepositoryInterface } from './serchable-repository-contracts'
import { InMemoryRepository } from './in-memory.repository'

export abstract class InMemorySerchableRepository<E extends Entity>
  extends InMemoryRepository<E>
  implements SearchableRepositoryInterface<E, any, any>
{
  search(input: any): Promise<any> {
    throw new Error('Method not implemented.')
  }
}
