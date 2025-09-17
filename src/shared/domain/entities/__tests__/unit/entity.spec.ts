import { Entity } from '@/shared/domain/entities/entity'

type StubProps = {
  prop1: string
  prop2: number
}

function uuidValidate(uuid: string) {
  const regex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  return regex.test(uuid)
}

class StubEntity extends Entity<StubProps> {}

describe('Entity unit test', () => {
  it('Should set props and id', () => {
    const props = {
      prop1: 'value1',
      prop2: 10,
    }
    const entity = new StubEntity(props)

    expect(entity.props).toStrictEqual(props)
    expect(entity._id).not.toBeNull()
    expect(uuidValidate(entity._id)).toBeTruthy()
  })

  it('Should accept a valid uuid', () => {
    const props = {
      prop1: 'value1',
      prop2: 15,
    }
    const id = 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'
    const entity = new StubEntity(props, id)

    expect(uuidValidate(entity._id)).toBeTruthy()
    expect(entity._id).toBe(id)
  })

  it('Should convert a entity to a JSON object', () => {
    const props = {
      prop1: 'value1',
      prop2: 15,
    }
    const id = 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'
    const entity = new StubEntity(props, id)

    expect(entity.toJSON()).toStrictEqual({
      id,
      ...props,
    })
  })
})
