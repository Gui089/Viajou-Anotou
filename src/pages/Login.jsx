import { Header } from '../App';

const Login = () => {
  return (
    <>  
      <Header />
      <main className='main-login'>
        <section>
          <form action='/' className='form-login'>
            <div className='row'>
              <label>
                Email
                <input type="email" defaultValue='gui@gmail.com'/>
              </label>
            </div>
            <div className='row'>
              <label>
                Senha
                <input type="password"  defaultValue='abc321'/>
              </label>
            </div>
            <button>Login</button>
          </form>
        </section>
      </main>
    </>
  )
}

export { Login };