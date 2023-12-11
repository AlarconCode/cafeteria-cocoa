import { useState, useEffect } from "react";
import { FaRegSquarePlus } from "react-icons/fa6";
import { useAuth } from "../../context/AuthContext";
import { useProduct } from "../../context/ProductContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { string } from "prop-types";
import { Card } from "../Card/Card";
import styled from "styled-components";
import { Spinner } from "../Spinner/Spinner";

function ListCards(props) {
  // Logic ListCards
  const category = props.category;
  const [isLoading, setIsLoading] = useState(false)
  const [productList, setProductList] = useState([]);
  const { getProducts, deleteProduct } = useProduct();
  const { isLogin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true)
    const products = async () => {
      const data = await getProducts(category);
      setProductList(data);
      setIsLoading(false)
    };
    products();
  }, [category, getProducts]);

  const deleteProductIcon = (id) => {
    Swal.fire({
      icon: "info",
      text: "¿Eliminar?",
      confirmButtonText: "Aceptar",
      denyButtonText: "Cancelar",
      confirmButtonColor: "green",
      denyButtonColor: "red",
      showDenyButton: true,
    }).then((res) => {
      if (res.isConfirmed) {
        deleteProduct(id).then((res) => {
          if (res.code === 200) {
            const newList = productList.filter((product) => product._id !== id);
            setProductList(newList);
            Swal.fire({
              icon: "info",
              title: "¡Eliminado!",
              showConfirmButton: false,
              timer: 2000,
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "No se encuentra",
              showConfirmButton: false,
              timer: 2000,
            });
          }
        });
      }
    });
  };

  const navigateToFormProduct = () => {
    navigate("/crear-producto");
  };

  // JSX ListCardas
  return (
    <Wrapper>
      <Title>
        <h1>{category === "cafes" ? "Cafes 100% Arábigo" : category}</h1>
        {isLogin ? (
          <i onClick={navigateToFormProduct}>
            Añadir <FaRegSquarePlus />
          </i>
        ) : null}
      </Title>
      <Section $primary={isLoading}>
      {isLoading && <Spinner />}
        {productList.map((product, index) => (
          // ¡Ojo Lleva return implícito y no necesita llaves al ser una sola linea!
          <Card
            product={product}
            key={product._id}
            index={index}
            deleteCard={() => {
              deleteProductIcon(product._id);
            }}
          />
        ))}
      </Section>
    </Wrapper>
  );
}

export default ListCards;

// styles ListCards

const Wrapper = styled.section`

  width: 100vw;
  background-color: var(--third);
  padding: 2rem 2rem 8rem 2rem;
  color: var(--primary);
  z-index: 1;

`

const Title = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1em;
    font-weight: 700;
    margin: 4rem 0 2rem;

    h1 {
      font-size: 2rem;
    }

    i {
      cursor: pointer;
      display: flex;
      align-items: center;
      font-size: 1.3rem;
      column-gap: 1rem;
    }
`

const Section = styled.section`
  display: grid;
  grid-template-columns: ${props => props.$primary ? null : "repeat(auto-fill, minmax(250px, 1fr))" };
  place-content: ${props => props.$primary ? "center" : null};
  gap: 1rem;
`;

ListCards.propTypes = {
  category: string,
};
