import {Button} from 'semantic-ui-react'
import React from 'react';
import axios from 'axios';;
import baseUrl  from '../../utils/baseUrl';
import {useRouter} from 'next/router'

function ImageAttributes({_id,user}) {
const router =useRouter()
const isRoot = user && user.role === 'root'


async function handleDelete(){
    const url = `${baseUrl}/api/image`;
    const payload ={params:{_id}}
    axios.delete(url,payload)
    router.push('/image')
}

  return <>
{ isRoot && 
<><Button
     style={{backgroundColor:'transparent',border:'1px solid red',color:'red'}}
     content ="Delete "
     onClick={handleDelete}
    />
    </>}
  </>
}

export default ImageAttributes;
