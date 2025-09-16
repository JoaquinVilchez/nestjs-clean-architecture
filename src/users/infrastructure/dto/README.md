# 📝 DTOs (Data Transfer Objects)

## ¿Qué va aquí?

Esta carpeta contiene los **DTOs de infraestructura** para el módulo de usuarios. Los DTOs son objetos que se usan para transferir datos entre capas y validar la entrada/salida.

## Archivos que deberían estar aquí:

- **DTOs de Creación**:
  - `create-user.dto.ts` ✅ (ya existe)
  - `create-user-profile.dto.ts`

- **DTOs de Actualización**:
  - `update-user.dto.ts` ✅ (ya existe)
  - `update-user-password.dto.ts`

- **DTOs de Respuesta**:
  - `user-response.dto.ts`
  - `user-list-response.dto.ts`

- **DTOs de Consulta**:
  - `user-query.dto.ts`
  - `user-filter.dto.ts`

## Funcionalidad:

- ✅ **Validar** datos de entrada (usando class-validator)
- ✅ **Transformar** datos entre capas
- ✅ **Documentar** la API (usando Swagger/OpenAPI)
- ✅ **Serializar** datos de salida

## Ejemplo de estructura:

```typescript
export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @MinLength(8)
  password: string

  @IsString()
  @IsNotEmpty()
  name: string
}
```

## ⚠️ Importante:

- Deben tener **validaciones** claras
- Son específicos de la **capa de infraestructura**
- **NO** deben contener lógica de negocio
- Deben ser **simples** y **fáciles de entender**
