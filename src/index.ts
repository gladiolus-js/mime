import { findMimeByBeginBytes } from "./utils/begin_bytes";
import { findMimeByExtension } from "./utils/extension";

/**
 * Find mime type of file by filename
 */
function findMime(filename: string): string | null
/**
 * Find mime type of file by begin bytes
 */
function findMime(beginBytes: number[]): string | null
/**
 * Find mime type of file by filename or begin bytes.
 */
function findMime(filename: string, beginBytes: number[]): string | null
/**
 * Try to find the mime-type of file, if failed, return null.
 */
function findMime(filenameOrBeginBytes: string | number[], beginBytes?: number[]): string | null {
    if(typeof filenameOrBeginBytes === 'string') {
        if(Array.isArray(beginBytes)) {
            // use begin bytes first (if any), then filename if failed
            const beginBytesMime = findMimeByBeginBytes(beginBytes)
            if(beginBytesMime != null) return beginBytesMime
            return findMimeByExtension(filenameOrBeginBytes)
        } else {
            // use filename only
            return findMimeByExtension(filenameOrBeginBytes)
        }
    } else if(Array.isArray(filenameOrBeginBytes)) {
        // use begin bytes only
        return findMimeByBeginBytes(filenameOrBeginBytes)
    } else {
        throw new TypeError('filenameOrBeginBytes must be string or number[]')
    }
}

export {
    findMime
}
