import {Button,Form,Icon,Message,Segment} from 'semantic-ui-react'
import React from 'react';
import catchErrors from '../utils/catchErrors'
import baseUrl from '../utils/baseUrl';
import axios from 'axios'
import {handleLogin} from '../utils/auth'

const INITIAL_USER={
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
     const url =`${baseUrl}/api/login`
     const payload= {...user}
     const response = await axios.post(url,payload)
     handleLogin(response.data)
  }catch(error){
    catchErrors(error,setError)
  }finally{
   setLoading(false)
  }
}


  return <div className='login-background'>
    <Message 
    
    header='Welcome back!'
    content = 'Login with email and password'
    style={{textAlign:'center',width:'300px',borderRadius:'2px'}}
    attached
    />
    <Form  style={{display:'flex',justifyContent:'center',backgroundColor:'transparent',border:'none'}} 
    className='attached fluid segment' 
    error={Boolean(error)} onSubmit={handleSubmit} loading={loading}>
      <Segment style={{width:'300px',borderRadius:'2px',backgroundColor:'transparent'}}>
        <Message 
        error
        header='Oops!'
        content={error}
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
         icon ='sign in'
         type='submit'
         color='black'
         content='Login'
         disabled={disabled || loading}
        />
      </Segment>
    </Form>
  </div>;
}

export default Signup;
