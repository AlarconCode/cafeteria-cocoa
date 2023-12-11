import * as yup from 'yup'

export const productSchema = yup.object().shape({
  cat: yup.string().required('Campo requerido'),
  desc: yup.string().max(120, 'Máximo 120 caracteres').required('Debes introducir una descripción'),
  ingredientes: yup.string().max(120, 'Máximo 120 caracteres'),
  price: yup.number().typeError('Debes introducir un precio').positive().required('Campo requerido'),
});