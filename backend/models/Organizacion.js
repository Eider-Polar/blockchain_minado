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
         ref:'campanias'

    }],
    cuentaBAncaria:{
        type:String,

    }
});



const Organizacion = mongoose.model('Organizaciones', organizacionSchema)
export default Organizacion;