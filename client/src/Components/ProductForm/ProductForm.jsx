import { ErrorMessage, Field, Formik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProduct } from "../../context/ProductContext";
import Swal from "sweetalert2";
import { StyledForm, StyledInput } from "../LoginForm/LoginForm";
import { string } from "prop-types";

// Formulario con Componentes Formik Contexto
export const ProductForm = ({ ...props }) => {
  const [values, setValues] = useState(null);
  const {createProduct, getSingleProduct, updateProduct, errors, setErrors, success } = useProduct();
  const params = useParams();
  const navigate = useNavigate();

  const initialValues = {
    cat: "",
    desc: "",
    ingredientes: "",
    price: "",
    img: null,
  };

  const validationSchema = Yup.object({
    cat: Yup.string().required("Campo requerido"),
    desc: Yup.string().max(120, "Debe tener menos caracteres"),
    ingredientes: Yup.string().max(120, "Debe tener menos caracteres"),
    
    
  });
  
 
  const onSubmitCreateProduct = (values, onSubmitProps) => {
    const formData = new FormData();
    formData.append("cat", values.cat);
    formData.append("desc", values.desc);
    formData.append("ingredientes", values.ingredientes);
    formData.append("price", values.price);
    formData.append("img", values.img);

    Swal.fire({
      title: `Añadir ${values.desc}`,
      icon: "info",
      confirmButtonColor: "green",
      confirmButtonText: "Aceptar",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      cancelButtonColor: "red",
    }).then((res) => {
      createProduct(formData);
      if (errors && errors.length > 0 || errors[0] === "jwt must be provided") {
        Swal.fire({ icon: "error", title: "Error", text: errors.join('\n') });
        setErrors([]);
        onSubmitProps.setSubmitting(false);
      } else if (errors.length === 0) {
        Swal.fire({
          icon: "success",
          title: `${values.desc} Actualizada`,
          timer: 2000,
          showConfirmButton: false,
        });
        setTimeout(() => {
          navigate(`/${values.cat === 'Repostería Casera' ? 'reposteria' : values.cat}`);
        }, 2000);
      }
      if (res.isDismissed) {
        onSubmitProps.setSubmitting(false);
      }
    });
  };

  const onSubmitUpdateProduct = (values, onSubmitProps) => {
    const formData = new FormData();
    formData.append("_id", params.id);
    formData.append("cat", values.cat);
    formData.append("desc", values.desc);
    formData.append("ingredientes", values.ingredientes);
    formData.append("price", values.price);
    formData.append("img", values.img);
    
    Swal.fire({
      title: "¿Desea Actualizar el producto?",
      icon: "info",
      confirmButtonColor: "green",
      confirmButtonText: "Aceptar",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      cancelButtonColor: "red",
    }).then((res) => {
      updateProduct(formData)
      if (res.isConfirmed && errors.length > 0) {
        Swal.fire({ icon: "error", title: "Error", text: errors.join('\n') });
        setErrors([]);
        onSubmitProps.setSubmitting(false);
        return
      } else if (res.isConfirmed && errors.length === 0) { 
        Swal.fire({ 
          icon: "success", 
          title: success, 
          timer: 2000, showConfirmButton: false});
          setTimeout(() => {
            navigate(`/${values.cat === 'Repostería Casera' ? 'reposteria' : values.cat}`);
          }, 2000);
        onSubmitProps.setSubmitting(false);
      }
      if (res.isDismissed) {
        onSubmitProps.setSubmitting(false);
      }
    });
  };

  useEffect(() => {
    const getUpdateProduct = async () => {
      if (params.id) {
        const product = await getSingleProduct(params.id);
        setValues(product);
      }
    };
    getUpdateProduct();
  }, [params.id, getSingleProduct]);

  return (
    <Formik
      initialValues={values || initialValues}
      validationSchema={validationSchema}
      onSubmit={!params.id ? onSubmitCreateProduct : onSubmitUpdateProduct}
      enableReinitialize={true}
      isSubmitting={false}
    >
      {(formik) => {
        // console.log('formikProps', formik)
        // console.log(formik.values);
        return (
          <StyledForm
            onSubmit={formik.handleSubmit}
            encType="multipart/form-data"
          >
            <h1 className="titleRegisterForm">{props.title}</h1>
            <div className="form-control">
              <Field as="select" name="cat" type="text">
                <option>Elige una categoría</option>
                <option value="Desayunos">Desayunos</option>
                <option value="cafes">Cafes</option>
                <option value="reposteria">Repostería Casera</option>
                <option value="Comidas">Comidas</option>
                <option value="Bebidas">Bebidas</option>
              </Field>
              <ErrorMessage name="cat" component="span" />
            </div>
            <div className="form-control">
              <StyledInput name="desc" type="text" placeholder="Descripción" />
              <ErrorMessage name="desc" component="span" />
            </div>
            <div className="form-control">
              <StyledInput
                name="ingredientes"
                type="text"
                placeholder="Ingredientes"
              />
              <ErrorMessage name="ingredientes" component="span" />
            </div>
            <div className="form-control">
              <StyledInput name="price" type="number" placeholder="Precio" />
              <ErrorMessage name="price" component="span" />
            </div>
            <div className="form-control">
              <input
                type="file"
                name="img"
                onChange={(e) => formik.setFieldValue("img", e.target.files[0])}
              />
              <ErrorMessage name="img" component="span" />
            </div>
            <button
              type="submit"
              disabled={!formik.isValid || formik.isSubmitting}
              style={
                !formik.isValid || formik.isSubmitting
                  ? { opacity: 0.5 }
                  : { opacity: 1 }
              }
              className="buttonForm"
            >
              Guardar
            </button>
          </StyledForm>
        );
      }}
    </Formik>
  );
};

ProductForm.propTypes = {
  title: string,
};
