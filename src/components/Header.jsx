// src/components/Header.jsx
import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import logoTipo from '../assets/logoTipo.png';

const HeaderWrapper = styled.header`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 50px;
  background-color: hsl(0, 0%, 92%);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  box-sizing: border-box;
`;

const Logo = styled.img`
  height: 40px;
  width: auto;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;

  a {
    margin: 0 15px;
    font-family: 'Red Hat Display', sans-serif;
    font-weight: 500;
    color: black;
    text-decoration: none;
    position: relative;

    &.active {
      font-weight: 700;
    }

    &:hover {
      color: white;
      text-decoration: none;
    }
  }
`;

const CartIcon = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;

  .cart-count {
    position: absolute;
    top: -10px;
    right: -10px;
    background-color: brown;
    color: white;
    border-radius: 50%;
    padding: 2px 8px;
    font-size: 12px;
  }
`;

const Header = () => {
  const cartItems = JSON.parse(localStorage.getItem('Compra')) || [];
  
  return (
    <HeaderWrapper>
      <Logo src={logoTipo} alt="Logo de la empresa" />
      <Nav>
        <NavLink to="/" end>Inicio</NavLink>
        <NavLink to="/catalog">Catálogo</NavLink>
        <NavLink to="/about">Sobre Nosotros</NavLink>
        <CartIcon>
          <NavLink to="/carrito">
            <FontAwesomeIcon icon={faShoppingCart} size="lg" />
            {cartItems.length > 0 && <div className="cart-count">{cartItems.length}</div>}
          </NavLink>
        </CartIcon>
      </Nav>
    </HeaderWrapper>
  );
};

export default Header;
