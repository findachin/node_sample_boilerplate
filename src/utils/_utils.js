import { fileURLToPath } from 'url'
import { dirname } from "path";

export function getFilePath(file) {

    return fileURLToPath(file)
}

export function getFolderPath(file) {
    const __filename = getFilePath(file)
    return dirname(__filename);

}