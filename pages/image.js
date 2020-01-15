import React from 'react';
import axios from 'axios';
import ImageList from '../components/Index/ImageList';
import baseUrl from '../utils/baseUrl';
import GalleryPagination from '../components/Index/GalleryPagination'

function Gallery({products,totalPages,user}) {
 return  (
      <div className='gallery-container'>
        <GalleryPagination totalPages={totalPages}/>
        <ImageList totalPages={totalPages} user={user} products={products}/>
 
       </div>
    );
}


Gallery.getInitialProps=async(ctx)=>{
    const page=ctx.query.page? ctx.query.page:'1'
    const size = 8;
//fetch data on server
//return response data as an object
//note:this will be merged with existing props

const url = `${baseUrl}/api/images`;
const payload ={params:{page,size}}
const response= await axios.get(url,payload);
  
return response.data;

}

export default Gallery;
