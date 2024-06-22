import mongoose from "mongoose";

const organizacionSchema = mongoose.Schema({
    nombre: {
        type:String,
        required: true,
    },
    descripcion:{
        type:String,
        required:true,
    },
    campanias:[{
         type:mongoose.Schema.Types.ObjectId,
         ref:'camapanias'

    }],
    cuentaBAncaria:{
        type:String,

    }
});



const organizacion = mongoose.model('Organizaciones', organizacionSchema)
export default organizacion;