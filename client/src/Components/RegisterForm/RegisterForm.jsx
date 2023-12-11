import { ErrorMessage, Field, Formik } from "formik"
import { useAuth } from '../../context/AuthContext'
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import {StyledForm, StyledInput} from '../LoginForm/LoginForm'

const initialValues = {
  name: '',
  email: '',
  password: '',
  img: ''
} 

const validationSchema = Yup.object({
  name: Yup.string().min(3,'Debe tener mas de 3 caracteres').required('Introduce un nombre'),
  email: Yup.string().email('Introduce un email válido').required('Introduce un email'),
  password: Yup.string()
    .min(8, 'La contraseña debe tener 8 caracteres')
    .matches(/[0-9]/, 'El Password requiere a número')
    .matches(/[a-z]/, 'El Password requiere una minúscula')
    .matches(/[A-Z]/, 'El Password requiere una mayúscula')
    .matches(/[^\w]/, 'El Password requiere un symbol')
    .matches(/^\S*$/, 'No se permiten espacios en blanco')
    .required('Campo requerido')
})


// Formulario con Componentes Formik Contexto
export const RegisterForm = () => {
  
  const {register, isLogin, error, setError} = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isLogin) navigate('/')
  }, [isLogin, navigate])

  useEffect(() => {
    const timer = setTimeout(() => {
      setError([]);
    }, 10000);
    return () => clearTimeout(timer);
  }, [error, setError]);
  
  const onSubmit = async (values, onSubmitProps) => {
    await register(values)
    onSubmitProps.setSubmitting(false)
  }
  
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {formik => (
        <StyledForm onSubmit={formik.handleSubmit}>
          <h1 className="titleRegisterForm">Registro</h1>
          {error
            ? error.map((message, index) => (
                <div key={index} className="errorMessage">
                  {message}
                </div>
              ))
            : null}
          <div className="form-control">
            <StyledInput name='name' type='text' placeholder='Nombre'/>
            <ErrorMessage name="name" component='span' />
          </div>
          <div className="form-control">
            <StyledInput name='email' type='email' placeholder='Email' />
            <ErrorMessage name="email" component='span' />
          </div>
          <div className="form-control">
            <StyledInput name='password' type='password' placeholder='password' />
            <ErrorMessage name="password" component='span' />
          </div>
          <div className="form-control">
            <Field name='img' type='file'/>
            <ErrorMessage name="img" component='span' />
          </div>
          <button type="submit" className="buttonForm">Enviar</button>
      </StyledForm>
      )}
    </Formik> 
  )


}


// ##########################Formulario con useFormik#####################
// export const RegisterForm = () => {
  
//   const formik = useFormik({
//     initialValues: {
//       name: '',
//       surname: '',
//       email: '',
//       password: '',
//       img: ''
//     },
//     validationSchema: Yup.object({
//       name: Yup.string().min(3,'Debe tener mas de 3 caracteres').required('Campo requerido'),
//       surname: Yup.string().min(3,'Debe tener mas de 3 caracteres'),
//       email: Yup.string().email('Introduce un email válido').required('Campo requerido'),
//       password: Yup.string().min(8,'Debe tener 8 o más caracteres').required('Campo requerido')
//     }),
//     onSubmit: values => {
//       console.log(values);
//     }
//   })
  
//   return (
//     <>
//       <form onSubmit={formik.handleSubmit}>
//         <h1 className="titleRegisterForm">Registro</h1>
//         <div className="form-control">
//           <label htmlFor="name">Nombre</label>
//           <input
//             id='name'
//             name='name'
//             type= 'text'
//             // onChange={formik.handleChange}
//             // onBlur={formik.handleBlur}
//             // values={formik.values.name}
//             // checked={}
//             {...formik.getFieldProps('name')}    
//           />
//           {formik.touched.name && formik.errors.name ? <span>{formik.errors.name}</span> : null }
//         </div>
//         <div className="form-control">
//           <label htmlFor="surname">Apellidos</label>
//           <input
//             id='surname'
//             name='surname'
//             type= 'text'
//             {...formik.getFieldProps('surname')}    
//           />
//           {formik.touched.surname && formik.errors.surname ? <span>{formik.errors.surname}</span> : null }
//         </div>
//         <div className="form-control">
//           <label htmlFor="email">Email</label>
//           <input
//             id='email'
//             name='email'
//             type= 'email'
//             {...formik.getFieldProps('email')}    
//           />
//           {formik.touched.email && formik.errors.email ? <span>{formik.errors.email}</span> : null }
//         </div>
//         <div className="form-control">
//           <label htmlFor="password">Password</label>
//           <input
//             id='password'
//             name='password'
//             type= 'password'
//             {...formik.getFieldProps('password')}     
//           />
//           {formik.touched.password && formik.errors.password ? <span>{formik.errors.password}</span> : null }
//         </div>
//         <div className="form-control">
//           <label htmlFor="img"></label>
//           <input
//             id='img'
//             name='img'
//             type= 'file'
//             {...formik.getFieldProps('img')}     
//           />
//         </div>
//         <button type="submit">Enviar</button>
//     </form>
//     </>
//   )

// }