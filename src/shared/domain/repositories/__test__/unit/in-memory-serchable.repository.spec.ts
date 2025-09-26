import { Entity } from '@/shared/domain/entities/entity'
import { InMemorySerchableRepository } from '../../in-memory-serchable.repository'

type StubEntityProps = {
  name: string
  price: number
}

class StubEntity extends Entity<StubEntityProps> {}

class StubInMemorySerchableRepository extends InMemorySerchableRepository<StubEntity> {
  sortableFields: string[] = ['name']

  protected async applyFilter(
    items: StubEntity[],
    filter: string | null,
  ): Promise<StubEntity[]> {
    if (!filter) {
      return Promise.resolve(items)
    }

    return items.filter(item => {
      return item.props.name.toLowerCase().includes(filter.toLowerCase())
    })
  }
}

describe('InMemorySerchableRepository unit tests', () => {
  let sut: StubInMemorySerchableRepository

  beforeEach(() => {
    sut = new StubInMemorySerchableRepository()
  })

  describe('applyFilter method', () => {})

  describe('applySort method', () => {})

  describe('applyPaginate method', () => {})
})
