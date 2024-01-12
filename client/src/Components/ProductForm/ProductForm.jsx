import { ErrorMessage, Field, Formik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProduct } from "../../context/ProductContext";
import Swal from "sweetalert2";
import { StyledForm, StyledInput } from "../LoginForm/LoginForm";
import { string } from "prop-types";
import styled from "styled-components";
import { LuImagePlus as UploadImage } from "react-icons/lu";
import { FaRegTrashCan as DeleteIcon } from "react-icons/fa6";

// Formulario con Componentes Formik Contexto
export const ProductForm = ({ ...props }) => {
  const [values, setValues] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const {createProduct, getSingleProduct, updateProduct, errors, setErrors, success } = useProduct();
  const params = useParams();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    cat: Yup.string()
        .required("Campo requerido")
        .notOneOf([""], "Por favor, elige una categoría"),
    desc: Yup.string().max(120, "Debe tener menos caracteres").required("Campo requerido"),
    ingredientes: Yup.string().max(120, "Debe tener menos caracteres"),
    price: Yup.number().positive("Debe ser un número positivo").required("Campo requerido"),
    
  });
  
 
  const onSubmitCreateProduct = (values, onSubmitProps) => {
    const formData = new FormData();
    formData.append("cat", values.cat);
    formData.append("desc", values.desc);
    formData.append("ingredientes", values.ingredientes);
    formData.append("price", values.price);
    formData.append("img", values.img);

    Swal.fire({
      title: `¿Desea añadir ${values.desc}?`,
      icon: "info",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#7FABC2",
      cancelButtonText: "Cancelar",
      cancelButtonColor: "#502C1E",
      showCancelButton: true,
    }).then((res) => {
      if (errors && errors.length > 0 || errors[0] === "jwt must be provided") {
        Swal.fire({ icon: "error", title: "Error", text: errors.join('\n') });
        setErrors([]);
        onSubmitProps.setSubmitting(false);
      } else if (errors.length === 0 && res.isConfirmed) {
        Swal.fire({
          icon: "success",
          title: `${values.desc} Creado`,
          timer: 2000,
          showConfirmButton: false,
        });
        createProduct(formData);
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
      title: `¿Desea actualizar ${values.desc}?`,
      icon: "info",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#7FABC2",
      cancelButtonText: "Cancelar",
      cancelButtonColor: "#502C1E",
      showCancelButton: true,
    }).then((res) => {
      if (res.isConfirmed && errors.length > 0) {
        Swal.fire({ icon: "error", title: "Error", text: errors.join('\n') });
        setErrors([]);
        onSubmitProps.setSubmitting(false);
        return
      } else if (res.isConfirmed && errors.length === 0) { 
        updateProduct(formData)
        Swal.fire({ 
          icon: "success", 
          title:`${values.desc} Actualizado`, 
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

  const initialValues = {
    cat: "",
    desc: "",
    ingredientes: "",
    price: "",
    img: null,
  };


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
                <option value="">Elige una categoría</option>
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
              {previewImage && (<DeleteIcon className="deleteIcon" onClick={() => setPreviewImage(null)} />)}
            <div className="form-control uploadFile">
              <img src={previewImage} alt="" />
              <UploadImage />
              <p className="text-uploadFile">Añade una imagen</p>
              <StyledInputFile
                type="file"
                name="img"
                onChange={(e) => {
                  formik.setFieldValue("img", e.target.files[0])
                  setPreviewImage(URL.createObjectURL(e.target.files[0]))
                  console.log(e.target.files[0])
                  console.log(URL.createObjectURL(e.target.files[0]))
                }
              }
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

const StyledSelect = styled.select`
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
`

export const StyledInputFile = styled.input`
  display: block;
  width: 70%;
  height: 100%;
  float: right;
  border: 2px solid var(--primary);
  padding: 0.5rem;
  font-size: 1rem;
  font-family: var(--font);
  color: var(--primary);
  background-color: var(--secondary);
  outline: none;
  transition: var(--transition);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  cursor: pointer;

  &:focus {
    border-color: var(--primary);
    box-shadow: var(--shadow);
  }
`