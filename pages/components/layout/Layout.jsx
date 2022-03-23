import React from 'react';
import HeadTag from './HeadTag';
import nprogress from 'nprogress';
import Router from 'next/router';

const Layout = ({ children, user }) => {
  Router.onRouteChangeStart = () => nprogress.start();
  Router.onRouteChangeComplete = () => nprogress.done();
  Router.onRouteChangeError = () => nprogress.done();

  return (
    <>
      <HeadTag />
      {/* Navbar here */}
      {children}
      {/* Footer Here */}
    </>
  );
};

export default Layout;
