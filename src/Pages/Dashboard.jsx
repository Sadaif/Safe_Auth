import React from 'react'
import Cookies from 'js-cookie'
import AuthApi from '../AuthApi';
import { Grid, Image, Menu, Icon, Header, List, Input } from 'semantic-ui-react'
import { getRequest, getToken } from '../Components/funtions';

function Dashboard() {
  const Auth = React.useContext(AuthApi)

  const handleClick = () => {
    Auth.setAuth(false);
    Cookies.remove('Hex')
    Cookies.remove('accessToken')
    Cookies.remove('refreshToken')
  }


  React.useEffect(() => {
    // console.log('refresh-token', Auth.refreshToken)
    get_custommers();
    Token(Auth.refreshToken)
  }, [Auth.refreshToken])
 
  const Token = (Auth) => {   
    console.log('refresh-token-hex1234' , Auth)
    getToken(`/token/${Auth}`)
    .then(res => { 
      return res.json()
    })
    .then(json => {  
      console.log( 'Hex' , json)
      Auth.setAccessToken(json.accessToken)
      Auth.setRefreshToken(json.refreshToken) 
      Cookies.set('accessToken', json.accessToken, { HttpOnly: true, secure: true })
      Cookies.set('refreshToken', json.refreshToken, { HttpOnly: true, secure: true })
    })
    .catch(err => {
      // console.log(err) 
    })
  }


  const get_custommers = () => {   
    getRequest("/customers" , Auth.accessToken)
    .then(res => { 
      return res.json()
    })
    .then(json => {  
      console.log(json)
      // this.setState({all_videos: json.data})
      // console.log('videos 1' ,  json)
    })
    .catch(err => {
      // console.log(err) 
    })
  }

  return (
    <div>
      <Grid equal width>
        <Grid.Row  style={{ padding: '1rem 1rem !important' }}>
          <Grid.Column width={3} style={{backgroundColor: '#2A3F54'}}>
            <Menu pointing secondary  vertical fluid style={{backgroundColor: '#2A3F54' , height: '100vh', overflow: 'auto' }}>
              <List style={{marginTop: '10em'}}>
                <List.Item>
                  <Header style={{color: 'white'}} size='small'>  <Icon name='dashboard' />Dashboard</Header>
                </List.Item>
                <List.Item>
                  <Header style={{color: 'white'}} size='small'>  <Icon name='users' />Customers</Header>
                </List.Item>
                <List.Item>
                  <Header style={{color: 'white'}} size='small'>  <Icon name='chart line' />Statics</Header>
                </List.Item>
                <List.Item>
                  <Header style={{color: 'white'}} size='small'>  <Icon name='send' />Routing and Career</Header>
                </List.Item>

                <List.Item>
                  <Header style={{color: 'white'}} size='small'>  <Icon name='sliders' />Tools</Header>
                </List.Item>
                <List.Item>
                  <Header style={{color: 'white'}} size='small'>  <Icon name='numbered list' />Numbers</Header>
                </List.Item>


              </List>
            </Menu>
          </Grid.Column>

          <Grid.Column fluid width={13} style={{backgroundColor: '#EDEDED', borderBottom: '1px solid #D9DEE4' , height: '5em'}} >
            <div style={{height: '100vh' ,  overflow: 'auto'}}>
            <Menu fluid text> 
              <Menu.Item>
                <Input className='icon' icon='search' placeholder='Search...' />
              </Menu.Item>

              <Menu.Item position='right'>
              <button onClick={handleClick}>Logout</button>
              </Menu.Item>
            </Menu>
            
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  )
}


export default Dashboard
