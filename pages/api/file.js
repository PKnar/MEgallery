import File from '../../models/File'
import connectDb from '../../utils/connectDb'


connectDb();

export default async (req,res) =>{
    switch(req.method){
      case 'GET':
      await handleGetRequest(req,res);
      break;
      case 'POST':
      await handlePostRequest(req,res);
      break;
      case 'DELETE':
          await handleDeleteRequest(req,res);
          break;
      default:
          res.status(405),send(`Methos ${req.method} not allowed`)
    }

}

async function handleGetRequest(req,res){
 const {_id} = req.query;
 const product = await File.findOne({_id});
 res.status(200).json(product)
}

async function handleDeleteRequest(req,res){
    const {_id} = req.query;
    try{
     //1) Delete product by id
    await File.findOneAndDelete({_id})
    //2) Remove product from all carts , referenced as product
     
    res.status(204).json({})
    }catch(error){
       console.error(error)
       res.status(500).send('Error deleteing product')
    }
    
   }


async function handlePostRequest(req,res){
    try{
        const{mediaUrl}=req.body    

    if( !mediaUrl ){
        return res.status(422).send('Product missing one or more fields')

    }

  const product = await new File({
        mediaUrl
    }).save()

    res.status(201).json(product)

    }catch(error){
        console.error(error)
        res.status(500).send(error)
    }
    
   }