export const validationErrors = {
  required: 'This field is required',
  maxlength: ({ requiredLength }: { requiredLength: string }): string => `Maximum length is ${requiredLength} symbols`,
  minlength: ({ requiredLength }: { requiredLength: string }): string => `Minimum length is ${requiredLength} symbols`,
}
