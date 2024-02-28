import { Link, NavLink, Outlet} from 'react-router-dom';

const Application = () => {
  
  return (
    <main className='main-app-layout'>
      <div className='sidebar'>
        <header>
        <Link to='/'> <img className='logo' src="./public/img/logo-viajou-anotou-dark.png" alt="logo dark viajou anotou" /></Link>
        </header>
      
      <nav className='nav-app-layout'>
        <ul>
          <li><NavLink to='cities'>Cidades</NavLink></li>
          <li><NavLink to='paises'>Paises</NavLink></li>
        </ul>
      </nav>
      <Outlet />
      </div>
     <div className='map'>
      <h2>map</h2>
     </div>
    </main>
  )
}

export { Application }