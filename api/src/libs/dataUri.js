import Datauri from 'datauri';
import path from 'path';
const dUri = new Datauri();

export const dataUri = (req) => {
  return dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);
}