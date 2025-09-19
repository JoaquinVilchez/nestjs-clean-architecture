import { UserEntity, UserProps } from '../../user.entity'
import { UserDataBuilder } from '@/users/domain/testing/helpers/use-data-builder'

// Test unitario de UserEntity: verifica que la entidad de usuario funcione correctamente
// Beneficio: garantiza que la lógica de negocio de la entidad User esté bien implementada
describe('UserEntity unit test', () => {
  let props: UserProps
  let sut: UserEntity

  // Antes de cada test, creamos datos de prueba y una instancia de UserEntity
  beforeEach(() => {
    jest.spyOn(UserEntity, 'validate').mockImplementation(() => {})
    props = UserDataBuilder({}) // Genera datos de prueba con valores por defecto
    sut = new UserEntity(props) // Crea una nueva instancia de UserEntity
  })

  // Test 1: Verifica que el constructor inicialice correctamente todas las propiedades
  it('Constructor method', () => {
    // 1. Verificar que las propiedades se asignaron correctamente
    expect(jest.spyOn(UserEntity, 'validate')).toHaveBeenCalled()
    expect(sut.props.name).toEqual(props.name)
    expect(sut.props.email).toEqual(props.email)
    expect(sut.props.password).toEqual(props.password)

    // 2. Verificar que createdAt sea una instancia de Date (se genera automáticamente)
    expect(sut.props.createdAt).toBeInstanceOf(Date)
  })

  // Test 2: Verifica que el getter de name funcione correctamente
  it('Getter of name field', () => {
    // 1. Verificar que la propiedad name esté definida
    expect(sut.props.name).toBeDefined()

    // 2. Verificar que el valor sea el esperado
    expect(sut.props.name).toEqual(props.name)

    // 3. Verificar que sea de tipo string
    expect(typeof sut.props.name).toBe('string')
  })

  // Test 3: Verifica que el setter de name funcione correctamente
  it('Setter of name field', () => {
    // 1. Cambiar el valor de name usando el setter
    sut['name'] = 'new name'

    // 2. Verificar que el valor se haya actualizado
    expect(sut.props.name).toEqual('new name')

    // 3. Verificar que siga siendo string
    expect(typeof sut.props.name).toBe('string')
  })

  // Test 4: Verifica que el getter de email funcione correctamente
  it('Getter of email field', () => {
    // 1. Verificar que la propiedad email esté definida
    expect(sut.props.email).toBeDefined()

    // 2. Verificar que el valor sea el esperado
    expect(sut.props.email).toEqual(props.email)

    // 3. Verificar que sea de tipo string
    expect(typeof sut.props.email).toBe('string')
  })

  // Test 5: Verifica que el getter de password funcione correctamente
  it('Getter of password field', () => {
    // 1. Verificar que la propiedad password esté definida
    expect(sut.props.password).toBeDefined()

    // 2. Verificar que el valor sea el esperado
    expect(sut.props.password).toEqual(props.password)

    // 3. Verificar que sea de tipo string
    expect(typeof sut.props.password).toBe('string')
  })

  // Test 6: Verifica que el setter de password funcione correctamente
  it('Setter of password field', () => {
    // 1. Cambiar el valor de password usando el setter
    sut['password'] = 'new password'

    // 2. Verificar que el valor se haya actualizado
    expect(sut.props.password).toEqual('new password')

    // 3. Verificar que siga siendo string
    expect(typeof sut.props.password).toBe('string')
  })

  // Test 7: Verifica que el getter de createdAt funcione correctamente
  it('Getter of createdAt field', () => {
    // 1. Verificar que la propiedad createdAt esté definida
    expect(sut.props.createdAt).toBeDefined()

    // 2. Verificar que sea una instancia de Date
    expect(sut.props.createdAt).toBeInstanceOf(Date)
  })

  // Test 8: Verifica que el método update funcione correctamente
  it('Should update a user', () => {
    // 1. Llamar al método update con un nuevo nombre
    sut.update('new name')
    expect(jest.spyOn(UserEntity, 'validate')).toHaveBeenCalled()
    // 2. Verificar que el nombre se haya actualizado
    expect(sut.props.name).toEqual('new name')
  })

  // Test 9: Verifica que el método updatePassword funcione correctamente
  it('Should update a user password', () => {
    // 1. Llamar al método updatePassword con una nueva contraseña
    sut.updatePassword('new password')

    // 2. Verificar que la contraseña se haya actualizado
    expect(sut.props.password).toEqual('new password')
  })
})
