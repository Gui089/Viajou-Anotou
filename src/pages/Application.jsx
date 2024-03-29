
import { Link,Form, NavLink, Outlet, redirect, useLoaderData, useNavigate, useSearchParams} from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet'
import { fakeAuthProvider } from '../App';

const buenosAiresPosition ={ latitude:'-34.60449337161966', longitude: '-58.38935696465469 '}

const ChangeCenter = ({position}) => {
  const map = useMap();
  map.setView(position);
  return null;
} 

const ChangeToClickedCity = () => {
  const navigate = useNavigate();
  const id = crypto.randomUUID();

  useMapEvents({
    click: e => navigate(`cities/${id}/edit?latitude=${e.latlng.lat}&longitude=${e.latlng.lng}`)
  });
}

export const logoutAction = async () => {
  await fakeAuthProvider.signOut();
  console.log('executou logout')
  console.log(fakeAuthProvider);
  return redirect('/');
}

const Application = () => {
  const city = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  const latitude = searchParams.get('latitude');
  const longitude = searchParams.get('longitude');

  return (
    <main className='main-app-layout'>
      <div className='sidebar'>
        <header>
        <Link to='/'> <img className='logo' src="https://github.com/Gui089/Viajou-Anotou/blob/main/public/img/logo-viajou-anotou-dark.png?raw=true" alt="logo dark viajou anotou" /></Link>
        </header>
      
      <nav className='nav-app-layout'>
        <ul>
          <li><NavLink to='cities'>Cidades</NavLink></li>
          <li><NavLink to='paises'>Paises</NavLink></li>
        </ul>
      </nav>
      <Outlet context={city}/>
      </div>
       
      <Form method='post' action='/logout'>
         <button className='btn-logout cta'>Logout</button>
      </Form>

     <MapContainer className='map-container' center={[buenosAiresPosition.latitude, buenosAiresPosition.longitude]} zoom={13} scrollWheelZoom={true}>
       <TileLayer
         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
       />
       {city.map(cities => 
       <Marker key={cities.id} position={[cities.position.latitude, cities.position.longitude]}>
         <Popup>
           A pretty CSS3 popup. <br /> Easily customizable.
         </Popup>
       </Marker>)}
       {latitude && longitude && <ChangeCenter position={[latitude, longitude]} />}
       <ChangeToClickedCity />
      </MapContainer>
    </main>
  )
}

export { Application }