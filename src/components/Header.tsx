import React, { useEffect } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { FaUser, FaEnvelope, FaEdit, FaSignOutAlt, FaCommentDots, FaUsers, FaShoppingCart, FaPhone,FaHome} from 'react-icons/fa';
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
    <Navbar expand="lg" className={styles.navbar}>
      <Navbar.Brand href="/home" className={styles.brand}>
        <Image
          src={logo}
          alt="Logo"
          width={50}
          height={50}
          className={styles.logo}
          fetchPriority="high"
        />
        
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <Nav className="ml-auto">
          <Nav.Link href="/home" className={styles.navItem}><FaHome className={styles.icon} /> Inicio</Nav.Link>
          <Nav.Link href="/transacciones" className={styles.navItem}><FaMoneyBillTransfer className={styles.icon} /> transacciones </Nav.Link>
          <Nav.Link href="/customers" className={styles.navItem}><FaUsers className={styles.icon} /> Clientes</Nav.Link>
          <Nav.Link href="/plans" className={styles.navItem}><FaShoppingCart className={styles.icon} /> Planes</Nav.Link>
          <NavDropdown
            title={<FaUser className={styles.iconUser} />}
            id="user-menu"
            align={{ lg: 'end' }}
            drop="down"
            className={styles.userMenu}
          >
            <NavDropdown.Item href="/contact"><FaEnvelope className={styles.icon} /> Contáctanos</NavDropdown.Item>
            <NavDropdown.Item onClick={handleEditProfile}><FaEdit className={styles.icon} /> Editar perfil</NavDropdown.Item>
            <NavDropdown.Item onClick={handleLogout}><FaSignOutAlt className={styles.icon} /> Cerrar sesión</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
