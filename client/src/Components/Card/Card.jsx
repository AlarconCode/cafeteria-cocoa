import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { func, number, shape, string } from "prop-types";
import {
  FaPenToSquare as ModifyIcon,
  FaRegTrashCan as DeleteIcon,
} from "react-icons/fa6";
import logoCocoa from "../../assets/icons/taza-cocoa-marron.svg";
import styled from "styled-components";

export const Card = ({ product, index, deleteCard }) => {
  // Logic Card
  const { _id, desc, ingredientes, price, img } = product;
  const { isLogin } = useAuth();
  const [flippedState, setFlippedState] = useState({});

  const handleClickFlipped = (index) => {
    setFlippedState({
      isFlipped: !flippedState.isFlipped,
      [index]: !flippedState[index],
    });
  };

  const formatPrice = (price) => { 
    return new Intl.NumberFormat('es-ES', { 
            style: 'currency', 
            currency: 'EUR', 
            minimumFractionDigits: 2 })
            .format(price)
  }
  
  // JSX Card
  return (
    <Wrapper>
      <div className="container">
        <div className="card">
          <div
            className={`cardBack ${flippedState[index] ? "flipped" : ""}`}
            onClick={() => handleClickFlipped(index)}
          >
            {img ? (
              <img alt={desc} src={img} className="img-product" />
            ) : (
              <img alt={desc} src={logoCocoa} className="logoCocoa" />
            )}
          </div>
          <div
            className={`cardFront ${flippedState[index] ? "flipped" : ""}`}
            onClick={() => handleClickFlipped(index)}
          >
            <div className="contentFront">
              {/* <img alt={desc} src={cocoa} className="cocoaName" /> */}
              <h3>{desc}</h3>
              <p className="ingredientes">{ingredientes}</p>
              <p className="price">{ price ? formatPrice(price) : '0,00 €' }</p>
            </div>
          </div>
        </div>
            <IconsAdmin $isLogin={isLogin}>
              <Link
                to={`/actualizar-producto/${_id}`}
                style={{ color: "#7FABC2" }}
              >
                <ModifyIcon />
              </Link>
              <Link style={{ color: "#7FABC2" }} onClick={deleteCard}>
                <DeleteIcon />
              </Link>
            </IconsAdmin>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
  }
  
  .card {
    margin-top: 0rem;
    height: 250px;
    width: 100%;
    position: relative;
    border-radius: 0.25rem;
    transform: perspective(1000px) rotateY(0);//Esta linea es necesaria para que safari respete los z-index al aplicar transform. https://stackoverflow.com/questions/22621544/webkit-transform-breaks-z-index-on-safari
  }
  
  .cardFront,
  .cardBack {
    box-sizing: border-box;
    border-radius: 0.25rem;
    height: 250px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
    width: 100%;
    transition: transform 0.5s ease;
    position: absolute;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .cardBack {
    transform: perspective(1000px) rotateY(180deg);
    background-color: var(--secondary);
    overflow: hidden;
    padding: 1rem;
  }
  
  .cardBack.flipped {
    transform: perspective(1000px) rotateY(0deg);
  }
  
  .cardFront {
    transform: perspective(1000px) rotateY(0deg);
    background-color: var(--secondary);
    padding: 1.5rem;
  }

  .cardFront.flipped {
    transform: perspective(1000px) rotateY(-180deg);
  }

  .contentFront {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    row-gap: 1rem;

    h3 {
      font-size: 1.3rem;
    }

    .ingredientes {
      font-size: 1.2rem;
    }

    .cocoaName {
      width: 100px;
      border-radius: .5rem;
      background-color: var(--primary);
      padding: 1rem;
    }

    .price {
      font-size: 1.5rem;
      font-weight: bolder;
      align-self: self-end;
    }

  }

  .logoCocoa {
    opacity: 0.2;
    object-fit: cover;
    width: 130%;
    height: 135%;
  }

  .img-product {
    width: 100%;
    height: 100%;
    border-radius: 0.25rem;
    object-fit: cover;
  }
`;

const IconsAdmin = styled.div`
  display: ${(props) => (props.$isLogin ? "flex" : "none")};
  justify-content: space-between;
  align-items: center;
  width: 85%;
  height: 30px;
  background-color: var(--primary);
  border-bottom-right-radius: .5rem;
  border-bottom-left-radius: 0.5rem;
  padding: 1.2rem;
  font-size: 1.2rem;
`;

Card.propTypes = {
  product: shape({
    _id: string,
    desc: string,
    ingredientes: string,
    price: number,
    img: string,
  }),
  index: number,
  deleteCard: func,
};
