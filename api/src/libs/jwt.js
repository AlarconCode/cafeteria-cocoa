import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const maxAge = 3 * 24 * 60 * 60;
// export const createAccessToken = (payload) => {
//   jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: maxAge }, function(err, token) {
//     if (err) {
//       console.log(err);
//     }
//     return token
//   });
// };


// let token = null
// export const createAccessToken = (payload) => {
//   token = jwt.sign(payload, 'privatekey', {
//     expiresIn: maxAge,
//   });
//   return token
// };

export function createAccessToken(payload) {

  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,  
      process.env.TOKEN_SECRET, 
      { 
        expiresIn: maxAge
      },
      (error, token) => {
        if (error) {
          console.log(error)
          reject(error)
        }
        resolve(token)
      })
  })
}
