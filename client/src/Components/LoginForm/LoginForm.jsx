import { ErrorMessage, Field, Formik } from "formik";
import { useAuth } from "../../context/AuthContext";
import * as Yup from "yup";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Introduce un email válido")
    .required("Campo requerido"),
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
});

// Formulario con Componentes Formik Contexto
export const LoginForm = () => {
  const { login, isLogin, error, setError } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin) navigate("/");
  }, [isLogin, navigate]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setError([]);
    }, 10000);
    return () => clearTimeout(timer);
  }, [error, setError]);

  const onSubmit = async (values) => {
    try {
      await login(values);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <Wrapper>
          <StyledForm onSubmit={formik.handleSubmit}>
            <h1 className="titleRegisterForm">Login</h1>
            {error
              ? error.map((message, index) => (
                  <div key={index} className="errorMessage">
                    {message}
                  </div>
                ))
              : null}
            <div className="form-control">
              <StyledInput name="email" type="email" placeholder="Email" />
              <ErrorMessage name="email" component="span" />
            </div>
            <div className="form-control">
              <StyledInput
                name="password"
                type="password"
                placeholder="Password"
              />
              <ErrorMessage name="password" component="span" />
            </div>
            <button type="submit" className="buttonForm">
              Entrar
            </button>
            <p>
              ¿No tienes cuenta? <Link to="/registro">Regístrate</Link>
            </p>
          </StyledForm>
        </Wrapper>
      )}
    </Formik>
  );
};

export const Wrapper = styled.section`
  background-color: var(--secondary);
  width: 100vw;
  min-height: 100vh;
  padding-top: 160px;
  padding-bottom: 160px;
  display: grid;
  place-content: center;
  
`

export const StyledForm = styled.form`

  .titleRegisterForm {
    font-size: 2rem;
    color: var(--primary);
    text-align: center;
    margin-bottom: 1rem;
  }

  .form-control {
    width: 75vw;
    max-width: 350px;
    margin-bottom: 1rem;
  }

  div.uploadFile {
    position: relative;
    border: 2px solid var(--primary);
    background-color: aliceblue;
    height: 3rem;
    color: var(--primary);
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.5rem;
    cursor: pointer;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  .text-uploadFile {
    font-size: 1rem;
    cursor: pointer;
  }

  .form-control label {
    display: block;
    color: var(--primary);
    margin-bottom: 5px;
  }

  select {
    display: block;
    width: 100%;
    height: 3rem;
    border: 2px solid var(--primary);
    padding: 0.5rem;
    font-size: 1rem;
    font-family: var(--font);
    color: var(--primary);
    background-color: var(--secondary);
    outline: none;
    transition: var(--transition);

    &:focus {
      border-color: var(--primary);
      box-shadow: var(--shadow);
    }
  }

  .deleteIcon {
    color: var(--primary);
    cursor: pointer;
  }

  .buttonForm {
    display: block;
    width: 100%;
    height: 3rem;
    background-color: var(--primary);
    color: var(--secondary);
    border: none;
    font-size: 1rem;
    cursor: pointer;
    transition: var(--transition);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);

    &:hover {
      background-color: var(--third);
      border: 2px solid var(--primary);
      color: var(--primary);
      transition: all 0.3s ease 0s;
    }
  
  }

`;

export const StyledInput = styled(Field)`
  display: block;
  width: 100%;
  height: 3rem;
  padding: 1rem;
  background-color: aliceblue;
  font-size: 1rem;
  color: var(--primary);
  border: 2px solid var(--primary);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
`;
