const url = import.meta.env.VITE_BASE_URL
console.log(url);

export const registerRequest = async (user) => {
  const options = {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {'Content-Type': 'application/json'}
  }

  try {

    const response = await fetch(`${url}/api/register`, options)
    const json = await response.json()
    console.log(json);
    return json

  } catch (error) {
    console.log(error); 
  }
  
}

export const loginRequest = async (user) => {
  const options = {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(user),
    headers: {'Content-Type': 'application/json'}
  }

  try {

    const response = await fetch(`${url}/api/login`, options)
    const json = await response.json()
    console.log(json);
    return json
    

  } catch (error) {
    console.log(error); 
  }
  
}

export const logoutRequest = async () => {

  
  const options = {
    method: 'POST',
    credentials: 'include',
    headers: { 
      'Content-Type': 'application/json'
    }
  }


  try {

    const response = await fetch(`${url}/api/logout`, options)
    const json = await response.json()
    return json

  } catch (error) {
    console.log(error); 
  }

}

export const isAuthRequest = async () => {

  const options = {
    method: 'POST',
    credentials: 'include',
    headers: { 
      'Content-Type': 'application/json'
    }
  }

  try {

    const response = await fetch(`${url}/api/verify-token`, options)
    const json = await response.json()

    if (json.error === true) {
      console.log(json.message);
      throw new Error(json.message)
    }

    console.log(json.message);
    return !json.error

  } catch (error) {
    console.log(error);
    return false 
  }

}
