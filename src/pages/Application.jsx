import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useSearchParams} from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'

const buenosAiresPosition ={ latitude:'-34.60449337161966', longitude: '-58.38935696465469 '}

const ChangeCenter = ({position}) => {
  const map = useMap();
  map.setView(position);
  return null;
} 

const Application = () => {
  const [city, setCity] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const latitude = searchParams.get('latitude');
  const longitude = searchParams.get('longitude');

  useEffect(() => {
    const fechCities = async () => {
      const cities = await fetch('https://raw.githubusercontent.com/Gui089/fake-api-cities/main/fake-cities.json');
      const resCities = await cities.json();
      setCity(resCities);
    }  
    fechCities();

    console.log(city);

  }, []);
  
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

     <div className='map-container'>
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
      </MapContainer>
     </div>
    </main>
  )
}

export { Application }