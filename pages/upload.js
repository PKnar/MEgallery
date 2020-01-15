import{Form, Input, TextArea,Button,Image,Message,Header,Icon} from 'semantic-ui-react'
import React from 'react'
import axios from 'axios'
import baseUrl from '../utils/baseUrl'
import catchErrors from '../utils/catchErrors'

const INIRIAL_PRODUCT={
  media:''
}

function UploadImage() {

  const [product,setProduct]=React.useState(INIRIAL_PRODUCT);
  const [mediaPreview,setMediaPreview]=React.useState('')
  const [success,setSuccess] = React.useState(false)
  const [loading,setLoading] = React.useState(false)
  const[disabled,setDisabled]= React.useState(true)
  const [error,setError]= React.useState('')


  React.useEffect(()=>{
    const isProduct = Object.values(product).some(el=>
      Boolean(el))

      isProduct? setDisabled(false) : setDisabled(true)
  },[product])

   function handleChange(event){
     const {name,value,files}=event.target
  
     if(name === 'media'){
      
       setProduct(prevState=>({
         ...prevState,media:files[0]
       }))

       setMediaPreview(window.URL.createObjectURL(files[0]))
     }else{
      setProduct((prevState)=>({...prevState,[name]:value}))
    
     }
     
    
    }
   async function handleImageUpload(){
     
      const data = new FormData()
      data.append('file',product.media)
      data.append('upload_preset','M.E.Gallery')
      data.append('cloud_name','dzhly2uel')
     const response = await  axios.post(process.env.CLOUDINARY_URL,data)
      const mediaUrl = response.data.url
      return mediaUrl
    }

   async  function handleSubmit(event){
     try{
      event.preventDefault();
      setLoading(true)
      setError('')
      const mediaUrl=  await handleImageUpload();
       const url = `${baseUrl}/api/image`
       const payload={mediaUrl}
      await axios.post(url,payload)
     setProduct(INIRIAL_PRODUCT)
     setSuccess(true);
     }catch(error){
      catchErrors(error,setError)
     }finally{
      setLoading(false)
     }
    


    }

  return(
    <div className='upload-bg'  >
       <Message 
       
    icon='upload'
    header='Upload image'
    color='black'
    style={{width:'300px',borderRadius:'2px',margin:'10px'}}
    />
     <Form
     style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',backgroundColor:'transparent',border:'none'}} 
     loading={loading} error={Boolean(error)} success ={success} onSubmit={handleSubmit}>
     <Message error
          header='Oops!'
          content={error}
          style={{width:'300px'}}
       />
       <Message success 
          icon='check'
          header='Success!'
          content='Your image has been posted'
       />
       <Form.Group width='equal'>
           <Form.Field
          control={Input}
          onChange={handleChange}
          name='media'
          type='file'
          accept='image/*'
          multiple
          content ='Select Image'
          style={{width:'300px'}}
          />
       </Form.Group>
       <Image style={{margin:'15px'}} src={mediaPreview} rounded centered size='small'/>
           <Form.Field
          control={Button}
          disabled={disabled ||  loading }
          name='blue'
          icon='pencil alternate'
          content ='Submit'
          type='Submit'
          color='black'
          />
     </Form>
    </div>
  )
}

export default UploadImage;
