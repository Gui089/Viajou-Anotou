import { Link} from 'react-router-dom';
import { Header } from '../App';

const Home = () => {
  return (
    <>
    <Header />
     <main className='main-home'>
        <section>
          <h1>Você viaja o mundo. E o ViajouAnotou mantém suas aventuras anotadas.</h1>
          <h2>Um mapa mundial que rastreia por onde você passou. Nunca esqueça suas experiências e mostre aos seus amigos o quê você fez pelo mundo.</h2>
          <Link className='cta' to='/app/cities'>Começar agora</Link>
        </section>
     </main>
    </>
  )
}

export {Home}