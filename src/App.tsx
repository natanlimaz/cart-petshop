import { createBrowserRouter } from 'react-router-dom';

import { Layout } from './components/layout';
import { Home } from './pages/home';
import { Cart } from './pages/cart';
import { Error } from './pages/error';
import { Product } from './pages/product';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/cart",
        element: <Cart />
      },
      {
        path: "/products/:id",
        element: <Product />
      },
      {
        path: "*",
        element: <Error /> 
      }
    ]
  }
]);

export { router };