export type FieldsErrors = {
  [field: string]: string[]
}
export interface ValidatorFieldsInterface<PropsValidated> {
  errors: FieldsErrors | null
  validatedData: PropsValidated | undefined
  validate(data: any): boolean
}
