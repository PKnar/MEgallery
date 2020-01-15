import axios from 'axios';
import ImageAttributes from '../components/Image/ImageAttributes'
import baseUrl from '../utils/baseUrl'

function Product({product,user}) {

  return(
    <>
    <ImageAttributes user={user} {...product} />
    </>
  ) ;
}

Product.getInitialProps= async({query:{_id}})=>{
  const url=`${baseUrl}/api/image`
  const payload={params:{_id}}
  const response = await axios.get(url,payload)
  return {product:response.data}
}

export default Product;
