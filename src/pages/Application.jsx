import { Link, Outlet} from 'react-router-dom';

const Application = () => {
  
  return (
    <main className='sidebar main-app-layout'>
      <nav className='nav-app-layout'>
        <Link to='/'> <img className='logo' src="./public/img/logo-viajou-anotou-dark.png" alt="logo dark viajou anotou" /></Link>
      </nav>

      <div>
        <Link to='cities'><button className='btn'>Cidades</button></Link>
        <button className='btn'>Countries</button>
      </div>
      <Outlet />
    </main>
  )
}

export { Application }