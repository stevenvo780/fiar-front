import React, { useEffect } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Image from 'next/image';
import {
  HiOutlineHome,
  HiOutlineUserGroup,
  HiOutlineCreditCard,
  HiOutlineArrowRightOnRectangle,
  HiOutlinePencilSquare,
  HiOutlineEnvelope,
  HiOutlineUserCircle,
  HiOutlineChartBarSquare,
} from 'react-icons/hi2';
import { TbArrowsExchange } from 'react-icons/tb';
import logo from '../../public/img/icon.png';
import useUser from '@store/user';
import styles from '@styles/Header.module.css';

const Header = () => {
  const router = useRouter();
  const { fetchUser, user, logout, token } = useUser();

  useEffect(() => {
    if (!user && token) {
      fetchUser();
    }
  }, [user, token]);

  const isActive = (path: string) => router.pathname === path;

  return (
    <Navbar expand="lg" className={styles.navbar}>
      <Navbar.Brand href="/home" className={styles.brand}>
        <Image
          src={logo}
          alt="Fiar"
          width={36}
          height={36}
          className={styles.logo}
          fetchPriority="high"
        />
        <span className={styles.brandName}>Fiar</span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="main-nav" className={styles.toggler} />
      <Navbar.Collapse id="main-nav" className="justify-content-end">
        <Nav className={styles.navLinks}>
          <Nav.Link
            href="/dashboard"
            className={`${styles.navItem} ${isActive('/dashboard') ? styles.navItemActive : ''}`}
          >
            <HiOutlineChartBarSquare size={19} />
            <span>Dashboard</span>
          </Nav.Link>
          <Nav.Link
            href="/transacciones"
            className={`${styles.navItem} ${isActive('/transacciones') ? styles.navItemActive : ''}`}
          >
            <TbArrowsExchange size={19} />
            <span>Transacciones</span>
          </Nav.Link>
          <Nav.Link
            href="/client"
            className={`${styles.navItem} ${isActive('/client') ? styles.navItemActive : ''}`}
          >
            <HiOutlineUserGroup size={19} />
            <span>Clientes</span>
          </Nav.Link>
          <Nav.Link
            href="/plans"
            className={`${styles.navItem} ${isActive('/plans') ? styles.navItemActive : ''}`}
          >
            <HiOutlineCreditCard size={19} />
            <span>Planes</span>
          </Nav.Link>

          <NavDropdown
            title={
              <span className={styles.avatarBtn}>
                <HiOutlineUserCircle size={26} />
              </span>
            }
            id="user-menu"
            align={{ lg: 'end' }}
            drop="down"
            className={styles.userMenu}
          >
            <NavDropdown.Item href="/contact" className={styles.dropItem}>
              <HiOutlineEnvelope size={17} />
              <span>Contáctanos</span>
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => router.push('/edit_user')} className={styles.dropItem}>
              <HiOutlinePencilSquare size={17} />
              <span>Editar perfil</span>
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={() => logout()} className={`${styles.dropItem} ${styles.dropItemDanger}`}>
              <HiOutlineArrowRightOnRectangle size={17} />
              <span>Cerrar sesión</span>
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
