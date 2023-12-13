
const url = import.meta.env.VITE_BASE_URL

export const getProductRequest = async (id) => {

  try {
    
    const res = await fetch(`${url}/api/product/${id}`)
    const data = await res.json()    
    return data

  } catch (error) {
    console.log(error);
  }

}

export const getProductsRequest = async (cat) => {

  try {
    
    const res = await fetch(`${url}/api/products/${cat}`)
    const data = await res.json()    
    return data

  } catch (error) {
    console.log(error);
  }

}

export const createProductRequest = async (product) => {

  const options = {
    method: 'POST',
    body: product,
    credentials: 'include'
  }

  try {
    const res = await fetch(`${url}/api/product`, options)
    const data = await res.json()
    return data

  } catch (error) {
    console.log(error);
  }

}

export const updateProductRequest = async (product) => {

  const options = {
    method: 'PUT',
    body: product,
    credentials: 'include'
  }

  try {
    const res = await fetch(`${url}/api/product/${product.get('_id')}`, options)
    const data = await res.json()
    return data

  } catch (error) {
    console.log(error);
  }

}

export const deleteProductRequest = async (id) => {
  
  const options = {
    method: 'DELETE',
    credentials: 'include',
    headers: { 
      'Content-Type': 'application/json'
    }
  }

  try {
    
    const res = await fetch(`${url}/api/product/${id}`, options)
    const data = await res.json()
    return data

  } catch (error) {
    console.log(error);
  }

}

export const uploadImageRequest = async (file) => {

  const options = {
    method: 'POST',
    body: file
  }

  try {
    
    const res = await fetch(`${url}/api/upload`, options)
    const data = await res.json()
    return data

  } catch (error) {
    console.log(error);
  }

}