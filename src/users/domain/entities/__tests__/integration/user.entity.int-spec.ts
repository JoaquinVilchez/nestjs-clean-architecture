/**
 * ARCHIVO: user.entity.int-spec.ts
 *
 * FUNCIONALIDAD: Tests de integración para la entidad UserEntity que verifican el comportamiento
 * completo incluyendo validaciones de dominio, construcción de objetos y métodos de actualización.
 *
 * BENEFICIO: Garantiza que las validaciones de dominio funcionen correctamente en escenarios
 * reales y que la entidad se comporte según las reglas de negocio establecidas.
 */

import { UserDataBuilder } from '@/users/domain/testing/helpers/use-data-builder'
import { UserEntity, UserProps } from '../../user.entity'
import { EntityValidationError } from '@/shared/domain/errors/validation-error'

describe('UserEntity integration test', () => {
  describe('Constructor method', () => {
    it('Should throw an error when creating a user with invalid name', () => {
      // Prueba diferentes casos de nombre inválido
      let props: UserProps = {
        ...UserDataBuilder({}),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        name: null as any,
      }
      expect(() => new UserEntity(props)).toThrow(EntityValidationError)

      props = {
        ...UserDataBuilder({}),
        name: '',
      }
      expect(() => new UserEntity(props)).toThrow(EntityValidationError)

      props = {
        ...UserDataBuilder({}),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        name: 10 as any,
      }
      expect(() => new UserEntity(props)).toThrow(EntityValidationError)

      // Prueba con nombre demasiado largo (más de 255 caracteres)
      props = {
        ...UserDataBuilder({}),
        name: 'a'.repeat(256),
      }
      expect(() => new UserEntity(props)).toThrow(EntityValidationError)
    })

    it('Should throw an error when creating a user with invalid email', () => {
      // Prueba diferentes casos de email inválido
      let props: UserProps = {
        ...UserDataBuilder({}),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        email: null as any,
      }
      expect(() => new UserEntity(props)).toThrow(EntityValidationError)

      props = {
        ...UserDataBuilder({}),
        email: '',
      }
      expect(() => new UserEntity(props)).toThrow(EntityValidationError)

      props = {
        ...UserDataBuilder({}),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        email: 10 as any,
      }
      expect(() => new UserEntity(props)).toThrow(EntityValidationError)

      // Prueba con email demasiado largo (más de 255 caracteres)
      props = {
        ...UserDataBuilder({}),
        email: 'a'.repeat(256),
      }
      expect(() => new UserEntity(props)).toThrow(EntityValidationError)
    })

    it('Should throw an error when creating a user with invalid password', () => {
      // Prueba diferentes casos de contraseña inválida
      let props: UserProps = {
        ...UserDataBuilder({}),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        password: null as any,
      }
      expect(() => new UserEntity(props)).toThrow(EntityValidationError)

      props = {
        ...UserDataBuilder({}),
        password: '',
      }
      expect(() => new UserEntity(props)).toThrow(EntityValidationError)

      props = {
        ...UserDataBuilder({}),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        password: 10 as any,
      }
      expect(() => new UserEntity(props)).toThrow(EntityValidationError)

      // Prueba con contraseña demasiado larga (más de 100 caracteres)
      props = {
        ...UserDataBuilder({}),
        password: 'a'.repeat(101),
      }
      expect(() => new UserEntity(props)).toThrow(EntityValidationError)
    })

    it('Should throw an error when creating a user with invalid createdAt', () => {
      // Prueba con createdAt de tipo incorrecto
      let props: UserProps = {
        ...UserDataBuilder({}),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        createdAt: '2023' as any,
      }
      expect(() => new UserEntity(props)).toThrow(EntityValidationError)

      props = {
        ...UserDataBuilder({}),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        createdAt: 123 as any,
      }
      expect(() => new UserEntity(props)).toThrow(EntityValidationError)
    })

    it('Should create a valid user', () => {
      expect.assertions(0)

      const props: UserProps = {
        ...UserDataBuilder({}),
      }

      // Verifica que no se lance ninguna excepción con datos válidos
      new UserEntity(props)
    })
  })

  describe('Update method', () => {
    it('Should throw an error when updating a user with invalid name', () => {
      const entity = new UserEntity(UserDataBuilder({}))

      // Prueba diferentes casos de nombre inválido para update
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      expect(() => entity.update(null as any)).toThrow(EntityValidationError)

      expect(() => entity.update('')).toThrow(EntityValidationError)

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      expect(() => entity.update(10 as any)).toThrow(EntityValidationError)

      // Prueba con nombre demasiado largo
      expect(() => entity.update('a'.repeat(256))).toThrow(
        EntityValidationError,
      )
    })

    it('Should update a user with valid name', () => {
      expect.assertions(0)

      const props: UserProps = {
        ...UserDataBuilder({}),
      }

      const entity = new UserEntity(props)
      // Verifica que no se lance ninguna excepción con nombre válido
      entity.update('new name')
    })
  })

  describe('UpdatePassword method', () => {
    it('Should throw an error when updating a user with invalid password', () => {
      const entity = new UserEntity(UserDataBuilder({}))

      // Prueba diferentes casos de contraseña inválida para updatePassword
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      expect(() => entity.updatePassword(null as any)).toThrow(
        EntityValidationError,
      )

      expect(() => entity.updatePassword('')).toThrow(EntityValidationError)

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      expect(() => entity.updatePassword(10 as any)).toThrow(
        EntityValidationError,
      )

      // Prueba con contraseña demasiado larga
      expect(() => entity.updatePassword('a'.repeat(101))).toThrow(
        EntityValidationError,
      )
    })

    it('Should update a user with valid password', () => {
      expect.assertions(0)

      const props: UserProps = {
        ...UserDataBuilder({}),
      }

      const entity = new UserEntity(props)
      // Verifica que no se lance ninguna excepción con contraseña válida
      entity.updatePassword('new password')
    })
  })
})
