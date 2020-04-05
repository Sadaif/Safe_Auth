import React from 'react'
import Cookies from 'js-cookie'
import AuthApi from '../AuthApi';
import { postJSON } from '../Components/funtions';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

function Login() {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [error, setError] = React.useState('')
  const Auth = React.useContext(AuthApi)

  const postData = (e) => {
    e.preventDefault();

    const form = {
      username: email,
      password: password
    }
    postJSON("/login", form)
      .then(async res => {
        let json = await res.json()
        if (res.status === 201) {
          console.log(json)
          Auth.setAuth(true);
          Auth.setAccessToken(json.accessToken)
          Auth.setRefreshToken(json.refreshToken)
          Cookies.set('Hex', '************')
          Cookies.set('accessToken', json.accessToken, { HttpOnly: true, secure: true })
          Cookies.set('refreshToken', json.refreshToken, { HttpOnly: true, secure: true })
        }else{
          setError("An error occured while login Please check username and password Please pay attention that username and password are case-sensitive")
        }
      })
      .catch(err => {
        console.log(err)
        
      })
  }
  return (
    // <div style={{backgroundColor: '#eee' , height: '90vh' , paddingTop: '40px'}}>
    //   <h1> Welcome </h1>
    //   <form onSubmit={postData}>
    //     <input name="email" value={email} placeholder="email" type="text" onChange={e => setEmail(e.target.value)} />
    //     <input name="password" value={password} placeholder="password" type="password" onChange={e => setPassword(e.target.value)} />
    //     <input type="submit" value="Login" />
    //   </form>

    // </div>
    <Grid textAlign='center' style={{ height: '100vh', backgroundColor: '#eee' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 350 }}>
        <p   textAlign='center'>
        Please enter your username and password.
      </p>
      {error ? <div className="alert alert-warning">{error}</div> : null}
      
        <Form size='large'  onSubmit={postData}>
          {/* <Segment stacked> */}
          <Form.Input
            fluid
            name="email" value={email}  type="text" onChange={e => setEmail(e.target.value)} 
            placeholder="UserName"
          />
          <Form.Input
            fluid
            placeholder="Password"
            name="password" value={password}  onChange={e => setPassword(e.target.value)} 
            type='password'
          />

          <Button color='blue' fluid size='big' type="submit">
            Submit
          </Button>
          {/* </Segment> */}
        </Form>
        <br />
        <Button style={{backgroundColor: '#5bc0de' , color: 'white'}} fluid size='large'>
            Forgot your password?
          </Button>
      </Grid.Column>
    </Grid>
  )
}

export default Login
