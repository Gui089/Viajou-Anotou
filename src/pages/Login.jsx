import { Header } from '../App';
import { Form, useActionData } from 'react-router-dom';

const Login = () => {
  const actionData = useActionData();

  return (
    <>  
      <Header />
      <main className='main-login'>
        <section>
          <Form method='post' className='form-login'>
            <div className='row'>
              <label>
                Email
                <input required name='email' type="email" defaultValue='gui@gmail.com'/>
              </label>
            </div>
            <div className='row'>
              <label>
                Senha
                <input required name='password' type="password"  defaultValue='abc321'/>
              </label>
            </div>
            <button>Login</button>
            {actionData && actionData.error ? <p style={{color:'red'}}>{actionData.error}</p> : null}
          </Form>
        </section>
      </main>
    </>
  )
}

export { Login };