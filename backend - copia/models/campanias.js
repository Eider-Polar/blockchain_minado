import mongoose from "mongoose";

const campaniaSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  fechaCreacionCampania: {
    type: Date,
    default:Date.now(),
  },
  fechafinalizacionCampania: {
    type: Date,
    required: true,
  },
  objetivoMonto: {
    type: Number,
    required: true, 
  },
  cantidadActual: {
    type: Number,
    default: 0,
  },
});

const campania = mongoose.model("Campañas", campaniaSchema);
export default campania;
