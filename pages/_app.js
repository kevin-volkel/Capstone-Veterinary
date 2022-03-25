import 'semantic-ui-css/semantic.min.css'
import '../styles/globals.css';
import React, { useEffect, useState } from 'react';
import { destoryCookie, parseCookies } from 'nookies';
import { redirectUser, baseURL } from './util/auth';
import axios from 'axios';
import Layout from './components/layout/Layout';

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

  const protectedRoutes = ['/admin'];

  const isProtectedRoute = protectedRoutes.includes(ctx.pathname);

  if (!token) {
    isProtectedRoute && redirectUser(ctx, '/login');
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

      pageProps.user = user;
    } catch (err) {
      console.log(err);
      destoryCookie(ctx, 'token');
      redirectUser(ctx, '/');
    }
  }
  return { pageProps };
};

export default MyApp;
