/**
 * ARCHIVO: users.controller.spec.ts
 *
 * FUNCIONALIDAD: Tests unitarios para UsersController que verifican que el controlador
 * se instancie correctamente y que la configuración de NestJS esté bien configurada.
 *
 * BENEFICIO: Garantiza que la configuración de NestJS esté correcta y que el controlador
 * sea funcional antes de implementar tests más complejos.
 */

import { Test, TestingModule } from '@nestjs/testing'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'

describe('UsersController', () => {
  let controller: UsersController

  beforeEach(async () => {
    // Configuración del módulo de testing con controlador y sus dependencias
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile()

    controller = module.get<UsersController>(UsersController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
