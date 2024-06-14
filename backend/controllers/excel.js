import Blockchain from "../src/blockcahain.js";
import xlsx from "xlsx";
const bc = new Blockchain();

const sacarReporteUsuario=async( req,res)=>{
    const { id } = req.params;
    try {
      const data = await Respuesta.find(
        { encuesta: id },
        "-aprendiz -_id -respondio -encuesta "
      ).populate("instructor pregunta");
      const agrupado = data.map((item) => ({
        instructor: item.instructor.nombre,
        pregunta: item.pregunta.pregunta,
        respuesta: item.respuesta,
      }));
  
      const workbook = xlsx.utils.book_new();
  
      const dataArray = agrupado.map((item) => Object.values(item));
      const dataa = [["Instructor", "Pregunta", "Ponderado"], ...dataArray];
  
      // Crear una hoja de trabajo
      const worksheet = xlsx.utils.aoa_to_sheet(dataa);
  
      // Agregar la hoja de trabajo al libro de trabajo
      xlsx.utils.book_append_sheet(workbook, worksheet, "Datos");
  
      // Escribir el libro de trabajo en un archivo
      xlsx.writeFile(workbook, "datos.xlsx");
  
      console.log("Archivo Excel generado correctamente.");
    } catch (error) {
      console.log(error);
    }
}



export {
    sacarReporteUsuario
}