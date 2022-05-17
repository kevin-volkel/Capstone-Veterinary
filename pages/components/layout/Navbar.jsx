import React, { useState, useEffect } from 'react';
import { Icon } from 'semantic-ui-react';
import Link from 'next/link';
import Image from 'next/image';
import wmLogo from './media/WMlogo.png';
import vetLogo from './public/media/vetLogo.png';
import { logoutUser } from '../../util/auth';
import { useRouter } from 'next/router';

const Navbar = ({ user }) => {
  const router = useRouter();

  const isActive = (route) => router.pathname === route;

  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    setShowNavbar(false);
  }, [router.pathname]);

  return (
    <>
      <div className="navbar">
        <div className="vet-logo" aria-label="West-mec vet logo">
          <Link href="/">
            <Image
              src={vetLogo}
              objectFit="contain"
              alt="West Mec Vertinary Sciences"
              aria-label="West-Mec Vet Logo"
            />
          </Link>
        </div>

        <div className="wm-logo" aria-label="West-mec logo">
          <Link href="/">
            <Image
              src={wmLogo}
              objectFit="contain"
              alt="West Mec"
              aria-label="West-Mec Vet Logo"
            />
          </Link>
        </div>

        <Icon
          name="bars"
          color="black"
          className="hamburger"
          size="large"
          role="button"
          tabIndex="1"
          style={{ cursor: 'pointer' }}
          onClick={() => setShowNavbar((prev) => !prev)}
          aria-label="Pages menu"
        />
      </div>

      <div
        className={` hamburger items ${showNavbar ? 'show' : 'hide'} ${
          user !== null
            ? user.role === 'teacher'
              ? 'taller'
              : 'tall'
            : 'short'
        }`}
      >
        <div
          className={`menu-item ${isActive('/') ? 'active' : ''} ${
            showNavbar ? 'show' : ''
          }`}
          aria-label="Home"
        >
          <Link href="/" tabIndex="2">Home</Link>
        </div>
        <div
          className={`menu-item ${isActive('/animals') ? 'active' : ''}`}
          aria-label="Adoption"
        >
          <Link href="/animals" tabIndex="3">Adoption</Link>
        </div>
        {user !== null && (
          <>
            <div className={`menu-item ${isActive('/admin') ? 'active' : ''}`}>
              <Link href="/admin" tabIndex="4">Admin</Link>
            </div>
            {user.role === 'teacher' && (
              <div
                className={`menu-item ${
                  isActive('/changelog') ? 'active' : ''
                }`}
              >
                <Link href="/changelog" tabIndex="5">Changelog</Link>
              </div>
            )}
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
      {/* </div> */}

      <div className="navbar2">
        <div className="vet-logo">
          <Image
            src={vetLogo}
            objectFit="contain"
            alt="West Mec Vertinary Sciences"
            aria-label="West-Mec Vet Logo"
          />
        </div>
        <div className="wm-logo">
          <Image
            src={wmLogo}
            objectFit="contain"
            alt="West Mec"
            aria-label="West-Mec Logo"
            role="img"
            title="navbar button"
          />
        </div>

        <div className="items">
          <div
            className={`menu-item ${isActive('/') ? 'active' : ''} ${
              showNavbar ? 'show' : ''
            }`}
            aria-label="Home"
          >
            <Link href="/" tabIndex="2">Home</Link>
          </div>
          <div
            className={`menu-item ${isActive('/animals') ? 'active' : ''}`}
            aria-label="Adoption"
          >
            <Link href="/animals" tabIndex="3">Adoption</Link>
          </div>
          {user !== null && (
            <>
              <div
                className={`menu-item ${isActive('/admin') ? 'active' : ''}`}
              >
                <Link href="/admin" tabIndex="4">Admin</Link>
              </div>
              {user.role === 'teacher' && (
                <div
                  className={`menu-item ${
                    isActive('/changelog') ? 'active' : ''
                  }`}
                >
                  <Link href="/changelog" tabIndex="5">Changelog</Link>
                </div>
              )}
              <div
                className={`menu-item`}
                style={{ cursor: 'pointer' }}
                onClick={logoutUser}
              >
                <a href="#" tabIndex="6">Logout</a>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
