import { randomUUID as uuidv4 } from 'node:crypto'

/**
 * Clase base abstracta para todas las entidades del dominio
 *
 * Esta clase implementa el patrón Entity de Domain-Driven Design (DDD)
 * y proporciona funcionalidad común para todas las entidades del sistema.
 *
 * Características principales:
 * - Genera automáticamente un ID único si no se proporciona uno
 * - Mantiene las propiedades de la entidad inmutables (readonly)
 * - Proporciona un método toJSON() para serialización
 * - Sigue los principios de Clean Architecture
 *
 * Uso típico:
 * - Todas las entidades del dominio deben extender de esta clase
 * - Las entidades representan objetos de negocio con identidad única
 * - Ejemplos: UserEntity, ProductEntity, OrderEntity, etc.
 *
 * @template Props - Tipo de las propiedades específicas de cada entidad
 */
export abstract class Entity<Props = any> {
  /**
   * Identificador único de la entidad
   * Es readonly para mantener la inmutabilidad
   */
  public readonly _id: string

  /**
   * Propiedades específicas de la entidad
   * Son readonly para mantener la inmutabilidad de los datos
   */
  public readonly props: Props

  /**
   * Constructor de la entidad base
   *
   * @param props - Propiedades específicas de la entidad
   * @param id - ID opcional. Si no se proporciona, se genera uno automáticamente
   */
  constructor(props: Props, id?: string) {
    this.props = props
    this._id = id ?? uuidv4()
  }

  /**
   * Getter para acceder al ID de la entidad
   * Proporciona una interfaz limpia para acceder al identificador
   *
   * @returns El ID único de la entidad
   */
  get id() {
    return this._id
  }

  /**
   * Convierte la entidad a un objeto JSON serializable
   *
   * Este método es útil para:
   * - Serializar la entidad para APIs REST
   * - Almacenar la entidad en bases de datos
   * - Logging y debugging
   * - Transferir datos entre capas de la aplicación
   *
   * @returns Objeto JSON que incluye el ID y todas las propiedades
   */
  toJSON(): Required<{ id: string } & Props> {
    return {
      id: this._id,
      ...this.props,
    } as Required<{ id: string } & Props>
  }
}
