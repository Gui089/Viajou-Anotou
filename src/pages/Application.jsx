import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet} from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

const Application = () => {

  const [city, setCity] = useState([]);

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
     <MapContainer className='map-container' center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true}>
       <TileLayer
         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
       />
       <Marker position={[51.505, -0.09]}>
         <Popup>
           A pretty CSS3 popup. <br /> Easily customizable.
         </Popup>
       </Marker>
      </MapContainer>
     </div>
    </main>
  )
}

export { Application }