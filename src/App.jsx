import { AppLayout } from './pages/appLayout.jsx';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import { Home } from './pages/Home.jsx';
import { Price } from './pages/Price.jsx';
import { About } from './pages/About.jsx';

const route = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<AppLayout />}>
      <Route path='/' element={<Home />} />
      <Route path='/about' element={<About />}/>
      <Route path='/price' element={<Price />} />
    </Route>
  )
);

const App = () => {
  return (
    <>
      <RouterProvider router={route} />
    </>
  )
}


export {App}
