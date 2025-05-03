import React, { useEffect } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { FaUser, FaEnvelope, FaEdit, FaSignOutAlt, FaRobot, FaCommentDots, FaUsers, FaShoppingCart, FaPhone } from 'react-icons/fa';
import logo from '../../public/img/logo_general.png';
import 'bootstrap-icons/font/bootstrap-icons.css';
import useUser from '@store/user';
import useMessageQueues from '@/hooks/useMessageQueues';

const Header = () => {
  const router = useRouter();
  const { fetchUser, user, logout, token } = useUser();
  const { robotStatus } = useMessageQueues();

  useEffect(() => {
    if (!user && token) {
      fetchUser();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, token]);

  const handleLogout = () => {
    logout();
  };

  const handleRobotClick = () => {
    router.push('/robot');
  };

  const handleEditProfile = () => {
    router.push('/edit_user');
  };

  return (
    <>
      <Navbar expand="lg" style={{ padding: '5px' }} variant="light">
        <Navbar.Brand href="https://www.humanizar.co/" target='_blank'>
          <p style={{ margin: 10 }}>
            <Image
              src={logo} 
              alt="Icono" 
              width={50} 
              height={50} 
              style={{ marginRight: 10 }}
              fetchPriority='high'
            />{' fiar'} - {" " + (user ? user.name : '')}
          </p>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="ml-auto">
            <Nav.Item style={{ display: 'flex', alignItems: 'center', color: 'black' }}>
              <Nav.Link onClick={handleRobotClick} style={{ display: 'flex', alignItems: 'center', border: `2px solid ${robotStatus ? '#28a745' : '#dc3545'}`, borderRadius: '10%', padding: '5px' }}>
                <FaRobot style={{ fontSize: '1.5rem', color: robotStatus ? '#28a745' : '#dc3545' }} />
                <span style={{ marginLeft: '5px', color: robotStatus ? '#28a745' : '#dc3545', fontWeight: 'bold' }}>
                  {robotStatus ? 'Activo' : 'Inactivo'}
                </span>
              </Nav.Link>
            </Nav.Item>
            <Nav.Link href="/whatsapp-sessions"><FaPhone style={{ marginRight: '5px' }} />WPP</Nav.Link>
            <Nav.Link href="/messages"><FaCommentDots style={{ marginRight: '5px' }} />Mensajes</Nav.Link>
            <Nav.Link href="/customers"><FaUsers style={{ marginRight: '5px' }} />Clientes</Nav.Link>
            <Nav.Link href="/plans"><FaShoppingCart style={{ marginRight: '5px' }} />Planes</Nav.Link>
            <NavDropdown
              title={<FaUser style={{ fontSize: '1.3rem' }} />}
              id="user-menu"
              align={{ lg: 'end' }}
              drop="down"
            >
              <NavDropdown.Item href="/contact"><FaEnvelope style={{ marginRight: '5px' }} />Contáctanos</NavDropdown.Item>
              <NavDropdown.Item onClick={handleEditProfile}><FaEdit style={{ marginRight: '5px' }} />Editar perfil</NavDropdown.Item>
              <NavDropdown.Item onClick={handleLogout}><FaSignOutAlt style={{ marginRight: '5px' }} />Cerrar sesión</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Header;
