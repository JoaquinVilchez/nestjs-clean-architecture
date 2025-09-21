/**
 * ARCHIVO: users.controller.spec.ts
 * UBICACIÓN: /users/infrastructure/
 *
 * ¿POR QUÉ ESTÁ AQUÍ? Los tests del controlador están en /users/infrastructure porque
 * prueban la funcionalidad específica del controlador del módulo de usuarios. Al estar
 * en /infrastructure, estos tests validan la configuración de NestJS y la integración
 * del controlador con el framework, que son responsabilidades de la capa de infraestructura.
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
