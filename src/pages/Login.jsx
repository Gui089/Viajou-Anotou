import { Header } from '../App';

const Login = () => {
  return (
    <>  
      <Header />
      <main className='main-login'>
        <section>
          <form action='/' className='form-login'>
            <label>Email</label>
            <input type="text" />
            <label>Senha</label>
            <input type="password"/>
            <button>Login</button>
          </form>
        </section>
      </main>
    </>
  )
}

export { Login };