import { Header } from '../App'

const Price = () => {
  return (
    <>
      <Header />
        <main className='main-pricing'>
          <section>
             <div>
              <h1>Preço simples. <br />Só R$ 47/mês.</h1>
              <p>Comece hoje mesmo a anotar suas aventuras e mostre aos seus amigos o quê você fez pelo mundo.</p>
             </div>
             <img src="https://github.com/Gui089/Viajou-Anotou/blob/main/public/img/photos/preco-viajou-anotou.jpg?raw=true" alt="" />
          </section>
        </main>
    </>
  )
}

export { Price }