import { ClassValidatorFields } from '../../class-validator-fields'
import * as libClassValidator from 'class-validator'

class StubClassValidatorFields extends ClassValidatorFields<{
  field: string
}> {}

describe('ClassValidatorFields unit test', () => {
  it('Should initialize errors and validatedData with null', () => {
    const sut = new StubClassValidatorFields()

    expect(sut.errors).toEqual({})
    expect(sut.validatedData).toBeUndefined()
  })

  it('Should validate with errors', () => {
    const spyValidateSync = jest.spyOn(libClassValidator, 'validateSync')
    spyValidateSync.mockReturnValue([
      { property: 'field', constraints: { isRequired: 'Test error' } },
    ])
    const sut = new StubClassValidatorFields()

    expect(sut.validate(null)).toBeFalsy()
    expect(spyValidateSync).toHaveBeenCalled()
    expect(sut.validatedData).toBeUndefined()
    expect(sut.errors).toStrictEqual({ field: ['Test error'] })
  })
})
