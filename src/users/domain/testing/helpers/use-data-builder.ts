/**
 * ARCHIVO: use-data-builder.ts
 *
 * FUNCIONALIDAD: Helper para generar datos de prueba consistentes para usuarios
 * utilizando Faker.js. Permite sobrescribir campos específicos cuando se necesitan
 * valores particulares para casos de prueba específicos.
 *
 * BENEFICIO: Centraliza la generación de datos de prueba, hace los tests más legibles
 * y mantenibles, y proporciona datos consistentes y realistas para las pruebas.
 */

import { faker } from '@faker-js/faker'
import { UserProps } from '../../entities/user.entity'

type Props = {
  name?: string
  email?: string
  password?: string
  createdAt?: Date
}

export function UserDataBuilder(props: Props): UserProps {
  return {
    // Usa valor proporcionado o genera uno realista con Faker
    name: props.name ?? faker.person.fullName(),
    email: props.email ?? faker.internet.email(),
    password: props.password ?? faker.internet.password(),
    createdAt: props.createdAt ?? new Date(),
  }
}
