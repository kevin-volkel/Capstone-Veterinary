import 'semantic-ui-css/semantic.min.css';
import '../public/styles/main.css'
import React, { useEffect, useState } from 'react';
import { destroyCookie, parseCookies } from 'nookies';
import { redirectUser, baseURL } from './util/auth';
import axios from 'axios';
import Layout from './components/layout/Layout';
import jwt from 'jsonwebtoken';

function MyApp({ Component, pageProps }) {
  
  return (
    <Layout user={pageProps.user}>
      <Component {...pageProps} />
    </Layout>
  );
}

MyApp.getInitialProps = async ({ ctx, Component }) => {
  const { token } = parseCookies(ctx);
  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  

  const protectedRoutes = ['/admin'];
  const unprotectedRoutes = ['/login', '/reset']
  const veryProtectedRoutes = ['/changelog']

  const isProtectedRoute = protectedRoutes.includes(ctx.pathname);
  const isVeryProtectedRoute = veryProtectedRoutes.includes(ctx.pathname)

  if (!token) {
    isProtectedRoute && redirectUser(ctx, '/login');
    isVeryProtectedRoute && redirectUser(ctx, '/')
  } else if (unprotectedRoutes.includes(ctx.pathname)) {
    redirectUser(ctx, '/')
  } else {
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    try {
      const res = await axios.get(`${baseURL}/api/v1/auth`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { user } = res.data;

      if(user.role !== 'teacher' && isVeryProtectedRoute) redirectUser(ctx, '/')

      pageProps.user = user;
    } catch (err) {
      console.log(err);
      destroyCookie(ctx, 'token');
      redirectUser(ctx, '/');
    }
  }
  if(!pageProps.user) pageProps.user = null;
  return { pageProps };
};

export default MyApp;
