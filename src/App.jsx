import { Route,NavLink, Link, createBrowserRouter, createRoutesFromElements, RouterProvider, useLocation } from 'react-router-dom';
import { Home } from './pages/Home.jsx';
import { Price } from './pages/Price.jsx';
import { About } from './pages/About.jsx';

const NotFound = () => {
  return (
    <>
      <Header />
      <main className='main-not-found'>
        <section>
          <div>
            <h1>Página não encontrada</h1>
            <p>Volte para a <Link to='/'>Página inicial</Link> </p>
          </div>
        </section>
      </main>
    </>
  );
}

const route = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' >
      <Route index element={<Home />} />
      <Route path='/about' element={<About />}/>
      <Route path='/price' element={<Price />} />
      <Route path='*' element={<NotFound />} />
    </Route>
  )
);

const links = [
  {path:'/', text:'Home'},
  {path:'/about', text:'About'},
  {path:'/price', text:'Price'}
];

const Header = () => {
  const location = useLocation();
  const isHomepage = location.pathname !== '/';

  return (
    <header>
    <nav className='nav'>
        <Link to='/'><img className='logo' src={`./public/img/logo-viajou-anotou-${isHomepage ? 'dark' : 'light'}.png`} alt="" /></Link>
        <ul>
          {links.map(link => {
            const linkShouldBeGray = isHomepage && location.pathname !== link.path;
            return (
              <li key={link.text}>
                <NavLink to={link.path} style={linkShouldBeGray ? {color: '#C2C2C2'}: null}>
                  {link.text}
                </NavLink>
              </li>
            )
          })}
        </ul>
      </nav>
    </header>
  )
}

const App = () => {
  return (
    <>
      <RouterProvider router={route} />
    </>
  )
}


export {App, Header}
