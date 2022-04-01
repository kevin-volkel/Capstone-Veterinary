import React from 'react';
import HeadTag from './HeadTag';
import nprogress from 'nprogress';
import Router from 'next/router';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children, user }) => {
  Router.onRouteChangeStart = () => nprogress.start();
  Router.onRouteChangeComplete = () => nprogress.done();
  Router.onRouteChangeError = () => nprogress.done();

  return (
    <>
      <HeadTag />
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
