export type FieldsErrors = {
  [field: string]: string[]
}
export interface ValidatorFieldsInterface<PropsValidated> {
  errors: FieldsErrors
  validatedData: PropsValidated | undefined
  validate(data: any): boolean
}
