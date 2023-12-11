import { Product } from '../model/product.model.js'
import { User } from '../model/user.model.js'

export const getProducts = async (req, res) => {
  
  if (req.params.cat) {

    try {

      const products = await Product.find({cat:req.params.cat})
      if (!products) return res.status(404).json({message: 'products not found'})
      return res.json(products)
  
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }

  }

  try {

    const products = await Product.find()
    if (!products) return res.status(404).json({message: 'products not found'})
    return res.json(products)

  } catch (error) {
    return res.status(500).json({ message: error.message })
  }

}

export const getProduct = async (req, res) => {
 
  try {
    
    const product = await Product.findById(req.params.id)
    if (!product) return res.status(404).json({message: 'product not found'})
    res.json(product)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }

}

export const createProduct = async (req, res) => {
  
  try {
    const {cat, desc, ingredientes, price} = req.body

    const newProduct = new Product({
      cat, 
      desc,
      ingredientes,
      price
    })

    const user = await User.findById(req.user.id)
    if (!user) return res.status(404).json({message: 'user not found'})

    if (req.file) {
      newProduct.img = req.file.path
      const insertedProduct = await newProduct.save();
      res.status(201).json({
        message:'Product uploaded successfully',
        newProduct: insertedProduct
    })
    } else {     
      const insertedProduct = await newProduct.save();
      return res.status(201).json(insertedProduct);
    }
   

  } catch (error) {
    return res.status(500).json({ error })
  }

}

export const updateProduct = async (req, res) => {

  try {

    const user = await User.findById(req.user.id)
    if (!user) return res.status(404).json({message: 'user not found'})

    if (req.file) {
      const product = await Product.findOneAndUpdate({_id: req.params.id}, {
        ...req.body,
        img: req.file.path
      }, { new: true });

      if (!product) return res.status(404).json({message: 'product not found'})

      res.status(200).json({
        error: false,
        code: 200,  
        message:'Producto actualizado correctamente',
        newProduct: product
      })

    } else {
        const product = await Product.findOneAndUpdate({_id: req.params.id}, req.body, { new: true });
        if (!product) return res.status(404).json({message: 'product not found'})
        res.status(200).json({
        error: false,
        code: 200,  
        message:'Producto actualizado correctamente',
        newProduct: product
      })
    }
    

  } catch (error) {
    console.log(error);
    res.status(500).json({ 
      error: true,
      code: 500,
      message: error.message})
  }
  

}

export const deleteProduct = async (req, res) => {

  try {

    const product = await Product.findByIdAndDelete(req.params.id)
    if (!product) {
      return res.status(404).json({
        error: true,
        code: 404,
        message: 'product not found'
      })
    }
    
    
    return res.status(200).json({
      error: false,
      code: 200,
      message: 'deleted successfully'
    })
  
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }

}