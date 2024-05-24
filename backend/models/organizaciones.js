import mongoose from "mongoose";

const organizacionSchema = mongoose.Schema({
    nombre: {
        type:String,
        required: true,
    },
    description:{
        type:String,
        required:true,
    },
    campanias:[{
         type:mongoose.Schema.Types.ObjectId,
         ref:'camapanias'

    }]
});



const organizacion = mongoose.model('Organizaciones', organizacionSchema)
export default organizacion;