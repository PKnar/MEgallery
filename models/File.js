import mongoose from 'mongoose';

const {String} = mongoose.Schema.Types;

const FileSchema= new mongoose.Schema({
   mediaUrl:{
        type:String,
        required:true
   }
})

export default mongoose.models.File || mongoose.model('File',FileSchema);