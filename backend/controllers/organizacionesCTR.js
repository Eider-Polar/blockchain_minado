import organizacion from '../models/organizaciones.js'
const nuevaOrganizacion= async (req,res)=>{
 const data=req.body;
 const nueva_Organizacion= new organizacion(data)
    nueva_Organizacion.save()
 res.json(nueva_Organizacion) 
}

export{
    nuevaOrganizacion
}