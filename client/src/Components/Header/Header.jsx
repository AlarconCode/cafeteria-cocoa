import { useState, useEffect, useRef } from "react";
import { MdClose, MdMenu } from "react-icons/md";
import { FaRightFromBracket, FaRightToBracket } from "react-icons/fa6";
import cup from "../../assets/icons/taza-cocoa.svg";
import cocoa from "../../assets/icons/Cocoa.svg";
import cafeTime from "../../assets/img/Dibujo-Granos-CafeTime.svg";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { isLogin, logout } = useAuth();
  const navigate = useNavigate();

  const handleToggle = (e) => {
    e.stopPropagation();
    setIsOpen((oldIsOpen) => !oldIsOpen);
  };

  const iconMenuRef = useRef();

  useEffect(() => {
    const closeMenu = (e) => {
      if (
        e.target.className != iconMenuRef.current.className &&
        e.target.className != "list-items"
      ) {
        setIsOpen(false);
      }
    };

    document.body.addEventListener("click", closeMenu);

    return () => document.body.removeEventListener("click", closeMenu);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const iconMenu = isOpen ? <MdClose /> : <MdMenu />;
  const loginLink = (
    <Link to="/login" className="link-loginLogout">
      <FaRightToBracket />
    </Link>
  );
  const logoutLink = (
    <Link to="/" className="link-loginLogout" onClick={handleLogout}>
      <FaRightFromBracket />
    </Link>
  );

  return (
    <Wrapper>
      <Link to={"/"}>
        <div className="logotipo">
          {/* <h1 className='name'>Cocoa</h1> */}
          <img src={cocoa} alt="icono taza" className="cocoa" />
          <img src={cup} alt="icono taza" className="cup" />
        </div>
      </Link>
      <div className="link-loginLogout_container">
        {!isLogin ? loginLink : logoutLink}
      </div>
      <div ref={iconMenuRef} className="iconMenu" onClick={handleToggle}>
        {iconMenu}
      </div>
      <ContainerMenu $isOpen={isOpen}>
        <Menu className="list-items">
          <li>
            <Link to="/desayunos" className="menu-item">
              Desayunos
            </Link>
          </li>
          <li>
            <Link to="/cafes" className="menu-item">
              Cafés
            </Link>
          </li>
          <li>
            <Link to="/reposteria" className="menu-item">
              Repostería
            </Link>
          </li>
          <li>
            <Link to="/comidas" className="menu-item">
              Comidas
            </Link>
          </li>
          <li>
            <Link to="/bebidas" className="menu-item">
              Bebidas
            </Link>
          </li>
        </Menu>
        <div className="cafeTime">
          <img src={cafeTime} alt="dibujo hojas y granos de cafe" />
        </div>
      </ContainerMenu>
    </Wrapper>
  );
}

const Wrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 80px;
  background-color: var(--primary);
  display: flex;
  align-items: center;
  padding: 2rem;
  border-bottom: 4px solid var(--third);
  z-index: 10;

  .logotipo {
    display: flex;
    align-items: first baseline;
  }

  .name {
    font-family: Parisian;
    color: var(--secondary);
    width: 50%;
    font-size: 2.5rem;
  }

  .cup {
    width: 50px;
  }

  .cocoa {
    width: 80px;
  }

  .iconMenu {
    font-size: 2.5rem;
    color: var(--secondary);
    padding-top: 1rem;
    margin-left: 1rem;
  }

  .link-loginLogout_container {
    padding-top: 0.8rem;
    margin-left: auto;
  }

  .link-loginLogout {
    text-decoration: none;
    font-size: 1.5rem;
    color: var(--secondary);
  }
`;

const ContainerMenu = styled.div`
  position: absolute;
  display: block;
  top: 80px;
  right: 0;
  background-color: var(--secondary);
  height: 90vh;
  transition: width 500ms ease-in-out;
  width: ${(props) => (props.$isOpen ? "75vw" : "0")};
`;

const Menu = styled.ul`
  width: 100vw;
  height: 50vh;
  padding: 2rem;
  list-style: none;

  .menu-item {
    display: block;
    cursor: pointer;
    font-size: 1.3rem;
    font-weight: 600;
    line-height: 3rem;
    transition: font-weight 500ms ease-out;
    margin-bottom: 0.8rem;
    line-height: 2rem;
  }

  .menu-item::after {
    content: "";
    display: block;
    border-bottom: 1px solid var(--primary);
    transform: scale(0);
    transform-origin: 0 50%;
    transition: transform 500ms ease-out;
  }

  .menu-item:hover::after {
    transform: scale(1);
  }

  .menu-item:link,
  .menu-item:visited {
    text-decoration: none;
    color: var(--primary);
  }

  .menu-item:active,
  .menu-item:hover {
    font-weight: 300;
  }
`;

export default Header;
