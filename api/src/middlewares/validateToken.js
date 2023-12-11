import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const authRequired = (req, res, next) => {
  let token = null
  console.log(req.headers);
  if (req && req.headers.cookie) {
    const cookies = req.headers.cookie.split(';')
    cookies.forEach(cookie => {
      const cookieArr = cookie.split('=')
      if (cookieArr[0].trim() === 'jwt') {
        token = cookieArr[1]
      }
    })
  }

  if (!token) {
    return res.status(401).json({ 
      error: true, 
      code: 401,
      message: ['Token required'] 
    });
  }

  jwt.verify(token, process.env.TOKEN_SECRET, (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ 
        error: true, 
        code: 401,
        message: err.message
      });
    }
    console.log(decodedToken);
    req.user = decodedToken
    next()
  })

}