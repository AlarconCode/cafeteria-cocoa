const url_local = import.meta.env.VITE_BASE_URL_LOCAL
const url_production = import.meta.env.VITE_BASE_URL_PRODUCTION

// if (import.meta.env.VITE_NODE_ENV === 'production') {
//   var url = url_production
// } else {
//   var url = url_local
// }

const url = '/api/'

export const getProductRequest = async (id) => {

  try {
    
    const res = await fetch(`${url}product/${id}`)
    const data = await res.json()    
    return data

  } catch (error) {
    console.log(error);
  }

}

export const getProductsRequest = async (cat) => {

  try {
    
    const res = await fetch(`${url}products/${cat}`)
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
    const res = await fetch(`${url}product`, options)
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
    const res = await fetch(`${url}product/${product.get('_id')}`, options)
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
    
    const res = await fetch(`${url}product/${id}`, options)
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
    
    const res = await fetch(`${url}upload`, options)
    const data = await res.json()
    return data

  } catch (error) {
    console.log(error);
  }

}