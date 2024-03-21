import { Route,Form,redirect ,NavLink, Link, createBrowserRouter, createRoutesFromElements, RouterProvider, useLocation, useParams, useNavigate, useOutletContext, Navigate, useLoaderData, useRouteError } from 'react-router-dom';
import { Home } from './pages/Home.jsx';
import { Price } from './pages/Price.jsx';
import { About } from './pages/About.jsx';
import { Login } from './pages/Login.jsx';
import { Application } from './pages/Application.jsx';
import localforage from 'localforage';
import { logoutAction } from './pages/Application.jsx';

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

const CountryFlag = ({country, className, width = 20, height = 15 }) => {
  const src = `https://flagcdn.com/${width}x${height}/${country.code}.png`;
  return <img className={className} alt={country.name} src={src}></img>
}

const Cities = () => {
  const city = useOutletContext();

  return (
    city.length === 0 ? <h2>Clique no mapa para adicionar uma cidade </h2> : (
      <ul className='cities'>
        {city.map((city) => 
          <li key={city.id}>
            <Link to={`${city.id}?latitude=${city.position.latitude}&longitude=${city.position.longitude}`}>
              <CountryFlag  country={city.country}/>
              <h3>{city.Name}</h3>
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
  const handleClickBack = () => navigate(-1);

  const deleteContact = (e) => {
    const wantToDelete = confirm("Por favor, confirme que quer deletar essa viagem.");
    if(!wantToDelete) {
      e.preventDefault();
    }
  }

  return (
    <div className='city-details'>
      <div className='row'>
        <h5>Nome da Cidade</h5>
        <h3>
          <CountryFlag country={cities.country} className='pa'/>
          {cities.Name}
        </h3>
      </div>
      <div className='row'>
        <h5>Suas Anotações</h5>
        <p>{cities.notes}</p>
      </div>
      <div className='buttons'>
      <button onClick={handleClickBack} className='btn-back'>&larr; Voltar</button>
      <button className='btn-edit'>&there4;Editar</button>
      <Form method='post' action='delete' onSubmit={deleteContact}>
        <button className='btn-delete' type='submit'>&times; Deletar</button>
      </Form>
      </div>
    </div>
  )
}

const Countries = () => {
   const city = useOutletContext();
   const countries = city.reduce((acc, city) => {
    const duplicateCountry = acc.some(accItem => accItem.name === city.country.name);
    return duplicateCountry ? acc : [...acc, city.country];
   }, []);

   return (
      <ul className='countries'>
        {countries.map(country => (
          <li key={country.name}>
            <CountryFlag country={country} className="mr-05 mb--3px"/>
            {country.name}
          </li>
        ))}
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
  const city = {...Object.fromEntries(formData), position: {latitude, longitude}, id: crypto.randomUUID(),country: {name: country.countryName, code: country.countryCode.toLowerCase()}};
  const cities = await localforage.getItem('cities');
  await localforage.setItem('cities', cities ? [...cities, city]:[city])
  console.log('city: ', city);
  return redirect(`/app/cities`);
}

const handleGetCities = async ({ request, params }) => {
  const url = new URL(request.url);
  const latitude = url.searchParams.get('latitude');
  const longitude = url.searchParams.get('longitude');
  const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localitylanguage=pt-BR`)
  const info = await response.json();

  return {name: info.city, id: params.id};
}

const appLoader = async () => {
  if(!fakeAuthProvider.isAuthenticated) {
    return redirect('/login');
  }

  const cities = await localforage.getItem('cities');
  return cities ?? [];
}

const EditCity = () => {
  const navigate = useNavigate();
  const city = useLoaderData();
  
  const handleClickBack = () => {
    navigate('/app/cities');
  } 

  return (
    <Form method='post' className='form-edit-city'>
      <label>Nome da cidade</label>
      <input required type="text" name='Name' key={city.name} defaultValue={city.name}/>
      <label>Quando vc para {city.name}</label>
      <input required type="date" defaultValue={city.date || ''}/>
      <label>Suas anotações</label>  
      <textarea required name="notes" defaultValue={city.notes || ''}></textarea> 
      <div className='buttons'>
        <button type='button' onClick={handleClickBack} className='btn-back'>&larr;Voltar</button>
        <button type='submit' className='btn-save'>Salvar</button>
      </div>  
    </Form>
  )
}

const deleteAction =  async ({ params }) => {
  const cities = await localforage.getItem('cities');
  await localforage.setItem('cities', cities ? cities.filter(city => city.id !== params.id) : []);
  return redirect ('/app/cities');
}

const ErrorElement = () => {
  const error = useRouteError();
  console.log('erro: ', error);

  return (
    <>
      <Header />
      <main className='main-not-found'>
        <section>
        <h1>Opa!</h1>
        <p>Ocorreu um erro inesperado</p>
        <p>{error.message}</p>
        </section>
      </main>
    </>
  )
}

const fakeAuthProvider = {
  isAuthenticated: false,
  email: null,
  signIn: async function (email) {
    await new Promise(resolve => setTimeout(resolve, 500))
    this.isAuthenticated = true
    this.email = email
  },
  signOut: async function () {
    await new Promise(resolve => setTimeout(resolve, 500))
    this.isAuthenticated = false
    this.email = null
  }
}

const loginAction = async ({ request }) => {
  const { email, password } = Object.fromEntries(await request.formData());
  
  if(email.length <= 3) {
    return{error: 'O email nao pode ter menos de 4 caracteres'};
  }

  try {
    await fakeAuthProvider.signIn(email);
  } catch(error) {
    return { error: 'Nao foi possivel fazer login, por favor tente novamente'}
  }

  return redirect('/app');
}

const loginLoader = async () => {
  if (!fakeAuthProvider.isAuthenticated) {
    return null;
  }

  return redirect('/app');
}

const App = () => {
  
  const route = createBrowserRouter(
    createRoutesFromElements(
        <Route errorElement={<ErrorElement />}>
        <Route path='/' >
        <Route index element={<Home />} />
        <Route path='/about' element={<About />}/>
        <Route path='/price' element={<Price />} />
        <Route path='/login' element={<Login />} loader={loginLoader} action={loginAction}/>
        <Route path='/logout' action={logoutAction} />
        <Route path='/app' element={<Application />} loader={appLoader} >
          <Route index element={<Navigate to='cities' replace/>} />
          <Route path='cities' element={<Cities />}/>
          <Route path='cities/:id' element={<CityDetails />} loader={appLoader}/>
          <Route path='cities/:id/edit' element={<EditCity />} loader={handleGetCities} action={handleAddCities}/>
          <Route path='cities/:id/delete' action={deleteAction}/>
          <Route path='paises' element={<Countries />} />
        </Route>
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


export {App, Header, fakeAuthProvider}
