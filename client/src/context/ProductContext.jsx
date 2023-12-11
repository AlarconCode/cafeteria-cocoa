import { createContext, useContext, useState } from "react";
import { node } from "prop-types";
import {
  getProductsRequest,
  getProductRequest,
  createProductRequest,
  updateProductRequest,
  deleteProductRequest,
  uploadImageRequest,
} from "../services/product.services";

export const ProductContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const ProductProvider = ({ children }) => {
  const [errors, setErrors] =  useState([])
  const [success, setSuccess] =  useState('')

  const getSingleProduct = async (id) => {
    try {
      const product = await getProductRequest(id);
      return product;
    } catch (error) {
      console.log(error);
    }
  };

  const getProducts = async (cat) => {
    try {
      const products = await getProductsRequest(cat);
      return products;
    } catch (error) {
      console.log(error);
    }
  };

  const createProduct = async (product) => {
    console.log(product);
    try {
      const res = await createProductRequest(product);
      if (res.error) {
        setErrors(res.message)
        console.log('error del back', res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateProduct = async (product) => {
    try {
      const res = await updateProductRequest(product);
      if (res.error) {
        setErrors(res.message)
        console.log('error del back', res.message);
      } else {
        setSuccess(res.message)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const res = await deleteProductRequest(id);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const uploadImg = async () => {
    try {
      await uploadImageRequest();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        getProducts,
        getSingleProduct,
        createProduct,
        updateProduct,
        deleteProduct,
        uploadImg,
        errors,
        setErrors,
        success,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

ProductProvider.propTypes ={
  children: node
}