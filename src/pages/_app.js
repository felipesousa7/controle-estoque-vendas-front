import React from 'react';
import '../styles/globals.css'

import theme from '../styles/theme'

import { ThemeProvider, CssBaseline } from "@mui/material";
import Layout from "@/components/_App/Layout";
import { OrderProvider } from '../context/useOrder'
import { ProductProvider } from '../context/useProduct'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
          <Layout>
            <ProductProvider>
              <OrderProvider>
                <Component {...pageProps} />
              </OrderProvider>
            </ProductProvider>
          </Layout>
      </ThemeProvider>
    </>
  );
}

export default MyApp
