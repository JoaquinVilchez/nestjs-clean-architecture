# 🏗️ Domain Entities

## ¿Qué va aquí?

Esta carpeta contiene las **entidades del dominio** del módulo de usuarios. Las entidades son objetos con identidad propia que representan conceptos importantes del negocio.

## Archivos que deberían estar aquí:

- **User Entity**: La entidad principal de usuario
  - `user.entity.ts` ✅ (ya existe)

- **Otras entidades relacionadas**:
  - `user-profile.entity.ts`
  - `user-session.entity.ts`
  - `user-preference.entity.ts`

## Características de las Entidades:

- ✅ Tienen **identidad única** (ID)
- ✅ Contienen **reglas de negocio** específicas
- ✅ Pueden cambiar de estado a lo largo del tiempo
- ✅ Son **inmutables** en su comportamiento (no cambian sus reglas)

## Ejemplo de estructura:

```typescript
export class User {
  constructor(
    private readonly id: UserId,
    private readonly email: Email,
    private readonly password: Password,
  ) {}

  // Métodos de negocio
  public changeEmail(newEmail: Email): void {
    // Reglas de negocio para cambiar email
  }

  public validatePassword(password: string): boolean {
    // Lógica de validación
  }
}
```

## ⚠️ Importante:

- **NO** deben tener dependencias externas
- **NO** deben conocer detalles de persistencia
- Deben ser **puras** y **testeables**
- Aquí van las reglas de negocio más importantes
