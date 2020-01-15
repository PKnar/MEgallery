import connectDb from '../../utils/connectDb';
import File from '../../models/File';


connectDb();


export default async (req,res)=>{
  try{
    const {page,size}=req.query
    const pageNum = Number(page)
    const pageSize = Number(size)
    let products=[]
    const totalDocs=await File.countDocuments()
    const totalPages = Math.ceil( totalDocs / pageSize)
    if(pageNum ===1){
      products=  await File.find().limit(pageSize)
    }else{
      const skips =  pageSize*(pageNum -1)
     products= await File.find().skip(skips).limit(pageSize)
    }
 
    //find, finds all the products
    //const products = await Product.find()
    res.status(200).json({products,totalPages})
  }
   catch(error){
     console.log(error)
   }

}