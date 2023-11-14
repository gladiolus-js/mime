import { fileURLToPath } from 'node:url'
import { dirname, resolve } from "node:path";

/**
 * Get the absolute path of the file
 * @param relativePath relative path to current file
 * @returns {string} absolute path
 */
const resolvePath = (relativePath) => {
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = dirname(__filename);
    return resolve(__dirname, relativePath)
}

export {
    resolvePath
}