import {Button,Form,Icon,Message,Segment} from 'semantic-ui-react'
import Link from 'next/link'
import React from 'react';
import catchErrors from '../utils/catchErrors'
import axios from 'axios'
import baseUrl from '../utils/baseUrl'
import {handleLogin}  from '../utils/auth';


const INITIAL_USER={
  name:'',
  email:'',
  password:''
}

function Signup() {

  const[user,setUser]=React.useState(INITIAL_USER)
  const [disabled,setDisabled]=React.useState(true)
  const [loading,setLoading]=React.useState(false)
  const [error,setError] = React.useState('')
  React.useEffect(()=>{
  const isUser=Object.values(user).every(el=>Boolean(el))
  isUser? setDisabled(false):setDisabled(true)
},[user])

  function handleChange(event){
  const {name,value}=event.target
   setUser(prevState => ({...prevState,[name]:value}))

  }

async function handleSubmit(e){
  e.preventDefault()
  try{
     setLoading(true)
     setError('')
     const url = `${baseUrl}/api/signup`
     const payload={...user}
     const response= await axios.post(url,payload)
     handleLogin(response.data)
  }catch(error){
    catchErrors(error,setError)
  }finally{
   setLoading(false)
  }
}


  return <div className='signup-background'>
    <Message 
    attached
    icon='settings'
    header='Get Started!'
    content = 'Create a new account'
    color='black'
    style={{textAlign:'center',width:'300px',borderRadius:'2px'}}
    />
    <Form  style={{display:'flex',justifyContent:'center',backgroundColor:'transparent',border:'none'}} 
     error={Boolean(error)} onSubmit={handleSubmit} loading={loading}>
      <Segment style={{width:'300px',borderRadius:'2px',backgroundColor:'transparent'}}>
        <Message 
        error
        header='Oops!'
        content={error}
        />
        <Form.Input
            fluid
            icon='user'
            iconPosition='left'
            label='Name'
            placeholder='Name'
            name='name'
            value={user.name}
            onChange={handleChange}
        />
         <Form.Input
            fluid
            icon='envelope'
            iconPosition='left'
            label='Email'
            placeholder='Email'
            name='email'
            onChange={handleChange}
            value={user.email}
            type='email'
        />
           <Form.Input
            fluid
            icon='lock'
            iconPosition='left'
            label='Password'
            placeholder='Password'
            name='password'
            onChange={handleChange}
            value={user.password}
            type='password'
        />
        <Button 
         icon ='signup'
         type='submit'
         color='black'
         content='Signup'
         disabled={disabled || loading}
        />
      </Segment>
    </Form>
    <Message warning
     style={{width:'300px'}}
    >
      <Icon name='help'/>
      Existing user?{''}
      <Link href='/login' >
        <a>Login in here</a>
      </Link>{''} instead.
    </Message>
  </div>;
}

export default Signup;
