import { Formik, useField } from "formik";

export const FileUpload = ({ fileRef, ...props }) => {
  const [field, meta] = useField(props);
  console.log(field);
  return (
    <Formik initialValues={field} >
      {formik => {
        console.log(formik);
        return (
          <div>
          <label htmlFor="files">Choose files</label>{" "}
          <input ref={fileRef} multiple={false} type="file" {...field} onChange={(e) => formik.setFieldValue('img', e.target.files[0])}/>
          {meta.touched && meta.error ? (
            <div style={{ color: "red" }}>{meta.error}</div>
          ) : null}
        </div>
        )
      }}
    </Formik>
  );
};