import { Header } from '../App'

const About = () => {
  return (
    <>
      <Header />
       <main className='main-about'>
         <section>
           <div>
             <h1>Sobre o ViajouAnotou</h1>
             <p>Este projeto esta sendo feito em React</p>
             <p>Quero me tornar um espcialista em React</p>
           </div>
           <img src="https://github.com/Gui089/Viajou-Anotou/blob/main/public/img/photos/sobre-viajou-anotou.jpg?raw=true" alt="Paulo e Roberto" />
         </section>
       </main>
    </>
  )
}

export {About}