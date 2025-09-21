/**
 * ARCHIVO: user.entity.spec.ts
 * UBICACIÓN: /users/domain/entities/__tests__/unit/
 *
 * ¿POR QUÉ ESTÁ AQUÍ? Los tests unitarios están en /users/domain porque prueban la lógica
 * de negocio específica del módulo de usuarios. Al estar en /domain, estos tests validan
 * las reglas de negocio puras sin dependencias externas, siguiendo Clean Architecture.
 *
 * FUNCIONALIDAD: Tests unitarios para la entidad UserEntity que verifican el comportamiento
 * correcto de todos los métodos, getters, setters y validaciones de la entidad.
 *
 * BENEFICIO: Garantiza que la lógica de negocio de la entidad User esté bien implementada
 * y que todos los métodos funcionen según lo esperado, proporcionando confianza en el código.
 */

import { UserEntity, UserProps } from '../../user.entity'
import { UserDataBuilder } from '@/users/domain/testing/helpers/use-data-builder'

describe('UserEntity unit test', () => {
  let props: UserProps
  let sut: UserEntity

  beforeEach(() => {
    // Mock del método validate para evitar validaciones reales en tests unitarios
    jest.spyOn(UserEntity, 'validate').mockImplementation(() => {})
    props = UserDataBuilder({})
    sut = new UserEntity(props)
  })

  it('Constructor method', () => {
    // Verifica que se llame la validación y se asignen correctamente las propiedades
    expect(jest.spyOn(UserEntity, 'validate')).toHaveBeenCalled()
    expect(sut.props.name).toEqual(props.name)
    expect(sut.props.email).toEqual(props.email)
    expect(sut.props.password).toEqual(props.password)

    // Verifica que createdAt se genere automáticamente como Date
    expect(sut.props.createdAt).toBeInstanceOf(Date)
  })

  it('Getter of name field', () => {
    expect(sut.props.name).toBeDefined()
    expect(sut.props.name).toEqual(props.name)
    expect(typeof sut.props.name).toBe('string')
  })

  it('Setter of name field', () => {
    // Acceso directo al setter privado para testing
    sut['name'] = 'new name'

    expect(sut.props.name).toEqual('new name')
    expect(typeof sut.props.name).toBe('string')
  })

  it('Getter of email field', () => {
    expect(sut.props.email).toBeDefined()
    expect(sut.props.email).toEqual(props.email)
    expect(typeof sut.props.email).toBe('string')
  })

  it('Getter of password field', () => {
    expect(sut.props.password).toBeDefined()
    expect(sut.props.password).toEqual(props.password)
    expect(typeof sut.props.password).toBe('string')
  })

  it('Setter of password field', () => {
    // Acceso directo al setter privado para testing
    sut['password'] = 'new password'

    expect(sut.props.password).toEqual('new password')
    expect(typeof sut.props.password).toBe('string')
  })

  it('Getter of createdAt field', () => {
    expect(sut.props.createdAt).toBeDefined()
    expect(sut.props.createdAt).toBeInstanceOf(Date)
  })

  it('Should update a user', () => {
    sut.update('new name')

    // Verifica que se llame la validación antes de actualizar
    expect(jest.spyOn(UserEntity, 'validate')).toHaveBeenCalled()
    expect(sut.props.name).toEqual('new name')
  })

  it('Should update a user password', () => {
    sut.updatePassword('new password')

    expect(sut.props.password).toEqual('new password')
  })
})
