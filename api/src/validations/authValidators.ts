import validator from 'validator'

const passwordOptions = {
  minLength: 8,
  minLowercase: 1,
  minUppercase: 1,
  minNumbers: 1,
  minSymbols: 1,
}

//By adding the return type boolean to the function, you indicate that the function returns a boolean value, which represents the validity of the email address
export const isEmailValid = (email: string): boolean => {
  return validator.isEmail(email)
}

export const isStrongPassword = (password: string): boolean => {
  return validator.isStrongPassword(password, passwordOptions)
}
