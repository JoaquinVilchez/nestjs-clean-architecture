/**
 * ARCHIVO: bcryptjs-hash.provider.spec.ts
 * UBICACIÓN: /users/infrastructure/providers/hash-provider/__tests__/unit/
 *
 * ¿POR QUÉ ESTÁ AQUÍ? Los tests del BcryptjsHashProvider están en /users/infrastructure porque
 * prueban la implementación específica del proveedor de hash para usuarios. Al estar en
 * /infrastructure, testean los detalles técnicos de la implementación con bcryptjs.
 *
 * FUNCIONALIDAD: Define tests unitarios para el proveedor de hash BcryptjsHashProvider
 * que verifica la generación y comparación de hashes usando la librería bcryptjs.
 *
 * BENEFICIO: Proporciona cobertura de testing para la funcionalidad crítica de hash de
 * contraseñas, garantizando que la seguridad de las contraseñas funcione correctamente.
 */

import { BcryptjsHashProvider } from '../../bcryptjs-hash.provider'

describe('BcryptjsHashProvider', () => {
  let sut: BcryptjsHashProvider

  beforeEach(() => {
    sut = new BcryptjsHashProvider()
  })

  describe('generateHash', () => {
    it('should generate a hash for a given password', async () => {
      const password = 'TestPassword123'
      const hash = await sut.generateHash(password)

      expect(hash).toBeDefined()
      expect(typeof hash).toBe('string')
      expect(hash).not.toBe(password)
      expect(hash.length).toBeGreaterThan(0)
    })

    it('should generate different hashes for the same password', async () => {
      const password = 'test'
      const hash1 = await sut.generateHash(password)
      const hash2 = await sut.generateHash(password)

      expect(hash1).toBeDefined()
      expect(hash2).toBeDefined()
      expect(hash1).not.toBe(hash2)
    })

    it('should generate different hashes for different passwords', async () => {
      const password1 = 'password1'
      const password2 = 'password2'
      const hash1 = await sut.generateHash(password1)
      const hash2 = await sut.generateHash(password2)

      expect(hash1).not.toBe(hash2)
    })
  })

  describe('compareHash', () => {
    it('should return true when comparing password with its hash', async () => {
      const password = 'TestPassword123'
      const hash = await sut.generateHash(password)
      const isValid = await sut.compareHash(password, hash)

      expect(isValid).toBe(true)
    })

    it('should return false when comparing wrong password with hash', async () => {
      const password = 'TestPassword123'
      const wrongPassword = 'WrongPassword'
      const hash = await sut.generateHash(password)
      const isValid = await sut.compareHash(wrongPassword, hash)

      expect(isValid).toBe(false)
    })

    it('should return false when comparing password with wrong hash', async () => {
      const password = 'TestPassword123'
      const wrongHash = 'wronghash'
      const isValid = await sut.compareHash(password, wrongHash)

      expect(isValid).toBe(false)
    })
  })
})
