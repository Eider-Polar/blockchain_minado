import mongoose from "mongoose";

const gastoSchema = mongoose.Schema({
    organizacion:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Organizacion'

    },
    descripcionGasto:{
        type:String

    },
    gastado:{
        type:Number,
        require:true
    },
    bloquesUsados:[{
        type:String
    }]
    

});

const gasto = mongoose.model("Gasto", gastoSchema);
export default gasto;
