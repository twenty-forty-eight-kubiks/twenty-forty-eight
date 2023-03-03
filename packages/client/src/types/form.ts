export enum LoginFormFields {
  Email = 'email',
  Password = 'password',
}

export enum RegistrationFormFields {
  Firstname = 'firstname',
  Surname = 'surname',
  Email = 'email',
  Password = 'password',
  ConfirmPassword = 'confirmPassword',
}

export type LoginErrorsObj = {
  email: string | null;
  password: string | null;
} | Record<string, never>

export type RegistrationErrorsObj = {
  firstname: string | null;
  surname: string | null;
  email: string | null;
  password: string | null;
  confirmPassword: string | null;
} | Record<string, never>