import { Route,Form,redirect ,NavLink, Link, createBrowserRouter, createRoutesFromElements, RouterProvider, useLocation, useParams, useNavigate, useOutletContext, Navigate, useLoaderData } from 'react-router-dom';
import { Home } from './pages/Home.jsx';
import { Price } from './pages/Price.jsx';
import { About } from './pages/About.jsx';
import { Login } from './pages/Login.jsx';
import { Application } from './pages/Application.jsx';
import localforage from 'localforage';

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

const Cities = () => {
  const city = useOutletContext();
  
  return (
    city.length === 0 ? <h2>Clique no mapa para adicionar uma cidade </h2> : (
      <ul className='cities'>
        {city.map(city => 
          <li key={city.id}>
            <Link to={`${city.id}?latitude=${city.position.latitude}&longitude=${city.position.longitude}`}>
              <h3>{city.Name}</h3>
              <button>&times;</button>
            </Link>
          </li>)}
      </ul>
     )
  )
}
  
const CityDetails = () => {
  const city = useLoaderData();
  const params = useParams();
  const navigate = useNavigate();
  const cities = city.find(city => city.id === params.id);
  console.log('citieDetails: ', cities);
  const handleClickBack = () => navigate(-1);

  return (
    <div className='city-details'>
      <div className='row'>
        <h5>Nome da Cidade</h5>
        <h3>{cities.Name}</h3>
      </div>
      <div className='row'>
        <h5>Suas Anotações</h5>
        <p>{cities.notes}</p>
      </div>
      <button onClick={handleClickBack} className='btn-back'>&larr; Voltar</button>
    </div>
  )
}

const Countries = () => {
   const city = useOutletContext();
   const groupeByCountry = Object.groupBy(city, ({country}) => country)
   const countries = Object.keys(groupeByCountry);

   return (
      <ul className='countries'>
        {countries.map(country => <li key={country}>{country}</li>)}
      </ul>
   )
}

const handleAddCities = async ({ request }) => {
  const url = new URL(request.url);
  const latitude = url.searchParams.get('latitude');
  const longitude = url.searchParams.get('longitude');
  const formData = await request.formData();
  const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localitylanguage=pt-BR`)
  const country = await response.json();
  const city = {...Object.fromEntries(formData), position: {latitude, longitude}, id: crypto.randomUUID(), country: country.countryName};
  const cities = await localforage.getItem('cities');
  await localforage.setItem('cities', cities ? [...cities, city]:[city])
  console.log('city: ', city);
  return redirect('/app/cities');
}

const handleGetCities = async ({ request }) => {
  const url = new URL(request.url);
  const latitude = url.searchParams.get('latitude');
  const longitude = url.searchParams.get('longitude');
  const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localitylanguage=pt-BR`)
  const info = await response.json();

  return {name: info.city, country: info.countryName};
}

const citiesLoader = async () => {
  const cities = await localforage.getItem('cities');
  return cities ?? [];
}

const FormAddCity = () => {
  const navigate = useNavigate();
  const city = useLoaderData();
  
  const handleClickBack = (e) => {
    e.preventDefault();
    navigate('/app/cities');
  } 

  return (
    <Form method='post' className='form-edit-city'>
      <label>Nome da cidade</label>
      <input type="text" name='Name' key={city.name} defaultValue={city.name}/>
      <label>Quando vc para {city.name}</label>
      <input type="date" />
      <label>Suas anotações</label>  
      <textarea name="notes"></textarea> 
      <div className='buttons'>
      <button type='button' onClick={handleClickBack} className='btn-back'>&larr;Voltar</button>
      <button type='submit'onClick={handleAddCities} className='btn-save'>Salvar</button> </div>  
    </Form>
  )
}

const App = () => {
  
  const route = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' >
        <Route index element={<Home />} />
        <Route path='/about' element={<About />}/>
        <Route path='/price' element={<Price />} />
        <Route path='*' element={<NotFound />} />
        <Route path='/login' element={<Login />} />
        <Route path='/app' element={<Application />} loader={citiesLoader}>
          <Route index element={<Navigate to='cidades' replace/>} />
          <Route path='cities' element={<Cities />}/>
          <Route path='cities/:id' element={<CityDetails />} loader={citiesLoader}/>
          <Route path='paises' element={<Countries />} />
          <Route path='form' element={<FormAddCity />} loader={handleGetCities} action={handleAddCities}/>
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
