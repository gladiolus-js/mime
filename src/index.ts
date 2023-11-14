import { findMimeByBeginBytes, ToBeginBytes } from "./utils/begin_bytes";
import { findMimeByExtension } from "./utils/extension";

/**
 * Find mime type of file by filename
 */
function findMime(filename: string): string | null
/**
 * Find mime type of file by begin bytes
 */
function findMime(beginBytes: ToBeginBytes): string | null
/**
 * Find mime type of file by filename or begin bytes.
 */
function findMime(filename: string, beginBytes: ToBeginBytes): string | null
/**
 * Try to find the mime-type of file, if failed, return null.
 */
function findMime(filenameOrBeginBytes: string | ToBeginBytes, beginBytes?: ToBeginBytes): string | null {
    if(typeof filenameOrBeginBytes === 'string') {
        if(!!beginBytes) {
            // use begin bytes first (if any), then filename if failed
            const beginBytesMime = findMimeByBeginBytes(beginBytes)
            if(beginBytesMime != null) return beginBytesMime
            return findMimeByExtension(filenameOrBeginBytes)
        } else {
            // use filename only
            return findMimeByExtension(filenameOrBeginBytes)
        }
    } else {
        // use begin bytes only
        return findMimeByBeginBytes(filenameOrBeginBytes)
    }
}

export {
    findMime
}
