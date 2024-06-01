// Modules
import { Buffer } from "buffer";

function blobFromImageDataUri(uri: string): {
  blob: Blob;
  extension: string;
} {
  // "data:image/jpeg;base64,/9j....."
  if (uri.startsWith("data:") === false) {
    console.log("Incorrect Data URI");
    return {
      blob: new Blob(),
      extension: "",
    };
  }
  const [info, data] = uri.split(",");
  const [datamime, encoding] = info.split(";");
  const mimetype = datamime.split(":")[1];
  const dataAsString = Buffer.from(data, encoding);
  let extension = "";
  if (mimetype === "image/jpg" || mimetype === "image/jpeg") {
    extension = "jpg";
  } else if (mimetype === "image/png") {
    extension = "png";
  } else if (mimetype === "image/webp") {
    extension = "webp";
  } else {
    extension = "unknown";
  }
  return {
    blob: new Blob([dataAsString], { type: mimetype }),
    extension,
  };
}

export default blobFromImageDataUri;
