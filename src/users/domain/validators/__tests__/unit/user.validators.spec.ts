/**
 * ARCHIVO: user.validators.spec.ts
 * UBICACIÓN: /users/domain/validators/__tests__/unit/
 *
 * ¿POR QUÉ ESTÁ AQUÍ? Los tests unitarios están en /users/domain porque prueban las
 * reglas de validación específicas del módulo de usuarios. Al estar en /domain, estos
 * tests validan la lógica de validación pura del dominio de usuarios sin dependencias
 * externas, siguiendo Clean Architecture.
 *
 * FUNCIONALIDAD: Tests unitarios para UserValidator que verifican el comportamiento
 * correcto de todas las validaciones de campos (name, email, password, createdAt)
 * incluyendo casos válidos e inválidos.
 *
 * BENEFICIO: Garantiza que las reglas de validación del dominio funcionen correctamente
 * y que se generen los mensajes de error apropiados para cada caso de validación.
 */

import { UserDataBuilder } from '@/users/domain/testing/helpers/use-data-builder'
import {
  UserRules,
  UserValidator,
  UserValidatorFactory,
} from '../../user.validator'
import { UserProps } from '@/users/domain/entities/user.entity'

let sut: UserValidator
let props: UserProps

describe('UserValidator unit test', () => {
  beforeEach(() => {
    sut = UserValidatorFactory.create()
    props = UserDataBuilder({})
  })

  it('Valid case for all fields', () => {
    const props = UserDataBuilder({})
    const isValid = sut.validate(props)
    expect(isValid).toBeTruthy()
    expect(sut.validatedData).toStrictEqual(new UserRules(props))
  })

  describe('Name field', () => {
    it('Invalidation cases for name field', () => {
      // Prueba con datos nulos
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      let isValid = sut.validate(null as any)
      expect(isValid).toBeFalsy()
      expect(sut.errors['name']).toStrictEqual([
        'name should not be empty',
        'name must be a string',
        'name must be shorter than or equal to 255 characters',
      ])

      isValid = sut.validate({
        ...UserDataBuilder({}),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        name: '' as any,
      })
      expect(isValid).toBeFalsy()
      expect(sut.errors['name']).toStrictEqual(['name should not be empty'])

      isValid = sut.validate({
        ...UserDataBuilder({}),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        name: 10 as any,
      })
      expect(isValid).toBeFalsy()
      expect(sut.errors['name']).toStrictEqual([
        'name must be a string',
        'name must be shorter than or equal to 255 characters',
      ])

      // Prueba con nombre demasiado largo (más de 255 caracteres)
      isValid = sut.validate({
        ...UserDataBuilder({}),
        name: 'a'.repeat(256),
      })
      expect(isValid).toBeFalsy()
      expect(sut.errors['name']).toStrictEqual([
        'name must be shorter than or equal to 255 characters',
      ])
    })
  })

  describe('Email field', () => {
    it('Invalidation cases for email field', () => {
      // Prueba con datos nulos
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      let isValid = sut.validate(null as any)
      expect(isValid).toBeFalsy()
      expect(sut.errors['email']).toStrictEqual([
        'email should not be empty',
        'email must be an email',
        'email must be a string',
        'email must be shorter than or equal to 255 characters',
      ])

      isValid = sut.validate({
        ...UserDataBuilder({}),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        email: '' as any,
      })
      expect(isValid).toBeFalsy()
      expect(sut.errors['email']).toStrictEqual([
        'email should not be empty',
        'email must be an email',
      ])

      isValid = sut.validate({
        ...UserDataBuilder({}),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        email: 10 as any,
      })
      expect(isValid).toBeFalsy()
      expect(sut.errors['email']).toStrictEqual([
        'email must be an email',
        'email must be a string',
        'email must be shorter than or equal to 255 characters',
      ])

      // Prueba con email demasiado largo (más de 255 caracteres)
      isValid = sut.validate({
        ...UserDataBuilder({}),
        email: 'a'.repeat(256),
      })
      expect(isValid).toBeFalsy()
      expect(sut.errors['email']).toStrictEqual([
        'email must be an email',
        'email must be shorter than or equal to 255 characters',
      ])
    })
  })

  describe('Password field', () => {
    it('Invalidation cases for password field', () => {
      // Prueba con datos nulos
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      let isValid = sut.validate(null as any)
      expect(isValid).toBeFalsy()
      expect(sut.errors['password']).toStrictEqual([
        'password should not be empty',
        'password must be a string',
        'password must be shorter than or equal to 100 characters',
      ])

      isValid = sut.validate({
        ...UserDataBuilder({}),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        password: '' as any,
      })
      expect(isValid).toBeFalsy()
      expect(sut.errors['password']).toStrictEqual([
        'password should not be empty',
      ])

      isValid = sut.validate({
        ...UserDataBuilder({}),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        password: 10 as any,
      })
      expect(isValid).toBeFalsy()
      expect(sut.errors['password']).toStrictEqual([
        'password must be a string',
        'password must be shorter than or equal to 100 characters',
      ])

      // Prueba con contraseña demasiado larga (más de 100 caracteres)
      isValid = sut.validate({
        ...UserDataBuilder({}),
        password: 'a'.repeat(256),
      })
      expect(isValid).toBeFalsy()
      expect(sut.errors['password']).toStrictEqual([
        'password must be shorter than or equal to 100 characters',
      ])
    })
  })

  describe('CreatedAt field', () => {
    it('Invalidation cases for createdAt field', () => {
      // Prueba con createdAt de tipo incorrecto
      let isValid = sut.validate({
        ...props,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        createdAt: 10 as any,
      })
      expect(isValid).toBeFalsy()
      expect(sut.errors['createdAt']).toStrictEqual([
        'createdAt must be a Date instance',
      ])

      isValid = sut.validate({
        ...props,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        createdAt: '2023' as any,
      })
      expect(isValid).toBeFalsy()
      expect(sut.errors['createdAt']).toStrictEqual([
        'createdAt must be a Date instance',
      ])
    })
  })
})
