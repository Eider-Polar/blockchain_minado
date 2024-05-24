import mongoose from "mongoose";
import campania from "./campanias";
import Usuario from "./Usuario";

const bancoSchema = mongoose.Schema({
    organizacion:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"organizacion"
    },
    campania:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"campania"
    },
    monto:{
        type:Number,
        require:true
    },
    Usuario:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"usuario"
    }

});

const banco = mongoose.model("Banco", bancoSchema);
export default banco;
