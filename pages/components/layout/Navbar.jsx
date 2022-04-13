import React, { useState, useEffect } from 'react';
import { Icon } from 'semantic-ui-react';
import Link from 'next/link';
import Image from 'next/image';
import wmLogo from '../../../public/media/WMlogo.png';
import vetLogo from '../../../public/media/vetLogo.png';
import { logoutUser } from '../../util/auth';
import { useRouter } from 'next/router';

const Navbar = ({ user }) => {
  const router = useRouter();

  const isActive = (route) => router.pathname === route;

  const [showNavbar, setShowNavbar] = useState(false);
  const [showBorder, setShowBorder] = useState(true)


  return (
    <>
      <div className={`navbar ${showNavbar ? 'showing' : ''}`}>
        <div className="vet-logo">
          <Image src={vetLogo} objectFit="contain" />
        </div>
        <div className="wm-logo">
          <Image src={wmLogo} objectFit="contain" />
        </div>

        <Icon
          name="bars"
          color="black"
          className="hamburger"
          size="large"
          onClick={() => setShowNavbar((prev) => !prev)}
        />

      </div>
        <div className={`items ${showNavbar ? 'show' : ''}`}>
          <div
            className={`menu-item ${isActive('/') ? 'active' : ''} ${
              showNavbar ? 'show' : ''
            }`}
          >
            <Link href="/">Home</Link>
          </div>
          <div
            className={`menu-item ${isActive('/animals') ? 'active' : ''}`}
          >
            <Link href="/animals">Adoption</Link>
          </div>
          {user !== null && (
            <>
              <div
                className={`menu-item ${isActive('/admin') ? 'active' : ''}`}
              >
                <Link href="/admin">Admin</Link>
              </div>
              <div
                className={`menu-item`}
                style={{ cursor: 'pointer' }}
                onClick={logoutUser}
              >
                <a href="#">Logout</a>
              </div>
            </>
          )}
        </div>
    </>
  );
};

export default Navbar;
