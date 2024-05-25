import mongoose from "mongoose";

const transaccionSchema = mongoose.Schema({
    usuario: {
        type:mongoose.Schema.Types.ObjectId,
        required: true,
    },
    cuentaUsuario:{
        type:String,
    },
    hashDelBloque: {
        type: 'string',
        required: true,
        trim: true
    },
    montoDonado:{
        type:Number,
        required:true,
    },
    campaniabenefica:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'campanias',
        required:true,
    }
});



const Transaccion = mongoose.model('transaccion', transaccionSchema)
export default Transaccion;