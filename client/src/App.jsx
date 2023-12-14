import { Routes, Route, useLocation } from "react-router-dom";
import './App.css'
import Header from './Components/Header/Header'
import ListCards from "./Components/ListCards/ListCards";
import { useAuth } from "./context/AuthContext";
import { LoginPage } from "./Pages/LoginPage/LoginPage";
import { ProductFormPage } from "./Pages/ProductFormPage/ProductFormPage";
import { ProductProvider } from "./context/ProductContext";
import { HomePage } from "./Pages/HomePage/HomePage";
import { Footer } from "./Components/Footer/Footer";
import { RegisterPage } from "./Pages/Register/RegisterPage";
import { useEffect } from "react";
import { isAuthRequest } from "./services/user.services";


function App() {
  const location = useLocation()
  const {setIsLogin} = useAuth()

  useEffect(() => {
    const checkAuth = async () => {
      console.log('checkAuth');
      const valid = await isAuthRequest();
      console.log(valid);
      setIsLogin(valid);
    };

    checkAuth();
  }, [setIsLogin]);

  return (
   
      <ProductProvider>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="desayunos" element={<ListCards category='Desayunos' />} />
            <Route path="cafes" element={<ListCards category='cafes' />} />
            <Route path="reposteria" element={<ListCards category='Repostería Casera' />} />
            <Route path="comidas" element={<ListCards category='Comidas' />} /> 
            <Route path="bebidas" element={<ListCards category='Bebidas' />} />
            <Route path="crear-producto" element={<ProductFormPage />} />
            <Route path="actualizar-producto/:id" element={<ProductFormPage />} />
            <Route path="registro" element={<RegisterPage />} />
            <Route path="login" element={<LoginPage />} />
          </Routes>
          {location.pathname !== '/login' && location.pathname !== '/registro' && <Footer />}
      </ProductProvider>
  )
}

export default App
