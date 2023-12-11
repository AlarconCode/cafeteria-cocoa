import { ProductForm } from "../../Components/ProductForm/ProductForm"
import { useParams } from "react-router-dom"

export const ProductFormPage = () => {
  const params = useParams()
  return (
    <ProductForm title={!params.id ? 'Crear Producto' : 'Actualizar'} />
  )
}