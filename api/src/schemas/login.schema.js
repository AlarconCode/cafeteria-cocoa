import * as yup from 'yup'

export const loginSchema = yup.object().shape({
  email: yup.string().email('Debes introducir un email válido').required('Campo requerido'),
  password: yup.string()
  .min(8, 'La contraseña debe tener 8 caracteres')
  .matches(/[0-9]/, 'El Password requiere a número')
  .matches(/[a-z]/, 'El Password requiere una minúscula')
  .matches(/[A-Z]/, 'El Password requiere una mayúscula')
  .matches(/[^\w]/, 'El Password requiere un symbol')
  .matches(/^\S*$/, 'No se permiten espacios en blanco')
  .required('Campo requerido')
})