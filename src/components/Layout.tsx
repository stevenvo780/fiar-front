import React, { ReactNode, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import Events from '@components/Events';
import PremiumBanner from '@components/PremiumBanner';
import useUser from '@store/user';
import { useRouter } from 'next/router';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { token, renewToken, user } = useUser();
  const router = useRouter();

  useEffect(() => {
    const publicRoutes = ['/', '/login', '/home', '/plans'];
    const isPublicRoute = publicRoutes.includes(router.pathname);
    
    if (!token && !isPublicRoute) {
      router.push('/login');
    } else if (token && router.pathname === '/login') {
      router.push('/dashboard');
    }
  }, [token, router]);

  useEffect(() => {
    if (token) {
      const interval = setInterval(renewToken, 55 * 60 * 1000);
      return () => clearInterval(interval);
    }
  }, [renewToken, token]);

  return (
    <div className="main-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Events />
      {token && <Header />}
      {token && user?.role === 'FREE' && <PremiumBanner />}
      <main style={{ flex: 1, paddingTop: '1.5rem', paddingBottom: '1.5rem' }}>{children}</main>
      {token && <Footer />}
    </div>
  );
};

export default Layout;
