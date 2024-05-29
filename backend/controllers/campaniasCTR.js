import campania from "../models/campanias.js"
import organizacion from "../models/organizaciones.js"
const nuevaCampania = async (req,res)=>{
    const data = req.body
    const {id} = req.params
    console.log(id)
    try {
        const nuevacampania = new campania(data)
        nuevacampania.save()
        res.json(nuevacampania)
        const Organizacion = await organizacion.findOne({_id:id})
        Organizacion.campanias.push(id)
        Organizacion.save()
        console.log(Organizacion)
    } catch (error) {
        console.log(error)
    }
}
const verCampanias = async(req,res)=>{
    try {
        
        const campanias = await campania.find()
        res.json(campanias)
    } catch (error) {
        console.log(error)
    }
}
export {nuevaCampania, verCampanias}