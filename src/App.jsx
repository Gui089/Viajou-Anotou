import { Route,NavLink, Link, createBrowserRouter, createRoutesFromElements, RouterProvider, useLocation, Outlet, useParams } from 'react-router-dom';
import { Home } from './pages/Home.jsx';
import { Price } from './pages/Price.jsx';
import { About } from './pages/About.jsx';
import { Login } from './pages/Login.jsx';
import { Application } from './pages/Application.jsx';
import { useEffect, useState } from 'react';

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


const links = [
  {path:'/', text:'Home'},
  {path:'/about', text:'About'},
  {path:'/price', text:'Price'},
  {path:'/login', text:'Login'}
];

const Header = () => {
  const location = useLocation();
  const isHomepage = location.pathname !== '/';

  return (
    <header>
    <nav className='nav'>
        <Link to='/'>
            <img className='logo' src={`https://github.com/Gui089/Viajou-Anotou/blob/main/public/img/logo-viajou-anotou-${isHomepage ? 'dark' : 'light'}.png?raw=true`} alt="logo viajou anotou" />
        </Link>
        <ul>
          {links.map(link => {
            const linkShouldBeGray = isHomepage && location.pathname !== link.path;
            const isLogin = link.path === '/login'
            return (
              <li key={link.text}>
                <NavLink 
                  to={link.path} 
                  style={linkShouldBeGray ? {color: '#C2C2C2'}: isLogin ? {color: 'white'} : null}
                  className={isLogin ? 'cta' : ''}>
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

const Cities = ({ city }) => {
  
  return (
    <div className='cities'>    
      <ul>
        {city.map(city => 
           <li key={city.id}><h3><Link to={`${city.id}`}>{city.name}</Link></h3></li>  
        )}
      </ul>
     </div>
  )
}

const CityDetails = ({ city }) => {
  const params = useParams();
  const cities = city.find(city => city.id === Number(params.id));

  return (
    <div className='city-details'>
      <h5>{cities.name}</h5>
      <p>{cities.notes}</p>
    </div>
  )
}


const App = () => {
  const [city, setCity] = useState([]);

  useEffect(() => {
    const fechCities = async () => {
      const cities = await fetch('https://raw.githubusercontent.com/Gui089/fake-api-cities/main/fake-cities.json');
      const resCities = await cities.json();
      setCity(resCities);
    }  
    fechCities();

    console.log(city)

  }, []);
  
  const route = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' >
        <Route index element={<Home />} />
        <Route path='/about' element={<About />}/>
        <Route path='/price' element={<Price />} />
        <Route path='*' element={<NotFound />} />
        <Route path='/login' element={<Login />} />
        <Route path='/app' element={<Application />} >
          <Route path='cities' element={<Cities city={city} />} />
          <Route path=':id' element={<CityDetails city={city} />} />
        </Route>
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={route} />
    </>
  )
}


export {App, Header}
