export const validateSchema = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.body, { abortEarly: false })
    console.log('registro validado en el back');
    next()

  } catch (e) {
    console.log(e);
    return res.status(403).json({ 
      error: true, 
      code: 403,
      message: e.errors 
    });
  }

}