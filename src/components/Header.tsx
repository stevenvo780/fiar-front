import React, { useEffect } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { FaUser, FaEnvelope, FaEdit, FaSignOutAlt, FaCommentDots, FaUsers, FaShoppingCart, FaPhone, FaHome } from 'react-icons/fa';
import logo from '../../public/img/icon.png';
import useUser from '@store/user';
import styles from '@styles/Header.module.css'; 
import { FaMoneyBillTransfer } from "react-icons/fa6";

const Header = () => {
  const router = useRouter();
  const { fetchUser, user, logout, token } = useUser();

  useEffect(() => {
    if (!user && token) {
      fetchUser();
    }
  }, [user, token]);

  const handleLogout = () => {
    logout();
  };

  const handleEditProfile = () => {
    router.push('/edit_user');
  };

  return (
    <Navbar
      expand="lg"
      className={styles.navbar}
      style={{ minHeight: '56px', padding: '0 1rem', background: '#fff' }} // Reduce height and padding
    >
      <Navbar.Brand href="/home" className={styles.brand} style={{ display: 'flex', alignItems: 'center', padding: 0 }}>
        <Image
          src={logo}
          alt="Logo"
          width={38}
          height={38}
          className={styles.logo}
          style={{ borderRadius: '8px', background: '#f5f5f5', objectFit: 'contain' }} // Reduce white, round corners
          fetchPriority="high"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <Nav className="ml-auto" style={{ alignItems: 'center' }}>
          <Nav.Link href="/home" className={styles.navItem}>
            <FaHome className={styles.icon} size={18} /> Inicio
          </Nav.Link>
          <Nav.Link href="/transacciones" className={styles.navItem}>
            <FaMoneyBillTransfer className={styles.icon} size={18} /> transacciones
          </Nav.Link>
          <Nav.Link href="/client" className={styles.navItem}>
            <FaUsers className={styles.icon} size={18} /> Clientes
          </Nav.Link>
          <Nav.Link href="/plans" className={styles.navItem}>
            <FaShoppingCart className={styles.icon} size={18} /> Planes
          </Nav.Link>
          <NavDropdown
            title={<FaUser className={styles.iconUser} size={18} />}
            id="user-menu"
            align={{ lg: 'end' }}
            drop="down"
            className={styles.userMenu}
          >
            <NavDropdown.Item href="/contact">
              <FaEnvelope className={styles.icon} size={16} /> Contáctanos
            </NavDropdown.Item>
            <NavDropdown.Item onClick={handleEditProfile}>
              <FaEdit className={styles.icon} size={16} /> Editar perfil
            </NavDropdown.Item>
            <NavDropdown.Item onClick={handleLogout}>
              <FaSignOutAlt className={styles.icon} size={16} /> Cerrar sesión
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
