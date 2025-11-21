'use client';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useSession, signIn, signOut } from 'next-auth/react';
import { useShoppingCart } from 'use-shopping-cart';

import HomeIcon from '@mui/icons-material/Home';
import RestaurantIcon from '@mui/icons-material/Restaurant';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HelpIcon from '@mui/icons-material/Help';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import LogoutIcon from '@mui/icons-material/Logout';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import CartModal from './shoppingCart/cartModal';

function Menu({ children }) {
  const { handleCartClick, cartCount } = useShoppingCart();
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand as={Link} href="/">Food Order</Navbar.Brand>
          <Nav className="me-auto">

            {}
            <NavDropdown title={<DynamicFeedIcon />}>
              {children}
            </NavDropdown>

            {}
            <Nav.Link as={Link} href="/app"><HomeIcon /> Home</Nav.Link>
            
            <Nav.Link as={Link} href="/client/restaurants"><RestaurantIcon /> Restaurants </Nav.Link>

            {}
            <Nav.Link as={Link} href="/client/pageAide"><HelpIcon /> Aide</Nav.Link>
            

            {}
            <Nav.Link onClick={() => router.push('/client/cartProducts')}>
              <ShoppingBasketIcon style={{ color: 'pink' }} /> Shopping Cart
            </Nav.Link>

            {}
            {!session && (
              <>
                <Nav.Link onClick={() => signIn()}><AccountCircleIcon /> Se connecter</Nav.Link>
                <Nav.Link as={Link} href="/register"><AccountCircleIcon /> Register</Nav.Link>
              </>
            )}

            {}
            {session && (
              <>
                {}
                <NavDropdown title={
                  <span>
                    <AccountCircleIcon /> {session.user.name} ({session.user.role})
                  </span>
                }>
                  <NavDropdown.Item disabled>
                    <img src={session.user.image} alt="avatar" width="30" height="30" style={{ borderRadius: '50%' }} />
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={() => signOut()}>
                    <LogoutIcon /> Se déconnecter
                  </NavDropdown.Item>
                </NavDropdown>

                {}
                {session.user.role === 'admin' && (
                  <>
                    <Nav.Link as={Link} href="/admin/dashboard"><HomeIcon /> Admin Dashboard</Nav.Link>
                    
                  </>
                )}
                {session.user.role === 'client' && (
                  <>
              
                  </>
                )}
              </>
            )}
          </Nav>

          {}
          <button className="relative" onClick={handleCartClick}>
            <ShoppingCartIcon color="primary" />
            <div className="rounded-full flex justify-center items-center bg-emerald-500 text-xs text-white absolute w-6 h-5 bottom-6 -right-1">
              {cartCount}
            </div>
          </button>
          <CartModal />
        </Container>
      </Navbar>
    </>
  );
}

export default Menu;
