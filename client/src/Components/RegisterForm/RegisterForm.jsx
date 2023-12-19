import { ErrorMessage, Field, Formik } from "formik"
import { useAuth } from '../../context/AuthContext'
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import {StyledForm, StyledInput} from '../LoginForm/LoginForm'
import { StyledInputFile } from '../ProductForm/ProductForm'
import { LuImagePlus as UploadImage } from "react-icons/lu";

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
  .test('password', 'El Password requiere 8 caracteres, un número, una minúscula, una mayúscula, un símbolo y no se permiten espacios en blanco', value => {
    let errors = [];
    if (!/(?=.*[0-9])/.test(value)) {
      errors.push(" un número");
    }
    if (!/(?=.*[a-z])/.test(value)) {
      errors.push(" una minúscula");
    }
    if (!/(?=.*[A-Z])/.test(value)) {
      errors.push(" una mayúscula");
    }
    if (!/(?=.*[^\w])/.test(value)) {
      errors.push(" un símbolo");
    }
    if (/\s/.test(value)) {
      errors.push(" no se permiten espacios en blanco");
    }
    if (value && value.length < 8) {
      errors.push(" 8 caracteres");
    }
    if (/\s/.test(value)) {
      return new Yup.ValidationError("No se permiten espacios en blanco", null, "password");
    }
    return errors.length === 0 ? true : new Yup.ValidationError("El Password requiere" + errors.join(","), null, "password");
  })
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
      {(formik) => {
        console.log(formik.errors.password)
        return (
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
            { formik.touched.password && formik.errors.password ? (
              <ErrorMessage name="password" component='span' />
            ) : null }
          </div>
          <div className="form-control uploadFile">
            <UploadImage />
            <p className="text-uploadFile">Añade una imagen</p>
            <StyledInputFile
              type="file"
              name="img"
              onChange={(e) => formik.setFieldValue("img", e.target.files[0])}
          />
          </div>
          <button type="submit" className="buttonForm">Enviar</button>
      </StyledForm>
      )}}
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