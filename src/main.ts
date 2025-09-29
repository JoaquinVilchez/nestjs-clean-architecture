/**
 * ARCHIVO: main.ts
 * UBICACIÓN: /src/
 *
 * ¿POR QUÉ ESTÁ AQUÍ? El archivo main.ts está en la raíz de src porque es el punto de entrada
 * principal de la aplicación NestJS. Al estar en la raíz, es el primer archivo que se ejecuta
 * cuando la aplicación inicia y es responsable de configurar y arrancar toda la infraestructura
 * de la aplicación.
 *
 * FUNCIONALIDAD: Define el punto de entrada principal de la aplicación NestJS que configura
 * y arranca el servidor web. Este archivo inicializa la aplicación con Fastify como motor HTTP,
 * configura el módulo principal y pone el servidor en escucha en el puerto especificado.
 *
 * BENEFICIO: Proporciona un punto de entrada único y centralizado para la aplicación que
 * encapsula toda la configuración de infraestructura. Esto facilita el despliegue y
 * mantenimiento de la aplicación al tener toda la configuración en un solo lugar.
 */

import { NestFactory } from '@nestjs/core'
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  )
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0')
}
bootstrap()
