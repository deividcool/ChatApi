import { AiTwotoneFilePdf, AiTwotoneFileWord, AiTwotoneFileExcel } from "react-icons/ai";

function FileIcon({ fileName }) {
  const getFileExtension = (fileName) => {
    return fileName.split('.').pop().toLowerCase();
  };

  const fileExtension = getFileExtension(fileName);

  // Define los tipos de archivo que tienen iconos asociados
  const iconTypes = {
    pdf: AiTwotoneFilePdf,
    doc: AiTwotoneFileWord,
    docx: AiTwotoneFileWord,
    xls: AiTwotoneFileExcel,
    xlsx: AiTwotoneFileExcel
    // Puedes agregar más tipos de archivo según sea necesario
  };

  // Verifica si la extensión del archivo está en iconTypes
  if (iconTypes[fileExtension]) {
    // Si está, devuelve el componente de icono correspondiente
    const IconComponent = iconTypes[fileExtension];
    return <IconComponent style={{width: '100px', height:'100px'}} />;
  } else {
    // Si no está, puedes devolver un valor por defecto o manejar la situación según tus necesidades
    return <div>No hay icono disponible para esta extensión</div>;
  }
}

export default FileIcon;