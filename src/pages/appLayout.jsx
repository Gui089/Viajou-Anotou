import { NavLink, Outlet } from 'react-router-dom';

const AppLayout = () => {
  return (
    <>
      <nav className='nav'>
        <img className='logo' src="./public/img/logo-viajou-anotou-light.png" alt="" />
        <ul>
          <li><NavLink to='/'>Home</NavLink></li>
          <li><NavLink to='/price'>Price</NavLink></li>
          <li><NavLink to='/about'>About</NavLink></li>
        </ul>
      </nav>
      <Outlet />
    </>
    
  )
}

export { AppLayout }