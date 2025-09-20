/**
 * ARCHIVO: users.service.spec.ts
 *
 * FUNCIONALIDAD: Tests unitarios para UsersService que verifican que el servicio
 * se instancie correctamente y que la configuración de NestJS esté bien configurada.
 *
 * BENEFICIO: Garantiza que la configuración de NestJS esté correcta y que el servicio
 * sea funcional antes de implementar tests más complejos.
 */

import { Test, TestingModule } from '@nestjs/testing'
import { UsersService } from './users.service'

describe('UsersService', () => {
  let service: UsersService

  beforeEach(async () => {
    // Configuración del módulo de testing solo con el servicio
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile()

    service = module.get<UsersService>(UsersService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
